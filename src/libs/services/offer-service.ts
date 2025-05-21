import {
  mockOffers,
  mockAuditLogs,
  mockProperties,
  mockProspects,
  mockAgents,
  mockOpportunities,
  offerStageColors,
} from "@/libs/mock-data"
import type { Offer, AuditLog, OfferStage } from "@/types/types"

// Clase de servicio para gestionar ofertas
class OfferService {
  // Obtener todas las ofertas
  async getOffers(): Promise<Offer[]> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 500))
    
return mockOffers
  }

  // Obtener una oferta por su ID
  async getOfferById(id: string | number): Promise<Offer | null> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 300))
    const numericId = typeof id === "string" ? Number.parseInt(id, 10) : id

    
return mockOffers.find((offer) => offer.id === numericId) || null
  }

  // Obtener ofertas por ID de oportunidad
  async getOffersByOpportunityId(opportunityId: number): Promise<Offer[]> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 400))
    
return mockOffers.filter((offer) => offer.opportunityId === opportunityId)
  }

  // Crear una nueva oferta
  async createOffer(offerData: Partial<Offer>): Promise<Offer> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 600))

    const newOffer: Offer = {
      id: Math.max(...mockOffers.map((o) => o.id)) + 1,
      title: offerData.title || "Nueva Oferta",
      reference:
        offerData.reference || `OF-${new Date().getFullYear()}-${String(mockOffers.length + 1).padStart(3, "0")}`,
      number: offerData.number || 0,
      propertyId: offerData.propertyId || 0,
      opportunityId: offerData.opportunityId || 0,
      prospectId: offerData.prospectId || 0,
      assignAgentId: offerData.assignAgentId || 0,
      amount: offerData.amount || 0,
      currency: offerData.currency || "CLP",
      commission: offerData.commission || 0,
      amountCommission: offerData.amountCommission || 0,
      currencyCommission: offerData.currencyCommission || "CLP",
      stage: offerData.stage || "BORRADOR",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      expirationDate: offerData.expirationDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      observation: offerData.observation || "",
      swap: offerData.swap || false,
      active: offerData.active !== undefined ? offerData.active : true,
      organizationId: offerData.organizationId || 1,
    }

    mockOffers.push(newOffer)

    // Registrar log de auditoría
    await this.addAuditLog({
      offerId: newOffer.id,
      actionType: "CREADO",
      userId: 1, // Asumimos el usuario 1 como predeterminado
      userName: "Sistema",
      description: "Oferta creada",
    })

    return newOffer
  }

  // Actualizar una oferta existente
  async updateOffer(id: number, offerData: Partial<Offer>): Promise<Offer | null> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 500))

    const offerIndex = mockOffers.findIndex((offer) => offer.id === id)

    if (offerIndex === -1) return null

    const oldOffer = { ...mockOffers[offerIndex] }
    const updatedOffer = { ...oldOffer, ...offerData, updatedAt: new Date().toISOString() }

    mockOffers[offerIndex] = updatedOffer

    // Registrar logs de auditoría para los cambios
    if (oldOffer.stage !== updatedOffer.stage) {
      await this.addAuditLog({
        offerId: updatedOffer.id,
        actionType: "CAMBIO_ESTADO",
        previousValue: oldOffer.stage,
        newValue: updatedOffer.stage,
        userId: 1, // Asumimos el usuario 1 como predeterminado
        userName: "Sistema",
        description: `Cambio de estado de ${oldOffer.stage} a ${updatedOffer.stage}`,
      })
    }

    if (oldOffer.amount !== updatedOffer.amount) {
      await this.addAuditLog({
        offerId: updatedOffer.id,
        actionType: "CAMBIO_MONTO",
        previousValue: oldOffer.amount.toString(),
        newValue: updatedOffer.amount.toString(),
        userId: 1,
        userName: "Sistema",
        description: `Cambio de monto de ${oldOffer.amount} a ${updatedOffer.amount}`,
      })
    }

    return updatedOffer
  }

  // Eliminar una oferta
  async deleteOffer(id: number): Promise<boolean> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 400))

    const offerIndex = mockOffers.findIndex((offer) => offer.id === id)

    if (offerIndex === -1) return false

    const deletedOffer = mockOffers[offerIndex]

    mockOffers.splice(offerIndex, 1)

    // Registrar log de auditoría
    await this.addAuditLog({
      offerId: id,
      actionType: "ELIMINADO",
      userId: 1,
      userName: "Sistema",
      description: `Oferta ${deletedOffer.reference} eliminada`,
    })

    return true
  }

  // Cambiar el estado de una oferta
  async changeOfferStage(id: number, newStage: OfferStage): Promise<Offer | null> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 300))

    const offerIndex = mockOffers.findIndex((offer) => offer.id === id)

    if (offerIndex === -1) return null

    const oldOffer = { ...mockOffers[offerIndex] }
    const updatedOffer = { ...oldOffer, stage: newStage, updatedAt: new Date().toISOString() }

    mockOffers[offerIndex] = updatedOffer

    // Registrar log de auditoría
    await this.addAuditLog({
      offerId: updatedOffer.id,
      actionType: "CAMBIO_ESTADO",
      previousValue: oldOffer.stage,
      newValue: newStage,
      userId: 1,
      userName: "Sistema",
      description: `Cambio de estado de ${oldOffer.stage} a ${newStage}`,
    })

    return updatedOffer
  }

  // Obtener logs de auditoría por ID de oferta
  async getAuditLogsByOfferId(offerId: number): Promise<AuditLog[]> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 300))
    
return mockAuditLogs.filter((log) => log.offerId === offerId)
  }

  // Añadir un log de auditoría
  async addAuditLog(logData: Partial<AuditLog>): Promise<AuditLog> {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 200))

    const newLog: AuditLog = {
      id: Math.max(...mockAuditLogs.map((l) => l.id), 0) + 1,
      offerId: logData.offerId || 0,
      timestamp: logData.timestamp || new Date().toISOString(),
      userId: logData.userId || 1,
      userName: logData.userName || "Sistema",
      actionType: logData.actionType || "ACTUALIZADO",
      previousValue: logData.previousValue,
      newValue: logData.newValue,
      description: logData.description || "",
    }

    mockAuditLogs.push(newLog)
    
return newLog
  }
}

// Exportar una instancia del servicio
export const offerService = new OfferService()

// Exportar también los datos mockeados para que los componentes puedan acceder a ellos
export { mockProperties, mockProspects, mockAgents, mockOpportunities, offerStageColors }
