import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateFieldProps {
  value: string; // "yyyy-MM-dd"
  onChange: (value: string) => void;
  placeholder?: string;
}

const DateField = ({ value, onChange, placeholder = "Select date" }: DateFieldProps) => {
  const date = value ? new Date(value + "T00:00:00") : undefined;
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn("h-10 w-full justify-start font-normal", !date && "text-muted-foreground")}
        >
          <CalendarDays className="w-4 h-4 mr-2 text-primary shrink-0" />
          {date ? format(date, "EEE, MMM d, yyyy") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => d && onChange(format(d, "yyyy-MM-dd"))}
          disabled={{ before: startOfToday }}
          defaultMonth={date}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateField;
