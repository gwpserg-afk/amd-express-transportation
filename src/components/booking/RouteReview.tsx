import { useEffect, useRef } from "react";
import { MapPin, Navigation, Clock, CheckCircle, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MAPBOX_TOKEN, type RouteResult } from "@/lib/mapbox";

interface TripDetails {
  passenger: string;
  phone: string;
  pickupAddress: string;
  dropoffAddress: string;
  date: string;
  pickupTime: string;
  appointmentTime: string;
  tripType: string;
  assistance: string;
}

interface RouteReviewProps {
  route: RouteResult;
  details: TripDetails;
  onEdit: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}

const fmtDate = (d: string) => {
  if (!d) return "—";
  const dt = new Date(d + "T00:00:00");
  return dt.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "long", day: "numeric" });
};
const fmtTime = (t: string) => {
  if (!t) return "—";
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const hr = h % 12 || 12;
  return `${hr}:${String(m).padStart(2, "0")} ${ap}`;
};

const RouteReview = ({ route, details, onEdit, onConfirm, isSubmitting }: RouteReviewProps) => {
  const mapEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("mapbox-gl").Map | null = null;
    let cancelled = false;

    (async () => {
      const mapboxgl = (await import("mapbox-gl")).default;
      await import("mapbox-gl/dist/mapbox-gl.css");
      if (cancelled || !mapEl.current) return;

      mapboxgl.accessToken = MAPBOX_TOKEN;
      map = new mapboxgl.Map({
        container: mapEl.current,
        style: "mapbox://styles/mapbox/streets-v12",
        interactive: true,
        attributionControl: false,
      });
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");

      const mk = (color: string, letter: string) => {
        const el = document.createElement("div");
        el.style.cssText =
          `display:grid;place-items:center;width:30px;height:30px;border-radius:9999px;` +
          `background:${color};color:#fff;font:700 14px/1 Inter,sans-serif;` +
          `box-shadow:0 2px 8px rgba(0,0,0,.35);border:2px solid #fff;`;
        el.textContent = letter;
        return el;
      };

      map.on("load", () => {
        if (!map) return;
        new mapboxgl.Marker({ element: mk("#16a34a", "A") }).setLngLat([route.from.lng, route.from.lat]).addTo(map);
        new mapboxgl.Marker({ element: mk("#dc2626", "B") }).setLngLat([route.to.lng, route.to.lat]).addTo(map);
        map.addSource("route", { type: "geojson", data: { type: "Feature", properties: {}, geometry: route.geometry } });
        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#1560E6", "line-width": 5 },
        });
        const b = new mapboxgl.LngLatBounds();
        route.geometry.coordinates.forEach((c) => b.extend(c as [number, number]));
        map.fitBounds(b, { padding: 60, duration: 0 });
      });
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [route]);

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">{label}</p>
      <p className="font-semibold text-sm text-foreground">{value || "—"}</p>
    </div>
  );

  return (
    <div className="bg-card rounded-2xl p-5 md:p-6 border border-border shadow-lg">
      <div className="text-center mb-5">
        <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground">Review Your Booking</h3>
        <p className="text-muted-foreground text-sm">Please confirm all details before submitting.</p>
      </div>

      {/* A → B + map */}
      <div className="rounded-xl border border-border overflow-hidden mb-5">
        <div className="p-4 space-y-3 bg-secondary/30">
          <div className="flex items-start gap-3">
            <span className="grid place-items-center w-6 h-6 rounded-full bg-[#16a34a] text-white text-xs font-bold shrink-0">A</span>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Pickup</p>
              <p className="font-semibold text-sm text-foreground">{route.from.label}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="grid place-items-center w-6 h-6 rounded-full bg-[#dc2626] text-white text-xs font-bold shrink-0">B</span>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Drop-off</p>
              <p className="font-semibold text-sm text-foreground">{route.to.label}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-1">
            <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" />{route.miles.toFixed(1)} miles</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" />~{Math.round(route.minutes)} min drive</span>
          </div>
        </div>
        <div ref={mapEl} className="w-full h-64 md:h-80 bg-secondary" />
      </div>

      {/* Trip details */}
      <div className="bg-secondary/40 rounded-xl p-5 border border-border">
        <p className="text-xs font-bold uppercase tracking-wide text-foreground mb-4">Trip Details</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <Row label="Passenger" value={details.passenger} />
          <Row label="Phone" value={details.phone} />
          <Row label="Pickup Address" value={details.pickupAddress} />
          <Row label="Drop-off Address" value={details.dropoffAddress} />
          <Row label="Date" value={fmtDate(details.date)} />
          <Row label="Pickup Time" value={fmtTime(details.pickupTime)} />
          <Row label="Appointment Time" value={fmtTime(details.appointmentTime)} />
          <Row label="Trip Type" value={details.tripType} />
          <Row label="Assistance" value={details.assistance} />
        </div>
      </div>

      {/* Actions */}
      <div className="grid sm:grid-cols-2 gap-3 mt-5">
        <Button variant="outline" size="lg" onClick={onEdit} disabled={isSubmitting}>
          <Pencil className="w-4 h-4" /> Edit Trip
        </Button>
        <Button variant="cta" size="lg" onClick={onConfirm} disabled={isSubmitting}>
          {isSubmitting ? (
            <><span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground" /> Submitting…</>
          ) : (
            <><CheckCircle className="w-4 h-4" /> Confirm Booking</>
          )}
        </Button>
      </div>
    </div>
  );
};

export default RouteReview;
