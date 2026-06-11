import { siteConfig } from "@/content/site-config";
import { getDisplayedProjectCount } from "@/lib/counts";

type CompanySummarySectionProps = {
  /** Count of currently published works (from D1). 0 until M4 wires up the query. */
  publishedWorkCount?: number;
};

export function CompanySummarySection({
  publishedWorkCount = 0,
}: CompanySummarySectionProps) {
  const projectCount = getDisplayedProjectCount(publishedWorkCount);

  return (
    <section className="grid grid-cols-1 gap-4 px-4 py-12 text-center sm:grid-cols-3">
      <div>
        <p className="text-2xl font-bold">{siteConfig.establishedYear}</p>
        <p className="text-(--color-foreground-muted)">창업연도</p>
      </div>
      <div>
        <p className="text-2xl font-bold">{projectCount}+</p>
        <p className="text-(--color-foreground-muted)">누적 시공 건수</p>
      </div>
      <div>
        <p className="text-2xl font-bold">배관 · 보일러 · 난방</p>
        <p className="text-(--color-foreground-muted)">취급 분야</p>
      </div>
    </section>
  );
}
