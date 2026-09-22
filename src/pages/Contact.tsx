import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, CalendarCheck, ArrowRight, Car, Map } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("Name", formData.name);
      fd.append("email", formData.email);
      fd.append("Phone", formData.phone);
      fd.append("Message", formData.message);
      fd.append("_subject", "New Contact Message — AMD Express Transportation");
      const res = await fetch("https://formspree.io/f/mdekgbna", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("send_failed");
      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
    } catch {
      toast({
        title: "Couldn't send just now",
        description: "Please call us at (469) 934-2087.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: "(469) 934-2087",
      description: "Call us anytime, 24/7",
      href: null,
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@amdexpresstransportation.com",
      description: "We respond within hours",
      href: "mailto:info@amdexpresstransportation.com",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Texas",
      description: "Serving all of TX",
      href: null,
    },
    {
      icon: Clock,
      title: "Scheduling Hours",
      value: "24/7 Available",
      description: "Book anytime",
      href: null,
    },
    {
      icon: Car,
      title: "Driving Hours",
      value: "24/7 Service",
      description: "Rides around the clock",
      href: null,
    },
    {
      icon: Map,
      title: "Service Area",
      value: "All of Texas",
      description: "Statewide coverage",
      href: null,
    },
  ];

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
              Contact Us
            </motion.span>
            <motion.h1 
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              className="text-base md:text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              Have a question or need assistance? We're here to help 24/7.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto items-start">
            {/* Left - Info */}
            <ScrollReveal direction="left" duration={0.9}>
              <div className="space-y-6">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
                    Reach Out
                  </span>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
                    We're Here to Help
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Whether you have questions about our services, need help scheduling, or want to discuss your transportation needs, we're just a call or message away.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-heading text-lg font-semibold text-foreground">Quick Contact</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="cta" size="default" className="flex-1" asChild>
                      <a href="tel:+14699342087">
                        <Phone className="w-4 h-4" />
                        Call Now
                      </a>
                    </Button>
                    <Button variant="outline" size="default" className="flex-1" asChild>
                      <a href="mailto:info@amdexpresstransportation.com">
                        <Mail className="w-4 h-4" />
                        Email Us
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Looking to book CTA - Made bigger */}
                <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                    Looking to Book a Ride?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    For the fastest service, use our online booking form to request your transportation.
                  </p>
                  <Button variant="cta" size="lg" asChild>
                    <Link to="/booking">
                      Go to Booking Form
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {/* Right - Form */}
            <ScrollReveal direction="right" delay={0.15} duration={0.9}>
              <div className="bg-card rounded-2xl p-5 md:p-6 border border-border shadow-lg">
                <h2 className="font-heading text-xl font-bold text-foreground mb-5">
                  Send Us a Message
                </h2>

                {isSubmitted ? (
                  <motion.div 
                    className="text-center py-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mx-auto mb-3">
                      <CheckCircle className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      Thank you for reaching out. We'll get back to you shortly.
                    </p>
                    <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-xs">Your Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-xs">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="(469) 934-2087"
                          value={formData.phone}
                          onChange={handleChange}
                          className="h-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-10"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-xs">Your Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="cta"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Info Grid - Moved below form */}
      <section className="py-10 md:py-14 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {contactInfo.map((item, index) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">{item.title}</p>
                    {item.href ? (
                      <a 
                        href={item.href} 
                        className="font-semibold text-sm text-foreground hover:text-primary transition-colors break-words block"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-sm text-foreground">{item.value}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Contact;
