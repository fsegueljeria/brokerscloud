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
  | "DRAFT"
  | "SUBMITTED"
  | "COUNTER_OFFER"
  | "CONFIRM_FOR_EXCHANGE"
  | "PENDING_CLIENT_APPROVAL"
  | "PENDING_CAPTURER_APPROVAL"
  | "PENDING_PLACER_APPROVAL"
  | "PENDING_OWNER_APPROVAL"
  | "ACCEPTED"
  | "REJECTED"
  | "EXPIRED"
  | "FINALIZED"
  | "CANCELLED"

export type OpportunityStage =
  | "PROSPECTION"
  | "QUALIFICATION"
  | "INITIAL_CONTACT"
  | "NEEDS_ANALYSIS"
  | "NEGOTIATION"
  | "PROPOSAL"
  | "CLOSING"
  | "POST_SALE"
  | "RELATIONSHIP_MANAGEMENT"

export type VisitStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED" | "PENDING_CONFIRMATION"

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

export type TypePropertyType = "APARTMENT" | "HOUSE" | "LAND" | "COMMERCIAL" | "OFFICE" | "GARAGE" | "STORAGE" | "OTHER"

export type PropertyState =
  | "AVAILABLE"
  | "RESERVED"
  | "SOLD"
  | "RENTED"
  | "UNAVAILABLE"
  | "UNDER_CONSTRUCTION"
  | "DRAFT"
  | "PUBLISHED"

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
  numberOfBedrooms?: number
  numberOfBathrooms?: number
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
  active: boolean
  organizationId: number
  assignAgentId: number
  prospectId: number
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

export type PublicationStatus = "DRAFT" | "PUBLISHED" | "PAUSED" | "EXPIRED" | "REJECTED"

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
export type ProspectStatus = "ACTIVE" | "INACTIVE" | "POTENTIAL" | "QUALIFIED" | "CONVERTED" | "LOST"

export type ProspectType = "BUYER" | "SELLER" | "INVESTOR" | "TENANT" | "LANDLORD" | "OTHER"

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
  preferredContactMethod?: "EMAIL" | "PHONE" | "WHATSAPP" | "IN_PERSON"
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
  | "STATE_CHANGE"
  | "AMOUNT_CHANGE"
  | "COMMISSION_CHANGE"
  | "OBSERVATION_CHANGE"
  | "EXPIRATION_DATE_CHANGE"
  | "ASSIGNMENT_CHANGE"
  | "CREATED"
  | "UPDATED"
  | "DELETED"

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
