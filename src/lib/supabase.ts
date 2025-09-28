import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Property {
  id: string
  property_type: 'Flat' | 'Independent House' | 'Builder Floor' | 'Villa' | 'Shop' | 'Office' | 'Plot' | 'Warehouse' | 'Other'
  listing_type: 'Rent' | 'Sale'
  availability: 'Available' | 'Rented' | 'Sold'
  bhk: string
  built_up_area: number
  floor_number?: number
  total_floors?: number
  furnishing?: 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished'
  parking: boolean
  property_age?: 'New' | '<5 yrs' | '5-10 yrs' | '10+ yrs'
  city: string
  locality: string
  landmark?: string
  pin_code?: string
  expected_price?: number
  monthly_rent?: number
  security_deposit?: number
  owner_name: string
  owner_phone: string
  dealer_notes?: string
  photos: string[]
  visibility: 'Public' | 'Private'
  created_at: string
  updated_at: string
  user_id?: string
}

export interface PropertyInsert {
  property_type: Property['property_type']
  listing_type: Property['listing_type']
  availability: Property['availability']
  bhk: string
  built_up_area: number
  floor_number?: number
  total_floors?: number
  furnishing?: Property['furnishing']
  parking?: boolean
  property_age?: Property['property_age']
  city: string
  locality: string
  landmark?: string
  pin_code?: string
  expected_price?: number
  monthly_rent?: number
  security_deposit?: number
  owner_name: string
  owner_phone: string
  dealer_notes?: string
  photos?: string[]
  visibility?: Property['visibility']
}

