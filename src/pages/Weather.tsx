import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { MapPin, Search, AlertTriangle, Cloud, Sun, CloudRain } from 'lucide-react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [searchCity, setSearchCity] = useState('');
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock weather data - replace with real API when available
  const mockWeatherData = {
    punjab: {
      location: 'Punjab, India',
      temperature: 28,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      forecast: [
        { day: 'Today', high: 30, low: 22, condition: 'Sunny', icon: 'sun' },
        { day: 'Tomorrow', high: 28, low: 20, condition: 'Cloudy', icon: 'cloud' },
        { day: 'Day 3', high: 25, low: 18, condition: 'Rainy', icon: 'rain' },
        { day: 'Day 4', high: 27, low: 19, condition: 'Partly Cloudy', icon: 'cloud' },
        { day: 'Day 5', high: 29, low: 21, condition: 'Sunny', icon: 'sun' }
      ],
      alerts: [
        {
          type: 'warning',
          title: 'Thunderstorm Warning',
          description: 'Possible thunderstorms expected in next 24 hours. Take necessary precautions.'
        }
      ]
    }
  };

  useEffect(() => {
    // Load cached weather data
    const cachedWeather = localStorage.getItem('cachedWeather');
    if (cachedWeather) {
      setWeatherData(JSON.parse(cachedWeather));
    }
  }, []);

  const getCurrentLocation = () => {
    setLoading(true);
    setError('');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // In real implementation, use these coordinates to fetch weather
          setCurrentLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
          loadPunjabWeather(); // For demo, load Punjab weather
        },
        (error) => {
          setError('Unable to get your location. Please try manual search.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  };

  const loadPunjabWeather = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setWeatherData(mockWeatherData.punjab);
      localStorage.setItem('cachedWeather', JSON.stringify(mockWeatherData.punjab));
      setLoading(false);
    }, 1000);
  };

  const searchWeather = () => {
    if (!searchCity.trim()) return;
    
    setLoading(true);
    setError('');
    
    // Simulate API call for searched city
    setTimeout(() => {
      const mockData = {
        ...mockWeatherData.punjab,
        location: searchCity,
        temperature: Math.floor(Math.random() * 15) + 20
      };
      setWeatherData(mockData);
      localStorage.setItem('cachedWeather', JSON.stringify(mockData));
      setLoading(false);
    }, 1000);
  };

  const getWeatherIcon = (iconType: string) => {
    switch (iconType) {
      case 'sun': return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'cloud': return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'rain': return <CloudRain className="h-8 w-8 text-blue-500" />;
      default: return <Cloud className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-glass-foreground mb-4">Weather & Disaster Alerts</h1>
          <p className="text-xl text-muted-foreground">Stay informed about weather conditions and disaster warnings</p>
        </div>

        {/* Search Controls */}
        <Card className="glass border-glass-border mb-6">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter city name..."
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchWeather()}
                  className="glass border-glass-border flex-1"
                />
                <Button onClick={searchWeather} disabled={loading} className="glass border-glass-border shrink-0">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  onClick={getCurrentLocation} 
                  disabled={loading}
                  variant="outline"
                  className="glass border-glass-border flex-1 sm:flex-none"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Current Location</span>
                  <span className="sm:hidden">Location</span>
                </Button>
                
                <Button 
                  onClick={loadPunjabWeather} 
                  disabled={loading}
                  className="glass border-glass-border flex-1 sm:flex-none"
                >
                  <span className="hidden sm:inline">Punjab Weather</span>
                  <span className="sm:hidden">Punjab</span>
                </Button>
              </div>
            </div>
            
            {error && (
              <p className="text-emergency text-sm mt-2">{error}</p>
            )}
          </CardContent>
        </Card>

        {loading && (
          <Card className="glass border-glass-border mb-6">
            <CardContent className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-2">Loading weather data...</p>
            </CardContent>
          </Card>
        )}

        {weatherData && !loading && (
          <>
            {/* Current Weather */}
            <Card className="glass border-glass-border mb-6">
              <CardHeader>
                <CardTitle className="text-glass-foreground flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {weatherData.location}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-glass-foreground mb-2">
                      {weatherData.temperature}°C
                    </div>
                    <div className="text-xl text-muted-foreground">{weatherData.condition}</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Humidity:</span>
                      <span className="text-glass-foreground">{weatherData.humidity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Wind Speed:</span>
                      <span className="text-glass-foreground">{weatherData.windSpeed} km/h</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather Alerts */}
            {weatherData.alerts && weatherData.alerts.length > 0 && (
              <Card className="glass border-glass-border mb-6 border-l-4 border-warning">
                <CardHeader>
                  <CardTitle className="text-glass-foreground flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Weather Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {weatherData.alerts.map((alert: any, index: number) => (
                    <div key={index} className="neumorphic p-4 rounded-lg">
                      <h4 className="font-semibold text-warning mb-2">{alert.title}</h4>
                      <p className="text-muted-foreground text-sm">{alert.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* 5-Day Forecast */}
            <Card className="glass border-glass-border">
              <CardHeader>
                <CardTitle className="text-glass-foreground">5-Day Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {weatherData.forecast.map((day: any, index: number) => (
                    <div key={index} className="neumorphic p-4 rounded-lg text-center">
                      <div className="font-medium text-glass-foreground mb-2">{day.day}</div>
                      <div className="flex justify-center mb-2">
                        {getWeatherIcon(day.icon)}
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">{day.condition}</div>
                      <div className="flex justify-between text-sm">
                        <span className="text-glass-foreground font-medium">{day.high}°</span>
                        <span className="text-muted-foreground">{day.low}°</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Default State */}
        {!weatherData && !loading && (
          <Card className="glass border-glass-border">
            <CardContent className="p-6 text-center">
              <Cloud className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-glass-foreground mb-2">Get Weather Information</h3>
              <p className="text-muted-foreground mb-4">
                Search for a city, use your current location, or check Punjab weather to get started.
              </p>
              <Button onClick={loadPunjabWeather} className="glass border-glass-border">
                Load Punjab Weather
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Weather;