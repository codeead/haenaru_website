import Link from "next/link";

export const metadata = {
  title: "시공사례 관리",
};

/** TODO(M5): list/search works from D1, publish toggle, soft delete. */
export default function AdminWorksPage() {
  return (
    <div className="space-y-4">
      <Link
        href="/admin/works/new"
        className="inline-block rounded-(--radius-md) bg-(--color-primary) px-4 py-2 text-(--color-primary-foreground)"
      >
        새 시공사례 등록
      </Link>
      <p className="text-(--color-foreground-muted)">목록이 곧 표시됩니다.</p>
    </div>
  );
}
