export const metadata = {
  title: "시공사례 | 해나루 종합설비",
};

type WorksPageProps = {
  searchParams: Promise<{ category?: string }>;
};

/** TODO(M4): query D1 `works` (is_published=1, deleted_at IS NULL), paginate 12/page, filter by category. */
export default async function WorksPage({ searchParams }: WorksPageProps) {
  const { category } = await searchParams;

  return (
    <section className="px-4 py-12">
      <h1 className="text-2xl font-bold">시공사례</h1>
      <p className="mt-4 text-(--color-foreground-muted)">
        {category ? `카테고리: ${category} — ` : ""}
        등록된 시공사례가 곧 표시됩니다.
      </p>
    </section>
  );
}
