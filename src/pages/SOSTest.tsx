import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Shield, AlertTriangle, Phone, MapPin, Clock, Battery, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmergencySOS from '@/components/EmergencySOS';
import { sosService } from '@/services/sosService';
import { useState, useEffect } from 'react';

const SOSTest = () => {
  const [networkStatus, setNetworkStatus] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [connectionInfo, setConnectionInfo] = useState<any>(null);
  const [storedAlerts, setStoredAlerts] = useState<any[]>([]);
  const [locationStatus, setLocationStatus] = useState<'checking' | 'success' | 'error'>('checking');

  useEffect(() => {
    // Monitor network status
    const handleOnline = () => setNetworkStatus(true);
    const handleOffline = () => setNetworkStatus(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Get initial status
    setNetworkStatus(navigator.onLine);
    
    // Get battery level
    sosService.getBatteryLevel().then(setBatteryLevel);
    
    // Get connection info
    setConnectionInfo(sosService.getConnectionInfo());
    
    // Get stored alerts
    setStoredAlerts(sosService.getStoredAlerts());
    
    // Check location
    navigator.geolocation.getCurrentPosition(
      () => setLocationStatus('success'),
      () => setLocationStatus('error'),
      { timeout: 5000 }
    );

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const emergencyContacts = sosService.getEmergencyContacts();

  return (
    <>
      <Helmet>
        <title>SOS Safety Test | Klassygo</title>
        <meta name="description" content="Test emergency SOS functionality and safety features" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
        <Navbar />
        <EmergencySOS />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-red-600" />
                <h1 className="text-4xl md:text-6xl font-bold font-heading bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Emergency SOS System
                </h1>
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Production-ready safety system for travelers in India. Test emergency features and ensure your safety.
              </p>
              
              {/* System Status */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
                <div className={`p-4 rounded-lg border ${networkStatus ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  {networkStatus ? <Wifi className="w-6 h-6 text-green-600 mx-auto mb-2" /> : <WifiOff className="w-6 h-6 text-red-600 mx-auto mb-2" />}
                  <div className="text-sm font-medium">Network</div>
                  <div className={`text-xs ${networkStatus ? 'text-green-600' : 'text-red-600'}`}>
                    {networkStatus ? 'Online' : 'Offline'}
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg border ${locationStatus === 'success' ? 'bg-green-50 border-green-200' : locationStatus === 'error' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'}`}>
                  <MapPin className={`w-6 h-6 mx-auto mb-2 ${
                    locationStatus === 'success' ? 'text-green-600' : 
                    locationStatus === 'error' ? 'text-red-600' : 'text-yellow-600'
                  }`} />
                  <div className="text-sm font-medium">Location</div>
                  <div className={`text-xs ${
                    locationStatus === 'success' ? 'text-green-600' : 
                    locationStatus === 'error' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {locationStatus === 'success' ? 'Active' : 
                     locationStatus === 'error' ? 'Error' : 'Checking...'}
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border bg-blue-50 border-blue-200">
                  <Battery className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm font-medium">Battery</div>
                  <div className="text-xs text-blue-600">
                    {batteryLevel ? `${batteryLevel}%` : 'Unknown'}
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border bg-purple-50 border-purple-200">
                  <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-sm font-medium">Response</div>
                  <div className="text-xs text-purple-600">24/7 Active</div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <h3 className="text-lg font-semibold text-red-900">Emergency SOS Button</h3>
                </div>
                <p className="text-red-700 mb-4">
                  The red SOS button is always visible in the bottom-right corner of your screen. 
                  Tap it in any emergency to get immediate help.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-medium text-gray-900 mb-1">🚨 Quick Response</div>
                    <div className="text-gray-600">Immediate alert to emergency services</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-medium text-gray-900 mb-1">📍 Live Location</div>
                    <div className="text-gray-600">Auto-share your GPS coordinates</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-medium text-gray-900 mb-1">📞 Direct Calling</div>
                    <div className="text-gray-600">One-tap emergency number dialing</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-medium text-gray-900 mb-1">🔕 Silent Mode</div>
                    <div className="text-gray-600">Discreet alerts for unsafe situations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="py-20 px-6 lg:px-12 bg-accent/5">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Emergency Contacts
              </h2>
              <p className="text-xl text-muted-foreground">
                Quick access to India's emergency services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="bg-background border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-100 rounded-full">
                      <Phone className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{contact.name}</h3>
                      <p className="text-2xl font-bold text-primary mb-2">{contact.phone}</p>
                      <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    onClick={() => window.open(`tel:${contact.phone}`, '_self')}
                  >
                    Call Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Features */}
        <section className="py-20 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Advanced Safety Features
              </h2>
              <p className="text-xl text-muted-foreground">
                Comprehensive protection for travelers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">GPS Tracking</h3>
                <p className="text-muted-foreground">High-precision location sharing with emergency services</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Silent Mode</h3>
                <p className="text-muted-foreground">Discreet alerts for potentially dangerous situations</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Multi-Channel Sharing</h3>
                <p className="text-muted-foreground">Share alerts via SMS, WhatsApp, and email</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Battery className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Battery Optimization</h3>
                <p className="text-muted-foreground">Works efficiently even with low battery</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Offline Support</h3>
                <p className="text-muted-foreground">Functions even with poor network connectivity</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
                <p className="text-muted-foreground">Round-the-clock emergency assistance</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Alerts */}
        {storedAlerts.length > 0 && (
          <section className="py-20 px-6 lg:px-12 bg-accent/5">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                  Recent SOS Activity
                </h2>
                <p className="text-xl text-muted-foreground">
                  Your emergency alert history
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-4">
                {storedAlerts.slice(0, 5).map((alert, index) => (
                  <div key={index} className="bg-background border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">SOS Alert #{alert.id?.slice(-6)}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(alert.timestamp).toLocaleString()}
                        </div>
                        {alert.userName && (
                          <div className="text-sm text-muted-foreground">User: {alert.userName}</div>
                        )}
                      </div>
                      <div className="text-sm">
                        <span className={`px-2 py-1 rounded-full ${
                          alert.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {alert.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => sosService.clearStoredAlerts()}
                >
                  Clear History
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Travel with Confidence
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Your safety is our priority. The SOS system is always ready when you need it most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/tourism">Explore Safely</Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default SOSTest;
