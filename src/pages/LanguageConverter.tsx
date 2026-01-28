import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, Languages, BookOpen, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import TranslationTool from '@/components/TranslationTool';
import PhraseHelper from '@/components/PhraseHelper';

const LanguageConverter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('translator');

  return (
    <>
      <Helmet>
        <title>Language Converter | KlassyGo</title>
        <meta 
          name="description" 
          content="Cultural language translator for India - translate English to Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali with cultural context." 
        />
        <meta name="keywords" content="Indian language translator, Hindi translation, Tamil translation, cultural context, tourist phrases" />
        <meta property="og:title" content="Language Converter | KlassyGo" />
        <meta property="og:description" content="Translate Indian languages with cultural context" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/language-converter" />
      </Helmet>

      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="fixed top-6 left-6 flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm border border-border/30 rounded-lg hover:bg-background/90 transition-colors duration-200 z-10"
      >
        <Home className="h-4 w-4" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      <div className="min-h-screen pt-20 px-6 lg:px-12">
        {/* Hero Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Languages className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                Cultural Language Converter
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Communicate respectfully in India with accurate translations that include cultural context, 
              pronunciation, and proper usage. Perfect for foreign tourists and visitors.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">7</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">3</div>
                <div className="text-sm text-muted-foreground">Translation Modes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Essential Phrases</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">∞</div>
                <div className="text-sm text-muted-foreground">Cultural Context</div>
              </div>
            </div>

            <Alert className="bg-primary/5 border-primary/20">
              <Volume2 className="h-4 w-4" />
              <AlertDescription>
                <strong>Pro Tip:</strong> Use the Cultural-Aware mode to understand not just what to say, 
                but how and when to say it respectfully in Indian culture.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-16">
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="translator" className="flex items-center gap-2">
                  <Languages className="h-4 w-4" />
                  Translator
                </TabsTrigger>
                <TabsTrigger value="phrases" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Essential Phrases
                </TabsTrigger>
              </TabsList>

              <TabsContent value="translator" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                    AI-Powered Translation with Cultural Context
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Get accurate translations that include pronunciation, cultural notes, body gestures, 
                    and when to use phrases appropriately in different social situations.
                  </p>
                </div>
                <TranslationTool onTranslationComplete={(result) => {
                  console.log('Translation completed:', result);
                }} />
              </TabsContent>

              <TabsContent value="phrases" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                    Essential Travel Phrases
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Pre-translated common phrases for tourists, organized by category with cultural context 
                    and pronunciation. Perfect for quick reference during your travels.
                  </p>
                </div>
                <PhraseHelper />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-accent/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                Translation Features
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to communicate respectfully in India
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Languages className="h-5 w-5 text-primary" />
                    Multiple Languages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Support for Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, and more Indian languages 
                    with accurate pronunciation guides.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Cultural Context
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Understand not just what to say, but when and how to use phrases appropriately 
                    in different cultural and social situations.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="h-5 w-5 text-primary" />
                    Pronunciation Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Latin script pronunciation for every translation, plus text-to-speech support 
                    to hear how words and phrases sound.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Languages className="h-5 w-5 text-primary" />
                    Translation Modes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Choose between Basic, Conversational, or Cultural-Aware modes depending on 
                    your needs and the situation.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Essential Phrases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Pre-translated common phrases for greetings, directions, food, shopping, 
                    emergencies, and more tourist situations.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Languages className="h-5 w-5 text-primary" />
                    Body Gestures
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Learn important body gestures and non-verbal communication that accompany 
                    verbal phrases in Indian culture.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Start Communicating Confidently
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Use our language tools to connect with locals and show respect for Indian culture
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="default" size="lg">
                <Link to="/culture">Learn About Indian Culture</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/states">Explore Indian States</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LanguageConverter;
