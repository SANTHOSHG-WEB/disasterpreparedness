import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Phone, MapPin } from 'lucide-react';

const Map = () => {
  const shelterLocations = [
    {
      name: "Government Senior Secondary School, Mohali",
      address: "Phase 7, Mohali, Punjab 160062",
      phone: "0172-2219567",
      capacity: "500 people"
    },
    {
      name: "DAV College, Chandigarh", 
      address: "Sector 10, Chandigarh 160011",
      phone: "0172-2740206",
      capacity: "800 people"
    },
    {
      name: "Punjab University, Chandigarh",
      address: "Sector 14, Chandigarh 160014", 
      phone: "0172-2534142",
      capacity: "1200 people"
    },
    {
      name: "Government High School, Ludhiana",
      address: "Civil Lines, Ludhiana, Punjab 141001",
      phone: "0161-2401234",
      capacity: "600 people"
    },
    {
      name: "Khalsa College, Amritsar",
      address: "GT Road, Amritsar, Punjab 143005",
      phone: "0183-2258073",
      capacity: "750 people"
    },
    {
      name: "Government College, Patiala",
      address: "Mall Road, Patiala, Punjab 147001", 
      phone: "0175-2213467",
      capacity: "550 people"
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-glass-foreground mb-4">Emergency Shelters & Safe Locations</h1>
          <p className="text-xl text-muted-foreground">Find nearest emergency shelters and safe evacuation points in Punjab</p>
        </div>

        {/* Interactive Map */}
        <Card className="glass border-glass-border mb-8">
          <CardHeader>
            <CardTitle className="text-glass-foreground flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Punjab Emergency Shelter Locations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full relative overflow-hidden rounded-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1748332.9027508125!2d74.05846205876547!3d31.14549256492192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1spunjab%20school!5e0!3m2!1sen!2sin!4v1758899450298!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-96 md:h-[450px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Shelter Directory */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shelterLocations.map((shelter, index) => (
            <Card key={index} className="glass border-glass-border glass-hover">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-glass-foreground">{shelter.name}</h3>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{shelter.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                        Capacity: {shelter.capacity}
                      </span>
                    </div>
                  </div>

                  <a 
                    href={`tel:${shelter.phone}`} 
                    className="flex items-center gap-2 bg-emergency text-emergency-foreground px-4 py-2 rounded-lg hover:bg-emergency/90 transition-colors touch-target w-full justify-center"
                  >
                    <Phone className="h-4 w-4" />
                    {shelter.phone}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Instructions */}
        <Card className="glass border-glass-border mt-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-glass-foreground mb-4">Emergency Evacuation Guidelines</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-glass-foreground mb-2">Before Evacuation:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Keep emergency kit ready</li>
                  <li>Know your nearest shelter location</li>
                  <li>Save emergency contact numbers</li>
                  <li>Plan evacuation routes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-glass-foreground mb-2">During Evacuation:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Follow official evacuation orders</li>
                  <li>Take essential documents and medicines</li>
                  <li>Help elderly and disabled neighbors</li>
                  <li>Stay calm and follow designated routes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Map;