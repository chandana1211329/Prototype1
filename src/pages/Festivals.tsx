import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const festivals = [
  {
    name: 'Diwali',
    description: 'Festival of lights, celebrating the victory of light over darkness.',
    when: 'October-November',
    where: 'Nationwide',
    significance: 'Victory of good over evil, light over darkness',
    highlights: ['Diya lighting', 'Fireworks', 'Sweets', 'Rangoli'],
    image: 'https://images.unsplash.com/photo-1604422091854-1a5a9ee1b115?w=600&h=400&fit=crop',
    color: 'from-orange-500/40'
  },
  {
    name: 'Holi',
    description: 'Festival of colors, celebrating love, joy, and the arrival of spring.',
    when: 'March',
    where: 'North India',
    significance: 'Celebration of love and spring',
    highlights: ['Color play', 'Music', 'Dance', 'Sweets'],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    color: 'from-pink-500/40'
  },
  {
    name: 'Durga Puja',
    description: 'Celebration of goddess Durga\'s victory over evil.',
    when: 'September-October',
    where: 'West Bengal',
    significance: 'Victory of goddess Durga over Mahishasur',
    highlights: ['Durga idols', 'Pandals', 'Cultural programs', 'Feasting'],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    color: 'from-red-500/40'
  },
  {
    name: 'Onam',
    description: 'Harvest festival celebrating the homecoming of King Mahabali.',
    when: 'August-September',
    where: 'Kerala',
    significance: 'Harvest celebration and cultural heritage',
    highlights: ['Onam Sadya', 'Snake boat race', 'Kathakali', 'Flower carpets'],
    image: 'https://images.unsplash.com/photo-1596172664886-6b38b2bba7a5?w=600&h=400&fit=crop',
    color: 'from-green-500/40'
  },
  {
    name: 'Pongal',
    description: 'Tamil harvest festival thanking the sun god for a bountiful harvest.',
    when: 'January',
    where: 'Tamil Nadu',
    significance: 'Thanksgiving for harvest',
    highlights: ['Pongal cooking', 'Kolam', 'Jallikattu', 'Sugarcane'],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    color: 'from-yellow-500/40'
  },
  {
    name: 'Navratri',
    description: 'Nine-night festival celebrating the nine forms of goddess Durga.',
    when: 'September-October',
    where: 'Gujarat, Maharashtra',
    significance: 'Worship of goddess Durga',
    highlights: ['Garba dance', 'Dandiya', 'Fasting', 'Dandiya nights'],
    image: 'https://images.unsplash.com/photo-1604422091854-1a5a9ee1b115?w=600&h=400&fit=crop',
    color: 'from-purple-500/40'
  }
];

const Festivals = () => {
  return (
    <>
      <Helmet>
        <title>Indian Festivals | Discover India</title>
        <meta 
          name="description" 
          content="Explore the vibrant festivals of India, celebrating culture, tradition, and joy throughout the year." 
        />
        <meta name="keywords" content="Indian festivals, Diwali, Holi, Durga Puja, Indian culture" />
        <meta property="og:title" content="Indian Festivals | Discover India" />
        <meta property="og:description" content="Explore India's vibrant festivals." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/festivals" />
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-6 lg:px-12">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Vibrant{' '}
              <span className="text-gradient-gold">Festivals</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Experience the joy, colors, and traditions of India's countless festivals 
              that celebrate life, culture, and spirituality throughout the year.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Year-round Celebrations</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>1000+ Festivals</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Pan India</span>
              </div>
            </div>
          </div>
        </section>

        {/* Festivals Grid */}
        <section className="py-16 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {festivals.map((festival, index) => (
                <div
                  key={festival.name}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-card border border-border/30 hover:shadow-xl transition-all duration-300"
                >
                  {/* Background Image */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${festival.color}`} />
                  <img
                    src={festival.image}
                    alt={festival.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity duration-300"
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                        {festival.name}
                      </h3>
                      <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {festival.when}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {festival.where}
                        </span>
                      </div>
                      <p className="text-foreground/90 leading-relaxed mb-3">
                        {festival.description}
                      </p>
                      <p className="text-sm text-muted-foreground italic">
                        {festival.significance}
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {festival.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium text-foreground"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                      
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full group/btn"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 lg:px-12 bg-accent/5">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Discover More Cultural Treasures
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore the rich cultural heritage, traditional dances, and diverse cuisine of India.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="default" size="lg">
                <Link to="/culture">Explore Culture</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/dances">Discover Dances</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Festivals;
