import { Link } from "react-router-dom";
import { Stethoscope, Heart, Accessibility, HandHeart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerChildren, { StaggerItem } from "@/components/animations/StaggerChildren";

const services = [
  {
    icon: Stethoscope,
    title: "NEMT Services",
    description: "Safe, reliable transportation for medical check-ins and appointments.",
  },
  {
    icon: Heart,
    title: "Dialysis Transportation",
    description: "Specialized recurring transportation for dialysis patients.",
  },
  {
    icon: Accessibility,
    title: "Wheelchair Transport",
    description: "Accessible vehicles with trained drivers for wheelchair users.",
  },
  {
    icon: HandHeart,
    title: "Assisted Transport",
    description: "Extra care for patients needing mobility assistance.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
            Our Services
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
            How Can We Help You?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Comprehensive non-emergency medical transportation services across the Dallas-Fort Worth metroplex.
          </p>
        </ScrollReveal>

        <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-6">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <div className="bg-card rounded-xl p-5 border border-border h-full hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 mb-4">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground mb-1.5">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <ScrollReveal delay={0.3} className="text-center">
          <Button variant="outline" asChild>
            <Link to="/services">
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ServicesSection;
