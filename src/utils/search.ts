import { businesses, artisans, jobs } from "@/data";
import { ArtisanProfile, Business } from "@/types";

function normalizeSearch(query: string): string {
  return query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, "");
}

export function searchBusinesses(query: string, categoryId?: string, businessList?: Business[]) {
  const source = businessList || businesses;
  const normalized = normalizeSearch(query);

  return source.filter((b) => {
    const normalizedNameFr = normalizeSearch(b.nameFr);
    const normalizedDescFr = normalizeSearch(b.descriptionFr);
    const normalizedAddress = normalizeSearch(b.address);
    const normalizedCategory = normalizeSearch(b.category);
    const nameMatch =
      normalizedNameFr.includes(normalized) ||
      b.nameAr.includes(query) ||
      normalizedDescFr.includes(normalized) ||
      b.descriptionAr.includes(query) ||
      normalizedAddress.includes(normalized) ||
      normalizedCategory.includes(normalized);
    const catMatch = !categoryId || b.category === categoryId;
    return nameMatch && catMatch;
  });
}

export function searchArtisans(query: string, specialtyId?: string, artisanList?: ArtisanProfile[]) {
  const source = artisanList || artisans;
  const normalized = normalizeSearch(query);

  return source.filter((a) => {
    const normalizedNameFr = normalizeSearch(a.nameFr);
    const normalizedDescFr = normalizeSearch(a.descriptionFr);
    const normalizedAddressFr = normalizeSearch(a.addressFr);
    const normalizedSpecialty = normalizeSearch(a.specialty);
    const nameMatch =
      normalizedNameFr.includes(normalized) ||
      a.nameAr.includes(query) ||
      normalizedDescFr.includes(normalized) ||
      a.descriptionAr.includes(query) ||
      normalizedAddressFr.includes(normalized) ||
      a.addressAr.includes(query) ||
      normalizedSpecialty.includes(normalized);
    const specMatch = !specialtyId || a.specialty === specialtyId;
    return nameMatch && specMatch;
  });
}

export function searchJobs(query: string, sectorId?: string, jobTypeId?: string) {
  const normalized = normalizeSearch(query);

  return jobs.filter((j) => {
    const titleMatch =
      normalizeSearch(j.titleFr).includes(normalized) ||
      j.titleAr.includes(query) ||
      normalizeSearch(j.company).includes(normalized) ||
      normalizeSearch(j.descriptionFr).includes(normalized) ||
      j.descriptionAr.includes(query);
    const sectorMatch = !sectorId || j.sector === sectorId;
    const typeMatch = !jobTypeId || j.jobType === jobTypeId;
    return titleMatch && sectorMatch && typeMatch;
  });
}

export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function sortByDistance<T extends { lat: number; lng: number }>(
  items: T[],
  userLat: number,
  userLng: number
): (T & { distance: number })[] {
  return items
    .map((item) => ({
      ...item,
      distance: calculateDistance(userLat, userLng, item.lat, item.lng),
    }))
    .sort((a, b) => a.distance - b.distance);
}

export function getAreaName(areaId?: string): { fr: string; ar: string } {
  // Kept for backwards compatibility; no longer shown in UI.
  return { fr: "", ar: "" };
}
