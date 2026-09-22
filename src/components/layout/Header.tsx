import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import bmsLogo from "@/assets/bms-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Book a Ride", path: "/booking" },
    { name: "Contact", path: "/contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Safety Policy", path: "/safety-policy" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="w-full pl-0 pr-8 lg:pr-16">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src={bmsLogo} alt="AMD Express Transportation" className="h-11 md:h-14 lg:h-16 w-auto ml-4 lg:ml-8" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                  isActive(link.path) ? "text-primary" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Legal Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLegalOpen(!isLegalOpen)}
                onBlur={() => setTimeout(() => setIsLegalOpen(false), 150)}
                className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Legal
                <ChevronDown className={`w-4 h-4 transition-transform ${isLegalOpen ? 'rotate-180' : ''}`} />
              </button>
              {isLegalOpen && (
                <div className="absolute top-full right-0 mt-2 bg-background border border-border rounded-lg shadow-lg py-2 min-w-[180px] z-50">
                  {legalLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsLegalOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors hover:bg-secondary ${
                        isActive(link.path) ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <Button variant="outline" size="default" asChild>
              <a href="tel:+14699342087">
                <Phone className="w-4 h-4" />
                <span className="hidden lg:inline">(469) 934-2087</span>
                <span className="lg:hidden">Call</span>
              </a>
            </Button>
            <Button variant="cta" size="default" asChild>
              <Link to="/booking">Book a Ride</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Legal Section in Mobile */}
              <div className="border-t border-border mt-2 pt-2">
                <span className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Legal
                </span>
                {legalLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 text-base font-medium rounded-lg transition-colors block ${
                      isActive(link.path)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-2 mt-4 px-4">
                <Button variant="cta" size="lg" className="w-full justify-center" asChild>
                  <a href="tel:+14699342087">
                    <Phone className="w-4 h-4" />
                    Call (469) 934-2087
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="w-full justify-center" asChild>
                  <Link to="/booking" onClick={() => setIsMenuOpen(false)}>
                    Book a Ride
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
