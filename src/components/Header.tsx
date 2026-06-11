import Link from "next/link";
import { siteConfig } from "@/content/site-config";

const NAV_LINKS = [
  { href: "/about", label: "회사소개" },
  { href: "/services", label: "사업영역" },
  { href: "/works", label: "시공사례" },
  { href: "/location", label: "오시는 길" },
  { href: "/contact", label: "연락처" },
];

export function Header() {
  return (
    <header className="border-b border-(--color-border)">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold">
          {siteConfig.companyName}
        </Link>
        <nav className="hidden gap-6 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <a href={`tel:${siteConfig.phone}`} className="font-medium">
          {siteConfig.phone}
        </a>
      </div>
    </header>
  );
}
