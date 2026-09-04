import siteData from "@/content/site/config.json";

export type SiteConfig = {
  companyName: string;
  ceoName: string;
  tagline: string;
  establishedYear: number;
  baselineProjectCount: number;
  phone: string;
  mobile: string;
  fax: string;
  email: string;
  address: string;
  businessHours: string;
  businessRegistrationNumber: string;
  registrations: string[];
  kakaoChannelUrl: string;
};

export const siteConfig = siteData as SiteConfig;
