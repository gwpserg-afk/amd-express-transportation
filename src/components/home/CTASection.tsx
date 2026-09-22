import { Link } from "react-router-dom";
import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/animations/ScrollReveal";

const CTASection = () => {
  return (
    <section className="py-12 md:py-16 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 md:w-64 h-32 md:h-64 rounded-full bg-primary-foreground blur-3xl" />
        <div className="absolute bottom-0 right-0 w-48 md:w-96 h-48 md:h-96 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal className="text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-3">
            Ready to Book Your Ride?
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/90 mb-6">
            Experience reliable, compassionate medical transportation. Schedule your ride today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              size="lg" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              asChild
            >
              <Link to="/booking">
                <Calendar className="w-4 h-4" />
                Book a Ride
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="tel:+14699342087">
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTASection;
