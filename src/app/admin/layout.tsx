/**
 * Admin area layout. Access control is enforced by Cloudflare Access (allowlisted
 * emails) plus `src/middleware.ts` as defense-in-depth — no in-app password auth.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-xl font-bold">관리자</h1>
      <div className="mt-6">{children}</div>
    </div>
  );
}
