import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import { Button } from './ui/button';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'States', path: '/states' },
  { name: 'Culture', path: '/culture' },
  { name: 'Tourism', path: '/tourism' },
  { name: 'Gallery', path: '/view-gallery' },
  { name: 'Explore', path: '/explore' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <span className="text-xl md:text-2xl font-heading font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              Klassygo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/4" />
              </Link>
            ))}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="outline" size="lg">
              <Link to="/login">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/register">
                <UserPlus className="w-4 h-4 mr-2" />
                Register
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ${
            isOpen ? 'max-h-[80vh] overflow-y-auto pb-6' : 'max-h-0 overflow-hidden'
          }`}
        >
          <div className="flex flex-col gap-2 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-lg transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 px-4 space-y-2">
              <Button asChild variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                <Link to="/login">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full" onClick={() => setIsOpen(false)}>
                <Link to="/register">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
