import { mockProperties } from "@/libs/mock-data"
import type { Property } from "@/types/types"

// Clase de servicio para gestionar propiedades
class PropertyService {
  // Obtener todas las propiedades
  async getProperties(p0: { page: number; limit: number; search: string; type: string | undefined }): Promise<Property[]> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    return Object.values(mockProperties)
  }

  // Obtener propiedades con filtros
  async getPropertiesSearch({ page, limit, search, type, status }: { 
    page: number; 
    limit: number; 
    search: string; 
    type?: string; 
    status?: string; 
  }): Promise<Property[]> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    let filteredProperties = Object.values(mockProperties)

    // Aplicar filtro de búsqueda
    if (search && search.trim() !== "") {
      const searchLower = search.toLowerCase()
      filteredProperties = filteredProperties.filter(property => 
        property.title.toLowerCase().includes(searchLower) ||
        property.address.toLowerCase().includes(searchLower) ||
        property.city.toLowerCase().includes(searchLower) ||
        property.description?.toLowerCase().includes(searchLower)
      )
    }

    // Aplicar filtro de tipo
    if (type) {
      filteredProperties = filteredProperties.filter(property => property.type == type)
    }

    // Aplicar filtro de estado
    if (status) {
      filteredProperties = filteredProperties.filter(property => property.status == status)
    }

    // Aplicar paginación
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    return filteredProperties.slice(startIndex, endIndex)
  }

  // Obtener una propiedad por su ID
  async getPropertyById(id: string | number): Promise<Property | null> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 300))
    const numericId = typeof id === "string" ? Number.parseInt(id, 10) : id

    
    return mockProperties[numericId] || null
  }

  // Obtener propiedades por tipo
  async getPropertiesByType(type: string): Promise<Property[]> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 400))
    
    return Object.values(mockProperties).filter((property) => property.type === type)
  }

  // Crear una nueva propiedad
  async createProperty(propertyData: Partial<Property>): Promise<Property> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 600))

    const newId = Math.max(...Object.keys(mockProperties).map(Number)) + 1

    const newProperty: Property = {
      id: newId.toString(),
      code: propertyData.code || `PROP-${String(newId).padStart(3, "0")}`,
      title: propertyData.title || "Nueva Propiedad",
      description: propertyData.description || "",
      type: propertyData.type || "CASA",
      price: propertyData.price || 0,
      currency: propertyData.currency || "CLP",
      shared: propertyData.shared || false,
      bedrooms: propertyData.bedrooms || 0,
      bathrooms: propertyData.bathrooms || 0,
      yearBuilt: propertyData.yearBuilt || new Date().getFullYear(),
      m2Built: propertyData.m2Built || 0,
      m2SemiCovered: propertyData.m2SemiCovered || 0,
      area: propertyData.area || 0,
      address: propertyData.address || "",
      zipCode: propertyData.zipCode || "",
      city: propertyData.city || "",
      province: propertyData.province || "",
      country: propertyData.country || "",
      images: propertyData.images || [],
      organization: propertyData.organization || null,
      owner: propertyData.owner || null,
      portalPublications: propertyData.portalPublications || [],
      x: propertyData.x || 0,
      y: propertyData.y || 0,
      status: propertyData.status || "BORRADOR",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockProperties[newId] = newProperty
    
    return newProperty
  }

  // Actualizar una propiedad existente
  async updateProperty(id: number, propertyData: Partial<Property>): Promise<Property | null> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (!mockProperties[id]) return null

    const updatedProperty = { ...mockProperties[id], ...propertyData, updatedAt: new Date().toISOString() }

    mockProperties[id] = updatedProperty

    return updatedProperty
  }

  // Eliminar una propiedad
  async deleteProperty(id: number): Promise<boolean> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 400))

    if (!mockProperties[id]) return false

    delete mockProperties[id]
    
return true
  }

  // Buscar propiedades
  async searchProperties(query: string): Promise<Property[]> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 400))

    const lowerQuery = query.toLowerCase()

    
return Object.values(mockProperties).filter(
      (property) =>
        property.title.toLowerCase().includes(lowerQuery) ||
        property.address.toLowerCase().includes(lowerQuery) ||
        property.city.toLowerCase().includes(lowerQuery) ||
        property.description?.toLowerCase().includes(lowerQuery),
    )
  }
}

// Exportar una instancia del servicio
export const propertyService = new PropertyService()
