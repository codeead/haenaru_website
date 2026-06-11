import Link from "next/link";
import { siteConfig } from "@/content/site-config";

export function Footer() {
  return (
    <footer className="border-t border-(--color-border) py-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 text-sm text-(--color-foreground-muted)">
        <p>{siteConfig.companyName}</p>
        <p>{siteConfig.address.full}</p>
        <p>
          {siteConfig.phone} · 사업자등록번호 {siteConfig.businessRegistrationNumber}
        </p>
        <Link href="/privacy">개인정보처리방침</Link>
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.companyName}. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
