import { useState, useEffect } from 'react';
import { Phone, Shield, AlertTriangle, X, MapPin, Clock, User, MessageCircle, Send, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sosService } from '@/services/sosService';

interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface EmergencyService {
  name: string;
  type: 'police' | 'ambulance' | 'fire' | 'tourism';
  phone: string;
  icon: React.ReactNode;
  color: string;
}

const EmergencySOS = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSOSTriggered, setIsSOSTriggered] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const [isSilentMode, setIsSilentMode] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [shareMethod, setShareMethod] = useState<'sms' | 'whatsapp' | 'email'>('sms');
  const [recipientInput, setRecipientInput] = useState<string>('');

  // India emergency numbers
  const emergencyServices: EmergencyService[] = [
    {
      name: 'Police',
      type: 'police',
      phone: '100',
      icon: <Shield className="w-5 h-5" />,
      color: 'bg-blue-500'
    },
    {
      name: 'Ambulance',
      type: 'ambulance',
      phone: '108',
      icon: <Phone className="w-5 h-5" />,
      color: 'bg-red-500'
    },
    {
      name: 'Fire Department',
      type: 'fire',
      phone: '101',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'bg-orange-500'
    },
    {
      name: 'Tourism Helpline',
      type: 'tourism',
      phone: '1363',
      icon: <MapPin className="w-5 h-5" />,
      color: 'bg-green-500'
    }
  ];

  // Get user location
  const getCurrentLocation = async () => {
    setIsGettingLocation(true);
    setLocationError('');

    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      });

      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      });
    } catch (error) {
      setLocationError(error instanceof Error ? error.message : 'Unable to get location');
    } finally {
      setIsGettingLocation(false);
    }
  };

  // Generate Google Maps link
  const generateLocationLink = () => {
    if (!location) return '';
    return `https://maps.google.com/?q=${location.latitude},${location.longitude}`;
  };

  // Generate SOS message
  const generateSOSMessage = () => {
    return sosService.generateEmergencyMessage(userName, location || { latitude: 0, longitude: 0 });
  };

  // Send SOS
  const sendSOS = async () => {
    setIsSOSTriggered(true);
    
    if (!location) {
      await getCurrentLocation();
    }

    try {
      const result = await sosService.sendSOSAlert({
        userName,
        location: location || { latitude: 0, longitude: 0 },
        timestamp: new Date().toISOString(),
        message: generateSOSMessage(),
        userAgent: navigator.userAgent,
        sessionId: 'session_' + Date.now()
      });

      if (result.success) {
        console.log('SOS sent successfully:', result.alertId);
      } else {
        console.error('SOS failed:', result.error);
      }
    } catch (error) {
      console.error('SOS error:', error);
    }

    // Show success feedback
    setTimeout(() => {
      setIsSOSTriggered(false);
      setIsModalOpen(false);
    }, 3000);
  };

  // Make emergency call
  const makeEmergencyCall = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  // Share SOS
  const shareSOS = async () => {
    const message = generateSOSMessage();
    
    try {
      if (shareMethod === 'sms' && recipientInput) {
        await sosService.shareViaSMS(message, recipientInput);
      } else if (shareMethod === 'whatsapp') {
        await sosService.shareViaWhatsApp(message);
      } else if (shareMethod === 'email' && recipientInput) {
        await sosService.shareViaEmail(message, recipientInput);
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  // Toggle silent mode
  const toggleSilentMode = () => {
    setIsSilentMode(!isSilentMode);
    if (!isSilentMode) {
      // In silent mode, you might want to vibrate instead of make sound
      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
    }
  };

  // Get location on component mount
  useEffect(() => {
    getCurrentLocation();
    // Request notification permission for emergency alerts
    sosService.requestNotificationPermission();
  }, []);

  return (
    <>
      {/* Floating SOS Button - Vertical Strip */}
      <div className="fixed top-1/2 right-0 z-50 -translate-y-1/2">
        <Button
          onClick={() => setIsModalOpen(true)}
          className={`h-32 w-12 rounded-l-lg shadow-lg transition-all duration-300 ${
            isSilentMode 
              ? 'bg-gray-600 hover:bg-gray-700' 
              : 'bg-red-600 hover:bg-red-700 animate-pulse'
          }`}
          size="icon"
          aria-label="Emergency SOS"
        >
          {isSilentMode ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Shield className="w-5 h-5 text-white" />
          )}
        </Button>
        
        {/* Silent Mode Toggle */}
        <Button
          onClick={toggleSilentMode}
          variant="outline"
          size="sm"
          className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-background border-2"
        >
          {isSilentMode ? <VolumeX className="w-2 h-2" /> : <Volume2 className="w-2 h-2" />}
        </Button>
      </div>

      {/* SOS Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-background border border-border rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-border flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Emergency SOS</h2>
                    <p className="text-sm text-muted-foreground">Are you in danger? Help is one click away.</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 overflow-y-auto flex-grow">
              {/* Location Status */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Location Status</span>
                </div>
                {isGettingLocation ? (
                  <div className="text-sm text-muted-foreground">Getting location...</div>
                ) : locationError ? (
                  <div className="text-sm text-red-500">{locationError}</div>
                ) : location ? (
                  <div className="text-sm text-green-600">
                    Location acquired (Accuracy: ±{location.accuracy?.toFixed(0)}m)
                  </div>
                ) : (
                  <div className="text-sm text-yellow-600">Location unavailable</div>
                )}
              </div>

              {/* User Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Your Name (Optional)</span>
                </div>
                <Input
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="text-sm"
                />
              </div>

              {/* Emergency Services */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Emergency Services</h3>
                <div className="grid grid-cols-2 gap-2">
                  {emergencyServices.map((service) => (
                    <Button
                      key={service.type}
                      variant="outline"
                      onClick={() => makeEmergencyCall(service.phone)}
                      className="flex items-center gap-2 h-auto p-3"
                    >
                      <div className={`p-1 rounded ${service.color} text-white`}>
                        {service.icon}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium">{service.name}</div>
                        <div className="text-xs text-muted-foreground">{service.phone}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Share Options */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Share Alert</h3>
                <div className="flex gap-2">
                  <Button
                    variant={shareMethod === 'sms' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setShareMethod('sms')}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    SMS
                  </Button>
                  <Button
                    variant={shareMethod === 'whatsapp' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setShareMethod('whatsapp')}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    WhatsApp
                  </Button>
                  <Button
                    variant={shareMethod === 'email' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setShareMethod('email')}
                  >
                    <Send className="w-4 h-4 mr-1" />
                    Email
                  </Button>
                </div>
                
                {(shareMethod === 'sms' || shareMethod === 'email') && (
                  <Input
                    placeholder={shareMethod === 'sms' ? 'Phone number' : 'Email address'}
                    value={recipientInput}
                    onChange={(e) => setRecipientInput(e.target.value)}
                    className="text-sm"
                  />
                )}
                
                <Button
                  onClick={shareSOS}
                  variant="outline"
                  size="sm"
                  className="w-full"
                  disabled={!recipientInput && shareMethod !== 'whatsapp'}
                >
                  Share Alert
                </Button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 border-t border-border flex gap-3 flex-shrink-0">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={sendSOS}
                className="flex-1 bg-red-600 hover:bg-red-700"
                disabled={isSOSTriggered}
              >
                {isSOSTriggered ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send SOS
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* SOS Success Alert */}
      {isSOSTriggered && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5" />
            <span className="font-medium">SOS Alert Sent Successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencySOS;
