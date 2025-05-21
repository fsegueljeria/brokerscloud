import { mockProspects } from "@/libs/mock-data"
import type { Prospect } from "@/types/types"

// Clase de servicio para gestionar prospectos
class ProspectService {
  // Obtener todos los prospectos
  async getProspects(): Promise<Prospect[]> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 500))
    
return Object.values(mockProspects)
  }

  // Obtener un prospecto por su ID
  async getProspectById(id: string | number): Promise<Prospect | null> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 300))
    const numericId = typeof id === "string" ? Number.parseInt(id, 10) : id

    
return mockProspects[numericId] || null
  }

  // Obtener prospectos por tipo
  async getProspectsByType(type: string): Promise<Prospect[]> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 400))
    
return Object.values(mockProspects).filter((prospect) => prospect.type === type)
  }

  // Crear un nuevo prospecto
  async createProspect(prospectData: Partial<Prospect>): Promise<Prospect> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 600))

    const newId = Math.max(...Object.keys(mockProspects).map(Number)) + 1

    const newProspect: Prospect = {
      id: newId,
      firstName: prospectData.firstName || "",
      lastName: prospectData.lastName || "",
      email: prospectData.email || "",
      phone: prospectData.phone || "",
      status: prospectData.status || "POTENCIAL",
      type: prospectData.type || "COMPRADOR",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockProspects[newId] = newProspect
    
return newProspect
  }

  // Actualizar un prospecto existente
  async updateProspect(id: number, prospectData: Partial<Prospect>): Promise<Prospect | null> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (!mockProspects[id]) return null

    const updatedProspect = { ...mockProspects[id], ...prospectData, updatedAt: new Date().toISOString() }

    mockProspects[id] = updatedProspect

    return updatedProspect
  }

  // Eliminar un prospecto
  async deleteProspect(id: number): Promise<boolean> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 400))

    if (!mockProspects[id]) return false

    delete mockProspects[id]
    
return true
  }

  // Buscar prospectos
  async searchProspects(query: string): Promise<Prospect[]> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 400))

    const lowerQuery = query.toLowerCase()

    
return Object.values(mockProspects).filter(
      (prospect) =>
        prospect.firstName.toLowerCase().includes(lowerQuery) ||
        prospect.lastName.toLowerCase().includes(lowerQuery) ||
        prospect.email.toLowerCase().includes(lowerQuery) ||
        prospect.phone?.includes(query),
    )
  }
}

// Exportar una instancia del servicio
export const prospectService = new ProspectService()
