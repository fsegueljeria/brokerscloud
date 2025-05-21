import { mockVisits } from "@/libs/mock-data"
import type { Visit } from "@/types/types"

// Clase de servicio para gestionar visitas
class VisitService {
  // Obtener todas las visitas
  async getVisits(): Promise<Visit[]> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 500))
    
return mockVisits
  }

  // Obtener una visita por su ID
  async getVisitById(id: string | number): Promise<Visit | null> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 300))
    const numericId = typeof id === "string" ? Number.parseInt(id, 10) : id

    
return mockVisits.find((visit) => visit.id === numericId) || null
  }

  // Obtener visitas por oportunidad
  async getVisitsByOpportunity(opportunityId: number): Promise<Visit[]> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 400))
    
return mockVisits.filter((visit) => visit.opportunityId === opportunityId)
  }

  // Obtener visitas por propiedad
  async getVisitsByProperty(propertyId: number): Promise<Visit[]> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 400))
    
return mockVisits.filter((visit) => visit.propertyId === propertyId)
  }

  // Obtener visitas por agente
  async getVisitsByAgent(agentId: number): Promise<Visit[]> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 400))
    
return mockVisits.filter((visit) => visit.assignedAgentId === agentId)
  }

  // Crear una nueva visita
  async createVisit(visitData: Partial<Visit>): Promise<Visit> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 600))

    const newVisit: Visit = {
      id: Math.max(...mockVisits.map((v) => v.id)) + 1,
      title: visitData.title || "Nueva Visita",
      opportunityId: visitData.opportunityId || 0,
      propertyId: visitData.propertyId || 0,
      date: visitData.date || new Date().toISOString(),
      startTime: visitData.startTime || "10:00",
      endTime: visitData.endTime || "11:00",
      status: visitData.status || "SCHEDULED",
      notes: visitData.notes || "",
      assignedAgentId: visitData.assignedAgentId || 1,
      attendees: visitData.attendees || { contacts: [], prospects: [] },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockVisits.push(newVisit)
    
return newVisit
  }

  // Actualizar una visita existente
  async updateVisit(id: number, visitData: Partial<Visit>): Promise<Visit | null> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 500))

    const visitIndex = mockVisits.findIndex((visit) => visit.id === id)

    if (visitIndex === -1) return null

    const updatedVisit = { ...mockVisits[visitIndex], ...visitData, updatedAt: new Date().toISOString() }

    mockVisits[visitIndex] = updatedVisit

    return updatedVisit
  }

  // Eliminar una visita
  async deleteVisit(id: number): Promise<boolean> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 400))

    const visitIndex = mockVisits.findIndex((visit) => visit.id === id)

    if (visitIndex === -1) return false

    mockVisits.splice(visitIndex, 1)
    
return true
  }
}

// Exportar una instancia del servicio
export const visitService = new VisitService()
