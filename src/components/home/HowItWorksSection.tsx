import { Phone, MessageSquare, Car, Smile, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";

const steps = [
  {
    icon: Phone,
    number: "01",
    title: "Book Your Ride",
    description: "Call us or use our online booking form.",
  },
  {
    icon: MessageSquare,
    number: "02",
    title: "We Confirm",
    description: "We'll contact you to confirm all details.",
  },
  {
    icon: Car,
    number: "03",
    title: "Driver Arrives",
    description: "Professional driver arrives on time.",
  },
  {
    icon: Smile,
    number: "04",
    title: "Safe Ride",
    description: "Enjoy a comfortable ride to your appointment.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
            How It Works
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
            Simple, Stress-Free Booking
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Getting your medical transportation is easy. Here's what to expect.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative"
            >
              <div className="bg-card rounded-xl p-5 border border-border h-full text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-3xl font-bold text-primary/20 block mb-2">{step.number}</span>
                <h3 className="font-heading text-base font-semibold text-foreground mb-1">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-4 h-4 text-primary/30" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
