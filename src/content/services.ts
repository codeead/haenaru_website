// Service categories shown on /services and used as `works.category` filter values.
// Add a new category by adding one entry here.

export type ServiceCategory = {
  key: string;
  title: string;
  description: string;
};

export const services: ServiceCategory[] = [
  {
    key: "plumbing",
    title: "배관",
    description: "급수·배수 배관 시공 및 보수",
  },
  {
    key: "boiler",
    title: "보일러",
    description: "보일러 설치, 교체, 점검",
  },
  {
    key: "heating",
    title: "난방",
    description: "난방 배관 및 설비 시공",
  },
];
