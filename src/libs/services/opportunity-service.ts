import { mockOpportunities } from "@/libs/mock-data"
import type { Opportunity } from "@/types/types"

// Clase de servicio para gestionar oportunidades
class OpportunityService {
  // Obtener todas las oportunidades
  async getOpportunities(): Promise<Opportunity[]> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 500))
    
return Object.values(mockOpportunities)
  }

  // Obtener una oportunidad por su ID
  async getOpportunityById(id: string | number): Promise<Opportunity | null> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 300))
    const numericId = typeof id === "string" ? Number.parseInt(id, 10) : id

    
return mockOpportunities[numericId] || null
  }

  // Obtener oportunidades por etapa
  async getOpportunitiesByStage(stage: string): Promise<Opportunity[]> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 400))
    
return Object.values(mockOpportunities).filter((opportunity) => opportunity.stage === stage)
  }

  // Obtener oportunidades por agente asignado
  async getOpportunitiesByAgent(agentId: number): Promise<Opportunity[]> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 400))
    
return Object.values(mockOpportunities).filter((opportunity) => opportunity.assignAgentId === agentId)
  }

  // Obtener oportunidades por prospecto
  async getOpportunitiesByProspect(prospectId: number): Promise<Opportunity[]> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 400))
    
return Object.values(mockOpportunities).filter((opportunity) => opportunity.prospectId === prospectId)
  }

  // Crear una nueva oportunidad
  async createOpportunity(opportunityData: Partial<Opportunity>): Promise<Opportunity> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 600))

    const newId = Math.max(...Object.keys(mockOpportunities).map(Number)) + 1

    const newOpportunity: Opportunity = {
      id: newId,
      name: opportunityData.name || "Nueva Oportunidad",
      stage: opportunityData.stage || "INITIAL_CONTACT",
      description: opportunityData.description || "",
      source: opportunityData.source || "DIRECT",
      expectedCloseDate:
        opportunityData.expectedCloseDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      probability: opportunityData.probability || 50,
      amount: opportunityData.amount || 0,
      curCode: opportunityData.curCode || "CLP",
      active: opportunityData.active !== undefined ? opportunityData.active : true,
      organizationId: opportunityData.organizationId || 1,
      assignAgentId: opportunityData.assignAgentId || 1,
      prospectId: opportunityData.prospectId || 1,
      properties: opportunityData.properties || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockOpportunities[newId] = newOpportunity
    
return newOpportunity
  }

  // Actualizar una oportunidad existente
  async updateOpportunity(id: number, opportunityData: Partial<Opportunity>): Promise<Opportunity | null> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (!mockOpportunities[id]) return null

    const updatedOpportunity = { ...mockOpportunities[id], ...opportunityData, updatedAt: new Date().toISOString() }

    mockOpportunities[id] = updatedOpportunity

    return updatedOpportunity
  }

  // Eliminar una oportunidad
  async deleteOpportunity(id: number): Promise<boolean> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 400))

    if (!mockOpportunities[id]) return false

    delete mockOpportunities[id]
    
return true
  }
}

// Exportar una instancia del servicio
export const opportunityService = new OpportunityService()
