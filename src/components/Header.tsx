import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/vertex.png";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Work", path: "/work" },
    { name: "Prompt Kit", path: "/prompt-kit" },
    { name: "Pricing", path: "/pricing" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 transition-transform hover:scale-105">
          <img src={logo} alt="Vectorax AI" className="h-16 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isActive(link.path) ? "text-accent" : "text-foreground/80"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button asChild className="hidden md:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all">
            <Link to="/auth">Get Started</Link>
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background animate-slide-in">
          <nav className="container flex flex-col space-y-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isActive(link.path) ? "text-accent" : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
