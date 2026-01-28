import { Button } from './ui/button';
import { ArrowRight, MapPin, Sparkles, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-dark/50 via-transparent to-background z-10 pointer-events-none" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 border border-foreground/20 mb-8 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Your Gateway to India's Rich Heritage
            </span>
          </div>

          {/* Main Title */}
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 leading-tight opacity-0 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            Experience the{' '}
            <span className="text-gradient-gold">
              Magic
            </span>
            {' '}of{' '}
            <br className="hidden md:block" />
            <span className="text-gradient-gold">
              Incredible India
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            Discover a land of timeless traditions, vibrant festivals, ancient temples, 
            and diverse cultures spanning thousands of years. From the snow-capped Himalayas 
            to the tropical beaches of Kerala.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            <Link to="/states">
              <Button variant="hero" size="xl" className="group">
                <MapPin className="w-5 h-5" />
                Explore States
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/culture">
              <Button variant="heroOutline" size="xl">
                Discover Culture
              </Button>
            </Link>
            <Link to="/language-converter">
              <Button variant="heroOutline" size="xl" className="group">
                <Languages className="w-5 h-5 mr-2" />
                Language Converter
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.8s' }}
          >
            {[
              { value: '29+', label: 'States' },
              { value: '22+', label: 'Languages' },
              { value: '3000+', label: 'Years of History' },
              { value: '∞', label: 'Experiences' },
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="glass-card p-4 md:p-6 rounded-xl text-center hover-glow"
              >
                <div className="text-2xl md:text-3xl font-heading font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
