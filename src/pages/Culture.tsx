import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, BookOpen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
  },
  {
    title: 'Architecture',
    description: 'India\'s architectural marvels range from ancient temples and forts to Mughal monuments and modern masterpieces.',
    aspects: ['Temple Architecture', 'Mughal Style', 'Colonial Buildings', 'Modern Design'],
    image: 'https://images.unsplash.com/photo-1524492442991-9b91594160ee?w=600&h=400&fit=crop',
    color: 'from-red-500/40'
  },
  {
    title: 'Philosophy & Spirituality',
    description: 'Ancient philosophical traditions and spiritual practices have shaped Indian consciousness for millennia.',
    aspects: ['Yoga', 'Meditation', 'Ayurveda', 'Vedic Philosophy', 'Spiritual Practices'],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
    color: 'from-indigo-500/40'
  }
];

const Culture = () => {
  return (
    <>
      <Helmet>
        <title>Indian Culture | Discover India</title>
        <meta 
          name="description" 
          content="Explore the rich and diverse cultural heritage of India, from ancient traditions to modern expressions." 
        />
        <meta name="keywords" content="Indian culture, Indian traditions, Indian heritage, Indian art, Indian philosophy" />
        <meta property="og:title" content="Indian Culture | Discover India" />
        <meta property="og:description" content="Explore India's rich cultural heritage." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/culture" />
      </Helmet>

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
              Immerse yourself in the timeless traditions, diverse beliefs, and artistic expressions 
              that have shaped one of the world's oldest continuous civilizations.
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
            </div>
          </div>
        </section>

        {/* Cultural Aspects Grid */}
        <section className="py-16 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {culturalAspects.map((aspect, index) => (
                <div
                  key={aspect.title}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-card border border-border/30 hover:shadow-xl transition-all duration-300"
                >
                  {/* Background Image */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${aspect.color}`} />
                  <img
                    src={aspect.image}
                    alt={aspect.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity duration-300"
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
                        {aspect.title}
                      </h3>
                      <p className="text-foreground/90 leading-relaxed mb-4">
                        {aspect.description}
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {aspect.aspects.map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium text-foreground"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full group/btn"
                      >
                        Explore More
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cultural Values Section */}
        <section className="py-16 px-6 lg:px-12 bg-accent/5">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Core Cultural Values
              </h2>
              <p className="text-xl text-muted-foreground">
                The principles that guide Indian society and shape daily life
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Unity in Diversity', description: 'Celebrating differences while finding common ground' },
                { title: 'Respect for Elders', description: 'Honoring wisdom and experience of older generations' },
                { title: 'Hospitality', description: 'Treating guests as gods with warmth and generosity' },
                { title: 'Non-violence', description: 'Ahimsa - the principle of avoiding harm to all living beings' },
                { title: 'Karma', description: 'The belief that actions determine future consequences' },
                { title: 'Dharma', description: 'Living according to moral and spiritual duties' },
                { title: 'Simplicity', description: 'Finding joy in minimalism and essential living' },
                { title: 'Community', description: 'Prioritizing collective well-being over individual gain' }
              ].map((value, index) => (
                <div
                  key={value.title}
                  className="p-6 bg-card rounded-xl border border-border/30 hover:shadow-lg transition-all duration-300"
                >
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
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
              Experience Indian Culture
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover the vibrant expressions of Indian culture through dance, festivals, and cuisine.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="default" size="lg">
                <Link to="/dances">Watch Dances</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/festivals">Explore Festivals</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/food">Taste Cuisine</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Culture;
