import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Minimize2, Maximize2, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { translationService, TranslationRequest } from '@/services/translationService';
import TranslationTool from './TranslationTool';
import { culturalKnowledgeBase, fallbackResponses, safetyChecks } from '@/data/culturalKnowledge';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface UserProfile {
  nationality: string;
  purpose: 'tourism' | 'study' | 'business' | 'unknown';
  location: string;
  season: string;
}

const KlassygoChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    nationality: 'unknown',
    purpose: 'unknown',
    location: 'unknown',
    season: 'unknown'
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const SYSTEM_PROMPT = `You are KLASSYGO_AI, an expert cultural intelligence system designed to help foreigners understand Indian tourism, culture, traditions, festivals, food, etiquette, languages, and social norms.

PRIMARY OBJECTIVE: Reduce cultural confusion and help users interact respectfully and confidently in India.

USER PROFILE ASSUMPTIONS:
- User is a foreign national or non-Indian
- User may have zero cultural context
- User intent is learning, not offending

DOMAIN SCOPE (ALLOWED):
- Indian culture and traditions
- Tourism places (informational only)
- Festivals, food, clothing, language basics
- Social etiquette and cultural norms
- Do's and Don'ts for foreigners

OUT OF SCOPE (DISALLOWED):
- Travel bookings or packages
- Hotel/flight/train/cab details
- Political or religious debates
- Legal, medical, or emergency advice beyond general guidance

TONE & STYLE:
- Friendly, neutral, culturally respectful
- Simple English, short sentences
- No slang unless explained
- No assumptions about beliefs or values

OUTPUT RULES:
- Prefer structured answers (headings/bullets)
- Explain cultural reasoning ("why this matters")
- Offer safe alternatives when unsure
- Avoid absolute statements unless universally true`;

  const generateContextPrompt = () => {
    return `CONTEXT:
- User nationality: ${userProfile.nationality}
- Purpose of visit: ${userProfile.purpose}
- Location in India: ${userProfile.location}
- Date or season: ${userProfile.season}

INSTRUCTION: Use this context ONLY if relevant. If context is missing, provide general advice and suggest observing locals or asking politely.`;
  };

  const formatResponse = (response: string) => {
    
    const sections = response.split('\n\n');
    return sections.map(section => {
      if (section.includes('Why This Matters:')) {
        return (
          <div key={section} className="mb-3">
            <h4 className="font-semibold text-primary mb-2">Why This Matters</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {section.replace('Why This Matters:', '').split('\n').filter((line, index) => index > 0 && line.trim()).map((line, i) => (
                <li key={i}>{line.replace(/^[-*]\s*/, '')}</li>
              ))}
            </ul>
          </div>
        );
      } else if (section.includes('What You Should Do:')) {
        return (
          <div key={section} className="mb-3">
            <h4 className="font-semibold text-green-600 mb-2">What You Should Do</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {section.replace('What You Should Do:', '').split('\n').filter((line, index) => index > 0 && line.trim()).map((line, i) => (
                <li key={i}>{line.replace(/^[-*]\s*/, '')}</li>
              ))}
            </ul>
          </div>
        );
      } else if (section.includes('What to Avoid:')) {
        return (
          <div key={section} className="mb-3">
            <h4 className="font-semibold text-red-600 mb-2">What to Avoid</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {section.replace('What to Avoid:', '').split('\n').filter((line, index) => index > 0 && line.trim()).map((line, i) => (
                <li key={i}>{line.replace(/^[-*]\s*/, '')}</li>
              ))}
            </ul>
          </div>
        );
      } else if (section.includes('Extra Tip:')) {
        return (
          <div key={section} className="mb-3">
            <h4 className="font-semibold text-blue-600 mb-2">Extra Tip</h4>
            <p className="text-sm text-muted-foreground">
              {section.replace('Extra Tip:', '').trim()}
            </p>
          </div>
        );
      } else {
        return (
          <div key={section} className="mb-3">
            <p className="text-sm leading-relaxed">{section}</p>
          </div>
        );
      }
    });
  };

const generateResponse = async (userMessage: string) => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for translation requests
  if (lowerMessage.includes('how do you say') || lowerMessage.includes('translate') || 
      lowerMessage.includes('what is') || lowerMessage.includes('say in') ||
      lowerMessage.includes('speak in') || lowerMessage.includes('in hindi') ||
      lowerMessage.includes('in tamil') || lowerMessage.includes('in telugu')) {
    
    // Extract the phrase to translate
    const phraseMatch = userMessage.match(/(?:how do you say|translate|what is|say in|speak in|in)\s+["']([^"']+)["']/i);
    const phraseMatch2 = userMessage.match(/(?:how do you say|translate|what is|say in|speak in|in)\s+([^.?!]+)/i);
    
    const phraseToTranslate = phraseMatch?.[1] || phraseMatch2?.[1] || '';
    
    if (phraseToTranslate) {
      try {
        // Try to detect target language from message
        let targetLanguage = 'hi'; // default to Hindi
        
        if (lowerMessage.includes('tamil')) targetLanguage = 'ta';
        else if (lowerMessage.includes('telugu')) targetLanguage = 'te';
        else if (lowerMessage.includes('kannada')) targetLanguage = 'kn';
        else if (lowerMessage.includes('malayalam')) targetLanguage = 'ml';
        else if (lowerMessage.includes('bengali')) targetLanguage = 'bn';
        
        const translationResult = await translationService.translate({
          inputText: phraseToTranslate.trim(),
          sourceLanguage: 'en',
          targetLanguage,
          mode: 'cultural',
          userContext: {
            nationality: userProfile.nationality || 'Foreign Tourist',
            purpose: (userProfile.purpose === 'unknown' ? 'tourism' : userProfile.purpose) as 'tourism' | 'business' | 'study'
          }
        });
        
        if (translationResult.success) {
          let response = `${translationResult.translatedText}

📖 **Pronunciation**: ${translationResult.pronunciation}

🎭 **Cultural Context**: ${translationResult.context}`;
          
          if (translationResult.culturalNotes) {
            response += `\n\n💡 **Cultural Notes**: ${translationResult.culturalNotes}`;
          }
          
          if (translationResult.bodyGestures) {
            response += `\n🙏 **Body Gestures**: ${translationResult.bodyGestures}`;
          }
          
          if (translationResult.whenToUse) {
            response += `\n📍 **When to Use**: ${translationResult.whenToUse}`;
          }
          
          if (translationResult.alternatives && translationResult.alternatives.length > 0) {
            response += `\n\n🔄 **Alternatives**:\n${translationResult.alternatives.map((alt) => `• ${alt}`).join('\n')}`;
          }
          
          return response;
        }
      } catch (error) {
        console.error('Translation error:', error);
        return fallbackResponses.unknown;
      }
    }
  }
  
  // Check for out-of-scope topics
  if (lowerMessage.includes('book') || lowerMessage.includes('hotel') || lowerMessage.includes('flight') || 
      lowerMessage.includes('train') || lowerMessage.includes('cab') || lowerMessage.includes('reservation')) {
    return fallbackResponses.outOfScope;
  }
  
  // Check for greetings
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('greeting') || 
      lowerMessage.includes('namaste')) {
    return fallbackResponses.greeting;
  }
  
  // Search knowledge base
  let response = null;
  let topic = null;
  
  if (lowerMessage.includes('greet') || lowerMessage.includes('hello') || lowerMessage.includes('etiquette') || 
      lowerMessage.includes('manners') || lowerMessage.includes('respect')) {
    topic = culturalKnowledgeBase.greetings;
  } else if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('dining') || 
             lowerMessage.includes('restaurant')) {
    topic = culturalKnowledgeBase.dining;
  } else if (lowerMessage.includes('dress') || lowerMessage.includes('clothes') || lowerMessage.includes('wear') || 
             lowerMessage.includes('outfit')) {
    topic = culturalKnowledgeBase.dress;
  } else if (lowerMessage.includes('festival') || lowerMessage.includes('celebration') || lowerMessage.includes('diwali') || 
             lowerMessage.includes('holi')) {
    topic = culturalKnowledgeBase.festivals;
  } else if (lowerMessage.includes('photo') || lowerMessage.includes('camera') || lowerMessage.includes('picture')) {
    topic = culturalKnowledgeBase.photography;
  } else if (lowerMessage.includes('shop') || lowerMessage.includes('buy') || lowerMessage.includes('bargain') || 
             lowerMessage.includes('market')) {
    topic = culturalKnowledgeBase.bargaining;
  } else if (lowerMessage.includes('transport') || lowerMessage.includes('travel') || lowerMessage.includes('taxi') || 
             lowerMessage.includes('rickshaw')) {
    topic = culturalKnowledgeBase.transportation;
  } else if (lowerMessage.includes('safe') || lowerMessage.includes('danger') || lowerMessage.includes('security')) {
    topic = culturalKnowledgeBase.safety;
  } else if (lowerMessage.includes('language') || lowerMessage.includes('speak') || lowerMessage.includes('hindi') || 
             lowerMessage.includes('communicate')) {
    topic = culturalKnowledgeBase.language;
  }
  
  if (topic) {
    // Format response according to KLASSYGO_AI structure
    response = `${topic.title}

${topic.content}

Why This Matters:
${topic.whyMatters.map(point => `- ${point}`).join('\n')}

What You Should Do:
${topic.shouldDo.map(point => `- ${point}`).join('\n')}

What to Avoid:
${topic.avoid.map(point => `- ${point}`).join('\n')}

Extra Tip:
${topic.extraTip}`;
  }
  
  // Apply safety checks
  if (response) {
    if (!safetyChecks.isCulturallyRespectful(response)) {
      response += "\n\nNote: Always approach cultural differences with respect and an open mind.";
    }
    if (!safetyChecks.mentionsVariation(response)) {
      response += "\n\nNote: Practices can vary by region, religion, and situation in India's diverse culture.";
    }
  }
  
  return response || fallbackResponses.unknown;
};
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error generating response:', error);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Add welcome message when chatbot first opens
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "🙏 Namaste! I'm KLASSYGO_AI, your cultural intelligence guide for India. I can help you understand Indian culture, traditions, etiquette, and tourism. How can I assist you today?",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-24 z-50 rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90"
        size="icon"
      >
        <Bot className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className={`fixed bottom-20 right-24 z-50 transition-all duration-300 ${isMinimized ? 'w-80' : 'w-96'}`}>
      <Card className="shadow-xl border-2">
        <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span className="font-semibold">KLASSYGO_AI</span>
            <Badge variant="secondary" className="text-xs">Cultural Guide</Badge>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <ScrollArea className="h-96 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground ml-auto'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {message.role === 'assistant' ? (
                          <Bot className="h-4 w-4" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                        <span className="text-xs opacity-70">
                          {message.role === 'assistant' ? 'KLASSYGO_AI' : 'You'}
                        </span>
                      </div>
                      <div className="text-sm leading-relaxed">
                        {message.role === 'assistant' ? formatResponse(message.content) : message.content}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4" />
                        <span className="text-xs opacity-70">KLASSYGO_AI</span>
                      </div>
                      <div className="text-sm">Thinking...</div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Indian culture, etiquette, or travel..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                KLASSYGO_AI • Cultural Intelligence System • Reducing cultural confusion
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default KlassygoChatbot;
