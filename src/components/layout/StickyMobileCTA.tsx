import { Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StickyMobileCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-lg border-t border-border p-3 safe-area-inset-bottom">
      <div className="flex gap-2">
        <Button 
          variant="cta" 
          size="lg" 
          className="flex-1 h-12 text-sm font-semibold"
          asChild
        >
          <a href="tel:+14699342087">
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="flex-1 h-12 text-sm font-semibold"
          asChild
        >
          <Link to="/booking">
            <Calendar className="w-4 h-4" />
            Book a Ride
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
