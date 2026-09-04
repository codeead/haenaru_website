// 서비스 카테고리 — 명함에 기재된 실제 취급 업무 기준.
// 자주 바뀌지 않는 정보라 CMS가 아닌 코드로 관리한다. 새 항목은 배열에 추가만 하면 된다.

export type ServiceCategory = {
  key: string;
  title: string;
  description: string;
};

export const services: ServiceCategory[] = [
  {
    key: "boiler",
    title: "보일러 시공 및 A/S",
    description: "보일러 신규 설치, 교체, 고장 점검 및 수리",
  },
  {
    key: "heating",
    title: "난방 배관공사",
    description: "난방 배관 신설 및 보수 시공",
  },
  {
    key: "water-pipe",
    title: "상하수도 배관공사",
    description: "급수·배수 배관 신설 및 보수",
  },
  {
    key: "leak-detection",
    title: "누수 탐지",
    description: "누수 원인 진단 및 위치 탐지",
  },
  {
    key: "thawing",
    title: "해빙",
    description: "동파된 배관 해빙 작업",
  },
  {
    key: "remodeling",
    title: "주택 리모델링",
    description: "주택 설비 전반 리모델링",
  },
  {
    key: "prefab",
    title: "조립식 건축",
    description: "조립식 건축물 시공",
  },
  {
    key: "coring",
    title: "코어작업",
    description: "콘크리트 코어 천공 작업",
  },
];

export function getServiceByKey(key: string): ServiceCategory | undefined {
  return services.find((s) => s.key === key);
}
