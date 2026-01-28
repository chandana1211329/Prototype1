import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, ChefHat, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
    name: 'West Indian',
    description: 'Diverse flavors from coastal seafood to spicy street food.',
    specialties: ['Vada Pav', 'Pav Bhaji', 'Dhokla', 'Goan Fish Curry', 'Misal Pav'],
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop',
    color: 'from-red-500/40',
    spice: 'Medium to High'
  },
  {
    name: 'Street Food',
    description: 'Quick, flavorful bites that capture the essence of Indian cities.',
    specialties: ['Chaat', 'Pani Puri', 'Samosa', 'Jalebi', 'Kathi Roll'],
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop',
    color: 'from-yellow-500/40',
    spice: 'Medium'
  },
  {
    name: 'Desserts',
    description: 'Sweet treats ranging from milk-based to syrup-soaked delicacies.',
    specialties: ['Gulab Jamun', 'Rasmalai', 'Kheer', 'Barfi', 'Jalebi'],
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop',
    color: 'from-pink-500/40',
    spice: 'None'
  }
];

const popularDishes = [
  {
    name: 'Butter Chicken',
    origin: 'Punjab',
    description: 'Creamy tomato curry with tender chicken pieces',
    image: 'https://images.unsplash.com/photo-1604500769988-8d2636ec4ee2?w=300&h=200&fit=crop'
  },
  {
    name: 'Masala Dosa',
    origin: 'Karnataka',
    description: 'Crispy rice crepe with spiced potato filling',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop'
  },
  {
    name: 'Biryani',
    origin: 'Hyderabad',
    description: 'Fragrant rice dish with meat and aromatic spices',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop'
  },
  {
    name: 'Chaat',
    origin: 'North India',
    description: 'Spicy street food with various toppings',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop'
  }
];

const Food = () => {
  return (
    <>
      <Helmet>
        <title>Indian Food & Cuisine | Discover India</title>
        <meta 
          name="description" 
          content="Explore the diverse and delicious cuisine of India, from regional specialties to popular street food." 
        />
        <meta name="keywords" content="Indian food, Indian cuisine, Indian recipes, Indian dishes, regional food" />
        <meta property="og:title" content="Indian Food & Cuisine | Discover India" />
        <meta property="og:description" content="Explore India's diverse culinary landscape." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/food" />
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-6 lg:px-12">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Culinary{' '}
              <span className="text-gradient-gold">Journey</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Savor the incredible diversity of Indian cuisine, where every region offers unique flavors, 
              aromas, and culinary traditions that have evolved over thousands of years.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ChefHat className="w-4 h-4" />
                <span>29 Regional Cuisines</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>1000+ Dishes</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>6 Culinary Regions</span>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Cuisines */}
        <section className="py-16 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Regional Cuisines
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover the distinct flavors and cooking styles from different parts of India
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cuisines.map((cuisine, index) => (
                <div
                  key={cuisine.name}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-card border border-border/30 hover:shadow-xl transition-all duration-300"
                >
                  {/* Background Image */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cuisine.color}`} />
                  <img
                    src={cuisine.image}
                    alt={cuisine.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity duration-300"
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                        {cuisine.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <span>Spice Level: {cuisine.spice}</span>
                      </div>
                      <p className="text-foreground/90 leading-relaxed mb-4">
                        {cuisine.description}
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cuisine.specialties.slice(0, 3).map((specialty) => (
                          <span
                            key={specialty}
                            className="px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium text-foreground"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                      
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full group/btn"
                      >
                        Explore Dishes
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Dishes */}
        <section className="py-16 px-6 lg:px-12 bg-accent/5">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Popular Dishes
              </h2>
              <p className="text-xl text-muted-foreground">
                Must-try dishes that represent the best of Indian cuisine
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularDishes.map((dish) => (
                <div
                  key={dish.name}
                  className="group relative overflow-hidden rounded-xl aspect-[4/3] bg-card border border-border/30 hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-opacity duration-300"
                  />
                  
                  <div className="relative z-10 p-4 h-full flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {dish.name}
                    </h4>
                    <p className="text-xs text-white/80 mb-1">
                      {dish.origin}
                    </p>
                    <p className="text-xs text-white/70 line-clamp-2">
                      {dish.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cooking Techniques */}
        <section className="py-16 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Cooking Techniques
              </h2>
              <p className="text-xl text-muted-foreground">
                Traditional methods that create authentic Indian flavors
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Tandoori', description: 'Clay oven cooking for smoky flavors' },
                { title: 'Dum Pukht', description: 'Slow cooking in sealed containers' },
                { title: 'Tempering', description: 'Blooming spices in hot oil' },
                { title: 'Marination', description: 'Yogurt and spice tenderization' },
                { title: 'Stone Grinding', description: 'Traditional spice preparation' },
                { title: 'Fermentation', description: 'Creating depth and complexity' }
              ].map((technique) => (
                <div
                  key={technique.title}
                  className="p-6 bg-card rounded-xl border border-border/30 hover:shadow-lg transition-all duration-300"
                >
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {technique.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {technique.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 lg:px-12 bg-accent/5">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Taste India's Diversity
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              From street food to royal cuisine, experience the flavors that define India.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="default" size="lg">
                <Link to="/states">Explore Regional Food</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/festivals">Festival Specialties</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Food;
