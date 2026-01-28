import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const footerLinks = {
  explore: [
    { name: 'States', path: '/states' },
    { name: 'Festivals', path: '/festivals' },
    { name: 'Culture', path: '/culture' },
    { name: 'Tourism', path: '/tourism' },
    { name: 'Gallery', path: '/view-gallery' },
    { name: 'Dances', path: '/dances' },
    { name: 'Food', path: '/food' },
  ],
  about: [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Use', path: '/terms' },
  ],
};

const Footer = () => {
  return (
    <footer className="relative z-20 border-t border-border/30 bg-background-dark/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-heading font-bold text-foreground">
                Klassygo
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md mb-6 leading-relaxed">
              Your comprehensive guide to exploring the diverse landscapes, 
              rich culture, and timeless traditions of incredible India.
            </p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DiscoverIndia. All rights reserved.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold text-foreground mb-4">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold text-foreground mb-4">
              About
            </h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> for India
          </p>
          <p className="text-sm text-muted-foreground">
            An informational platform celebrating India's heritage
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
