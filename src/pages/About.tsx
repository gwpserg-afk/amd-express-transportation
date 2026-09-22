import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Heart, 
  Users, 
  Target, 
  CalendarCheck, 
  ArrowRight,
  Phone,
  CheckCircle,
  Clock,
  MapPin,
  UserCheck,
  Headphones
} from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerChildren, { StaggerItem } from "@/components/animations/StaggerChildren";

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Every ride follows the highest safety standards. Vehicles regularly inspected.",
  },
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "We treat every patient like family with patience and respect.",
  },
  {
    icon: Users,
    title: "Professional Team",
    description: "All drivers are background-checked and professionally trained.",
  },
  {
    icon: Target,
    title: "Reliability",
    description: "Punctual service for every appointment. On-time, every time.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Schedule Your Ride",
    description: "Call us, book online, or email to schedule.",
  },
  {
    number: "02",
    title: "We Confirm Details",
    description: "We'll contact you to confirm everything.",
  },
  {
    number: "03",
    title: "Driver Arrives",
    description: "Professional driver arrives on time.",
  },
  {
    number: "04",
    title: "Safe Transportation",
    description: "Comfortable ride to your appointment.",
  },
];

const stats = [
  { value: "24/7", label: "Service Availability" },
  { value: "100%", label: "Fully Insured" },
  { value: "All TX", label: "Service Coverage" },
  { value: "5★", label: "Patient Rating" },
];

const About = () => {
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
              About Us
            </motion.span>
            <motion.h1 
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              Your Trusted Partner in Medical Transportation
            </motion.h1>
            <motion.p 
              className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              AMD Express Transportation provides safe, reliable non-emergency medical transportation across the Dallas-Fort Worth metroplex.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-6 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-0.5">
                  {stat.value}
                </p>
                <p className="text-xs text-primary-foreground/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
            <ScrollReveal direction="left" duration={0.9}>
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  Our Mission
                </span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                  Ensuring Access to Healthcare for Everyone
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  At AMD Express Transportation, we believe everyone deserves reliable, dignified medical transportation. No one should miss a medical appointment due to lack of transportation.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  We serve seniors, individuals with disabilities, dialysis patients, and anyone needing assistance getting to healthcare appointments.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button variant="cta" size="default" asChild>
                    <Link to="/booking">
                      Book a Ride
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="default" asChild>
                    <a href="tel:+14699342087">
                      <Phone className="w-4 h-4" />
                      Call Us
                    </a>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.15} duration={0.9}>
              <div className="bg-card rounded-xl p-5 border border-border shadow-md">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">
                  What Sets Us Apart
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: Clock, title: "24/7 Availability", desc: "Round-the-clock service" },
                    { icon: Shield, title: "Fully Insured", desc: "Complete peace of mind" },
                    { icon: UserCheck, title: "Professional Drivers", desc: "Trained and caring" },
                    { icon: Headphones, title: "Dedicated Support", desc: "Always here to help" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-8" duration={0.8}>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
              Our Values
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
              What Guides Us Every Day
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              These principles guide everything we do at AMD Express Transportation.
            </p>
          </ScrollReveal>

          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="bg-card rounded-xl p-5 border border-border h-full hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10 mb-4">
                    <value.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-8" duration={0.8}>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
              How It Works
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
              Simple, Stress-Free Scheduling
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Getting your medical transportation is easy.
            </p>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-card rounded-xl p-5 border border-border h-full text-center">
                    <span className="font-heading text-3xl font-bold text-primary/20 mb-2 block">
                      {step.number}
                    </span>
                    <h3 className="font-heading text-sm font-semibold text-foreground mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-4 h-4 text-primary/30" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <ScrollReveal direction="left">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
                  Service Area
                </span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Proudly Serving All of Texas
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Based in Texas, we provide medical transportation services throughout the entire state.
                </p>
                <div className="space-y-2 mb-4">
                  {[
                    "Northern Texas",
                    "Central Texas",
                    "Southern Texas",
                    "All counties covered",
                  ].map((area) => (
                    <div key={area} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{area}</span>
                    </div>
                  ))}
                </div>
                <Button variant="cta" size="default" asChild>
                  <a href="tel:+14699342087">
                    <Phone className="w-4 h-4" />
                    Call to Confirm Your Area
                  </a>
                </Button>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.15}>
                <div className="bg-card rounded-xl p-5 border border-border shadow-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary text-primary-foreground">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-foreground">Our Information</h3>
                      <p className="text-xs text-muted-foreground">Texas</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">(469) 934-2087</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">24/7 Scheduling & Driving</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center max-w-2xl mx-auto" duration={0.8}>
            <CalendarCheck className="w-12 h-12 text-primary-foreground mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-3">
              Ready to Book Your Ride?
            </h2>
            <p className="text-primary-foreground/90 mb-6">
              Experience our professional, reliable medical transportation service.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                size="lg" 
                asChild
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <Link to="/booking">
                  Book Transportation
                  <ArrowRight className="w-4 h-4" />
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

    </Layout>
  );
};

export default About;
