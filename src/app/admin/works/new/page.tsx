export const metadata = {
  title: "시공사례 등록",
};

/**
 * TODO(M5): photo upload pipeline (HEIC -> JPEG, EXIF date/GPS -> manual fallback,
 * canvas resize, R2 upload), title/description/category/cover/is_published form (zod-validated).
 */
export default function AdminWorkNewPage() {
  return (
    <div>
      <p className="text-(--color-foreground-muted)">
        사진 업로드 및 등록 폼이 곧 표시됩니다.
      </p>
    </div>
  );
}
