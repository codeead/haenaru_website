import { KakaoChannelButton } from "@/components/KakaoChannelButton";

type WorkDetailPageProps = {
  params: Promise<{ id: string }>;
};

/** TODO(M4): query D1 `works`/`work_photos` by id, build dynamic metadata/OG from cover photo. */
export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { id } = await params;

  return (
    <section className="px-4 py-12">
      <h1 className="text-2xl font-bold">시공사례 #{id}</h1>
      <p className="mt-4 text-(--color-foreground-muted)">
        상세 내용이 곧 표시됩니다.
      </p>
      <KakaoChannelButton
        label="이런 작업 문의하기"
        className="mt-6 rounded-(--radius-md) bg-(--color-primary) px-4 py-2 text-(--color-primary-foreground)"
      />
    </section>
  );
}
