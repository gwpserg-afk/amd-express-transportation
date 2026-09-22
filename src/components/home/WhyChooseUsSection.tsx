import { DollarSign, Clock, UserCheck } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerChildren, { StaggerItem } from "@/components/animations/StaggerChildren";

const features = [
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "No hidden fees. Clear, upfront pricing based on your trip details.",
  },
  {
    icon: Clock,
    title: "On-Time Service",
    description: "We understand punctuality for medical appointments. Count on us.",
  },
  {
    icon: UserCheck,
    title: "Professional Drivers",
    description: "Trained, background-checked drivers committed to your comfort.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-10 md:py-14 bg-secondary/30">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
            Why Choose Us
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
            The AMD Express Difference
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            We're committed to providing the best medical transportation experience in Texas.
          </p>
        </ScrollReveal>

        <StaggerChildren className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="bg-card rounded-xl p-5 border border-border text-center hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground mx-auto mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
