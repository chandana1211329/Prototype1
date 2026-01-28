// Translation Service for KlassyGo - Multilingual Language Converter

export interface TranslationRequest {
  inputText: string;
  sourceLanguage: string;
  targetLanguage: string;
  mode: 'basic' | 'conversational' | 'cultural';
  userContext?: {
    nationality?: string;
    purpose?: 'tourism' | 'business' | 'study';
    location?: string;
  };
}

export interface TranslationResponse {
  success: boolean;
  translatedText: string;
  pronunciation: string;
  context: string;
  formalInformal: 'formal' | 'informal' | 'neutral';
  culturalNotes?: string;
  bodyGestures?: string;
  whenToUse?: string;
  alternatives?: string[];
  error?: string;
}

export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
  region: string;
  isRTL: boolean;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English', region: 'Global', isRTL: false },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'North India', isRTL: false },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', region: 'South India', isRTL: false },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', region: 'South India', isRTL: false },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', region: 'South India', isRTL: false },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', region: 'South India', isRTL: false },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', region: 'East India', isRTL: false },
];

class TranslationService {
  private cache = new Map<string, TranslationResponse>();
  private readonly API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Generate cache key for translations
  private generateCacheKey(request: TranslationRequest): string {
    return `${request.sourceLanguage}-${request.targetLanguage}-${request.mode}-${request.inputText.toLowerCase()}`;
  }

  // Check cache for existing translation
  private getCachedTranslation(request: TranslationRequest): TranslationResponse | null {
    const cacheKey = this.generateCacheKey(request);
    return this.cache.get(cacheKey) || null;
  }

  // Store translation in cache
  private setCachedTranslation(request: TranslationRequest, response: TranslationResponse): void {
    const cacheKey = this.generateCacheKey(request);
    this.cache.set(cacheKey, response);
  }

  // Generate AI prompt for translation based on mode
  private generatePrompt(request: TranslationRequest): string {
    const { inputText, sourceLanguage, targetLanguage, mode, userContext } = request;
    
    let basePrompt = `You are a cultural language expert helping foreign tourists communicate respectfully in India. Translate the following text with cultural context.

SOURCE LANGUAGE: ${sourceLanguage}
TARGET LANGUAGE: ${targetLanguage}
TEXT TO TRANSLATE: "${inputText}"
MODE: ${mode}`;

    // Add user context if available
    if (userContext) {
      basePrompt += `
USER CONTEXT:
- Nationality: ${userContext.nationality || 'Unknown'}
- Purpose of visit: ${userContext.purpose || 'Unknown'}
- Location in India: ${userContext.location || 'Unknown'}`;
    }

    // Mode-specific instructions
    switch (mode) {
      case 'basic':
        basePrompt += `
TRANSLATION REQUIREMENTS:
- Provide accurate, simple translation
- Use standard, commonly understood form
- Include pronunciation in Latin script
- Keep it straightforward and clear

RESPONSE FORMAT:
{
  "success": true,
  "translatedText": "...",
  "pronunciation": "...",
  "context": "Basic translation",
  "formalInformal": "neutral"
}`;
        break;

      case 'conversational':
        basePrompt += `
TRANSLATION REQUIREMENTS:
- Use tourist-friendly, conversational phrasing
- Maintain polite and respectful tone
- Use commonly spoken form (not textbook language)
- Include pronunciation in Latin script
- Add context about when to use this phrase

RESPONSE FORMAT:
{
  "success": true,
  "translatedText": "...",
  "pronunciation": "...",
  "context": "When to use this phrase in conversation",
  "formalInformal": "informal",
  "whenToUse": "Use this when..."
}`;
        break;

      case 'cultural':
        basePrompt += `
TRANSLATION REQUIREMENTS:
- Provide literal translation
- Explain cultural meaning and significance
- Include body gestures (if applicable)
- Explain when and how to use appropriately
- Add cultural notes about respect and etiquette
- Include pronunciation in Latin script
- Provide alternatives if available

RESPONSE FORMAT:
{
  "success": true,
  "translatedText": "...",
  "pronunciation": "...",
  "context": "Cultural meaning and usage",
  "formalInformal": "formal",
  "culturalNotes": "Cultural significance...",
  "bodyGestures": "Body gestures...",
  "whenToUse": "Use this when...",
  "alternatives": ["Alternative 1", "Alternative 2"]
}`;
        break;
    }

    basePrompt += `

IMPORTANT GUIDELINES:
- Avoid slang unless specifically requested
- Prefer polite and respectful phrases
- Consider the user's cultural background
- Never generate offensive or culturally inappropriate content
- For greetings, include folded hands gesture (Namaste style)
- For questions, use polite forms
- For requests, use respectful phrasing

Translate and respond in JSON format only.`;

    return basePrompt;
  }

  // Call AI service for translation
  private async callAIService(prompt: string): Promise<any> {
    try {
      // In production, this would call your actual AI service
      // For now, we'll simulate with mock responses
      
      // Mock response for demonstration (instant)
      const mockResponse = this.generateMockResponse(prompt);
      
      // In production, replace with actual API call:
      // const response = await fetch(`${this.API_BASE_URL}/translate`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ prompt }),
      // });
      // return response.json();
      
      return mockResponse;
    } catch (error) {
      console.error('Translation API error:', error);
      throw new Error('Translation service unavailable');
    }
  }

  // Generate mock response for demonstration
  private generateMockResponse(prompt: string): any {
    // Extract key information from prompt
    const targetLanguage = prompt.match(/TARGET LANGUAGE: (\w+)/)?.[1] || 'hi';
    const inputText = prompt.match(/TEXT TO TRANSLATE: "([^"]+)"/)?.[1] || 'Hello';
    const mode = prompt.match(/MODE: (\w+)/)?.[1] || 'basic';

    // Mock translations based on common phrases
    const mockTranslations: Record<string, Record<string, any>> = {
      'hello': {
        hi: {
          basic: {
            success: true,
            translatedText: 'नमस्ते',
            pronunciation: 'Namaste',
            context: 'Basic greeting',
            formalInformal: 'neutral'
          },
          conversational: {
            success: true,
            translatedText: 'नमस्ते',
            pronunciation: 'Namaste',
            context: 'Polite greeting used in daily conversations',
            formalInformal: 'informal',
            whenToUse: 'Use when meeting someone, entering homes, or starting conversations'
          },
          cultural: {
            success: true,
            translatedText: 'नमस्ते',
            pronunciation: 'Namaste',
            context: 'Traditional Indian greeting showing respect',
            formalInformal: 'formal',
            culturalNotes: 'Namaste is more than just "hello" - it means "I bow to the divine in you"',
            bodyGestures: 'Fold hands together at chest level, slight bow of head',
            whenToUse: 'Use when greeting anyone, especially elders, when entering homes or temples',
            alternatives: ['प्रणाम (Pranam)', 'जय हिंदी (Jai Hind)']
          }
        }
      },
      'thank you': {
        hi: {
          basic: {
            success: true,
            translatedText: 'धन्यवाद',
            pronunciation: 'Dhanyavaad',
            context: 'Expression of gratitude',
            formalInformal: 'neutral'
          },
          conversational: {
            success: true,
            translatedText: 'धन्यवाद',
            pronunciation: 'Dhanyavaad',
            context: 'Polite way to say thank you in everyday situations',
            formalInformal: 'informal',
            whenToUse: 'Use when someone helps you or gives you something'
          },
          cultural: {
            success: true,
            translatedText: 'धन्यवाद',
            pronunciation: 'Dhanyavaad',
            context: 'Formal expression of gratitude',
            formalInformal: 'formal',
            culturalNotes: 'Showing gratitude is highly valued in Indian culture',
            bodyGestures: 'Can be accompanied by slight bow or folded hands',
            whenToUse: 'Use when receiving help, gifts, or services',
            alternatives: ['शुक्रिया (Shukriya)', 'बहुत बहुत धन्यवाद (Bahut bahut dhanyavaad)']
          }
        }
      }
    };

    // Return mock response or fallback
    const lowerInput = inputText.toLowerCase();
    const mockData = mockTranslations[lowerInput]?.[targetLanguage]?.[mode];
    
    if (mockData) {
      return mockData;
    }

    // Fallback mock response
    return {
      success: true,
      translatedText: `[Mock translation of "${inputText}" in ${targetLanguage}]`,
      pronunciation: `[Mock pronunciation]`,
      context: 'Mock translation',
      formalInformal: 'neutral'
    };
  }

  // Main translation method
  async translate(request: TranslationRequest): Promise<TranslationResponse> {
    // Check cache first
    const cached = this.getCachedTranslation(request);
    if (cached) {
      return cached;
    }

    try {
      // Generate prompt for AI
      const prompt = this.generatePrompt(request);
      
      // Call AI service
      const aiResponse = await this.callAIService(prompt);
      
      // Parse response
      let translationResponse: TranslationResponse;
      
      if (typeof aiResponse === 'string') {
        // Parse JSON string response
        translationResponse = JSON.parse(aiResponse);
      } else {
        // Use object response directly
        translationResponse = aiResponse;
      }

      // Validate response structure
      if (!translationResponse.success) {
        throw new Error(translationResponse.error || 'Translation failed');
      }

      // Cache the successful translation
      this.setCachedTranslation(request, translationResponse);
      
      return translationResponse;
    } catch (error) {
      console.error('Translation error:', error);
      
      // Return error response
      return {
        success: false,
        translatedText: '',
        pronunciation: '',
        context: '',
        formalInformal: 'neutral',
        error: error instanceof Error ? error.message : 'Translation failed'
      };
    }
  }

  // Get supported languages
  getSupportedLanguages(): SupportedLanguage[] {
    return SUPPORTED_LANGUAGES;
  }

  // Get language by code
  getLanguageByCode(code: string): SupportedLanguage | undefined {
    return SUPPORTED_LANGUAGES.find(lang => lang.code === code);
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }

  // Get cache statistics
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Export singleton instance
export const translationService = new TranslationService();
