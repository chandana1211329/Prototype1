import { Helmet } from 'react-helmet-async';
import StarField from '@/components/StarField';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import IntroSection from '@/components/IntroSection';
import ExploreSection from '@/components/ExploreSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Discover India | Explore Culture, Festivals, Heritage & Tourism</title>
        <meta 
          name="description" 
          content="Your gateway to exploring India's rich heritage, diverse culture, vibrant festivals, traditional dances, and culinary delights. Discover 29 states and thousands of years of history." 
        />
        <meta name="keywords" content="India tourism, Indian culture, Indian festivals, traditional dances, Indian food, heritage sites, travel India" />
        <meta property="og:title" content="Discover India | Explore Culture, Festivals, Heritage & Tourism" />
        <meta property="og:description" content="Your gateway to exploring India's rich heritage and diverse culture." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/" />
      </Helmet>

      {/* Interactive Star Background */}
      <StarField />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <HeroSection />
        <IntroSection />
        <ExploreSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Index;
