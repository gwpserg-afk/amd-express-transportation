import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { suggestAddresses } from "@/lib/mapbox";

interface Suggestion {
  label: string;
  lng: number;
  lat: number;
}

interface AddressAutocompleteProps {
  id: string;
  name: string;
  placeholder?: string;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
  onSelect?: (s: Suggestion) => void;
}

const AddressAutocomplete = ({
  id,
  name,
  placeholder,
  value,
  required,
  onChange,
  onSelect,
}: AddressAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const boxRef = useRef<HTMLDivElement>(null);
  const debounce = useRef<ReturnType<typeof setTimeout>>();
  const skipNext = useRef(false);

  useEffect(() => {
    if (skipNext.current) {
      skipNext.current = false;
      return;
    }
    if (debounce.current) clearTimeout(debounce.current);
    if (!value || value.trim().length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    debounce.current = setTimeout(async () => {
      const s = await suggestAddresses(value);
      setSuggestions(s);
      setOpen(s.length > 0);
      setActive(-1);
    }, 250);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const choose = (s: Suggestion) => {
    skipNext.current = true;
    onChange(s.label);
    onSelect?.(s);
    setSuggestions([]);
    setOpen(false);
  };

  return (
    <div ref={boxRef} className="relative">
      <Input
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        required={required}
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        onKeyDown={(e) => {
          if (!open) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => Math.min(a + 1, suggestions.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
          } else if (e.key === "Enter" && active >= 0) {
            e.preventDefault();
            choose(suggestions[active]);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className="h-10"
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-popover border border-border rounded-lg shadow-lg max-h-60 overflow-auto py-1">
          {suggestions.map((s, i) => (
            <li
              key={`${s.lng},${s.lat},${i}`}
              onMouseDown={(e) => {
                e.preventDefault();
                choose(s);
              }}
              onMouseEnter={() => setActive(i)}
              className={cn(
                "flex items-start gap-2 px-3 py-2 text-sm cursor-pointer",
                i === active ? "bg-secondary" : "hover:bg-secondary/60"
              )}
            >
              <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span className="text-foreground">{s.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
