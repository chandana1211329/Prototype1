import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Mountain, 
  Trees, 
  Church, 
  Zap, 
  Music, 
  Heart,
  Star,
  Clock,
  Users,
  Shield,
  Compass,
  Camera,
  Search,
  Filter,
  ChevronDown,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

interface Destination {
  name: string;
  location: string;
  era: string;
  description: string;
  image: string;
  rating: number;
  bestTime: string;
  difficulty?: string;
}

interface TourismCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  features: string[];
  destinations: Destination[];
}

const tourismCategories: TourismCategory[] = [
  {
    id: 'historical',
    title: 'Historical / Archaeological Tourism',
    description: 'Explore ancient monuments, forts, heritage sites, and museums',
    icon: <MapPin className="w-6 h-6" />,
    color: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/30',
    features: [
      'Ancient monuments & forts',
      'UNESCO heritage sites',
      'Archaeological museums',
      'Historical timelines'
    ],
    destinations: [
      {
        name: 'Taj Mahal',
        location: 'Agra, Uttar Pradesh',
        era: 'Mughal Period (17th century)',
        description: 'Symbol of eternal love and Mughal architectural masterpiece',
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop',
        rating: 4.8,
        bestTime: 'Oct - Mar'
      },
      {
        name: 'Red Fort',
        location: 'Delhi',
        era: 'Mughal Period (17th century)',
        description: 'Historic fort that served as main residence of Mughal emperors',
        image: 'https://images.unsplash.com/photo-1524492442991-9b91594160ee?w=400&h=300&fit=crop',
        rating: 4.6,
        bestTime: 'Oct - Mar'
      },
      {
        name: 'Hampi',
        location: 'Karnataka',
        era: 'Vijayanagara Empire (14th-16th century)',
        description: 'Ancient temple town and UNESCO World Heritage Site',
        image: 'https://images.unsplash.com/photo-1548191019-734ff0c8756a?w=400&h=300&fit=crop',
        rating: 4.7,
        bestTime: 'Oct - Feb'
      }
    ]
  },
  {
    id: 'eco',
    title: 'Eco Tourism',
    description: 'Discover nature reserves, forests, wildlife sanctuaries, and sustainable travel',
    icon: <Trees className="w-6 h-6" />,
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
    features: [
      'Wildlife sanctuaries',
      'National parks',
      'Sustainable practices',
      'Biodiversity hotspots'
    ],
    destinations: [
      {
        name: 'Sundarbans',
        location: 'West Bengal',
        era: 'Natural Reserve',
        description: 'World\'s largest mangrove forest and Bengal tiger habitat',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
        rating: 4.5,
        bestTime: 'Oct - Mar'
      },
      {
        name: 'Periyar Tiger Reserve',
        location: 'Kerala',
        era: 'Wildlife Sanctuary',
        description: 'Protected area known for tiger and elephant conservation',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
        rating: 4.6,
        bestTime: 'Sep - May'
      },
      {
        name: 'Jim Corbett National Park',
        location: 'Uttarakhand',
        era: 'National Park',
        description: 'India\'s oldest national park and tiger reserve',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
        rating: 4.7,
        bestTime: 'Nov - Jun'
      }
    ]
  },
  {
    id: 'spiritual',
    title: 'Spiritual Tourism',
    description: 'Visit temples, churches, mosques, pilgrimage routes, and meditation centers',
    icon: <Church className="w-6 h-6" />,
    color: 'from-purple-500/20 to-indigo-500/20',
    borderColor: 'border-purple-500/30',
    features: [
      'Sacred temples',
      'Spiritual retreats',
      'Pilgrimage sites',
      'Meditation centers'
    ],
    destinations: [
      {
        name: 'Varanasi Ghats',
        location: 'Uttar Pradesh',
        era: 'Ancient Spiritual Center',
        description: 'Sacred city on the banks of Ganges, spiritual capital of India',
        image: 'https://images.unsplash.com/photo-1524492442991-9b91594160ee?w=400&h=300&fit=crop',
        rating: 4.8,
        bestTime: 'Oct - Mar'
      },
      {
        name: 'Golden Temple',
        location: 'Amritsar, Punjab',
        era: 'Sikh Heritage (16th century)',
        description: 'Holiest Gurdwara and spiritual center for Sikhs worldwide',
        image: '',
        rating: 4.9,
        bestTime: 'Oct - Mar'
      },
      {
        name: 'Bodh Gaya',
        location: 'Bihar',
        era: 'Buddhist Site (6th century BC)',
        description: 'Site where Buddha attained enlightenment under Bodhi tree',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
        rating: 4.7,
        bestTime: 'Oct - Mar'
      }
    ]
  },
  {
    id: 'adventure',
    title: 'Adventure / Sports Tourism',
    description: 'Experience trekking, rafting, paragliding, scuba diving, skiing, and more',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-red-500/20 to-orange-500/20',
    borderColor: 'border-red-500/30',
    features: [
      'Trekking & hiking',
      'Water sports',
      'Mountain climbing',
      'Extreme sports'
    ],
    destinations: [
      {
        name: 'Rishikesh',
        location: 'Uttarakhand',
        era: 'Adventure Hub',
        description: 'Yoga capital and gateway to Himalayan adventures',
        image: 'https://images.unsplash.com/photo-1524492442991-9b91594160ee?w=400&h=300&fit=crop',
        rating: 4.6,
        bestTime: 'Sep - Jun',
        difficulty: 'Moderate'
      },
      {
        name: 'Manali',
        location: 'Himachal Pradesh',
        era: 'Mountain Resort',
        description: 'Paradise for skiing, trekking, and mountain sports',
        image: '',
        rating: 4.7,
        bestTime: 'Apr - Jun, Sep - Dec',
        difficulty: 'Moderate to Hard'
      },
      {
        name: 'Andaman Islands',
        location: 'Bay of Bengal',
        era: 'Island Paradise',
        description: 'Pristine beaches for scuba diving and water sports',
        image: 'https://images.unsplash.com/photo-1540202404-1b927e35fa86?w=400&h=300&fit=crop',
        rating: 4.8,
        bestTime: 'Nov - May',
        difficulty: 'Easy to Moderate'
      }
    ]
  },
  {
    id: 'cultural',
    title: 'Cultural / Heritage Tourism',
    description: 'Immerse in festivals, traditional art, dance, food, and local customs',
    icon: <Music className="w-6 h-6" />,
    color: 'from-pink-500/20 to-rose-500/20',
    borderColor: 'border-pink-500/30',
    features: [
      'Cultural festivals',
      'Traditional arts',
      'Local cuisine',
      'Heritage crafts'
    ],
    destinations: [
      {
        name: 'Kolkata',
        location: 'West Bengal',
        era: 'Cultural Capital',
        description: 'Hub of art, literature, music, and Durga Puja celebrations',
        image: 'https://images.unsplash.com/photo-1595435934249-5f7a3cc45c8c?w=400&h=300&fit=crop',
        rating: 4.5,
        bestTime: 'Oct - Mar'
      },
      {
        name: 'Jaipur',
        location: 'Rajasthan',
        era: 'Pink City',
        description: 'Royal heritage, crafts, and vibrant cultural traditions',
        image: 'https://images.unsplash.com/photo-1524492442991-9b91594160ee?w=400&h=300&fit=crop',
        rating: 4.7,
        bestTime: 'Oct - Mar'
      },
      {
        name: 'Mysore',
        location: 'Karnataka',
        era: 'Cultural Heritage',
        description: 'Royal palaces, Dasara festival, and traditional arts',
        image: 'https://images.unsplash.com/photo-1524492442991-9b91594160ee?w=400&h=300&fit=crop',
        rating: 4.6,
        bestTime: 'Sep - Mar'
      }
    ]
  },
  {
    id: 'other',
    title: 'Other Tourism',
    description: 'Medical tourism, rural tourism, luxury tourism, and educational tourism',
    icon: <Compass className="w-6 h-6" />,
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    features: [
      'Medical tourism',
      'Rural experiences',
      'Luxury travel',
      'Educational tours'
    ],
    destinations: [
      {
        name: 'Goa',
        location: 'West Coast',
        era: 'Luxury Beach Destination',
        description: 'Beach resorts, wellness centers, and luxury experiences',
        image: 'https://images.unsplash.com/photo-1512092739878-13d7c2e01d7f?w=400&h=300&fit=crop',
        rating: 4.6,
        bestTime: 'Nov - Feb'
      },
      {
        name: 'Kerala Backwaters',
        location: 'Kerala',
        era: 'Wellness Tourism',
        description: 'Ayurvedic treatments and houseboat experiences',
        image: '',
        rating: 4.7,
        bestTime: 'Sep - May'
      },
      {
        name: 'Rajasthan Villages',
        location: 'Rajasthan',
        era: 'Rural Tourism',
        description: 'Authentic village life and traditional experiences',
        image: 'https://images.unsplash.com/photo-1524492442991-9b91594160ee?w=400&h=300&fit=crop',
        rating: 4.5,
        bestTime: 'Oct - Mar'
      }
    ]
  }
];

const Tourism = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterOptions = {
    categories: [
      { value: 'all', label: 'All Categories' },
      { value: 'historical', label: 'Historical / Archaeological' },
      { value: 'eco', label: 'Eco Tourism' },
      { value: 'spiritual', label: 'Spiritual Tourism' },
      { value: 'adventure', label: 'Adventure / Sports' },
      { value: 'cultural', label: 'Cultural / Heritage' },
      { value: 'other', label: 'Other Tourism' }
    ],
    difficulties: [
      { value: 'all', label: 'All Difficulties' },
      { value: 'easy', label: 'Easy' },
      { value: 'moderate', label: 'Moderate' },
      { value: 'hard', label: 'Hard' }
    ],
    ratings: [
      { value: 'all', label: 'All Ratings' },
      { value: '4.5+', label: '4.5+ Stars' },
      { value: '4.0+', label: '4.0+ Stars' },
      { value: '3.5+', label: '3.5+ Stars' }
    ]
  };

  const filteredCategories = tourismCategories.map(category => ({
    ...category,
    destinations: category.destinations.filter(destination => {
      const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           destination.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           destination.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || category.id === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || 
                               (!destination.difficulty && selectedDifficulty === 'easy') ||
                               (destination.difficulty && destination.difficulty.toLowerCase().includes(selectedDifficulty));
      const matchesRating = selectedRating === 'all' || 
                           (selectedRating === '4.5+' && destination.rating >= 4.5) ||
                           (selectedRating === '4.0+' && destination.rating >= 4.0) ||
                           (selectedRating === '3.5+' && destination.rating >= 3.5);
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesRating;
    })
  })).filter(category => category.destinations.length > 0);

  return (
    <>
      <Helmet>
        <title>Tourism - Discover India | Klassygo</title>
        <meta name="description" content="Explore diverse tourism experiences in India - from historical monuments to adventure sports, spiritual journeys to cultural festivals." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Discover India's Tourism
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                From ancient monuments to adventure sports, spiritual journeys to cultural festivals - 
                experience the diverse tourism offerings of Incredible India
              </p>
              
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search destinations..." 
                    className="pl-10 bg-background/50 backdrop-blur-sm border-border/30"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className="bg-background/50 backdrop-blur-sm border-border/30"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                    <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                  </Button>
                  
                  {/* Filter Dropdown */}
                  {isFilterOpen && (
                    <div className="absolute top-full mt-2 right-0 w-80 bg-background/95 backdrop-blur-sm border border-border/30 rounded-xl shadow-lg z-50 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Filter Options</h3>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setIsFilterOpen(false)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        {/* Category Filter */}
                        <div>
                          <label className="text-sm font-medium mb-2 block">Category</label>
                          <select 
                            className="w-full p-2 rounded-lg bg-background/50 border border-border/30 text-sm"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                          >
                            {filterOptions.categories.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Difficulty Filter */}
                        <div>
                          <label className="text-sm font-medium mb-2 block">Difficulty</label>
                          <select 
                            className="w-full p-2 rounded-lg bg-background/50 border border-border/30 text-sm"
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                          >
                            {filterOptions.difficulties.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Rating Filter */}
                        <div>
                          <label className="text-sm font-medium mb-2 block">Rating</label>
                          <select 
                            className="w-full p-2 rounded-lg bg-background/50 border border-border/30 text-sm"
                            value={selectedRating}
                            onChange={(e) => setSelectedRating(e.target.value)}
                          >
                            {filterOptions.ratings.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Clear Filters */}
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => {
                            setSelectedCategory('all');
                            setSelectedDifficulty('all');
                            setSelectedRating('all');
                            setSearchTerm('');
                          }}
                        >
                          Clear All Filters
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tourism Categories */}
        <section className="py-20 px-6 lg:px-12">
          <div className="container mx-auto">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2">No destinations found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedDifficulty('all');
                    setSelectedRating('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-12">
                {filteredCategories.map((category) => (
                  <div key={category.id} className="space-y-8">
                    {/* Category Header */}
                    <div className={`relative p-8 rounded-2xl bg-gradient-to-br ${category.color} border ${category.borderColor} backdrop-blur-sm`}>
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-background/50 backdrop-blur-sm border ${category.borderColor}`}>
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <h2 className="text-3xl font-bold font-heading mb-3">{category.title}</h2>
                          <p className="text-muted-foreground mb-4">{category.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {category.features.map((feature, index) => (
                              <span 
                                key={index}
                                className={`px-3 py-1 text-sm rounded-full bg-background/50 backdrop-blur-sm border ${category.borderColor}`}
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Destinations Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.destinations.map((destination, index) => (
                        <div 
                          key={index}
                          className="group relative overflow-hidden rounded-2xl bg-background/50 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-300"
                        >
                          {/* Image */}
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={destination.image} 
                              alt={destination.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            
                            {/* Rating Badge */}
                            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-white font-medium">{destination.rating}</span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6 space-y-4">
                            <div>
                              <h3 className="text-xl font-bold font-heading mb-1">{destination.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                <span>{destination.location}</span>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {destination.description}
                            </p>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="w-3 h-3 text-muted-foreground" />
                                <span className="text-muted-foreground">Best Time:</span>
                                <span className="font-medium">{destination.bestTime}</span>
                              </div>
                              
                              {destination.difficulty && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Mountain className="w-3 h-3 text-muted-foreground" />
                                  <span className="text-muted-foreground">Difficulty:</span>
                                  <span className="font-medium">{destination.difficulty}</span>
                                </div>
                              )}

                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="w-3 h-3 text-muted-foreground" />
                                <span className="text-muted-foreground">Era:</span>
                                <span className="font-medium">{destination.era}</span>
                              </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                              <Button asChild className="flex-1 bg-primary hover:bg-primary/90">
                                <Link to="/login">
                                  Explore More
                                </Link>
                              </Button>
                              <Button variant="outline" size="icon">
                                <Heart className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="relative p-12 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 backdrop-blur-sm text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Ready to Explore Incredible India?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Plan your perfect journey across diverse landscapes, cultures, and experiences. 
                Let us help you discover the magic of India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/login">
                    <Compass className="w-4 h-4 mr-2" />
                    Plan Your Trip
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/view-gallery">
                    <Camera className="w-4 h-4 mr-2" />
                    View Gallery
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Tourism;
