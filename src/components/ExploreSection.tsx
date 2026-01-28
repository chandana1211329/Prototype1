import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: 'Interactive Map',
    description: 'Explore India\'s 29 states and 8 union territories with our interactive map. Click any state to discover its unique culture and attractions.',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop',
    link: '/explore',
    color: 'from-blue-500/40',
  },
  {
    title: 'Vibrant Festivals',
    description: 'Experience Diwali, Holi, Durga Puja, and countless celebrations of life.',
    image: 'https://images.unsplash.com/photo-1604422091854-1a5a9ee1b115?w=600&h=400&fit=crop',
    link: '/festivals',
    color: 'from-rose-500/40',
  },
  {
    title: 'Traditional Dances',
    description: 'From Bharatanatyam to Kathak, discover India\'s classical dance heritage.',
    image: 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=600&h=400&fit=crop',
    link: '/dances',
    color: 'from-purple-500/40',
  },
  {
    title: 'Culinary Journey',
    description: 'Savor the spices, sweets, and street food that define Indian cuisine.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop',
    link: '/food',
    color: 'from-orange-500/40',
  },
];

const ExploreSection = () => {
  return (
    <section className="section-padding relative z-20 bg-background-dark/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
            Start Your Journey
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            What Would You Like to{' '}
            <span className="text-gradient-gold">Explore?</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Choose your path and dive deep into the wonders of India. 
            Every category opens a new chapter of discovery.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              to={category.link}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-[16/10]"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${category.color} via-background/60 to-transparent opacity-90`} />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  {category.description}
                </p>
                <div className="flex items-center gap-2 text-primary font-medium">
                  <span>Explore Now</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-primary/0 rounded-2xl transition-all duration-300 group-hover:border-primary/50" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
