type AdminWorkEditPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata = {
  title: "시공사례 수정",
};

/** TODO(M5): load work + photos by id, reuse the same form as /admin/works/new. */
export default async function AdminWorkEditPage({
  params,
}: AdminWorkEditPageProps) {
  const { id } = await params;

  return (
    <div>
      <p className="text-(--color-foreground-muted)">
        시공사례 #{id} 수정 폼이 곧 표시됩니다.
      </p>
    </div>
  );
}
