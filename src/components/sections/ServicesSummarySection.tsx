import Link from "next/link";
import { services } from "@/content/services";

export function ServicesSummarySection() {
  return (
    <section className="px-4 py-12">
      <h2 className="text-xl font-bold">사업영역</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.key}
            className="rounded-(--radius-md) border border-(--color-border) p-4"
          >
            <h3 className="font-semibold">{service.title}</h3>
            <p className="mt-1 text-sm text-(--color-foreground-muted)">
              {service.description}
            </p>
          </div>
        ))}
      </div>
      <Link href="/services" className="mt-4 inline-block underline">
        사업영역 자세히 보기
      </Link>
    </section>
  );
}
