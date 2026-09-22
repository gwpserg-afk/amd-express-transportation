import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Stethoscope, 
  Heart, 
  Building2, 
  Accessibility, 
  HandHeart, 
  MapPin,
  Check,
  Phone,
  Calendar,
  HelpCircle,
  Activity,
  Truck
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  {
    icon: Stethoscope,
    title: "Non-Emergency Medical Transportation",
    shortTitle: "NEMT Services",
    description: "Safe, reliable transportation for patients who need to travel to medical appointments. We handle routine check-ups, specialty care, and follow-up visits.",
    features: [
      "Door-to-door service",
      "Comfortable vehicles",
      "Trained drivers",
      "On-time arrival",
    ],
  },
  {
    icon: Heart,
    title: "Dialysis Transportation",
    shortTitle: "Dialysis Transport",
    description: "Specialized service for dialysis patients requiring regular, consistent rides to treatment. We understand your unique needs.",
    features: [
      "Recurring scheduled pickups",
      "Flexible for treatment delays",
      "Consistent drivers",
      "Door-through-door assistance",
    ],
  },
  {
    icon: Building2,
    title: "Hospital & Doctor Appointments",
    shortTitle: "Medical Appointments",
    description: "Reliable transportation to hospitals, clinics, and medical offices. Whether routine check-up or hospital discharge.",
    features: [
      "Hospital discharge transport",
      "Specialist appointments",
      "Wait-and-return service",
      "Same-day when possible",
    ],
  },
  {
    icon: Accessibility,
    title: "Wheelchair Transportation",
    shortTitle: "Wheelchair Transport",
    description: "Wheelchair-accessible vehicles with ramps and secure restraints. Drivers trained in wheelchair handling.",
    features: [
      "ADA-compliant vehicles",
      "Wheelchair ramps and lifts",
      "Secure restraints",
      "Various wheelchair sizes",
    ],
  },
  {
    icon: HandHeart,
    title: "Assisted Transportation",
    shortTitle: "Assisted Transport",
    description: "Extra care for patients needing help getting in/out of vehicles. Our caring drivers provide support throughout.",
    features: [
      "Door-through-door service",
      "Walking assistance",
      "Help with equipment",
      "Patient drivers",
    ],
  },
  {
    icon: MapPin,
    title: "Long-Distance Medical Transport",
    shortTitle: "Long-Distance",
    description: "Comfortable transportation for appointments outside your area. Safe travel to specialty care centers.",
    features: [
      "Out-of-town facilities",
      "Specialty care transport",
      "Comfortable vehicles",
      "All-TX coverage",
    ],
  },
  {
    icon: Activity,
    title: "Physical Therapy & Rehab",
    shortTitle: "PT & Rehab",
    description: "Regular transportation to physical therapy and rehabilitation. We support your healing journey.",
    features: [
      "Recurring scheduling",
      "Post-surgery rehab",
      "PT clinic rides",
      "Flexible schedules",
    ],
  },
  {
    icon: Truck,
    title: "Facility-to-Facility Transport",
    shortTitle: "Facility Transfer",
    description: "Safe transportation between healthcare facilities including nursing homes and hospitals.",
    features: [
      "Nursing home transfers",
      "Hospital-to-facility",
      "Coordinated scheduling",
      "Equipment accommodation",
    ],
  },
];

const faqs = [
  {
    question: "What areas do you serve?",
    answer: "We proudly serve all of Texas. Contact us to confirm service to your specific location.",
  },
  {
    question: "How do I schedule a ride?",
    answer: "You can schedule by calling us, filling out our online booking form, or emailing info@amdexpresstransportation.com. We recommend booking 24-48 hours in advance.",
  },
  {
    question: "Do you accept insurance?",
    answer: "We work with various insurance providers and handle auto claim/work comp transportation. Contact us to verify coverage.",
  },
  {
    question: "What if I need to cancel or reschedule?",
    answer: "We understand plans change. Please give us as much notice as possible. Call us directly to make changes.",
  },
  {
    question: "Can a family member ride along?",
    answer: "Yes! We allow one companion at no extra charge. Please let us know when booking.",
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span 
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Our Services
            </motion.span>
            <motion.h1 
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              Comprehensive Medical Transportation
            </motion.h1>
            <motion.p 
              className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              Full range of non-emergency medical transportation services to meet your healthcare needs.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="py-4 bg-card border-y border-border sticky top-16 md:top-20 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {services.map((service) => (
              <a
                key={service.shortTitle}
                href={`#${service.shortTitle.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-3 py-1 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-colors"
              >
                {service.shortTitle}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-12 md:space-y-16">
            {services.map((service, index) => (
              <motion.div
                id={service.shortTitle.toLowerCase().replace(/\s+/g, '-')}
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="scroll-mt-32"
              >
                <div className={`grid lg:grid-cols-2 gap-6 lg:gap-10 items-center`}>
                  <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground shadow-md">
                        <service.icon className="w-6 h-6" />
                      </div>
                      <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="cta" size="default" asChild>
                        <Link to="/booking">
                          <Calendar className="w-4 h-4" />
                          Book This Service
                        </Link>
                      </Button>
                      <Button variant="outline" size="default" asChild>
                        <a href="tel:+14699342087">
                          <Phone className="w-4 h-4" />
                          Call Now
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className={`bg-card rounded-xl p-5 border border-border shadow-sm ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <h3 className="font-heading text-base font-semibold text-foreground mb-4">
                      Service Features
                    </h3>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 flex-shrink-0">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-sm">
                Common questions about our services.
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <AccordionItem 
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-xl px-5 shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-4 text-sm">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4 text-sm">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-3">
              Ready to Book Your Transportation?
            </h2>
            <p className="text-primary-foreground/90 mb-6 max-w-xl mx-auto">
              Contact us today to schedule your ride or learn more about how we can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
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
          </motion.div>
        </div>
      </section>

    </Layout>
  );
};

export default Services;
