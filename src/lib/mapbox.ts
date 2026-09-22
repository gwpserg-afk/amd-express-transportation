// Mapbox public token, injected at build time from VITE_MAPBOX_TOKEN.
// It's a PUBLIC token (pk.) so it ends up in the client bundle — that's fine;
// protect it with a URL restriction (amdexpresstransportation.com) + usage cap
// in the Mapbox dashboard. Kept in env (not source) so GitHub secret-scanning
// doesn't block pushes.
export const MAPBOX_TOKEN = (import.meta.env.VITE_MAPBOX_TOKEN as string) || "";

export interface GeoPoint {
  lng: number;
  lat: number;
  label: string;
}

export interface RouteResult {
  from: GeoPoint;
  to: GeoPoint;
  miles: number;
  minutes: number;
  geometry: GeoJSON.LineString;
}

// Bias suggestions/geocoding toward the Dallas–Fort Worth metroplex.
const DFW_PROXIMITY = "-96.9209,32.8998";

/** Geocode a free-text address to a coordinate + clean label (US-biased, DFW proximity). */
export async function geocode(address: string): Promise<GeoPoint | null> {
  const q = address.trim();
  if (!q) return null;
  const url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json` +
    `?access_token=${MAPBOX_TOKEN}&country=us&limit=1&proximity=${DFW_PROXIMITY}` +
    `&types=address,poi,place,postcode`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const f = data.features?.[0];
  if (!f) return null;
  return { lng: f.center[0], lat: f.center[1], label: f.place_name as string };
}

/** Autocomplete suggestions for an address input. */
export async function suggestAddresses(
  query: string
): Promise<{ label: string; lng: number; lat: number }[]> {
  const q = query.trim();
  if (q.length < 3) return [];
  const url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json` +
    `?access_token=${MAPBOX_TOKEN}&country=us&autocomplete=true&limit=5` +
    `&proximity=${DFW_PROXIMITY}&types=address,poi,place,postcode`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return (data.features ?? []).map((f: { place_name: string; center: [number, number] }) => ({
    label: f.place_name,
    lng: f.center[0],
    lat: f.center[1],
  }));
}

/** Real driving route + distance/duration between two points. */
export async function getRoute(from: GeoPoint, to: GeoPoint): Promise<RouteResult | null> {
  const url =
    `https://api.mapbox.com/directions/v5/mapbox/driving/` +
    `${from.lng},${from.lat};${to.lng},${to.lat}` +
    `?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const route = data.routes?.[0];
  if (!route) return null;
  return {
    from,
    to,
    miles: route.distance / 1609.34,
    minutes: route.duration / 60,
    geometry: route.geometry as GeoJSON.LineString,
  };
}
