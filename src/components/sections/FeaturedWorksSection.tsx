import Link from "next/link";

/**
 * Featured "works" (시공사례) cards on the home page.
 * TODO(M4): replace placeholder with D1 query for the latest/featured published works.
 */
export function FeaturedWorksSection() {
  return (
    <section className="px-4 py-12">
      <h2 className="text-xl font-bold">대표 시공사례</h2>
      <p className="mt-4 text-(--color-foreground-muted)">
        등록된 시공사례가 곧 표시됩니다.
      </p>
      <Link href="/works" className="mt-4 inline-block underline">
        전체 시공사례 보기
      </Link>
    </section>
  );
}
