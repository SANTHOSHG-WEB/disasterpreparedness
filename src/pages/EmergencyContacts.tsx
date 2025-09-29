import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Phone, MapPin, Search, Shield, Heart, Users, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '../contexts/LanguageContext';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  category: string;
  description?: string;
  location?: string;
  is_active: boolean;
}

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<EmergencyContact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchTerm, selectedCategory]);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('emergency_contacts')
        .select('*')
        .eq('is_active', true)
        .order('category');

      if (error) {
        console.error('Error fetching contacts:', error);
        return;
      }

      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterContacts = () => {
    let filtered = contacts;

    if (searchTerm) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(contact => contact.category === selectedCategory);
    }

    setFilteredContacts(filtered);
  };

  const makeCall = (phone: string) => {
    // For PWA, this will work on mobile devices
    window.location.href = `tel:${phone}`;
  };

  const exportContacts = () => {
    const csvContent = [
      'Name,Phone,Category,Description,Location',
      ...filteredContacts.map(c => 
        `"${c.name}","${c.phone}","${c.category}","${c.description || ''}","${c.location || ''}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'emergency-contacts.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const categories = ['All', ...Array.from(new Set(contacts.map(c => c.category)))];

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'emergency':
        return <Shield className="h-5 w-5" />;
      case 'medical':
        return <Heart className="h-5 w-5" />;
      case 'support':
        return <Users className="h-5 w-5" />;
      default:
        return <Phone className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'emergency':
        return 'bg-primary text-primary-foreground';
      case 'medical':
        return 'bg-accent text-accent-foreground';
      case 'support':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-glass-foreground">Loading emergency contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-glass-foreground mb-4">
            {t('emergency.title')}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Quick access to essential emergency services across India
          </p>
          <Button 
            onClick={exportContacts} 
            variant="outline" 
            className="glass border-glass-border"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Contacts
          </Button>
        </div>

        {/* Emergency Banner */}
        <Card className="mb-6 border-emergency bg-emergency/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <Shield className="h-8 w-8 text-emergency" />
              <div className="text-center">
                <h2 className="text-xl font-bold text-emergency">
                  In Case of Emergency
                </h2>
                <p className="text-emergency">
                  Call the appropriate number immediately. Stay calm and provide clear information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DRR Awareness Info */}
        <Card className="mb-6 glass border-glass-border">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-glass-foreground mb-2">Disaster Risk Reduction Awareness</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
              <li>NDMA reports show low awareness levels in schools despite India’s high disaster vulnerability index.</li>
              <li>UNDRR recommends integrating disaster risk reduction into education policies (Ref: National Disaster Management Authority).</li>
            </ul>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass border-glass-border pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className="glass"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Contacts Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="glass border-glass-border glass-hover">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${getCategoryColor(contact.category)}`}>
                      {getCategoryIcon(contact.category)}
                    </div>
                    <div>
                      <CardTitle className="text-lg text-glass-foreground">
                        {contact.name}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {contact.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {contact.description && (
                  <CardDescription className="text-sm text-muted-foreground">
                    {contact.description}
                  </CardDescription>
                )}

                {contact.location && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {contact.location}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="font-mono text-lg font-semibold text-glass-foreground">
                      {contact.phone}
                    </span>
                  </div>
                  
                  <Button
                    onClick={() => makeCall(contact.phone)}
                    size="sm"
                    className="bg-emergency hover:bg-emergency/90 text-emergency-foreground"
                  >
                    Call Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <Phone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-glass-foreground mb-2">
              No contacts found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}

        {/* Safety Tips */}
        <Card className="mt-8 glass border-glass-border">
          <CardHeader>
            <CardTitle className="text-glass-foreground">Emergency Call Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 shrink-0"></span>
                Stay calm and speak clearly
              </li>
              <li className="flex items-start">
                <span className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 shrink-0"></span>
                Provide your exact location
              </li>
              <li className="flex items-start">
                <span className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 shrink-0"></span>
                Describe the emergency briefly
              </li>
              <li className="flex items-start">
                <span className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 shrink-0"></span>
                Don't hang up until instructed
              </li>
              <li className="flex items-start">
                <span className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 shrink-0"></span>
                Follow any instructions given
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyContacts;