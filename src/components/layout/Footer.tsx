import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import bmsLogo from "@/assets/bms-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-secondary pb-24 md:pb-0">
      <div className="container mx-auto py-12 md:py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="inline-flex bg-white rounded-xl px-4 py-3 shadow-sm">
              <img src={bmsLogo} alt="AMD Express Transportation" className="h-12 w-auto" />
            </span>
            <p className="text-muted-foreground leading-relaxed max-w-sm text-sm">
              Providing reliable, safe, and compassionate non-emergency medical transportation services across the Dallas-Fort Worth metroplex. Available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="cta" size="default" asChild>
                <a href="tel:+14699342087">
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </Button>
              <Button variant="outline" size="default" asChild>
                <Link to="/booking">
                  Book a Ride
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-base mb-4 text-secondary">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Home
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </Link>
              <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Our Services
              </Link>
              <Link to="/booking" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Book a Ride
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Contact
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-base mb-4 text-secondary">Services</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/services#nemt-services" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                NEMT Services
              </Link>
              <Link to="/services#dialysis-transport" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Dialysis Transportation
              </Link>
              <Link to="/services#wheelchair-transport" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Wheelchair Transport
              </Link>
              <Link to="/services#medical-appointments" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Medical Appointments
              </Link>
              <Link to="/services#long-distance" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Long-Distance Transport
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-base mb-4 text-secondary">Contact Us</h3>
            <div className="space-y-3">
              <a href="tel:+14699342087" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group text-sm">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span>(469) 934-2087</span>
              </a>
              <a href="mailto:info@amdexpresstransportation.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group text-sm">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="break-all">info@amdexpresstransportation.com</span>
              </a>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span>Texas</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <span>24/7 Availability</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-charcoal-light mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-muted-foreground text-xs">
              © {currentYear} AMD Express Transportation. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors text-xs">
                Privacy Policy
              </Link>
              <Link to="/safety-policy" className="text-muted-foreground hover:text-primary transition-colors text-xs">
                Safety Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
