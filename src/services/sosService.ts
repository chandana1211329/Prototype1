interface SOSData {
  userName?: string;
  location: {
    latitude: number;
    longitude: number;
    accuracy?: number;
  };
  timestamp: string;
  message: string;
  userAgent: string;
  sessionId?: string;
}

interface EmergencyContact {
  name: string;
  phone: string;
  email?: string;
  relationship: string;
}

class SOSService {
  private readonly API_ENDPOINT = '/api/sos'; // Your backend endpoint
  private readonly SESSION_ID = this.generateSessionId();

  // Generate unique session ID for tracking
  private generateSessionId(): string {
    return 'sos_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Send SOS alert to backend
  async sendSOSAlert(sosData: SOSData): Promise<{ success: boolean; alertId?: string; error?: string }> {
    try {
      const payload = {
        ...sosData,
        sessionId: this.SESSION_ID,
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        networkStatus: navigator.onLine ? 'online' : 'offline',
        batteryLevel: await this.getBatteryLevel(),
        deviceMemory: this.getDeviceMemory()
      };

      // In production, this would be your actual API call
      const response = await this.mockAPICall(payload);
      
      // Store in local storage as backup
      this.storeSOSInLocalStorage(payload);
      
      // Trigger local notifications if available
      this.triggerLocalNotification(sosData);
      
      return response;
    } catch (error) {
      console.error('SOS Service Error:', error);
      
      // Fallback: store locally and try to send later
      this.storeSOSInLocalStorage(sosData);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Mock API call (replace with actual API)
  private async mockAPICall(payload: SOSData): Promise<{ success: boolean; alertId: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, this would be:
    // const response = await fetch(this.API_ENDPOINT, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${await this.getAuthToken()}`
    //   },
    //   body: JSON.stringify(payload)
    // });
    
    console.log('SOS Alert Sent:', payload);
    
    return {
      success: true,
      alertId: 'alert_' + Date.now()
    };
  }

  // Get battery level if available
  async getBatteryLevel(): Promise<number | null> {
    if ('getBattery' in navigator) {
      try {
        const battery = await (navigator as any).getBattery();
        return Math.round(battery.level * 100);
      } catch {
        return null;
      }
    }
    return null;
  }

  // Get device memory if available
  private getDeviceMemory(): number | null {
    if ('deviceMemory' in navigator) {
      return (navigator as any).deviceMemory;
    }
    return null;
  }

  // Store SOS in local storage as backup
  private storeSOSInLocalStorage(sosData: SOSData): void {
    try {
      const existingAlerts = JSON.parse(localStorage.getItem('sos_alerts') || '[]');
      const alertWithId = {
        ...sosData,
        id: this.SESSION_ID,
        storedAt: new Date().toISOString(),
        status: 'sent'
      };
      
      existingAlerts.unshift(alertWithId);
      
      // Keep only last 50 alerts
      if (existingAlerts.length > 50) {
        existingAlerts.splice(50);
      }
      
      localStorage.setItem('sos_alerts', JSON.stringify(existingAlerts));
    } catch (error) {
      console.error('Failed to store SOS locally:', error);
    }
  }

  // Trigger local notification
  private triggerLocalNotification(sosData: SOSData): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🆘 SOS Alert Sent', {
        body: `Emergency alert has been sent from your location. Help is on the way.`,
        icon: '/sos-icon.png',
        tag: 'sos-alert',
        requireInteraction: true
      });
    }
  }

  // Request notification permission
  async requestNotificationPermission(): Promise<boolean> {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  // Get stored SOS alerts
  getStoredAlerts(): any[] {
    try {
      return JSON.parse(localStorage.getItem('sos_alerts') || '[]');
    } catch {
      return [];
    }
  }

  // Clear stored alerts
  clearStoredAlerts(): void {
    localStorage.removeItem('sos_alerts');
  }

  // Format location for sharing
  formatLocationForSharing(location: { latitude: number; longitude: number }): string {
    return `https://maps.google.com/?q=${location.latitude},${location.longitude}&z=16`;
  }

  // Generate emergency message
  generateEmergencyMessage(userName: string, location: { latitude: number; longitude: number }): string {
    const timestamp = new Date().toLocaleString();
    const locationLink = this.formatLocationForSharing(location);
    const userInfo = userName ? `Name: ${userName}\n` : '';
    
    return `🆘 EMERGENCY SOS ALERT 🆘\n\n${userInfo}Time: ${timestamp}\nLocation: ${locationLink}\nCoordinates: ${location.latitude}, ${location.longitude}\n\nThis is an automated emergency alert. Please respond immediately.\n\nSent via Klassygo Tourism App`;
  }

  // Share via different platforms
  async shareViaSMS(message: string, phoneNumber: string): Promise<void> {
    const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    window.open(smsUrl, '_blank');
  }

  async shareViaWhatsApp(message: string): Promise<void> {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  async shareViaEmail(message: string, email: string): Promise<void> {
    const subject = encodeURIComponent('🆘 EMERGENCY SOS ALERT');
    const body = encodeURIComponent(message);
    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, '_blank');
  }

  // Get emergency contacts (could be from user profile)
  getEmergencyContacts(): EmergencyContact[] {
    try {
      const contacts = localStorage.getItem('emergency_contacts');
      return contacts ? JSON.parse(contacts) : this.getDefaultContacts();
    } catch {
      return this.getDefaultContacts();
    }
  }

  // Default emergency contacts for India
  private getDefaultContacts(): EmergencyContact[] {
    return [
      {
        name: 'National Emergency',
        phone: '112',
        relationship: 'Emergency Services'
      },
      {
        name: 'Police',
        phone: '100',
        relationship: 'Law Enforcement'
      },
      {
        name: 'Ambulance',
        phone: '108',
        relationship: 'Medical Emergency'
      },
      {
        name: 'Fire Department',
        phone: '101',
        relationship: 'Fire Emergency'
      },
      {
        name: 'Tourism Helpline',
        phone: '1363',
        relationship: 'Tourist Support'
      },
      {
        name: 'Women Helpline',
        phone: '1091',
        relationship: 'Women Safety'
      }
    ];
  }

  // Save emergency contacts
  saveEmergencyContacts(contacts: EmergencyContact[]): void {
    try {
      localStorage.setItem('emergency_contacts', JSON.stringify(contacts));
    } catch (error) {
      console.error('Failed to save emergency contacts:', error);
    }
  }

  // Check network status
  isOnline(): boolean {
    return navigator.onLine;
  }

  // Get connection info if available
  getConnectionInfo(): any {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      };
    }
    return null;
  }
}

// Export singleton instance
export const sosService = new SOSService();
export default sosService;
