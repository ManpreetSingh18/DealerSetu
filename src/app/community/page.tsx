"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Phone, MessageCircle, MapPin, Home, Building, Users, Filter } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

// Community properties data
const COMMUNITY_PROPERTIES = [
  {
    id: "1",
    property_type: "Flat",
    bhk: "2BHK",
    listing_type: "Rent",
    availability: "Available",
    built_up_area: 850,
    floor_number: 3,
    total_floors: 5,
    furnishing: "Semi-Furnished",
    parking: true,
    property_age: "5-10 yrs",
    city: "Mumbai",
    locality: "Andheri West",
    landmark: "Near Metro Station",
    pin_code: "400058",
    expected_price: null,
    monthly_rent: 25000,
    security_deposit: 50000,
    owner_name: "Rajesh Kumar",
    owner_phone: "+91 98765 43210",
    dealer_notes: "Good property, well maintained",
    photos: [],
    visibility: "Public",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    property_type: "Independent House",
    bhk: "3BHK",
    listing_type: "Sale",
    availability: "Available",
    built_up_area: 1200,
    floor_number: 1,
    total_floors: 2,
    furnishing: "Fully Furnished",
    parking: true,
    property_age: "New",
    city: "Delhi",
    locality: "Saket",
    landmark: "Near Select City Walk",
    pin_code: "110017",
    expected_price: 8500000,
    monthly_rent: null,
    security_deposit: null,
    owner_name: "Priya Sharma",
    owner_phone: "+91 87654 32109",
    dealer_notes: "Premium location, ready to move",
    photos: [],
    visibility: "Public",
    created_at: "2024-01-14T14:20:00Z",
    updated_at: "2024-01-14T14:20:00Z",
  },
  {
    id: "3",
    property_type: "Builder Floor",
    bhk: "4BHK",
    listing_type: "Rent",
    availability: "Available",
    built_up_area: 1500,
    floor_number: 2,
    total_floors: 3,
    furnishing: "Fully Furnished",
    parking: true,
    property_age: "<5 yrs",
    city: "Pune",
    locality: "Koregaon Park",
    landmark: "Near Phoenix MarketCity",
    pin_code: "411001",
    expected_price: null,
    monthly_rent: 45000,
    security_deposit: 90000,
    owner_name: "Sunita Reddy",
    owner_phone: "+91 65432 10987",
    dealer_notes: "Luxury property, modern amenities",
    photos: [],
    visibility: "Public",
    created_at: "2024-01-12T16:45:00Z",
    updated_at: "2024-01-12T16:45:00Z",
  },
  {
    id: "4",
    property_type: "Villa",
    bhk: "5BHK",
    listing_type: "Sale",
    availability: "Available",
    built_up_area: 2500,
    floor_number: 1,
    total_floors: 2,
    furnishing: "Fully Furnished",
    parking: true,
    property_age: "New",
    city: "Gurgaon",
    locality: "DLF Phase 2",
    landmark: "Near Cyber Hub",
    pin_code: "122002",
    expected_price: 15000000,
    monthly_rent: null,
    security_deposit: null,
    owner_name: "Vikram Singh",
    owner_phone: "+91 54321 09876",
    dealer_notes: "Premium villa, gated community",
    photos: [],
    visibility: "Public",
    created_at: "2024-01-11T11:30:00Z",
    updated_at: "2024-01-11T11:30:00Z",
  },
  {
    id: "5",
    property_type: "Shop",
    bhk: "1RK",
    listing_type: "Rent",
    availability: "Available",
    built_up_area: 300,
    floor_number: 1,
    total_floors: 3,
    furnishing: "Unfurnished",
    parking: false,
    property_age: "10+ yrs",
    city: "Bangalore",
    locality: "Koramangala",
    landmark: "Near Forum Mall",
    pin_code: "560034",
    expected_price: null,
    monthly_rent: 35000,
    security_deposit: 70000,
    owner_name: "Amit Patel",
    owner_phone: "+91 76543 21098",
    dealer_notes: "Commercial space, high footfall",
    photos: [],
    visibility: "Public",
    created_at: "2024-01-13T09:15:00Z",
    updated_at: "2024-01-13T09:15:00Z",
  },
]

type Property = typeof COMMUNITY_PROPERTIES[0]

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"All" | "Available" | "Closed">("All")
  const [communityFilter, setCommunityFilter] = useState<"All" | "Public" | "Private" | "Geeta Colony" | "Krishna Nagar" | "Shivpuri">("All")
  const [properties, setProperties] = useState<Property[]>([])
  const [communities, setCommunities] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch communities from database
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        // For now, use hardcoded communities. Later this can be fetched from a communities table
        const hardcodedCommunities = ['Geeta Colony', 'Krishna Nagar', 'Shivpuri']
        setCommunities(hardcodedCommunities)
        
        // Future: Fetch from communities table
        // const { data, error } = await supabase
        //   .from('communities')
        //   .select('name')
        //   .order('name')
        // if (error) throw error
        // setCommunities(data?.map(c => c.name) || [])
      } catch (error) {
        console.error('Error fetching communities:', error)
        // Fallback to hardcoded communities
        setCommunities(['Geeta Colony', 'Krishna Nagar', 'Shivpuri'])
      }
    }

    fetchCommunities()
  }, [])

  // Fetch community properties from Supabase
  useEffect(() => {
    const fetchCommunityProperties = async () => {
      try {
        let query = supabase
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false })

        // Apply community filter
        if (communityFilter === "All") {
          // Show all properties EXCEPT Private
          query = query.neq('visibility', 'Private')
        } else if (communityFilter === "Public") {
          // Show only Public properties
          query = query.eq('visibility', 'Public')
        } else if (communityFilter === "Private") {
          // Show only Private properties (for testing)
          query = query.eq('visibility', 'Private')
        } else if (communities.includes(communityFilter)) {
          // Show properties from specific community
          query = query.eq('visibility', communityFilter)
        } else {
          // Default: show all non-private properties
          query = query.neq('visibility', 'Private')
        }

        const { data, error } = await query

        if (error) {
          console.error('Supabase query error:', error)
          throw error
        }
        
        console.log(`Fetched ${data?.length || 0} properties for filter: ${communityFilter}`)
        setProperties(data || [])
      } catch (error) {
        console.error('Error fetching community properties:', error)
        // Fallback to dummy data if Supabase fails
        setProperties(COMMUNITY_PROPERTIES)
      } finally {
        setLoading(false)
      }
    }

    fetchCommunityProperties()
  }, [communityFilter, communities])

  // Filter properties based on search term and status
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch = 
        property.property_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.bhk.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.locality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === "All" || property.availability === statusFilter
      
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter, properties])

  const handleCall = (phone: string) => {
    if (typeof window !== 'undefined') {
      window.open(`tel:${phone}`, '_self')
    }
  }

  const handleWhatsApp = (phone: string) => {
    if (typeof window !== 'undefined') {
      const message = "Hi! I'm interested in your property listing on DealerSetu."
      window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank')
    }
  }

  const formatPrice = (property: Property) => {
    if (property.listing_type === "Sale" && property.expected_price) {
      return `₹ ${(property.expected_price / 100000).toFixed(1)}L`
    } else if (property.listing_type === "Rent" && property.monthly_rent) {
      return `₹ ${property.monthly_rent.toLocaleString()} / month`
    }
    return "Price not available"
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Available":
        return "default"
      case "Closed":
        return "destructive"
      default:
        return "outline"
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading community properties...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Desktop Header */}
      <header className="hidden lg:block bg-white/95 backdrop-blur-md shadow-sm border-b sticky top-0 z-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-xl flex items-center justify-center shadow-lg">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Community</h1>
                  <p className="text-sm text-gray-600">Browse properties shared by other dealers</p>
                </div>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="flex items-center space-x-2">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-gray-600 hover:text-primary hover:bg-primary/5"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/my-inventory">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-gray-600 hover:text-primary hover:bg-primary/5"
                >
                  <Building className="w-5 h-5 mr-2" />
                  My Inventory
                </Button>
              </Link>
              <Button
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg"
              >
                <Users className="w-5 h-5 mr-2" />
                Community
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden bg-white/95 backdrop-blur-md shadow-sm border-b sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-xl flex items-center justify-center shadow-lg">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Community</h1>
                  <p className="text-xs text-gray-600">Shared properties</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Community Filter Dropdown */}
            <div className="flex-1">
              <Select value={communityFilter} onValueChange={(value: "All" | "Public" | "Private" | "Geeta Colony" | "Krishna Nagar" | "Shivpuri") => setCommunityFilter(value)}>
                <SelectTrigger className="w-full select-dropdown">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select Community" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Communities (Public + Communities)</SelectItem>
                  <SelectItem value="Public">Public Properties Only</SelectItem>
                  <SelectItem value="Private">Private Properties (Testing)</SelectItem>
                  {communities.map((community) => (
                    <SelectItem key={community} value={community}>
                      {community} Community Only
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {(["All", "Available", "Closed"] as const).map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className="whitespace-nowrap"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="property-card-modern">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {property.property_type} | {property.bhk}
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.locality}, {property.city}
                    </div>
                  </div>
                  <Badge 
                    variant={getStatusBadgeVariant(property.availability)}
                    className="ml-2"
                  >
                    {property.availability}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Price */}
                  <div className="text-lg font-semibold text-primary">
                    {formatPrice(property)}
                  </div>

                  {/* Property Details */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-2" />
                      {property.built_up_area} sq ft • {property.furnishing}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {property.owner_name}
                    </div>
                    {property.landmark && (
                      <div className="text-xs text-gray-500">
                        Near {property.landmark}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleCall(property.owner_phone)}
                      className="flex-1"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleWhatsApp(property.owner_phone)}
                      className="flex-1"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || statusFilter !== "All" || communityFilter !== "All"
                ? "No properties found" 
                : "No community properties yet"
              }
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== "All" || communityFilter !== "All"
                ? "Try adjusting your search or filter criteria"
                : "No dealers have shared their properties yet"
              }
            </p>
            <div className="text-sm text-gray-500">
              {communityFilter === "All" ? (
                <p>Showing all public properties and community properties</p>
              ) : (
                <p>Showing properties for: <span className="font-medium">{communityFilter}</span></p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-2xl z-20 lg:hidden">
        <div className="container mx-auto px-4 max-w-sm sm:max-w-md md:max-w-2xl">
          <div className="flex justify-around py-4">
            <Link href="/">
              <Button 
                variant="ghost" 
                size="lg"
                className="flex flex-col items-center space-y-2 px-4 py-3 rounded-2xl transition-all duration-300 text-gray-500 hover:text-primary hover:bg-gray-50"
              >
                <Home className="w-6 h-6" />
                <span className="text-xs font-semibold">Home</span>
              </Button>
            </Link>
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
            <Button 
              variant="ghost" 
              size="lg"
              className="flex flex-col items-center space-y-2 px-4 py-3 rounded-2xl transition-all duration-300 text-primary bg-primary/10"
            >
              <Users className="w-6 h-6" />
              <span className="text-xs font-semibold">Community</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
