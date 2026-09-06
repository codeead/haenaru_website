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
  /** 카카오맵 길찾기용 좌표. 비어 있으면 주소 검색으로 대체된다. */
  mapLatitude: string;
  mapLongitude: string;
};

export const siteConfig = siteData as SiteConfig;
