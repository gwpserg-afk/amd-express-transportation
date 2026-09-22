import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Shield, Award, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroVideo from "@/assets/hero-video.mp4";
import heroPoster from "@/assets/hero-poster.jpg";

const HeroSection = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const trustBadges = [
    { icon: Shield, label: "Licensed & Insured" },
    { icon: Award, label: "Professional Drivers" },
    { icon: Clock, label: "24/7 Available" },
  ];

  const quickBenefits = [
    "On-time pickups guaranteed",
    "Wheelchair accessible vehicles",
    "Friendly, trained drivers",
    "Insurance & Work Comp support",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative bg-gradient-hero overflow-hidden">
      {/* Background Video (Desktop only) */}
      <div className="absolute inset-0 hidden lg:block">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={heroPoster}
          onCanPlayThrough={() => setIsReady(true)}
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
      </div>

      <div className="container mx-auto px-4 py-10 md:py-16 lg:py-20 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isReady ? "visible" : "hidden"}
        >
          {/* Left Content */}
          <div className="space-y-5 lg:space-y-6 text-center lg:text-left">
            <motion.div className="space-y-3" variants={itemVariants}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                Dallas-Fort Worth's Trusted NEMT Provider
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Safe & <span className="text-primary">Reliable</span> Medical Transportation
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Professional non-emergency medical transportation services across the Dallas-Fort Worth metroplex. 
                Comfortable rides with caring, trained drivers.
              </p>
            </motion.div>

            {/* Quick Benefits */}
            <motion.div variants={itemVariants} className="hidden md:block">
              <div className="grid grid-cols-2 gap-2">
                {quickBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <Button variant="cta" size="lg" className="text-base px-6" asChild>
                <a href="tel:+14699342087">
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </Button>
              <Button variant="outline" size="lg" className="text-base px-6" asChild>
                <Link to="/booking">Book a Ride</Link>
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2"
              variants={itemVariants}
            >
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg border border-border shadow-sm">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10">
                    <badge.icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-foreground">{badge.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Video */}
          <motion.div variants={itemVariants}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <video
                src={heroVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
          poster={heroPoster}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
