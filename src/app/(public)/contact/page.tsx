import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import { KakaoChannelButton } from "@/components/KakaoChannelButton";

export const metadata = {
  title: "연락처 | 해나루 종합설비",
};

/** Not a web form by design — inquiries go through phone / KakaoTalk Channel only. */
export default function ContactPage() {
  return (
    <section className="px-4 py-12">
      <h1 className="text-2xl font-bold">연락처</h1>
      <dl className="mt-6 space-y-2">
        <div>
          <dt className="font-semibold">전화</dt>
          <dd>
            <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
          </dd>
        </div>
        <div>
          <dt className="font-semibold">영업시간</dt>
          <dd>{siteConfig.businessHours}</dd>
        </div>
        <div>
          <dt className="font-semibold">주소</dt>
          <dd>
            {siteConfig.address.full}{" "}
            <Link href="/location" className="underline">
              지도 보기
            </Link>
          </dd>
        </div>
      </dl>
      <KakaoChannelButton className="mt-6 rounded-(--radius-md) bg-(--color-primary) px-4 py-2 text-(--color-primary-foreground)" />
    </section>
  );
}
