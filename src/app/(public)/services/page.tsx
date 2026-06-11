import { services } from "@/content/services";

export const metadata = {
  title: "사업영역 | 해나루 종합설비",
};

export default function ServicesPage() {
  return (
    <section className="px-4 py-12">
      <h1 className="text-2xl font-bold">사업영역</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.key}
            className="rounded-(--radius-md) border border-(--color-border) p-4"
          >
            <h2 className="font-semibold">{service.title}</h2>
            <p className="mt-1 text-sm text-(--color-foreground-muted)">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
