import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Volume2, Copy, Check, BookOpen, MapPin, Utensils, Calendar, Users } from 'lucide-react';
import { translationService, TranslationResponse } from '@/services/translationService';

interface Phrase {
  id: string;
  english: string;
  category: 'greetings' | 'directions' | 'food' | 'shopping' | 'emergency' | 'courtesy' | 'basic';
  context: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface TranslatedPhrase extends Phrase {
  translation?: TranslationResponse;
}

const PhraseHelper: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const [translatedPhrases, setTranslatedPhrases] = useState<Map<string, TranslationResponse>>(new Map());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const supportedLanguages = translationService.getSupportedLanguages();

  const phrases: Phrase[] = [
    // Greetings
    { id: 'hello', english: 'Hello', category: 'greetings', context: 'Basic greeting for anyone', difficulty: 'easy' },
    { id: 'good_morning', english: 'Good morning', category: 'greetings', context: 'Morning greeting', difficulty: 'easy' },
    { id: 'good_evening', english: 'Good evening', category: 'greetings', context: 'Evening greeting', difficulty: 'easy' },
    { id: 'thank_you', english: 'Thank you', category: 'courtesy', context: 'Expressing gratitude', difficulty: 'easy' },
    { id: 'please', english: 'Please', category: 'courtesy', context: 'Making polite requests', difficulty: 'easy' },
    { id: 'excuse_me', english: 'Excuse me', category: 'courtesy', context: 'Getting attention or apologizing', difficulty: 'easy' },
    { id: 'sorry', english: 'Sorry', category: 'courtesy', context: 'Apologizing', difficulty: 'easy' },

    // Directions
    { id: 'where_is', english: 'Where is...?', category: 'directions', context: 'Asking for location', difficulty: 'easy' },
    { id: 'how_far', english: 'How far is...?', category: 'directions', context: 'Asking about distance', difficulty: 'easy' },
    { id: 'left_right', english: 'Left / Right', category: 'directions', context: 'Basic directions', difficulty: 'easy' },
    { id: 'straight', english: 'Go straight', category: 'directions', context: 'Navigation instruction', difficulty: 'easy' },
    { id: 'train_station', english: 'Train station', category: 'directions', context: 'Transport location', difficulty: 'medium' },
    { id: 'airport', english: 'Airport', category: 'directions', context: 'Transport location', difficulty: 'medium' },

    // Food
    { id: 'water', english: 'Water', category: 'food', context: 'Basic need', difficulty: 'easy' },
    { id: 'food', english: 'Food', category: 'food', context: 'Basic need', difficulty: 'easy' },
    { id: 'vegetarian', english: 'Vegetarian', category: 'food', context: 'Dietary preference', difficulty: 'medium' },
    { id: 'delicious', english: 'Delicious', category: 'food', context: 'Complimenting food', difficulty: 'medium' },
    { id: 'bill', english: 'Bill please', category: 'food', context: 'Paying at restaurant', difficulty: 'easy' },

    // Shopping
    { id: 'how_much', english: 'How much?', category: 'shopping', context: 'Asking price', difficulty: 'easy' },
    { id: 'too_expensive', english: 'Too expensive', category: 'shopping', context: 'Price negotiation', difficulty: 'medium' },
    { id: 'discount', english: 'Any discount?', category: 'shopping', context: 'Asking for discount', difficulty: 'medium' },
    { id: 'i_want', english: 'I want...', category: 'shopping', context: 'Expressing desire', difficulty: 'easy' },

    // Emergency
    { id: 'help', english: 'Help!', category: 'emergency', context: 'Emergency assistance', difficulty: 'easy' },
    { id: 'hospital', english: 'Hospital', category: 'emergency', context: 'Medical emergency', difficulty: 'easy' },
    { id: 'police', english: 'Police', category: 'emergency', context: 'Security emergency', difficulty: 'easy' },
    { id: 'danger', english: 'Danger', category: 'emergency', context: 'Warning about danger', difficulty: 'medium' },

    // Basic
    { id: 'yes', english: 'Yes', category: 'basic', context: 'Affirmation', difficulty: 'easy' },
    { id: 'no', english: 'No', category: 'basic', context: 'Negation', difficulty: 'easy' },
    { id: 'maybe', english: 'Maybe', category: 'basic', context: 'Uncertainty', difficulty: 'easy' },
    { id: 'i_dont_understand', english: 'I don\'t understand', category: 'basic', context: 'Communication difficulty', difficulty: 'medium' },
    { id: 'repeat', english: 'Can you repeat?', category: 'basic', context: 'Requesting repetition', difficulty: 'medium' },
  ];

  const categories = [
    { value: 'all', label: 'All Categories', icon: BookOpen },
    { value: 'greetings', label: 'Greetings', icon: Users },
    { value: 'directions', label: 'Directions', icon: MapPin },
    { value: 'food', label: 'Food & Dining', icon: Utensils },
    { value: 'shopping', label: 'Shopping', icon: BookOpen },
    { value: 'emergency', label: 'Emergency', icon: Users },
    { value: 'courtesy', label: 'Courtesy', icon: Users },
    { value: 'basic', label: 'Basic', icon: BookOpen },
  ];

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };

  const translatePhrase = async (phrase: Phrase) => {
    if (translatedPhrases.has(phrase.id)) {
      return; // Already translated
    }

    try {
      const result = await translationService.translate({
        inputText: phrase.english,
        sourceLanguage: 'en',
        targetLanguage: selectedLanguage,
        mode: 'cultural',
        userContext: {
          nationality: 'Foreign Tourist',
          purpose: 'tourism'
        }
      });

      if (result.success) {
        setTranslatedPhrases(prev => new Map(prev.set(phrase.id, result)));
      }
    } catch (error) {
      console.error('Translation failed:', error);
    }
  };

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage;
      speechSynthesis.speak(utterance);
    }
  };

  const filteredPhrases = phrases.filter(phrase => {
    const matchesSearch = phrase.english.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || phrase.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Auto-translate visible phrases when language changes
  React.useEffect(() => {
    setTranslatedPhrases(new Map());
    // Translate all phrases instantly and in parallel
    filteredPhrases.forEach(phrase => {
      translatePhrase(phrase);
    });
  }, [selectedLanguage]); // Only re-run when language changes, not when filteredPhrases changes

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Essential Travel Phrases
          </CardTitle>
          <CardDescription>
            Common phrases for tourists with cultural context and pronunciation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search phrases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div className="flex items-center gap-2">
                      <cat.icon className="h-4 w-4" />
                      {cat.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Language Selection */}
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {supportedLanguages.filter(lang => lang.code !== 'en').map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span>{lang.name}</span>
                      <span className="text-muted-foreground text-sm">({lang.nativeName})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Phrases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPhrases.map((phrase) => {
              const translation = translatedPhrases.get(phrase.id);
              
              return (
                <Card key={phrase.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    {/* English Phrase */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{phrase.english}</h4>
                        <Badge className={difficultyColors[phrase.difficulty]}>
                          {phrase.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{phrase.context}</p>
                    </div>

                    {/* Translation */}
                    {translation && translation.success ? (
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-primary">
                              Translation
                            </span>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSpeak(translation.translatedText)}
                              >
                                <Volume2 className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopy(
                                  `${translation.translatedText}\n${translation.pronunciation}`,
                                  phrase.id
                                )}
                              >
                                {copiedId === phrase.id ? (
                                  <Check className="h-3 w-3 text-green-600" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                          </div>
                          <div className="text-lg font-medium text-foreground">
                            {translation.translatedText}
                          </div>
                        </div>

                        <div>
                          <span className="text-xs text-muted-foreground">Pronunciation:</span>
                          <div className="text-sm italic text-muted-foreground">
                            {translation.pronunciation}
                          </div>
                        </div>

                        {/* Cultural Context */}
                        {translation.culturalNotes && (
                          <div className="bg-accent/50 p-2 rounded text-xs text-muted-foreground">
                            <strong>Cultural:</strong> {translation.culturalNotes}
                          </div>
                        )}

                        {/* Body Gestures */}
                        {translation.bodyGestures && (
                          <div className="bg-primary/10 p-2 rounded text-xs text-primary">
                            <strong>Gestures:</strong> {translation.bodyGestures}
                          </div>
                        )}

                        {/* When to Use */}
                        {translation.whenToUse && (
                          <div className="bg-blue-50 p-2 rounded text-xs text-blue-800">
                            <strong>When to use:</strong> {translation.whenToUse}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <div className="text-sm mt-2">Translating...</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Stats */}
          <div className="text-center text-sm text-muted-foreground">
            Showing {filteredPhrases.length} of {phrases.length} phrases in {supportedLanguages.find(l => l.code === selectedLanguage)?.name || selectedLanguage}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhraseHelper;