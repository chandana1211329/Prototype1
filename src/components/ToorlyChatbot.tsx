import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Minimize2, Maximize2, MapPin, Calendar, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface TravelPlan {
  destination: string;
  duration: string;
  budget: string;
  startDate?: string;
  interests: string[];
}

const ToorlyChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [travelPlan, setTravelPlan] = useState<TravelPlan>({
    destination: '',
    duration: '',
    budget: '',
    interests: []
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const SYSTEM_PROMPT = `You are TOORLY, an expert AI travel assistant specialized in India travel planning.

PRIMARY OBJECTIVE: Help travelers plan perfect trips to India with budget, duration, and guidance.

CAPABILITIES:
- Travel itinerary planning
- Budget estimation and breakdown
- Duration recommendations
- Destination suggestions
- Transportation guidance
- Accommodation recommendations
- Activity and attraction suggestions
- Travel tips and best practices

RESPONSE STYLE:
- Friendly, helpful, and professional
- Structured responses with clear headings
- Practical and actionable advice
- Budget-conscious suggestions
- Time-aware recommendations

ALWAYS ASK FOR:
- Destination preferences
- Travel duration
- Budget range
- Travel dates (if available)
- Interests and preferences`;

  const generateResponse = async (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for planning requests
    if (lowerMessage.includes('plan') || lowerMessage.includes('itinerary') || lowerMessage.includes('trip')) {
      return `I'd love to help you plan your trip to India! To create the perfect itinerary, I need to know:

📍 **Destination**: Which cities or regions in India are you interested in?
📅 **Duration**: How many days do you have?
💰 **Budget**: What's your approximate budget range?
🎯 **Interests**: What do you enjoy? (culture, food, adventure, history, nature, etc.)

Once you share these details, I can create a detailed day-by-day plan!`;
    }
    
    // Check for budget questions
    if (lowerMessage.includes('budget') || lowerMessage.includes('cost') || lowerMessage.includes('money')) {
      return `Here's a general budget guide for India travel:

**Budget Categories:**
- **Budget**: ₹1,500-2,500/day ($20-35/day)
  - Hostels, local transport, street food
- **Mid-range**: ₹3,000-5,000/day ($40-70/day)
  - 3-star hotels, mix of transport, restaurants
- **Luxury**: ₹8,000+/day ($110+/day)
  - 5-star hotels, private transport, fine dining

**Major Expenses:**
- Flights: Vary greatly by season
- Accommodation: ₹800-15,000/night
- Food: ₹200-2,000/day
- Transport: ₹500-3,000/day
- Activities: ₹500-5,000/day

What's your preferred budget range?`;
    }
    
    // Check for duration questions
    if (lowerMessage.includes('duration') || lowerMessage.includes('how many days') || lowerMessage.includes('how long')) {
      return `Recommended trip durations for India:

**Short Trips (3-5 days):**
- Focus on one city (Delhi, Mumbai, Bangalore)
- Perfect for business travelers or weekend getaways

**Medium Trips (7-10 days):**
- 2-3 cities in one region
- Golden Triangle: Delhi-Agra-Jaipur
- South India: Bangalore-Mysore-Ooty

**Extended Trips (14+ days):**
- Multiple regions
- North + South or West + East
- Comprehensive cultural experience

**Ideal Duration**: 10-14 days for first-time visitors to experience India's diversity without rushing.

How many days do you have for your trip?`;
    }
    
    // Check for destination suggestions
    if (lowerMessage.includes('where') || lowerMessage.includes('destination') || lowerMessage.includes('visit')) {
      return `🇮🇳 **Top India Destinations:**

**North India:**
- **Delhi**: History, culture, food capital
- **Agra**: Taj Mahal, Mughal architecture
- **Jaipur**: Pink City, palaces, forts
- **Varanasi**: Spiritual heart, Ganges

**South India:**
- **Bangalore**: Tech hub, gardens, nightlife
- **Kerala**: Backwaters, beaches, ayurveda
- **Chennai**: Temples, culture, cuisine
- **Goa**: Beaches, Portuguese heritage

**West India:**
- **Mumbai**: Bollywood, finance, street food
- **Udaipur**: Lakes, palaces, romance

**East India:**
- **Kolkata**: Colonial architecture, literature, sweets
- **Darjeeling**: Tea gardens, mountains

What type of experience interests you most?`;
    }
    
    // Check for transportation
    if (lowerMessage.includes('transport') || lowerMessage.includes('travel') || lowerMessage.includes('how to get')) {
      return `**Transportation Options in India:**

**Domestic Flights:**
- Fastest option for long distances
- Major airlines: Air India, IndiGo, SpiceJet
- Book 2-3 months in advance for best prices

**Trains:**
- Indian Railway: The backbone of travel
- Classes: Sleeper, AC 3-tier, AC 2-tier, AC 1st
- Book 60-120 days in advance
- IRCTC app for booking

**Buses:**
- State transport and private operators
- Comfortable Volvo/AC buses for intercity
- RedBus app for easy booking

**Local Transport:**
- Metro cities: Delhi, Mumbai, Bangalore, Chennai
- Auto-rickshaws: Negotiate fare or use meter
- Uber/Ola: Available in most cities
- Local buses: Economical but crowded

**Tips:**
- Download Google Maps offline
- Use local transport apps
- Keep extra time for traffic

Need specific transport advice for your route?`;
    }
    
    // Check for scam/fraud questions
    if (lowerMessage.includes('scam') || lowerMessage.includes('fake') || lowerMessage.includes('fraud') || 
        lowerMessage.includes('authentic') || lowerMessage.includes('genuine') || lowerMessage.includes('real')) {
      return `🛡️ **Avoiding Tourist Scams in India:**

**Common Scams to Watch For:**
- **Overpriced souvenirs**: 3-4x market price in tourist areas
- **Fake gemstones**: Dyed glass sold as precious gems
- **'Government approved' scams**: Fake certificates
- **Taxi overcharging**: Fixed meters or long routes
- **Tour guide commissions**: Taking you to expensive shops

**📸 Use Our Scam Detection Scanner:**
Click the orange shield button on your screen to scan any item before buying! Our AI will:
- Analyze the item photo
- Provide fair market pricing
- Flag potential scams
- Give bargaining tips

**Safe Shopping Tips:**
- Shop at government emporiums for fixed prices
- Always compare prices in 2-3 shops
- Learn basic bargaining (start at 50% of asking price)
- Ask for authenticity certificates for expensive items
- Avoid 'special tourist discounts'

**Red Flags:**
- Pressure to buy immediately
- 'One-time special offer'
- Refusal to provide receipts
- Items that look 'too perfect'

Need help with a specific purchase? Use the scanner or ask me!`;
    }
    return `Hello! I'm TOORLY, your AI travel assistant for India. I can help you with:

🗺️ **Travel Planning** - Custom itineraries
💰 **Budget Planning** - Cost breakdowns
📅 **Duration Guidance** - Trip timing
📍 **Destination Ideas** - Best places to visit
🚗 **Transportation** - Getting around
🏨 **Accommodation** - Where to stay
🎯 **Activities** - What to do
🛡️ **Scam Detection** - Avoid tourist fraud (use orange scanner!)

What would you like help with for your India trip?`;
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
        content: "👋 Hi! I'm TOORLY, your AI travel assistant for India. I can help you plan your perfect trip with budget guidance, duration recommendations, and travel tips. Where would you like to explore in India?",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700"
        size="icon"
      >
        <MapPin className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className={`fixed bottom-20 left-6 z-50 transition-all duration-300 ${isMinimized ? 'w-80' : 'w-96'}`}>
      <Card className="shadow-xl border-2">
        <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span className="font-semibold">TOORLY</span>
            <Badge variant="secondary" className="text-xs bg-white/20 text-white">Travel Assistant</Badge>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-white/20"
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
                          ? 'bg-blue-600 text-white ml-auto'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {message.role === 'assistant' ? (
                          <MapPin className="h-4 w-4" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                        <span className="text-xs opacity-70">
                          {message.role === 'assistant' ? 'TOORLY' : 'You'}
                        </span>
                      </div>
                      <div className="text-sm leading-relaxed whitespace-pre-line">
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-xs opacity-70">TOORLY</span>
                      </div>
                      <div className="text-sm">Planning your trip...</div>
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
                  placeholder="Ask about travel planning, budget, or destinations..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  size="icon"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                TOORLY • AI Travel Assistant • Your India trip planner
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default ToorlyChatbot;
