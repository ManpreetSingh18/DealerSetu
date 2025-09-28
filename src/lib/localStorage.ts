// Local storage utilities for demo mode when Supabase is not available

export interface LocalProperty {
  id: string
  property_type: string
  listing_type: string
  availability: string
  bhk: string
  built_up_area: number
  floor_number?: number
  total_floors?: number
  furnishing?: string
  parking: boolean
  property_age?: string
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
  visibility: string
  created_at: string
  updated_at: string
  user_id?: string
}

const STORAGE_KEY = 'dealer-setu-properties'

export const getLocalProperties = (): LocalProperty[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return []
  }
}

export const saveLocalProperty = (property: Omit<LocalProperty, 'id' | 'created_at' | 'updated_at'>): LocalProperty => {
  const properties = getLocalProperties()
  const newProperty: LocalProperty = {
    ...property,
    id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  const updatedProperties = [newProperty, ...properties]
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProperties))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
  
  return newProperty
}

export const updateLocalProperty = (id: string, updates: Partial<LocalProperty>): LocalProperty | null => {
  const properties = getLocalProperties()
  const index = properties.findIndex(p => p.id === id)
  
  if (index === -1) return null
  
  const updatedProperty: LocalProperty = {
    ...properties[index],
    ...updates,
    updated_at: new Date().toISOString()
  }
  
  properties[index] = updatedProperty
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties))
  } catch (error) {
    console.error('Error updating localStorage:', error)
  }
  
  return updatedProperty
}

export const deleteLocalProperty = (id: string): boolean => {
  const properties = getLocalProperties()
  const filteredProperties = properties.filter(p => p.id !== id)
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredProperties))
    return true
  } catch (error) {
    console.error('Error deleting from localStorage:', error)
    return false
  }
}

