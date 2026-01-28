import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const states = [
  {
    name: 'Rajasthan',
    capital: 'Jaipur',
    description: 'Land of kings, known for its palaces, forts, and vibrant culture.',
    highlights: ['Thar Desert', 'Palaces of Jaipur', 'Pushkar Fair', 'Udaipur Lakes'],
    image: 'https://images.unsplash.com/photo-1524492442991-9b91594160ee?w=600&h=400&fit=crop',
    color: 'from-orange-500/40'
  },
  {
    name: 'Kerala',
    capital: 'Thiruvananthapuram',
    description: 'God\'s own country, famous for backwaters, beaches, and Ayurveda.',
    highlights: ['Backwaters', 'Beaches', 'Tea Plantations', 'Kathakali'],
    image: 'https://images.unsplash.com/photo-1604537466158-719b1975feb5?w=600&h=400&fit=crop',
    color: 'from-green-500/40'
  },
  {
    name: 'Uttar Pradesh',
    capital: 'Lucknow',
    description: 'Heart of India, home to the Taj Mahal and rich cultural heritage.',
    highlights: ['Taj Mahal', 'Varanasi Ghats', 'Lucknow Cuisine', 'Buddhist Sites'],
    image: 'https://images.unsplash.com/photo-1524492442991-9b91594160ee?w=600&h=400&fit=crop',
    color: 'from-blue-500/40'
  },
  {
    name: 'Maharashtra',
    capital: 'Mumbai',
    description: 'Land of opportunities, from Bollywood to ancient caves.',
    highlights: ['Mumbai City', 'Ajanta Caves', 'Gateway of India', 'Mahabaleshwar'],
    image: 'https://images.unsplash.com/photo-1514212490128-7f25c04d58b9?w=600&h=400&fit=crop',
    color: 'from-purple-500/40'
  },
  {
    name: 'West Bengal',
    capital: 'Kolkata',
    description: 'Cultural capital of India, known for art, literature, and cuisine.',
    highlights: ['Kolkata Heritage', 'Sundarbans', 'Darjeeling', 'Durga Puja'],
    image: 'https://images.unsplash.com/photo-1595435934249-5f7a3cc45c8c?w=600&h=400&fit=crop',
    color: 'from-red-500/40'
  },
  {
    name: 'Tamil Nadu',
    capital: 'Chennai',
    description: 'Land of temples, classical arts, and Dravidian architecture.',
    highlights: ['Temples', 'Classical Dance', 'Hill Stations', 'Cuisine'],
    image: 'https://images.unsplash.com/photo-1596172664886-6b38b2bba7a5?w=600&h=400&fit=crop',
    color: 'from-indigo-500/40'
  }
];

const States = () => {
  return (
    <>
      <Helmet>
        <title>Indian States | Discover India</title>
        <meta 
          name="description" 
          content="Explore the diverse states of India, each with unique culture, heritage, and attractions." 
        />
        <meta name="keywords" content="Indian states, India tourism, state capitals, Indian culture" />
        <meta property="og:title" content="Indian States | Discover India" />
        <meta property="og:description" content="Explore the diverse states of India." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/states" />
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-6 lg:px-12">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Explore India's{' '}
              <span className="text-gradient-gold">29 States</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              From the Himalayas to the oceans, each state offers a unique blend of culture, 
              history, and natural beauty waiting to be discovered.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>29 States</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>1.4+ Billion People</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>5000+ Years History</span>
              </div>
            </div>
          </div>
        </section>

        {/* States Grid */}
        <section className="py-16 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {states.map((state, index) => (
                <div
                  key={state.name}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-card border border-border/30 hover:shadow-xl transition-all duration-300"
                >
                  {/* Background Image */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${state.color}`} />
                  <img
                    src={state.image}
                    alt={state.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity duration-300"
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                        {state.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Capital: {state.capital}
                      </p>
                      <p className="text-foreground/90 leading-relaxed">
                        {state.description}
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {state.highlights.map((highlight) => (
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
                        Explore {state.name}
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
              Ready to Explore More?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Dive deeper into the festivals, culture, dances, and cuisine that make each state unique.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="default" size="lg">
                <Link to="/festivals">Explore Festivals</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/culture">Discover Culture</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default States;
