import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Sparkles, Heart, BookOpen, Users, Music, Clock, ChefHat, Star, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Combined data from all four pages
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
  }
];

const culturalAspects = [
  {
    title: 'Religious Diversity',
    description: 'India is the birthplace of Hinduism, Buddhism, Jainism, and Sikhism, while also being home to large Muslim, Christian, and other communities.',
    aspects: ['Hinduism', 'Buddhism', 'Islam', 'Christianity', 'Sikhism', 'Jainism'],
    image: 'https://images.unsplash.com/photo-1596172664886-6b38b2bba7a5?w=600&h=400&fit=crop',
    color: 'from-orange-500/40'
  },
  {
    title: 'Languages & Literature',
    description: 'With 22 official languages and hundreds of dialects, India\'s linguistic diversity is matched only by its rich literary traditions.',
    aspects: ['Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Sanskrit'],
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop',
    color: 'from-blue-500/40'
  },
  {
    title: 'Family Values',
    description: 'The joint family system and respect for elders form the backbone of Indian society, emphasizing unity and mutual support.',
    aspects: ['Joint Family', 'Respect for Elders', 'Community Living', 'Traditions'],
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop',
    color: 'from-green-500/40'
  },
  {
    title: 'Art & Craft',
    description: 'From ancient cave paintings to modern art, India\'s artistic heritage spans thousands of years and countless styles.',
    aspects: ['Madhubani', 'Warli', 'Tanjore', 'Pattachitra', 'Miniature Paintings'],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    color: 'from-purple-500/40'
  }
];

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
    name: 'Bhangra',
    origin: 'Punjab',
    description: 'Vibrant folk dance celebrating the harvest season with energetic movements.',
    characteristics: ['High energy', 'Dhol beats', 'Colorful costumes', 'Celebratory'],
    image: 'https://images.unsplash.com/photo-1604422091854-1a5a9ee1b115?w=600&h=400&fit=crop',
    color: 'from-yellow-500/40',
    difficulty: 'Beginner'
  }
];

const cuisines = [
  {
    name: 'North Indian',
    description: 'Rich, creamy curries and tandoori dishes from the northern regions.',
    specialties: ['Butter Chicken', 'Biryani', 'Naan', 'Paneer Tikka', 'Dal Makhani'],
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop',
    color: 'from-orange-500/40',
    spice: 'Medium to High'
  },
  {
    name: 'South Indian',
    description: 'Light, flavorful dishes with rice, lentils, and coconut.',
    specialties: ['Dosa', 'Idli', 'Sambar', 'Coconut Curry', 'Biryani'],
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=600&h=400&fit=crop',
    color: 'from-green-500/40',
    spice: 'Medium'
  },
  {
    name: 'East Indian',
    description: 'Subtle flavors with fish, rice, and mustard oil preparations.',
    specialties: ['Macher Jhol', 'Rosogolla', 'Samosa', 'Chhena Poda', 'Litti Chokha'],
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop',
    color: 'from-blue-500/40',
    spice: 'Low to Medium'
  },
  {
    name: 'Street Food',
    description: 'Quick, flavorful bites that capture the essence of Indian cities.',
    specialties: ['Chaat', 'Pani Puri', 'Samosa', 'Jalebi', 'Kathi Roll'],
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop',
    color: 'from-yellow-500/40',
    spice: 'Medium'
  }
];

const CultureCombined = () => {
  return (
    <>
      <Helmet>
        <title>Indian Culture | Discover India</title>
        <meta 
          name="description" 
          content="Explore the rich and diverse cultural heritage of India - festivals, traditions, dances, and cuisine that define this ancient civilization." 
        />
        <meta name="keywords" content="Indian culture, Indian festivals, Indian dances, Indian food, Indian traditions, Indian heritage" />
        <meta property="og:title" content="Indian Culture | Discover India" />
        <meta property="og:description" content="Explore India's rich cultural heritage." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/culture" />
      </Helmet>

      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="fixed top-6 left-6 flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm border border-border/30 rounded-lg hover:bg-background/90 transition-colors duration-200 z-10"
      >
        <Home className="h-4 w-4" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      <Navbar />

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-6 lg:px-12">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Rich Cultural{' '}
              <span className="text-gradient-gold">Heritage</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Immerse yourself in the timeless traditions, vibrant celebrations, artistic expressions, 
              and culinary delights that have shaped one of the world's oldest continuous civilizations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>5000+ Years History</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>22 Official Languages</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>1.4+ Billion People</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>1000+ Festivals</span>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="py-8 px-6 lg:px-12 bg-accent/5 sticky top-20 z-20 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" size="lg" onClick={() => document.getElementById('festivals')?.scrollIntoView({ behavior: 'smooth' })} className="hover:bg-primary hover:text-primary-foreground hover:border-primary">
                <Calendar className="w-4 h-4 mr-2" />
                Festivals
              </Button>
              <Button variant="outline" size="lg" onClick={() => document.getElementById('culture')?.scrollIntoView({ behavior: 'smooth' })} className="hover:bg-primary hover:text-primary-foreground hover:border-primary">
                <Heart className="w-4 h-4 mr-2" />
                Traditions
              </Button>
              <Button variant="outline" size="lg" onClick={() => document.getElementById('dances')?.scrollIntoView({ behavior: 'smooth' })} className="hover:bg-primary hover:text-primary-foreground hover:border-primary">
                <Music className="w-4 h-4 mr-2" />
                Dances
              </Button>
              <Button variant="outline" size="lg" onClick={() => document.getElementById('food')?.scrollIntoView({ behavior: 'smooth' })} className="hover:bg-primary hover:text-primary-foreground hover:border-primary">
                <ChefHat className="w-4 h-4 mr-2" />
                Cuisine
              </Button>
            </div>
          </div>
        </section>

        {/* Festivals Section */}
        <section id="festivals" className="py-16 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Vibrant Festivals
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience the joy, colors, and traditions of India's countless celebrations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {festivals.map((festival) => (
                <div
                  key={festival.name}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-card border border-border/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${festival.color}`} />
                  <img
                    src={festival.image}
                    alt={festival.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity duration-300"
                  />
                  
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2">
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
                      <p className="text-foreground/90 text-sm leading-relaxed mb-2">
                        {festival.description}
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {festival.highlights.slice(0, 2).map((highlight) => (
                          <span
                            key={highlight}
                            className="px-2 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium text-foreground"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                      
                      <Button
                        asChild
                        variant="secondary"
                        size="sm"
                        className="w-full group/btn"
                      >
                        <Link to="/login">
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cultural Aspects Section */}
        <section id="culture" className="py-16 px-6 lg:px-12 bg-accent/5">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Cultural Traditions
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles and practices that shape Indian society
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {culturalAspects.map((aspect) => (
                <div
                  key={aspect.title}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-card border border-border/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${aspect.color}`} />
                  <img
                    src={aspect.image}
                    alt={aspect.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity duration-300"
                  />
                  
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                        {aspect.title}
                      </h3>
                      <p className="text-foreground/90 text-sm leading-relaxed mb-4">
                        {aspect.description}
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {aspect.aspects.slice(0, 2).map((item) => (
                          <span
                            key={item}
                            className="px-2 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium text-foreground"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full group/btn"
                      >
                        <Link to="/login">
                          Explore More
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dances Section */}
        <section id="dances" className="py-16 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Traditional Dances
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover the rhythmic expressions and graceful movements of Indian dance forms
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dances.map((dance) => (
                <div
                  key={dance.name}
                  className="group relative overflow-hidden rounded-2xl aspect-[3/4] bg-card border border-border/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${dance.color}`} />
                  <img
                    src={dance.image}
                    alt={dance.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity duration-300"
                  />
                  
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-heading font-bold text-foreground mb-2">
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
                      <div className="flex flex-wrap gap-1 mb-3">
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
                        asChild
                        variant="secondary"
                        size="sm"
                        className="w-full group/btn"
                      >
                        <Link to="/login">
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Food Section */}
        <section id="food" className="py-16 px-6 lg:px-12 bg-accent/5">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Culinary Journey
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Savor the incredible diversity of Indian cuisine from every region
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cuisines.map((cuisine) => (
                <div
                  key={cuisine.name}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-card border border-border/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cuisine.color}`} />
                  <img
                    src={cuisine.image}
                    alt={cuisine.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity duration-300"
                  />
                  
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                        {cuisine.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <span>Spice Level: {cuisine.spice}</span>
                      </div>
                      <p className="text-foreground/90 text-sm leading-relaxed mb-4">
                        {cuisine.description}
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {cuisine.specialties.slice(0, 2).map((specialty) => (
                          <span
                            key={specialty}
                            className="px-2 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium text-foreground"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                      
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full group/btn"
                      >
                        <Link to="/login">
                          Explore Dishes
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 lg:px-12">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Experience India's Cultural Diversity
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              From ancient traditions to modern expressions, discover the cultural tapestry that makes India truly incredible.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="default" size="lg">
                <Link to="/login">Explore States</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/login">Plan Your Journey</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CultureCombined;
