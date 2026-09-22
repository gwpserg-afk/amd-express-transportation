import { MapPin, Mail, Phone, Clock, Car, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { motion } from "framer-motion";

const contactCards = [
  {
    icon: MapPin,
    title: "Location",
    value: "Texas",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@amdexpresstransportation.com",
    href: "mailto:info@amdexpresstransportation.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "(469) 934-2087",
    href: null,
  },
  {
    icon: Clock,
    title: "Scheduling Hours",
    value: "24/7 — Fast Confirmation",
  },
  {
    icon: Car,
    title: "Driving Hours",
    value: "24/7",
  },
  {
    icon: Map,
    title: "Service Area",
    value: "All across the Dallas-Fort Worth metroplex",
  },
];

const ContactAvailabilitySection = () => {
  return (
    <section className="py-10 md:py-14 bg-secondary/50">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
            Contact & Availability
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </ScrollReveal>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
          {contactCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-card rounded-xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 flex-shrink-0">
                  <card.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">{card.title}</p>
                  {card.href ? (
                    <a
                      href={card.href}
                      className="font-semibold text-sm text-foreground hover:text-primary transition-colors break-words"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <p className="font-semibold text-sm text-foreground">{card.value}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <ScrollReveal delay={0.3} className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <Button variant="cta" size="lg" asChild>
            <a href="tel:+14699342087">
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="mailto:info@amdexpresstransportation.com">
              <Mail className="w-4 h-4" />
              Email Us
            </a>
          </Button>
        </ScrollReveal>

        {/* Description Text */}
        <ScrollReveal delay={0.4} className="text-center max-w-2xl mx-auto">
          <p className="text-muted-foreground text-sm leading-relaxed">
            Scheduling and transportation are available 24/7. We respond to calls and emails promptly, 
            and rides are provided based on request and availability. We're here to assist with scheduling, 
            questions, or last-minute rides whenever you need us.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactAvailabilitySection;
