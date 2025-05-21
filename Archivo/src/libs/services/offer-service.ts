import type { Offer, OfferStage, AuditLog } from "@/types/types"
import { mockOffers, mockAuditLogs, mockAgents } from "@/libs/mock-data"

// Singleton para mantener el estado de las ofertas
class OfferService {
  private static instance: OfferService
  private offers: Offer[]
  private auditLogs: AuditLog[]
  private nextLogId: number

  private constructor() {
    this.offers = [...mockOffers]
    this.auditLogs = [...mockAuditLogs]
    this.nextLogId = this.auditLogs.length + 1
  }

  public static getInstance(): OfferService {
    if (!OfferService.instance) {
      OfferService.instance = new OfferService()
    }
    return OfferService.instance
  }

  public getOffers(): Offer[] {
    return this.offers
  }

  public getOfferById(id: number): Offer | undefined {
    return this.offers.find((offer) => offer.id === id)
  }

  public updateOfferStage(id: number, stage: OfferStage): Offer | undefined {
    const offerIndex = this.offers.findIndex((offer) => offer.id === id)
    if (offerIndex === -1) return undefined

    const previousStage = this.offers[offerIndex].stage
    const updatedOffer = {
      ...this.offers[offerIndex],
      stage,
      updatedAt: new Date().toISOString(),
    }

    this.offers[offerIndex] = updatedOffer

    // Registrar el cambio en el log de auditoría
    this.addAuditLog({
      offerId: id,
      actionType: "STATE_CHANGE",
      description: "Cambio de estado",
      previousValue: previousStage,
      newValue: stage,
      // En un entorno real, estos valores vendrían del usuario autenticado
      userId: updatedOffer.assignAgentId,
      userName: mockAgents[updatedOffer.assignAgentId].name,
    })

    return updatedOffer
  }

  public getOffersByOpportunityId(opportunityId: number): Offer[] {
    return this.offers.filter((offer) => offer.opportunityId === opportunityId)
  }

  public getAuditLogsByOfferId(offerId: number): AuditLog[] {
    return this.auditLogs
      .filter((log) => log.offerId === offerId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  private addAuditLog(logData: Omit<AuditLog, "id" | "timestamp">): AuditLog {
    const newLog: AuditLog = {
      id: this.nextLogId++,
      timestamp: new Date().toISOString(),
      ...logData,
    }

    this.auditLogs.push(newLog)
    return newLog
  }
}

export const offerService = OfferService.getInstance()
