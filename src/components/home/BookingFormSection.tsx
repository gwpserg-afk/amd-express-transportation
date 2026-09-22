import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Send, CheckCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "@/components/animations/ScrollReveal";
import BookingFormWidget from "@/components/booking/BookingFormWidget";

const BookingFormSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background" id="book-ride">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Book a Ride
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Request Your Transportation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fill out the form below and we'll get back to you within minutes to confirm your ride.
          </p>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto">
          <BookingFormWidget variant="full" />

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">Prefer to call?</p>
            <Button variant="outline" size="lg" asChild>
              <a href="tel:+14699342087">
                <Phone className="w-5 h-5" />
                (469) 934-2087
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingFormSection;
