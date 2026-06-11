import { siteConfig } from "@/content/site-config";

export const metadata = {
  title: "오시는 길 | 해나루 종합설비",
};

/** TODO(M3): render Kakao Maps SDK pin using siteConfig.coordinates. */
export default function LocationPage() {
  return (
    <section className="px-4 py-12">
      <h1 className="text-2xl font-bold">오시는 길</h1>
      <p className="mt-4">{siteConfig.address.full}</p>
      <p className="mt-1">
        <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
      </p>
      <div className="mt-6 flex h-64 items-center justify-center rounded-(--radius-md) border border-(--color-border) text-(--color-foreground-muted)">
        지도가 곧 표시됩니다.
      </div>
    </section>
  );
}
