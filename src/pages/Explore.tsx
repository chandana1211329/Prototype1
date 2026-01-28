import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InteractiveMap from '@/components/InteractiveMap';

const Explore = () => {
  return (
    <>
      <Helmet>
        <title>Interactive India Map | Discover India</title>
        <meta 
          name="description" 
          content="Explore India's diverse states and territories with our interactive map. Click on any state to discover its unique culture, heritage, and attractions." 
        />
        <meta name="keywords" content="India map, interactive map, Indian states, explore India, India tourism" />
        <meta property="og:title" content="Interactive India Map | Discover India" />
        <meta property="og:description" content="Explore India's diverse states with our interactive map." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/explore" />
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-16 px-6 lg:px-12 bg-gradient-to-b from-background to-background/80">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Interactive India{' '}
              <span className="text-gradient-gold">Map</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover the incredible diversity of India's states and territories. 
              Click on any state to explore its unique culture, cuisine, festivals, and tourist attractions.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-primary rounded-full"></span>
                <span>29 States & 8 Union Territories</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-primary rounded-full"></span>
                <span>Rich Cultural Heritage</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-primary rounded-full"></span>
                <span>Interactive Exploration</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="py-8 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                Explore India's States
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Navigate through the map to discover each state's unique identity, 
                from the snow-capped Himalayas to the tropical coastal regions.
              </p>
            </div>
            
            {/* Interactive Map Component */}
            <div className="bg-card rounded-2xl p-4 shadow-xl border border-border/30">
              <InteractiveMap />
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 px-6 lg:px-12 bg-accent/5">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V5.618a1 1 0 00-.447-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                  Interactive Navigation
                </h3>
                <p className="text-muted-foreground">
                  Click on any state to explore detailed information about its culture, attractions, and heritage.
                </p>
              </div>
              
              <div className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                  Rich Information
                </h3>
                <p className="text-muted-foreground">
                  Discover comprehensive details about each state's history, festivals, cuisine, and tourist destinations.
                </p>
              </div>
              
              <div className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 012 2v1a2 2 0 102 4v1a2 2 0 11-2 4v1a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1a2 2 0 00-2-2h-1a2 2 0 00-2 2v-1a2 2 0 112-4v-1a2 2 0 012-2h1a2 2 0 012-2V8a2.5 2.5 0 012.5-2.5h.5a2 2 0 012 2v1.565z" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                  Visual Experience
                </h3>
                <p className="text-muted-foreground">
                  Beautifully designed map with color-coded states and smooth interactive features for an engaging experience.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Explore;
