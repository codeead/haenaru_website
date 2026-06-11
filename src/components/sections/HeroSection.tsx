import { siteConfig } from "@/content/site-config";
import { KakaoChannelButton } from "@/components/KakaoChannelButton";

export function HeroSection() {
  return (
    <section className="px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">{siteConfig.companyName}</h1>
      <p className="mt-2 text-(--color-foreground-muted)">{siteConfig.tagline}</p>
      <div className="mt-6 flex justify-center gap-3">
        <a
          href={`tel:${siteConfig.phone}`}
          className="rounded-(--radius-md) border border-(--color-border) px-4 py-2"
        >
          전화 문의
        </a>
        <KakaoChannelButton className="rounded-(--radius-md) bg-(--color-primary) px-4 py-2 text-(--color-primary-foreground)" />
      </div>
    </section>
  );
}
