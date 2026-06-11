import Link from "next/link";
import { siteConfig } from "@/content/site-config";

/** TODO(M3): replace with a Kakao Maps thumbnail. */
export function LocationPreviewSection() {
  return (
    <section className="px-4 py-12">
      <h2 className="text-xl font-bold">오시는 길</h2>
      <p className="mt-2 text-(--color-foreground-muted)">{siteConfig.address.full}</p>
      <Link href="/location" className="mt-4 inline-block underline">
        지도 보기
      </Link>
    </section>
  );
}
