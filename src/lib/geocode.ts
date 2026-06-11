/**
 * Reverse geocoding via Kakao Local API (coords -> district/dong, spec §6).
 * Only the district/dong (`region_2depth_name` + `region_3depth_name`) is
 * stored/exposed publicly — never the precise address.
 */

const KAKAO_LOCAL_API_URL =
  "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json";

export type RegionResult = {
  /** e.g. "달성군 다사읍" */
  region: string;
};

export async function reverseGeocode(
  lat: number,
  lng: number,
  restApiKey: string,
): Promise<RegionResult | null> {
  const url = new URL(KAKAO_LOCAL_API_URL);
  url.searchParams.set("x", String(lng));
  url.searchParams.set("y", String(lat));

  const response = await fetch(url, {
    headers: { Authorization: `KakaoAK ${restApiKey}` },
  });

  if (!response.ok) return null;

  const data = (await response.json()) as {
    documents: { region_2depth_name: string; region_3depth_name: string }[];
  };

  const region = data.documents[0];
  if (!region) return null;

  return { region: `${region.region_2depth_name} ${region.region_3depth_name}`.trim() };
}
