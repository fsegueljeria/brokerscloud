export interface PropertyImage {
  id: string
  url: string
  isPrimary: boolean
  order: number
  caption?: string
  file?: File
}

export type Currency = "CLP" | "UF" | "USD"

// Actualizar el tipo OfferStage para incluir todos los nuevos estados
export type OfferStage =
  | "BORRADOR"
  | "ENVIADA"
  | "NEGOCIACION"
  | "CONTRAOFERTA"
  | "CONFIRMACION_POR_EXCHANGE"
  | "PENDIENTE_APROBACION_CLIENTE"
  | "PENDIENTE_APROBACION_CAPTADOR"
  | "PENDIENTE_APROBACION_COLOCADOR"
  | "PENDIENTE_APROBACION_PROPIETARIO"
  | "ACEPTADO"
  | "RECHAZADO"
  | "EXPIRADO"
  | "FINALIZADO"
  | "CANCELADO"

export type OpportunityStage =
  | "PROSPECCION"
  | "CALIFICACION"
  | "CONTACTO_INICIAL"
  | "ANALISIS_NECESIDADES"
  | "VISITA_PROGRAMADA"
  | "NEGOCIACION"
  | "PROPUESTA"
  | "CIERRE"
  | "PERDIDO"
  | "POST_VENTA"
  | "GESTION_RELACIONES"

export type VisitStatus = "PROGRAMADA" | "COMPLETADA" | "CANCELADA" | "REPROGRAMADA" | "PENDIENTE_CONFIRMACION"

export interface Visit {
  id: number
  title: string
  opportunityId: number
  propertyId: number
  date: string
  startTime: string
  endTime: string
  status: VisitStatus
  notes?: string
  assignedAgentId: number
  attendees: {
    contacts: number[]
    prospects: number[]
  }
  createdAt: string
  updatedAt: string
}

export type TypePropertyType = "APARTAMENTO" | "CASA" | "TERRENO" | "COMERCIAL" | "OFICINA" | "GARAGE" | "ALMACEN" | "OTRO"

export type PropertyState =
  | "DISPONIBLE"
  | "RESERVADO"
  | "VENDIDO"
  | "ALQUILADO"
  | "INACTIVO"
  | "EN_CONSTRUCCION"
  | "BORRADOR"
  | "PUBLICADO"

export interface Property {
  id: string
  code?: string
  title: string
  type: TypePropertyType
  status: PropertyState
  price: number
  currency: Currency
  address: string
  city: string
  province: string
  zipCode?: string
  country: string
  bedrooms: number
  bathrooms: number
  area: number
  description?: string
  features?: string[]
  images: PropertyImage[]
  createdAt: string
  updatedAt: string
  shared?: boolean
  yearBuilt?: number
  m2Built?: number
  m2SemiCovered?: number
  x?: number
  y?: number
  organization?: number | null
  owner?: number | null
  portalPublications?: PropertyPortalPublication[]
}

export interface Offer {
  id: number
  amount: number
  number: number
  reference: string
  title: string
  currency: Currency
  commission: number
  amountCommission: number
  currencyCommission: Currency
  expirationDate: string
  observation?: string
  stage: OfferStage
  swap: boolean
  active: boolean
  organizationId: number
  opportunityId: number
  propertyId: number
  prospectId: number // Cambiado de customerLeadId a prospectId
  assignAgentId: number
  assignSupervisorId?: number | null
  createdAt: string
  updatedAt: string
  validUntil?: string | null
  observations?: string
  isActive?: boolean
}

export interface Opportunity {

  id: number
  name: string
  stage: OpportunityStage
  description?: string
  source?: string
  expectedCloseDate: string
  probability: number
  amount: number
  curCode: Currency
  budget: number
  budgetCurrency: Currency
  active: boolean
  organizationId: number
  assignAgentId: number
  prospectId: number
  properties: string[]
  createdAt: string
  updatedAt: string
}

export interface OpportunityView {
  id: number
  name: string
  stage: OpportunityStage
  description?: string
  source?: string
  expectedCloseDate: string
  probability: number
  amount: number
  curCode: Currency
  active: boolean
  organization: string
  assignAgent: string
  prospect: string
  properties: string[]
  createdAt: string
  updatedAt: string
}

export interface PropertyPortalPublication {
  portalId: string
  status: PublicationStatus
  publicationDate: string
  expirationDate: string
  url: string
  reference: string
  featured: boolean
  cost: number
  currency: Currency
}

export type PublicationStatus = "BORRADOR" | "PUBLICADO" | "PAUSADO" | "EXPIRADO" | "RECHAZADO"

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string | null
  source: string
  status: string
  createdAt: string
  propertyId?: string
  propertyTitle?: string
  lastMessage?: string
  date: string
}

export interface LeadMessage {
  id: string
  leadId: string
  date: string
  content: string
  isFromLead: boolean
  propertyId?: string
}

// Nueva interfaz para Prospectos
export type ProspectStatus = "ACTIVO" | "INACTIVO" | "POTENCIAL" | "CALIFICADO" | "CONVERTIDO" | "PERDIDO"

export type ProspectType = "COMPRADOR" | "VENDEDOR" | "PROPIETARIO" | "INVERSIONISTA" | "ARRENDATARIO" | "OTRO"

export interface Prospect {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  secondaryPhone?: string
  address?: string
  city?: string
  province?: string
  country?: string
  postalCode?: string
  company?: string
  position?: string
  status: ProspectStatus
  type: ProspectType
  source?: string
  budget?: number
  budgetCurrency?: Currency
  preferredContactMethod?: "EMAIL" | "PHONE" | "WHATSAPP" | "PRESENCIAL"
  notes?: string
  assignedAgentId?: number
  leadId?: string
  createdAt: string
  updatedAt: string
  lastContactDate?: string
  tags?: string[]
  propertyPreferences?: {
    types?: TypePropertyType[]
    minBedrooms?: number
    maxBedrooms?: number
    minBathrooms?: number
    maxBathrooms?: number
    minArea?: number
    maxArea?: number
    locations?: string[]
    features?: string[]
  }
}

// Nueva interfaz para los logs de auditoría
export type LogActionType =
  | "CAMBIO_ESTADO"
  | "CAMBIO_MONTO"
  | "CAMBIO_COMISION"
  | "CAMBIO_OBSERVACION"
  | "CAMBIO_FECHA_EXPIRACION"
  | "CAMBIO_ASIGNACION"
  | "CREADO"
  | "ACTUALIZADO"
  | "ELIMINADO"

export interface AuditLog {
  id: number
  offerId: number
  timestamp: string
  actionType: LogActionType
  description: string
  previousValue?: string
  newValue?: string
  userId: number
  userName: string
}
