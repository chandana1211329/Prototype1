import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Music, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const dances = [
  {
    name: 'Bharatanatyam',
    origin: 'Tamil Nadu',
    description: 'Ancient classical dance form known for its grace, purity, and sculpturesque poses.',
    characteristics: ['Expressive eyes', 'Complex footwork', 'Hand gestures', 'Temple dance'],
    image: 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=600&h=400&fit=crop',
    color: 'from-red-500/40',
    difficulty: 'Advanced'
  },
  {
    name: 'Kathak',
    origin: 'Uttar Pradesh',
    description: 'Storytelling dance form that combines rhythmic footwork with expressive movements.',
    characteristics: ['Spinning movements', 'Ankle bells', 'Storytelling', 'Mughal influence'],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    color: 'from-blue-500/40',
    difficulty: 'Intermediate'
  },
  {
    name: 'Kathakali',
    origin: 'Kerala',
    description: 'Highly stylized classical dance-drama known for elaborate makeup and costumes.',
    characteristics: ['Elaborate makeup', 'Large costumes', 'Facial expressions', 'Mythological stories'],
    image: 'https://images.unsplash.com/photo-1596172664886-6b38b2bba7a5?w=600&h=400&fit=crop',
    color: 'from-green-500/40',
    difficulty: 'Advanced'
  },
  {
    name: 'Odissi',
    origin: 'Odisha',
    description: 'Graceful dance form characterized by fluid movements and tribhangi posture.',
    characteristics: ['Tribhangi pose', 'Fluid movements', 'Temple sculptures', 'Spiritual themes'],
    image: 'https://images.unsplash.com/photo-1524492442991-9b91594160ee?w=600&h=400&fit=crop',
    color: 'from-orange-500/40',
    difficulty: 'Intermediate'
  },
  {
    name: 'Bhangra',
    origin: 'Punjab',
    description: 'Vibrant folk dance celebrating the harvest season with energetic movements.',
    characteristics: ['High energy', 'Dhol beats', 'Colorful costumes', 'Celebratory'],
    image: 'https://images.unsplash.com/photo-1604422091854-1a5a9ee1b115?w=600&h=400&fit=crop',
    color: 'from-yellow-500/40',
    difficulty: 'Beginner'
  },
  {
    name: 'Garba',
    origin: 'Gujarat',
    description: 'Circular dance form performed during Navratri with rhythmic clapping and steps.',
    characteristics: ['Circular movements', 'Dandiya sticks', 'Colorful attire', 'Navratri festival'],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    color: 'from-pink-500/40',
    difficulty: 'Beginner'
  },
  {
    name: 'Manipuri',
    origin: 'Manipur',
    description: 'Gentle and graceful dance form with delicate movements and expressions.',
    characteristics: ['Delicate movements', 'Soft expressions', 'Ras Lila', 'Spiritual themes'],
    image: 'https://images.unsplash.com/photo-1596172664886-6b38b2bba7a5?w=600&h=400&fit=crop',
    color: 'from-purple-500/40',
    difficulty: 'Intermediate'
  },
  {
    name: 'Kuchipudi',
    origin: 'Andhra Pradesh',
    description: 'Classical dance form combining rapid footwork with dramatic expressions.',
    characteristics: ['Fast footwork', 'Drama elements', 'Tarangam', 'Vibrant costumes'],
    image: 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=600&h=400&fit=crop',
    color: 'from-indigo-500/40',
    difficulty: 'Advanced'
  }
];

const Dances = () => {
  return (
    <>
      <Helmet>
        <title>Indian Dances | Discover India</title>
        <meta 
          name="description" 
          content="Explore the diverse classical and folk dance forms of India, from Bharatanatyam to Bhangra." 
        />
        <meta name="keywords" content="Indian dances, classical dances, folk dances, Bharatanatyam, Kathak" />
        <meta property="og:title" content="Indian Dances | Discover India" />
        <meta property="og:description" content="Explore India's diverse dance forms." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/dances" />
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-6 lg:px-12">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Traditional{' '}
              <span className="text-gradient-gold">Dances</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover the rhythmic expressions, graceful movements, and storytelling traditions 
              that have been preserved and celebrated across India for thousands of years.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4" />
                <span>8 Classical Forms</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>30+ Folk Styles</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>2000+ Years History</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dance Categories */}
        <section className="py-16 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Classical Dance Forms
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The eight recognized classical dances that represent India's cultural heritage
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dances.map((dance, index) => (
                <div
                  key={dance.name}
                  className="group relative overflow-hidden rounded-2xl aspect-[3/4] bg-card border border-border/30 hover:shadow-xl transition-all duration-300"
                >
                  {/* Background Image */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${dance.color}`} />
                  <img
                    src={dance.image}
                    alt={dance.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity duration-300"
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                        {dance.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <MapPin className="w-3 h-3" />
                        <span>{dance.origin}</span>
                      </div>
                      <p className="text-foreground/90 text-sm leading-relaxed mb-3">
                        {dance.description}
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {dance.characteristics.slice(0, 2).map((char) => (
                          <span
                            key={char}
                            className="px-2 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium text-foreground"
                          >
                            {char}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-muted-foreground">
                          Difficulty: {dance.difficulty}
                        </span>
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

        {/* Folk Dances Section */}
        <section className="py-16 px-6 lg:px-12 bg-accent/5">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Regional Folk Dances
              </h2>
              <p className="text-xl text-muted-foreground">
                Celebratory dances that reflect local traditions and community life
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Bihu', state: 'Assam', specialty: 'Spring festival dance' },
                { name: 'Lavani', state: 'Maharashtra', specialty: 'High-energy performance' },
                { name: 'Ghoomar', state: 'Rajasthan', specialty: 'Graceful women\'s dance' },
                { name: 'Rouf', state: 'Kashmir', specialty: 'Eid celebration dance' },
                { name: 'Chhau', state: 'Odisha', specialty: 'Martial arts dance' },
                { name: 'Mohiniyattam', state: 'Kerala', specialty: 'Graceful feminine dance' }
              ].map((folk) => (
                <div
                  key={folk.name}
                  className="p-6 bg-card rounded-xl border border-border/30 hover:shadow-lg transition-all duration-300"
                >
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {folk.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {folk.state}
                  </p>
                  <p className="text-xs text-foreground/70">
                    {folk.specialty}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 lg:px-12">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Experience Indian Dance
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover the rhythm and movement that define India's cultural identity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="default" size="lg">
                <Link to="/culture">Explore Culture</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/festivals">Watch Performances</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Dances;
