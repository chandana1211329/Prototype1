import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Star, 
  MapPin, 
  Calendar, 
  Camera, 
  Video, 
  Filter,
  Grid,
  List,
  Search,
  User,
  Clock,
  TrendingUp,
  Award,
  Bookmark,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface UserReview {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  location: string;
  comment: string;
  helpful: number;
  images?: string[];
  videos?: string[];
  verified: boolean;
  tripDate: string;
  category: 'historical' | 'adventure' | 'cultural' | 'nature' | 'food' | 'spiritual';
}

interface GalleryMedia {
  id: string;
  type: 'photo' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  location: string;
  userName: string;
  userAvatar: string;
  likes: number;
  views: number;
  date: string;
  category: string;
  verified: boolean;
}

const ViewGallery = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<GalleryMedia | null>(null);
  const [activeTab, setActiveTab] = useState<'photos' | 'videos' | 'reviews'>('photos');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');

  // Sample data - in real app, this would come from your backend
  const [reviews] = useState<UserReview[]>([
    {
      id: '1',
      userName: 'Sarah Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
      rating: 5,
      date: '2024-01-15',
      location: 'Taj Mahal, Agra',
      comment: 'Absolutely breathtaking experience! The sunrise view was magical. Our guide was knowledgeable and the whole trip was well-organized. Highly recommend visiting early morning to avoid crowds.',
      helpful: 234,
      images: [
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=400&h=300&fit=crop'
      ],
      verified: true,
      tripDate: '2024-01-10',
      category: 'historical'
    },
    {
      id: '2',
      userName: 'Raj Patel',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      rating: 4,
      date: '2024-01-12',
      location: 'Rishikesh',
      comment: 'Amazing adventure sports! The river rafting was thrilling and the camping experience was unforgettable. Safety measures were excellent. Would definitely come back!',
      helpful: 156,
      images: [
        'https://images.unsplash.com/photo-1551632811-561732d1e308?w=400&h=300&fit=crop'
      ],
      videos: ['https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'],
      verified: true,
      tripDate: '2024-01-08',
      category: 'adventure'
    },
    {
      id: '3',
      userName: 'Emma Wilson',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      rating: 5,
      date: '2024-01-10',
      location: 'Varanasi',
      comment: 'Spiritual journey of a lifetime! The Ganga Aarti was divine. The culture and traditions here are so rich and authentic. Food was incredible too.',
      helpful: 189,
      images: [
        'https://images.unsplash.com/photo-1524492412937-b7848a49bee0?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
      ],
      verified: false,
      tripDate: '2024-01-05',
      category: 'spiritual'
    }
  ]);

  const [galleryMedia] = useState<GalleryMedia[]>([
    {
      id: '1',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=600&h=400&fit=crop',
      title: 'Golden Temple at Sunset',
      location: 'Amritsar',
      userName: 'Michael Chen',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      likes: 1234,
      views: 5678,
      date: '2024-01-14',
      category: 'spiritual',
      verified: true
    },
    {
      id: '2',
      type: 'video',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1551632811-561732d1e308?w=600&h=400&fit=crop',
      title: 'River Rafting Adventure',
      location: 'Rishikesh',
      userName: 'Adventure Seeker',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      likes: 892,
      views: 3456,
      date: '2024-01-13',
      category: 'adventure',
      verified: true
    },
    {
      id: '3',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=600&h=400&fit=crop',
      title: 'Kerala Backwaters',
      location: 'Alleppey',
      userName: 'Travel Lover',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
      likes: 2156,
      views: 8901,
      date: '2024-01-12',
      category: 'nature',
      verified: false
    }
  ]);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'historical', label: 'Historical' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'nature', label: 'Nature' },
    { value: 'food', label: 'Food' },
    { value: 'spiritual', label: 'Spiritual' }
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesCategory = selectedCategory === 'all' || review.category === selectedCategory;
    const matchesSearch = review.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.userName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredMedia = galleryMedia.filter(media => {
    const matchesCategory = selectedCategory === 'all' || media.category === selectedCategory;
    const matchesSearch = media.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         media.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         media.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = (activeTab === 'photos' && media.type === 'photo') ||
                     (activeTab === 'videos' && media.type === 'video') ||
                     activeTab === 'reviews';
    return matchesCategory && matchesSearch && matchesTab;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const MediaModal = () => {
    if (!selectedMedia) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
        <div className="relative max-w-6xl w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedMedia(null)}
            className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
          >
            <X className="w-6 h-6" />
          </Button>

          <div className="bg-background rounded-lg overflow-hidden">
            <div className="aspect-video bg-black flex items-center justify-center">
              {selectedMedia.type === 'video' ? (
                <video
                  src={selectedMedia.url}
                  controls
                  className="w-full h-full"
                  autoPlay
                />
              ) : (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{selectedMedia.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedMedia.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedMedia.date}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={selectedMedia.verified ? 'default' : 'secondary'}>
                    {selectedMedia.verified ? 'Verified' : 'User'}
                  </Badge>
                  <Badge variant="outline">{selectedMedia.category}</Badge>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <img
                    src={selectedMedia.userAvatar}
                    alt={selectedMedia.userName}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium">{selectedMedia.userName}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {selectedMedia.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {selectedMedia.views}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  Like
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>View Gallery - Travel Experiences | Klassygo</title>
        <meta name="description" content="Explore real traveler photos, videos, and reviews from destinations across India" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Travel Gallery
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Discover real experiences from travelers like you. Browse photos, videos, and reviews from amazing destinations across India.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">15K+</div>
                  <div className="text-sm text-muted-foreground">Photos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">3K+</div>
                  <div className="text-sm text-muted-foreground">Videos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">8K+</div>
                  <div className="text-sm text-muted-foreground">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">50K+</div>
                  <div className="text-sm text-muted-foreground">Travelers</div>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search destinations, reviews, or users..."
                    className="pl-10 bg-background/50 backdrop-blur-sm border-border/30"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="px-4 py-2 rounded-lg bg-background/50 backdrop-blur-sm border border-border/30"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                <select
                  className="px-4 py-2 rounded-lg bg-background/50 backdrop-blur-sm border border-border/30"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="trending">Trending</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-sm border-b border-border/30">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant={activeTab === 'photos' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('photos')}
                  className="flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Photos
                </Button>
                <Button
                  variant={activeTab === 'videos' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('videos')}
                  className="flex items-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  Videos
                </Button>
                <Button
                  variant={activeTab === 'reviews' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('reviews')}
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Reviews
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 px-6 lg:px-12">
          <div className="container mx-auto">
            {activeTab === 'reviews' ? (
              <div className="space-y-6 max-w-4xl mx-auto">
                {filteredReviews.map((review) => (
                  <Card key={review.id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={review.userAvatar}
                            alt={review.userName}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{review.userName}</h3>
                              {review.verified && (
                                <Badge variant="default" className="text-xs">
                                  <Award className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{review.date}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {review.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span className="text-sm font-medium">{review.rating}.0</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                      
                      {(review.images || review.videos) && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {review.images?.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Review image ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                            />
                          ))}
                          {review.videos?.map((video, index) => (
                            <div key={index} className="relative">
                              <img
                                src="https://images.unsplash.com/photo-1551632811-561732d1e308?w=400&h=300&fit=crop"
                                alt={`Review video ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                                  <Play className="w-6 h-6 text-white ml-1" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="w-4 h-4 mr-2" />
                            Helpful ({review.helpful})
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Reply
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Trip: {review.tripDate}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-6 max-w-4xl mx-auto'}>
                {filteredMedia.map((media) => (
                  <Card key={media.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="relative aspect-video bg-black" onClick={() => setSelectedMedia(media)}>
                      {media.type === 'video' ? (
                        <>
                          <img
                            src={media.thumbnail}
                            alt={media.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Play className="w-8 h-8 text-black ml-1" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <img
                          src={media.url}
                          alt={media.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      <div className="absolute top-2 right-2">
                        <Badge variant={media.verified ? 'default' : 'secondary'}>
                          {media.verified ? 'Verified' : 'User'}
                        </Badge>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <Badge variant="outline" className="bg-black/50 text-white border-white/20">
                          {media.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-1">{media.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {media.location}
                        </span>
                        <span>•</span>
                        <span>{media.date}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={media.userAvatar}
                            alt={media.userName}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm font-medium">{media.userName}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {media.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {media.views}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 lg:px-12 bg-accent/5">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Share Your Travel Story
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of travelers sharing their amazing experiences across India. Your story could inspire someone's next adventure!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/login">Share Your Experience</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link to="/explore">Plan Your Trip</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
        <MediaModal />
      </div>
    </>
  );
};

export default ViewGallery;
