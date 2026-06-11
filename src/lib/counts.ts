import { siteConfig } from "@/content/site-config";

/**
 * Cumulative project counter (spec §8):
 * displayed value = baseline_project_count + COUNT(works WHERE is_published=1 AND deleted_at IS NULL)
 */
export function getDisplayedProjectCount(publishedWorkCount: number): number {
  return siteConfig.baselineProjectCount + publishedWorkCount;
}
