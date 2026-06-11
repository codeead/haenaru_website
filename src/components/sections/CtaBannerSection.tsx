import { siteConfig } from "@/content/site-config";
import { KakaoChannelButton } from "@/components/KakaoChannelButton";

export function CtaBannerSection() {
  return (
    <section className="flex flex-col items-center gap-4 bg-(--color-primary) px-4 py-12 text-center text-(--color-primary-foreground)">
      <p className="text-lg font-semibold">지금 바로 문의하세요</p>
      <div className="flex gap-3">
        <a
          href={`tel:${siteConfig.phone}`}
          className="rounded-(--radius-md) bg-(--color-primary-foreground) px-4 py-2 text-(--color-primary)"
        >
          전화 문의
        </a>
        <KakaoChannelButton className="rounded-(--radius-md) border border-(--color-primary-foreground) px-4 py-2" />
      </div>
    </section>
  );
}
