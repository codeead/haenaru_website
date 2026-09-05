// 서비스 카테고리 — 명함에 기재된 실제 취급 업무 기준.
// 설명은 말투 규칙에 따라 명사 나열이 아니라 손님에게 말하듯 쓴다.
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
    description: "새로 놓는 것도, 오래된 걸 바꾸는 것도 합니다. 갑자기 안 돌면 봐 드립니다.",
  },
  {
    key: "heating",
    title: "난방 배관공사",
    description: "바닥이 골고루 안 따뜻하거나 난방비가 이상하게 많이 나올 때 손봐 드립니다.",
  },
  {
    key: "water-pipe",
    title: "상하수도 배관공사",
    description: "수도관과 하수관을 새로 놓거나, 낡아서 문제 생긴 곳을 고칩니다.",
  },
  {
    key: "leak-detection",
    title: "누수 탐지",
    description: "어디서 새는지 모를 때 원인부터 찾아 드립니다. 벽을 다 뜯지 않고 위치를 잡습니다.",
  },
  {
    key: "thawing",
    title: "해빙",
    description: "겨울에 물이 안 나오면 얼어붙은 배관을 녹여 드립니다.",
  },
  {
    key: "remodeling",
    title: "주택 리모델링",
    description: "화장실이나 주방을 고칠 때 설비 쪽을 통째로 맡아서 합니다.",
  },
  {
    key: "prefab",
    title: "조립식 건축",
    description: "농막이나 창고 같은 조립식 건물을 세우고 설비까지 넣어 드립니다.",
  },
  {
    key: "coring",
    title: "코어작업",
    description: "배관이나 후드가 지나갈 자리를 콘크리트 벽에 정확히 뚫습니다.",
  },
];

export function getServiceByKey(key: string): ServiceCategory | undefined {
  return services.find((s) => s.key === key);
}
