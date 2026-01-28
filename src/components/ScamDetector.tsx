import React, { useState, useRef } from 'react';
import { Camera, X, Shield, AlertTriangle, CheckCircle, Info, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ScamAnalysis {
  itemName: string;
  estimatedPrice: {
    min: number;
    max: number;
    currency: string;
  };
  riskLevel: 'low' | 'medium' | 'high';
  warnings: string[];
  tips: string[];
  marketPrice: string;
  bargainingRange: string;
}

const ScamDetector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ScamAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Price database for common tourist items in India
  const priceDatabase = {
    'jewelry': { min: 500, max: 5000, currency: '₹' },
    'textiles': { min: 200, max: 2000, currency: '₹' },
    'spices': { min: 100, max: 800, currency: '₹' },
    'handicrafts': { min: 300, max: 3000, currency: '₹' },
    'tea': { min: 150, max: 1000, currency: '₹' },
    'leather': { min: 800, max: 8000, currency: '₹' },
    'carpets': { min: 2000, max: 20000, currency: '₹' },
    'art': { min: 500, max: 10000, currency: '₹' },
    'souvenirs': { min: 50, max: 500, currency: '₹' },
    'electronics': { min: 1000, max: 15000, currency: '₹' }
  };

  const analyzeImage = async (imageData: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis (in real app, this would call an AI service)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis based on common tourist scams
    const mockAnalyses: ScamAnalysis[] = [
      {
        itemName: "Traditional Indian Jewelry Set",
        estimatedPrice: { min: 800, max: 2500, currency: '₹' },
        riskLevel: 'medium',
        warnings: [
          "Be cautious of 'precious metal' claims without certification",
          "Tourist areas often have 3-4x inflated prices",
          "Ask for authenticity certificates for gemstones"
        ],
        tips: [
          "Compare prices in multiple shops before buying",
          "Government emporiums have fixed prices",
          "Bargaining is expected in local markets"
        ],
        marketPrice: "₹800-2,500 for authentic silver jewelry",
        bargainingRange: "Start at 50% of asking price, settle around 60-70%"
      },
      {
        itemName: "Kashmiri Carpet",
        estimatedPrice: { min: 5000, max: 15000, currency: '₹' },
        riskLevel: 'high',
        warnings: [
          "Many 'Kashmiri' carpets are machine-made from other regions",
          "Silk content claims are often exaggerated",
          "Tourist shops may show 'antique' pieces that are new"
        ],
        tips: [
          "Check the weave - handmade carpets have irregular backs",
          "Ask for the knot count (higher = better quality)",
          "Government handicraft stores have authentic pieces"
        ],
        marketPrice: "₹5,000-15,000 for genuine handmade carpets",
        bargainingRange: "Can bargain 30-40% in tourist shops"
      },
      {
        itemName: "Spice Collection Set",
        estimatedPrice: { min: 200, max: 600, currency: '₹' },
        riskLevel: 'low',
        warnings: [
          "Pre-packaged tourist spice mixes may be old",
          "Some sellers add coloring agents to spices"
        ],
        tips: [
          "Buy from government spice emporiums or local markets",
          "Check aroma and color - fresh spices are vibrant",
          "Ask for whole spices rather than powders"
        ],
        marketPrice: "₹200-600 for quality spice sets",
        bargainingRange: "Limited bargaining in government stores"
      },
      {
        itemName: "Leather Bag",
        estimatedPrice: { min: 1200, max: 3500, currency: '₹' },
        riskLevel: 'medium',
        warnings: [
          "Many 'leather' goods are actually leatherette",
          "Brand name knock-offs are common in tourist areas"
        ],
        tips: [
          "Check the smell - real leather has distinct odor",
          "Look for natural imperfections in the material",
          "Ask about the type of leather (genuine, top-grain, etc.)"
        ],
        marketPrice: "₹1,200-3,500 for genuine leather bags",
        bargainingRange: "20-30% bargaining is reasonable"
      }
    ];

    // Return random analysis for demo
    const randomAnalysis = mockAnalyses[Math.floor(Math.random() * mockAnalyses.length)];
    setAnalysis(randomAnalysis);
    setIsAnalyzing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImage(result);
        analyzeImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    fileInputRef.current?.click();
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-24 z-50 rounded-full w-14 h-14 shadow-lg bg-orange-600 hover:bg-orange-700"
        size="icon"
      >
        <Shield className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6" />
              <CardTitle className="text-xl">Scam Detection Scanner</CardTitle>
              <Badge variant="secondary" className="bg-white/20 text-white">Anti-Fraud</Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* Instructions */}
          <Alert>
            <Camera className="h-4 w-4" />
            <AlertDescription>
              Take a photo or upload an image of any item you're considering buying. Our AI will analyze it and provide fair market pricing to help you avoid tourist scams.
            </AlertDescription>
          </Alert>

          {/* Image Upload Area */}
          {!image && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Camera className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Scan Item for Analysis</h3>
              <p className="text-gray-600 mb-4">Upload or capture a photo of the item</p>
              <div className="flex gap-3 justify-center">
                <Button onClick={handleCameraCapture} className="bg-orange-600 hover:bg-orange-700">
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}

          {/* Image Preview */}
          {image && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={image}
                  alt="Scanned item"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setImage(null);
                    setAnalysis(null);
                  }}
                  className="absolute top-2 right-2 bg-white/90"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Analysis Results */}
              {isAnalyzing && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Analyzing item and checking market prices...</p>
                </div>
              )}

              {analysis && !isAnalyzing && (
                <div className="space-y-4">
                  {/* Item Name and Risk Level */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{analysis.itemName}</h3>
                    <Badge className={`flex items-center gap-1 ${getRiskColor(analysis.riskLevel)}`}>
                      {getRiskIcon(analysis.riskLevel)}
                      {analysis.riskLevel.toUpperCase()} RISK
                    </Badge>
                  </div>

                  {/* Price Estimate */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">💰 Fair Price Range</h4>
                    <p className="text-2xl font-bold text-blue-800">
                      {analysis.estimatedPrice.currency}{analysis.estimatedPrice.min} - {analysis.estimatedPrice.currency}{analysis.estimatedPrice.max}
                    </p>
                    <p className="text-sm text-blue-700 mt-1">{analysis.marketPrice}</p>
                  </div>

                  {/* Bargaining Tips */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">🤝 Bargaining Guide</h4>
                    <p className="text-sm text-green-800">{analysis.bargainingRange}</p>
                  </div>

                  {/* Warnings */}
                  {analysis.warnings.length > 0 && (
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-900 mb-2">⚠️ Scam Warnings</h4>
                      <ul className="text-sm text-red-800 space-y-1">
                        {analysis.warnings.map((warning, index) => (
                          <li key={index}>• {warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tips */}
                  {analysis.tips.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">💡 Smart Shopping Tips</h4>
                      <ul className="text-sm text-gray-800 space-y-1">
                        {analysis.tips.map((tip, index) => (
                          <li key={index}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        setImage(null);
                        setAnalysis(null);
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Scan Another Item
                    </Button>
                    <Button
                      onClick={() => setIsOpen(false)}
                      className="flex-1 bg-orange-600 hover:bg-orange-700"
                    >
                      Got it, Thanks!
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScamDetector;
