"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home as HomeIcon, 
  Users, 
  Plus, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Building, 
  Calendar, 
  Star, 
  Eye, 
  Heart, 
  Share2, 
  Filter, 
  Search,
  Bell,
  Settings,
  ArrowRight,
  CheckCircle,
  Smartphone,
  Shield,
  Zap
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Property type for sample data
type SampleProperty = {
  id: number;
  type: string;
  location: string;
  price: string;
  deposit: string;
  status: string;
  owner: string;
  phone: string;
  furnishing: string;
  area: string;
  floor: string;
  age: string;
  parking: string;
  isPublic: boolean;
  image: string;
  rating: number;
  views: number;
};

// Sample data for demonstration
const sampleProperties: SampleProperty[] = [
  {
    id: 1,
    type: "2BHK Flat",
    location: "Geeta Colony, Delhi",
    price: "₹15,000/month",
    deposit: "₹30,000",
    status: "Available",
    owner: "Rajesh Kumar",
    phone: "+91 98765 43210",
    furnishing: "Semi-Furnished",
    area: "850 sq ft",
    floor: "2nd Floor",
    age: "5-10 years",
    parking: "Yes",
    isPublic: true,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    rating: 4.5,
    views: 120
  },
  {
    id: 2,
    type: "3BHK House",
    location: "Lajpat Nagar, Delhi",
    price: "₹25,000/month",
    deposit: "₹50,000",
    status: "Available",
    owner: "Priya Sharma",
    phone: "+91 98765 43211",
    furnishing: "Fully Furnished",
    area: "1200 sq ft",
    floor: "Ground Floor",
    age: "New",
    parking: "Yes",
    isPublic: true,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    rating: 4.8,
    views: 89
  },
  {
    id: 3,
    type: "1RK Shop",
    location: "Karol Bagh, Delhi",
    price: "₹8,000/month",
    deposit: "₹16,000",
    status: "Rented",
    owner: "Amit Singh",
    phone: "+91 98765 43212",
    furnishing: "Unfurnished",
    area: "200 sq ft",
    floor: "Ground Floor",
    age: "10+ years",
    parking: "No",
    isPublic: false,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    rating: 4.2,
    views: 45
  },
  {
    id: 4,
    type: "4BHK Villa",
    location: "Greater Kailash, Delhi",
    price: "₹45,000/month",
    deposit: "₹90,000",
    status: "Available",
    owner: "Vikram Mehta",
    phone: "+91 98765 43213",
    furnishing: "Fully Furnished",
    area: "2000 sq ft",
    floor: "2nd Floor",
    age: "New",
    parking: "Yes",
    isPublic: true,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
    rating: 4.9,
    views: 156
  }
];

export default function ResponsiveHomePage() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'community'>('inventory');
  const [myProperties, setMyProperties] = useState<SampleProperty[]>([]);
  const [communityProperties, setCommunityProperties] = useState<SampleProperty[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setMyProperties(sampleProperties.filter(p => !p.isPublic));
    setCommunityProperties(sampleProperties.filter(p => p.isPublic));
  }, []);

  const handleCall = (phone: string) => {
    if (typeof window !== 'undefined') {
      window.open(`tel:${phone}`, '_self');
    }
  };

  const handleWhatsApp = (phone: string) => {
    if (typeof window !== 'undefined') {
      const message = "Hi! I'm interested in your property listing on DealerSetu.";
      window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'status-available';
      case 'Rented':
        return 'status-rented';
      case 'Sold':
        return 'status-sold';
      default:
        return 'status-available';
    }
  };

  const PropertyCard = ({ property }: { property: SampleProperty }) => (
    <Card className="property-card-modern mb-6 overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Property Image */}
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={property.image} 
          alt={property.type}
          width={400}
          height={300}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge className={`${getStatusColor(property.status)} backdrop-blur-sm bg-white/90`}>
            {property.status}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white">
            <Heart className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
          <Eye className="w-3 h-3" />
          {property.views}
        </div>
      </div>

      <CardContent className="p-4">
        {/* Property Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-gray-900 mb-1">
              {property.type}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 text-gray-600">
              <MapPin className="w-4 h-4 text-primary" />
              {property.location}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-semibold text-gray-700">{property.rating}</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold text-primary">{property.price}</div>
              <div className="text-sm text-gray-600">Deposit: {property.deposit}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Area</div>
              <div className="font-semibold text-gray-900">{property.area}</div>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Building className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{property.furnishing}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{property.age}</span>
          </div>
        </div>

        {/* Owner Info */}
        <div className="flex items-center justify-between mb-4 p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {property.owner.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">{property.owner}</div>
              <div className="text-xs text-gray-500">Property Owner</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 transform hover:scale-105"
            onClick={() => handleCall(property.phone)}
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-2 border-green-500 text-green-600 hover:bg-green-50 font-semibold py-2.5 rounded-lg transition-all duration-200 transform hover:scale-105"
            onClick={() => handleWhatsApp(property.phone)}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (!isClient) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Desktop Top Navigation */}
      <header className="hidden lg:block bg-white/95 backdrop-blur-md shadow-sm border-b sticky top-0 z-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-2xl flex items-center justify-center shadow-lg">
                <HomeIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  DealerSetu
                </h1>
                <p className="text-sm text-gray-600 font-medium">Property Dealer Network</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="flex items-center space-x-2">
              <Button
                variant={activeTab === 'inventory' ? 'default' : 'ghost'}
                size="lg"
                className={`${
                  activeTab === 'inventory' 
                    ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                }`}
                onClick={() => setActiveTab('inventory')}
              >
                <HomeIcon className="w-5 h-5 mr-2" />
                Home
              </Button>
              <Link href="/my-inventory">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-gray-600 hover:text-primary border-gray-300 hover:border-primary hover:bg-primary/5"
                >
                  <Building className="w-5 h-5 mr-2" />
                  My Inventory
                </Button>
              </Link>
              <Link href="/community">
              <Button
                  variant="outline"
                  size="lg"
                  className="text-gray-600 hover:text-primary border-gray-300 hover:border-primary hover:bg-primary/5"
              >
                <Users className="w-5 h-5 mr-2" />
                Community
              </Button>
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="flex items-center gap-3">
              <Button size="sm" variant="outline" className="h-11 w-11 p-0 rounded-full hover:bg-gray-50">
                <Search className="w-5 h-5" />
              </Button>
              <Button size="sm" variant="outline" className="h-11 w-11 p-0 rounded-full hover:bg-gray-50">
                <Bell className="w-5 h-5" />
              </Button>
              <Button size="sm" variant="outline" className="h-11 w-11 p-0 rounded-full hover:bg-gray-50">
                <Settings className="w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Property
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden bg-white/95 backdrop-blur-md shadow-sm border-b sticky top-0 z-20">
        <div className="container mx-auto px-4 max-w-sm sm:max-w-md">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-2xl flex items-center justify-center shadow-lg">
                <HomeIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  DealerSetu
                </h1>
                <p className="text-xs text-gray-600 font-medium">Property Dealer Network</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-10 w-10 p-0 rounded-full hover:bg-gray-50">
                <Search className="w-5 h-5" />
              </Button>
              <Button size="sm" variant="outline" className="h-10 w-10 p-0 rounded-full hover:bg-gray-50">
                <Bell className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 lg:pb-0">
        <div className="container mx-auto px-4 max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-6xl xl:max-w-7xl py-6">
          {/* Hero Section */}
          <div className="relative mb-8 lg:mb-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-accent rounded-3xl"></div>
            
            {/* Content */}
            <div className="relative z-10 p-6 lg:p-12 text-white">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Left Content */}
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-medium">
                        <Shield className="w-4 h-4 mr-2" />
                        For Property Dealers Only
                      </Badge>
                      
                      <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
                        Stop Losing Properties in 
                        <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                          WhatsApp Groups
                        </span>
                      </h1>
                      
                      <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl">
                        Tired of losing property information in WhatsApp clutter? DealerSetu helps you manage your inventory professionally and share properties with other dealers - all in one organized platform.
                      </p>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white/90 font-medium">No more lost property details</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white/90 font-medium">Organized inventory management</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white/90 font-medium">Connect with other dealers</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white/90 font-medium">Works on any smartphone</span>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Link href="/add-property">
                        <Button 
                          size="lg"
                          className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
                        >
                          <Plus className="w-6 h-6 mr-2" />
                      Add Your First Property
                          <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                      </Link>
                      <Link href="/community">
                        <Button 
                          variant="outline" 
                          size="lg"
                          className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all duration-300"
                        >
                          <Users className="w-6 h-6 mr-2" />
                          Explore Community
                    </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Right Content - Visual Elements */}
                  <div className="relative hidden lg:block">
                    <div className="relative">
                      {/* Floating Cards */}
                      <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-2xl backdrop-blur-sm"></div>
                      <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/10 rounded-2xl backdrop-blur-sm"></div>
                      <div className="absolute top-1/2 -right-8 w-20 h-20 bg-white/5 rounded-full"></div>
                      
                      {/* Main Visual Card */}
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                              <Building className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-white font-semibold">2BHK Flat</h3>
                              <p className="text-white/70 text-sm">Geeta Colony, Delhi</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-white/70">Price</span>
                              <span className="text-white font-semibold">₹15,000/month</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Status</span>
                              <Badge className="bg-green-500/20 text-green-200 border-green-400/30">Available</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>

          {/* How It Works Section */}
          <div className="mb-12 lg:mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                How DealerSetu Works
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Simple steps to transform your property business from WhatsApp chaos to organized success
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {/* Step 1 */}
              <div className="relative">
                <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/90 rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl font-bold text-white">1</span>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                        <Plus className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Add Your Properties</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Upload your property details with all information - type, price, location, owner details. Keep them private or make them public.
                    </p>
                  </CardContent>
                </Card>
                {/* Arrow for desktop */}
                <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-primary/30" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/90 rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl font-bold text-white">2</span>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Connect with Dealers</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Browse properties shared by other dealers. Find the perfect match for your clients. Contact owners directly via Call or WhatsApp.
                    </p>
                  </CardContent>
                </Card>
                {/* Arrow for desktop */}
                <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-accent/30" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl font-bold text-white">3</span>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Grow Your Business</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Never lose a property again. Access your inventory anytime, anywhere. Close more deals with organized information.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/90 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <HomeIcon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{myProperties.length}</div>
                <div className="text-gray-600 font-medium">My Properties</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/90 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-accent mb-2">{communityProperties.length}</div>
                <div className="text-gray-600 font-medium">Community</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-gray-600 font-medium">Mobile Ready</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-600 font-medium">Available</div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="lg:hidden bg-white rounded-2xl p-2 mb-8 shadow-lg border border-gray-100">
            <div className="flex">
              <Button
                variant={activeTab === 'inventory' ? 'default' : 'ghost'}
                size="lg"
                className={`flex-1 rounded-xl transition-all duration-300 ${
                  activeTab === 'inventory' 
                    ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                }`}
                onClick={() => setActiveTab('inventory')}
              >
                <HomeIcon className="w-5 h-5 mr-2" />
                Home
              </Button>
              <Button
                variant={activeTab === 'community' ? 'default' : 'ghost'}
                size="lg"
                className={`flex-1 rounded-xl transition-all duration-300 ${
                  activeTab === 'community' 
                    ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                }`}
                onClick={() => setActiveTab('community')}
              >
                <Users className="w-5 h-5 mr-2" />
                Community
              </Button>
            </div>
          </div>

          {/* Why Choose DealerSetu Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Why Property Dealers Choose DealerSetu
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Stop struggling with WhatsApp groups and notebooks. Here&apos;s how we solve your daily problems:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-500 group hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">No More WhatsApp Chaos</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Properties get lost in message clutter. Information disappears in group chats. You forget your own listings.
                      </p>
                      <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          <p className="text-green-800 font-semibold">
                            DealerSetu keeps everything organized in one place
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-500 group hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Professional Inventory Management</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Track all your properties with complete details. Set availability status. Keep private or share with other dealers.
                      </p>
                      <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          <p className="text-green-800 font-semibold">
                            Never lose a property detail again
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-500 group hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Connect with Other Dealers</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Browse properties shared by other dealers. Find perfect matches for your clients. Contact owners directly.
                      </p>
                      <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          <p className="text-green-800 font-semibold">
                            Expand your network and close more deals
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-500 group hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Smartphone className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Works on Any Smartphone</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Install like an app. Works offline. Simple interface designed for property dealers. No complex features.
                      </p>
                      <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          <p className="text-green-800 font-semibold">
                            Easy to use, just like WhatsApp
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search properties..." 
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 shadow-sm hover:shadow-md"
              />
            </div>
            <Button 
              variant="outline" 
              size="lg"
              className="px-6 py-4 rounded-2xl border-gray-200 hover:bg-gray-50 hover:border-primary transition-all duration-300"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filter
            </Button>
          </div>

          {/* Property Listings */}
          <div className="space-y-6 lg:space-y-0">
            {activeTab === 'inventory' ? (
              myProperties.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {myProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center py-12 lg:py-16">
                  <CardContent>
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Building className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">No Properties Yet</h3>
                    <p className="text-gray-600 mb-6 max-w-sm lg:max-w-md mx-auto text-sm lg:text-base">
                      Start building your inventory by adding your first property and grow your business
                    </p>
                    <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105">
                      <Plus className="w-5 h-5 mr-2" />
                      Add Your First Property
                    </Button>
                  </CardContent>
                </Card>
              )
            ) : (
              communityProperties.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {communityProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center py-12 lg:py-16">
                  <CardContent>
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="w-10 h-10 lg:w-12 lg:h-12 text-accent" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">No Community Properties</h3>
                    <p className="text-gray-600 max-w-sm lg:max-w-md mx-auto text-sm lg:text-base">
                      No dealers have shared their properties yet. Be the first to share!
                    </p>
                  </CardContent>
                </Card>
              )
            )}
          </div>

          {/* Call to Action Section */}
          <div className="mt-16 mb-8">
            <div className="relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-accent rounded-3xl"></div>
              
              {/* Content */}
              <div className="relative z-10 p-8 lg:p-12 text-white text-center">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                    Ready to Transform Your 
                    <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                      Property Business?
                    </span>
                  </h2>
                  
                  <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                    Join hundreds of property dealers who have already switched from WhatsApp chaos to organized success. 
                    Start managing your inventory like a professional today.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                    <Button 
                      size="lg"
                      className="bg-white text-primary hover:bg-gray-100 font-bold px-10 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
                    >
                      <Plus className="w-6 h-6 mr-3" />
                      Start Free - Add Your First Property
                      <ArrowRight className="w-5 h-5 ml-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-2 border-white/30 text-white hover:bg-white/10 font-bold px-10 py-4 rounded-2xl transition-all duration-300"
                    >
                      <Users className="w-6 h-6 mr-3" />
                      Learn More
                    </Button>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">No credit card required</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">Works on any smartphone</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">Install like an app</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Floating Add Button */}
      <div className="fixed bottom-20 right-4 z-30 lg:hidden">
        <Button 
          size="lg" 
          className="w-16 h-16 rounded-full bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
        >
          <Plus className="w-7 h-7" />
        </Button>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-2xl z-20 lg:hidden">
        <div className="container mx-auto px-4 max-w-sm sm:max-w-md md:max-w-2xl">
          <div className="flex justify-around py-4">
            <Button 
              variant="ghost" 
              size="lg"
              className={`flex flex-col items-center space-y-2 px-4 py-3 rounded-2xl transition-all duration-300 ${
                activeTab === 'inventory' 
                  ? 'bg-gradient-to-r from-primary/10 to-primary/5 text-primary' 
                  : 'text-gray-500 hover:text-primary hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('inventory')}
            >
              <HomeIcon className="w-6 h-6" />
              <span className="text-xs font-semibold">Home</span>
            </Button>
            <Link href="/my-inventory">
              <Button 
                variant="ghost" 
                size="lg"
                className="flex flex-col items-center space-y-2 px-4 py-3 rounded-2xl transition-all duration-300 text-gray-500 hover:text-primary hover:bg-gray-50"
              >
                <Building className="w-6 h-6" />
                <span className="text-xs font-semibold">Inventory</span>
            </Button>
            </Link>
            <Link href="/community">
            <Button 
              variant="ghost" 
                size="lg"
                className="flex flex-col items-center space-y-2 px-4 py-3 rounded-2xl transition-all duration-300 text-gray-500 hover:text-primary hover:bg-gray-50"
            >
              <Users className="w-6 h-6" />
                <span className="text-xs font-semibold">Community</span>
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

