import Link from "next/link";

export const metadata = {
  title: "관리자 대시보드",
};

/** TODO(M5): show works total/recent, link to Cloudflare Web Analytics, quick-add button. */
export default function AdminDashboardPage() {
  return (
    <div className="space-y-4">
      <p className="text-(--color-foreground-muted)">
        시공사례 통계와 빠른 등록 버튼이 곧 표시됩니다.
      </p>
      <Link
        href="/admin/works"
        className="inline-block rounded-(--radius-md) border border-(--color-border) px-4 py-2"
      >
        시공사례 관리
      </Link>
    </div>
  );
}
