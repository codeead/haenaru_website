/**
 * Client-side photo pipeline helpers (spec §6): HEIC -> JPEG, EXIF read, canvas resize.
 * Implemented in M5 alongside the admin upload form.
 */

export const MAX_FULL_WIDTH = 1600;
export const MAX_THUMB_WIDTH = 400;

export type ExtractedExif = {
  takenAt: Date | null;
  lat: number | null;
  lng: number | null;
};

/** Converts a HEIC/HEIF file (e.g. from iPhone) to JPEG. No-op for other formats. */
export async function convertHeicToJpeg(file: File): Promise<File> {
  const isHeic =
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    /\.heic$/i.test(file.name);

  if (!isHeic) return file;

  const heic2any = (await import("heic2any")).default;
  const converted = await heic2any({ blob: file, toType: "image/jpeg" });
  const blob = Array.isArray(converted) ? converted[0] : converted;

  return new File([blob], file.name.replace(/\.heic$/i, ".jpg"), {
    type: "image/jpeg",
  });
}

/** Reads EXIF DateTimeOriginal and GPS coordinates from an image file, if present. */
export async function extractExif(file: File): Promise<ExtractedExif> {
  const exifr = (await import("exifr")).default;
  const data = await exifr.parse(file, { gps: true });

  return {
    takenAt: data?.DateTimeOriginal ?? null,
    lat: data?.latitude ?? null,
    lng: data?.longitude ?? null,
  };
}

/** Resizes an image file to fit within `maxWidth` using a canvas, returning a JPEG blob. */
export async function resizeImage(
  file: File,
  maxWidth: number,
): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");
  ctx.drawImage(bitmap, 0, 0, width, height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))),
      "image/jpeg",
      0.85,
    );
  });
}
