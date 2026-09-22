import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Phone, Clock, Shield, Users, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import BookingFormWidget from "@/components/booking/BookingFormWidget";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Booking = () => {
  const features = [
    { icon: Clock, label: "24/7 Service" },
    { icon: Shield, label: "Fully Insured" },
    { icon: Users, label: "Professional Drivers" },
  ];

  const faqs = [
    {
      question: "How far in advance should I book?",
      answer: "We recommend 24-48 hours in advance. However, we also accommodate same-day requests when possible.",
    },
    {
      question: "What types of vehicles do you have?",
      answer: "Our fleet includes wheelchair-accessible vehicles with ramps and sedans for ambulatory patients.",
    },
    {
      question: "Do you provide door-to-door service?",
      answer: "Yes! We provide door-to-door and door-through-door service with assistance for mobility equipment.",
    },
    {
      question: "What information do I need to book?",
      answer: "Pickup/drop-off addresses, appointment date/time, mobility type, and contact info. For work comp, you'll need a demographic sheet.",
    },
    {
      question: "What if my appointment runs late?",
      answer: "Just let us know if there's a delay, and we'll adjust your return pickup time.",
    },
    {
      question: "Do you accept insurance?",
      answer: "We work with various insurance providers and handle auto claim/work comp transportation.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-10 md:py-14 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
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
              Book a Ride
            </motion.span>
            <motion.h1 
              className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              Schedule Your Transportation
            </motion.h1>
            <motion.p 
              className="text-muted-foreground mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              Complete the form below. We'll confirm within minutes.
            </motion.p>
            
            {/* Trust Features */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.label} 
                  className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border shadow-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10">
                    <feature.icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-foreground">{feature.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-10 md:py-14 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <BookingFormWidget variant="full" />

            {/* Call Option */}
            <div className="text-center mt-6">
              <p className="text-muted-foreground text-sm mb-3">Prefer to speak with someone?</p>
              <Button variant="outline" size="default" asChild>
                <a href="tel:+14699342087">
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-background">
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
                Everything you need to know about booking.
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

    </Layout>
  );
};

export default Booking;
