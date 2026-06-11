import { HeroSection } from "@/components/sections/HeroSection";
import { CompanySummarySection } from "@/components/sections/CompanySummarySection";
import { FeaturedWorksSection } from "@/components/sections/FeaturedWorksSection";
import { ServicesSummarySection } from "@/components/sections/ServicesSummarySection";
import { LocationPreviewSection } from "@/components/sections/LocationPreviewSection";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CompanySummarySection />
      <FeaturedWorksSection />
      <ServicesSummarySection />
      <LocationPreviewSection />
      <CtaBannerSection />
    </>
  );
}
