import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Volume2, Copy, Check, Globe, Languages, MessageSquare, Users } from 'lucide-react';
import { translationService, TranslationRequest, TranslationResponse, SupportedLanguage } from '@/services/translationService';

interface TranslationToolProps {
  className?: string;
  onTranslationComplete?: (result: TranslationResponse) => void;
}

const TranslationTool: React.FC<TranslationToolProps> = ({ className, onTranslationComplete }) => {
  const [inputText, setInputText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('hi');
  const [mode, setMode] = useState<'basic' | 'conversational' | 'cultural'>('conversational');
  const [isLoading, setIsLoading] = useState(false);
  const [translationResult, setTranslationResult] = useState<TranslationResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supportedLanguages = translationService.getSupportedLanguages();

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('Please enter text to translate');
      return;
    }

    setIsLoading(true);
    setError(null);
    setTranslationResult(null);

    try {
      const request: TranslationRequest = {
        inputText: inputText.trim(),
        sourceLanguage,
        targetLanguage,
        mode,
        userContext: {
          nationality: 'Foreign Tourist',
          purpose: 'tourism'
        }
      };

      const result = await translationService.translate(request);
      
      if (result.success) {
        setTranslationResult(result);
        onTranslationComplete?.(result);
      } else {
        setError(result.error || 'Translation failed');
      }
    } catch (err) {
      setError('Translation service unavailable');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (translationResult) {
      const textToCopy = `${translationResult.translatedText}\n\nPronunciation: ${translationResult.pronunciation}\n\n${translationResult.context}`;
      
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    }
  };

  const handleSpeak = () => {
    if (translationResult && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(translationResult.translatedText);
      utterance.lang = targetLanguage;
      speechSynthesis.speak(utterance);
    }
  };

  const clearAll = () => {
    setInputText('');
    setTranslationResult(null);
    setError(null);
    setCopied(false);
  };

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    if (translationResult) {
      setInputText(translationResult.translatedText);
      setTranslationResult(null);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-primary" />
            Cultural Language Translator
          </CardTitle>
          <CardDescription>
            Translate English to Indian languages with cultural context and proper pronunciation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Language Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source-lang">From</Label>
              <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source language" />
                </SelectTrigger>
                <SelectContent>
                  {supportedLanguages.map((lang) => (
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

            <div className="flex items-center justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={swapLanguages}
                className="mt-6"
              >
                <Globe className="h-4 w-4 mr-2" />
                Swap
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-lang">To</Label>
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target language" />
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
          </div>

          {/* Translation Mode */}
          <div className="space-y-2">
            <Label>Translation Mode</Label>
            <Select value={mode} onValueChange={(value: any) => setMode(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select translation mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Basic Translation</div>
                      <div className="text-sm text-muted-foreground">Simple, accurate translation</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="conversational">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Conversational</div>
                      <div className="text-sm text-muted-foreground">Tourist-friendly phrasing</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="cultural">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Cultural-Aware</div>
                      <div className="text-sm text-muted-foreground">With context and gestures</div>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Input Text */}
          <div className="space-y-2">
            <Label htmlFor="input-text">Text to Translate</Label>
            <Input
              id="input-text"
              placeholder="Enter text to translate..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleTranslate}
              disabled={isLoading || !inputText.trim()}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Translating...
                </>
              ) : (
                <>
                  <Languages className="mr-2 h-4 w-4" />
                  Translate
                </>
              )}
            </Button>
            <Button variant="outline" onClick={clearAll}>
              Clear
            </Button>
          </div>

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Translation Result */}
          {translationResult && (
            <div className="space-y-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Translated Text */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-base font-semibold">Translation</Label>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleSpeak}
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCopy}
                          >
                            {copied ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className={`text-lg font-medium ${translationResult.formalInformal === 'formal' ? 'text-primary' : 'text-foreground'}`}>
                        {translationResult.translatedText}
                      </div>
                    </div>

                    {/* Pronunciation */}
                    <div>
                      <Label className="text-sm font-medium">Pronunciation</Label>
                      <div className="text-muted-foreground italic">
                        {translationResult.pronunciation}
                      </div>
                    </div>

                    {/* Context */}
                    <div>
                      <Label className="text-sm font-medium">Context</Label>
                      <div className="text-sm text-muted-foreground">
                        {translationResult.context}
                      </div>
                    </div>

                    {/* Cultural Notes (for cultural mode) */}
                    {translationResult.culturalNotes && (
                      <div>
                        <Label className="text-sm font-medium">Cultural Notes</Label>
                        <div className="text-sm text-muted-foreground bg-accent/50 p-3 rounded-lg">
                          {translationResult.culturalNotes}
                        </div>
                      </div>
                    )}

                    {/* Body Gestures (for cultural mode) */}
                    {translationResult.bodyGestures && (
                      <div>
                        <Label className="text-sm font-medium">Body Gestures</Label>
                        <div className="text-sm text-muted-foreground bg-accent/50 p-3 rounded-lg">
                          {translationResult.bodyGestures}
                        </div>
                      </div>
                    )}

                    {/* When to Use */}
                    {translationResult.whenToUse && (
                      <div>
                        <Label className="text-sm font-medium">When to Use</Label>
                        <div className="text-sm text-muted-foreground bg-accent/50 p-3 rounded-lg">
                          {translationResult.whenToUse}
                        </div>
                      </div>
                    )}

                    {/* Alternatives */}
                    {translationResult.alternatives && translationResult.alternatives.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium">Alternatives</Label>
                        <div className="flex flex-wrap gap-2">
                          {translationResult.alternatives.map((alt, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {alt}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Formal/Informal Indicator */}
                    <div className="flex items-center gap-2">
                      <Badge variant={translationResult.formalInformal === 'formal' ? 'default' : 'secondary'}>
                        {translationResult.formalInformal}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {translationResult.formalInformal === 'formal' ? 'Respectful tone' : 'Casual tone'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TranslationTool;
