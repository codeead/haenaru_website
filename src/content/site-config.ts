// Operational values that change rarely. Owner can edit numbers/text here directly.
// `baseline_project_count` and `established_year` are placeholders until confirmed.

export const siteConfig = {
  companyName: "해나루 종합설비",
  tagline: "믿을 수 있는 설비 시공 파트너",
  establishedYear: 2010,
  /** Past project count not tracked in D1 (manual correction value). */
  baselineProjectCount: 0,
  phone: "010-0000-0000",
  address: {
    full: "주소를 입력하세요",
    region: "지역",
  },
  coordinates: {
    lat: 35.8714,
    lng: 128.6014,
  },
  businessHours: "평일 09:00 - 18:00 (주말/공휴일 휴무)",
  businessRegistrationNumber: "000-00-00000",
  kakao: {
    channelPublicId: "",
  },
} as const;
