import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TimeFieldProps {
  value: string; // "HH:MM" 24h
  onChange: (value: string) => void;
  placeholder?: string;
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1); // 1..12
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5); // 0,5,...,55

function parse(value: string): { h12: number | null; min: number | null; ampm: "AM" | "PM" } {
  if (!value) return { h12: null, min: null, ampm: "AM" };
  const [H, M] = value.split(":").map(Number);
  return { h12: H % 12 || 12, min: M, ampm: H >= 12 ? "PM" : "AM" };
}
function to24(h12: number, min: number, ampm: "AM" | "PM"): string {
  let H = h12 % 12;
  if (ampm === "PM") H += 12;
  return `${String(H).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}
function label(value: string): string | null {
  if (!value) return null;
  const { h12, min, ampm } = parse(value);
  return `${h12}:${String(min).padStart(2, "0")} ${ampm}`;
}

const TimeField = ({ value, onChange, placeholder = "Select time" }: TimeFieldProps) => {
  const cur = parse(value);
  const set = (h12: number, min: number, ampm: "AM" | "PM") => onChange(to24(h12, min, ampm));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn("h-10 w-full justify-start font-normal", !value && "text-muted-foreground")}
        >
          <Clock className="w-4 h-4 mr-2 text-primary shrink-0" />
          {label(value) ?? placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="start">
        <div className="flex gap-1.5">
          <div className="h-44 w-14 overflow-y-auto flex flex-col gap-0.5">
            {HOURS.map((h) => (
              <button
                type="button"
                key={h}
                onClick={() => set(h, cur.min ?? 0, cur.ampm)}
                className={cn(
                  "px-2 py-1.5 rounded-md text-sm text-center shrink-0 transition-colors",
                  cur.h12 === h ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-secondary text-foreground"
                )}
              >
                {h}
              </button>
            ))}
          </div>
          <div className="h-44 w-14 overflow-y-auto flex flex-col gap-0.5">
            {MINUTES.map((m) => (
              <button
                type="button"
                key={m}
                onClick={() => set(cur.h12 ?? 12, m, cur.ampm)}
                className={cn(
                  "px-2 py-1.5 rounded-md text-sm text-center shrink-0 transition-colors",
                  cur.min === m ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-secondary text-foreground"
                )}
              >
                {String(m).padStart(2, "0")}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-0.5">
            {(["AM", "PM"] as const).map((a) => (
              <button
                type="button"
                key={a}
                onClick={() => set(cur.h12 ?? 12, cur.min ?? 0, a)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm text-center shrink-0 transition-colors",
                  cur.ampm === a ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-secondary text-foreground"
                )}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TimeField;
