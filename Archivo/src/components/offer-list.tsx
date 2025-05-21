"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import type { Offer } from "@/types/types"
import { formatCurrency } from "@/libs/utils"

// Datos de ejemplo para propiedades, agentes y contactos
const mockProperties = {
  1: { name: "Apartamento Centro", address: "Calle Mayor 10" },
  2: { name: "Villa Playa", address: "Paseo Marítimo 25" },
  3: { name: "Local Centro", address: "Gran Vía 45" },
  4: { name: "Piso Universidad", address: "Calle Universidad 8" },
  5: { name: "Chalet Sierra", address: "Camino Montaña 12" },
}

const mockAgents = {
  1: { name: "Ana García", avatar: "AG" },
  2: { name: "Pedro Martínez", avatar: "PM" },
  3: { name: "Laura Fernández", avatar: "LF" },
  4: { name: "Carlos López", avatar: "CL" },
  5: { name: "María Rodríguez", avatar: "MR" },
}

const mockLeads = {
  1: { name: "Carlos Rodríguez", email: "carlos@example.com" },
  2: { name: "Laura Sánchez", email: "laura@example.com" },
  3: { name: "Miguel Torres", email: "miguel@example.com" },
  4: { name: "Isabel Díaz", email: "isabel@example.com" },
  5: { name: "Roberto Fernández", email: "roberto@example.com" },
}

// Colores para las etapas de oferta
const offerStageColors = {
  DRAFT: { bg: "#e3f2fd", color: "#1565c0", label: "Borrador" },
  SUBMITTED: { bg: "#f3e5f5", color: "#7b1fa2", label: "Enviada" },
  COUNTER_OFFER: { bg: "#e0f7fa", color: "#0097a7", label: "Contraoferta" },
  CONFIRM_FOR_EXCHANGE: { bg: "#fff3e0", color: "#e65100", label: "Confirmar Por Canje" },
  PENDING_CLIENT_APPROVAL: { bg: "#e8f5e9", color: "#2e7d32", label: "Pendiente Visar Cliente" },
  PENDING_CAPTURER_APPROVAL: { bg: "#f1f8e9", color: "#558b2f", label: "Pendiente Visar Captador" },
  PENDING_PLACER_APPROVAL: { bg: "#f9fbe7", color: "#827717", label: "Pendiente Visar Colocador" },
  PENDING_OWNER_APPROVAL: { bg: "#fffde7", color: "#f57f17", label: "Pendiente Visar Propietario" },
  ACCEPTED: { bg: "#e8f5e9", color: "#2e7d32", label: "Aceptada" },
  REJECTED: { bg: "#ffebee", color: "#c62828", label: "Rechazada" },
  EXPIRED: { bg: "#f5f5f5", color: "#757575", label: "Expirada" },
  FINALIZED: { bg: "#e0f2f1", color: "#00796b", label: "Finalizada" },
  CANCELLED: { bg: "#fafafa", color: "#424242", label: "Cancelada" },
}

// Datos de ejemplo para las ofertas
export const mockOffers: Offer[] = [
  {
    id: 1,
    amount: 240000000,
    currency: "CLP",
    commission: 3,
    amountCommission: 7200000,
    currencyCommission: "CLP",
    expirationDate: "2023-05-15",
    observation: "Primera oferta por el apartamento",
    stage: "SUBMITTED",
    swap: false,
    active: true,
    organizationId: 1,
    opportunityId: 1,
    propertyId: 1,
    prospectId: 1,
    assignAgentId: 1,
    assignSupervisorId: 4,
    createdAt: "2023-04-10T10:00:00Z",
    updatedAt: "2023-04-10T10:00:00Z",
  },
  {
    id: 2,
    amount: 8500,
    currency: "UF",
    commission: 3,
    amountCommission: 255,
    currencyCommission: "UF",
    expirationDate: "2023-05-20",
    observation: "Contraoferta del vendedor",
    stage: "COUNTER_OFFER",
    swap: false,
    active: true,
    organizationId: 1,
    opportunityId: 1,
    propertyId: 1,
    prospectId: 1,
    assignAgentId: 1,
    assignSupervisorId: 4,
    createdAt: "2023-04-15T14:00:00Z",
    updatedAt: "2023-04-15T14:00:00Z",
  },
  {
    id: 3,
    amount: 235000,
    currency: "USD",
    commission: 3,
    amountCommission: 7050,
    currencyCommission: "USD",
    expirationDate: "2023-05-25",
    observation: "Oferta final",
    stage: "ACCEPTED",
    swap: true,
    active: true,
    organizationId: 1,
    opportunityId: 1,
    propertyId: 1,
    prospectId: 1,
    assignAgentId: 1,
    assignSupervisorId: 4,
    createdAt: "2023-04-18T09:00:00Z",
    updatedAt: "2023-04-18T09:00:00Z",
  },
  {
    id: 4,
    amount: 420000000,
    currency: "CLP",
    commission: 3,
    amountCommission: 12600000,
    currencyCommission: "CLP",
    expirationDate: "2023-05-10",
    observation: "Oferta inicial por la villa",
    stage: "REJECTED",
    swap: true,
    active: false,
    organizationId: 1,
    opportunityId: 2,
    propertyId: 2,
    prospectId: 2,
    assignAgentId: 2,
    assignSupervisorId: 5,
    createdAt: "2023-04-05T11:00:00Z",
    updatedAt: "2023-04-12T14:30:00Z",
  },
  {
    id: 5,
    amount: 6300,
    currency: "UF",
    commission: 3,
    amountCommission: 189,
    currencyCommission: "UF",
    expirationDate: "2023-04-30",
    observation: "Oferta por el local comercial",
    stage: "EXPIRED",
    swap: false,
    active: false,
    organizationId: 1,
    opportunityId: 3,
    propertyId: 3,
    prospectId: 3,
    assignAgentId: 1,
    assignSupervisorId: null,
    createdAt: "2023-04-01T10:00:00Z",
    updatedAt: "2023-05-01T00:00:00Z",
  },
  // Añadimos una oferta con ID 1058 para el ejemplo
  {
    id: 1058,
    amount: 280000000,
    currency: "CLP",
    commission: 3,
    amountCommission: 8400000,
    currencyCommission: "CLP",
    expirationDate: "2023-06-30",
    observation: "Oferta para el ejemplo de la página de detalle",
    stage: "DRAFT", // Inicialmente en borrador
    swap: true,
    active: true,
    organizationId: 1,
    opportunityId: 1,
    propertyId: 1,
    prospectId: 1,
    assignAgentId: 1,
    assignSupervisorId: 4,
    createdAt: "2023-05-20T09:00:00Z",
    updatedAt: "2023-05-20T09:00:00Z",
  },
]

interface OfferListProps {
  opportunityId?: number
  onSelectOffer?: (offer: Offer) => void
  actionButtons?: (offer: Offer) => React.ReactNode
}

export function OfferList({ opportunityId, onSelectOffer, actionButtons }: OfferListProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [offers, setOffers] = useState<Offer[]>(
    opportunityId ? mockOffers.filter((offer) => offer.opportunityId === opportunityId) : mockOffers,
  )

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy", { locale: es })
  }

  const getStageChip = (stage: string) => {
    const stageInfo = offerStageColors[stage as keyof typeof offerStageColors]
    return (
      <Chip
        label={stageInfo.label}
        style={{
          backgroundColor: stageInfo.bg,
          color: stageInfo.color,
          fontWeight: "bold",
        }}
        size={isMobile ? "small" : "medium"}
      />
    )
  }

  const handleRowClick = (offer: Offer) => {
    if (onSelectOffer) {
      onSelectOffer(offer)
    }
  }

  if (offers.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="body1" color="text.secondary">
          No hay ofertas asociadas a esta oportunidad.
        </Typography>
      </Box>
    )
  }

  if (isMobile) {
    return (
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {offers.map((offer) => (
            <Grid item xs={12} key={offer.id}>
              <Card
                sx={{
                  cursor: onSelectOffer ? "pointer" : "default",
                  "&:hover": onSelectOffer ? { boxShadow: 3 } : {},
                }}
                onClick={() => handleRowClick(offer)}
              >
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {formatCurrency(offer.amount, offer.currency)}
                    </Typography>
                    {getStageChip(offer.stage)}
                  </Box>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {mockProperties[offer.propertyId as keyof typeof mockProperties]?.name}
                  </Typography>

                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                    <Typography variant="body2">
                      Cliente: {mockLeads[offer.prospectId as keyof typeof mockLeads]?.name}
                    </Typography>
                    <Typography variant="body2">Exp: {formatDate(offer.expirationDate)}</Typography>
                  </Box>

                  {offer.swap && (
                    <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                      Incluye Canje
                    </Typography>
                  )}

                  {actionButtons && (
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>{actionButtons(offer)}</Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Propiedad</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Monto</TableCell>
            <TableCell>Comisión</TableCell>
            <TableCell>Fecha Exp.</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Canje</TableCell>
            <TableCell>Agente</TableCell>
            {actionButtons && <TableCell align="right">Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {offers.map((offer) => (
            <TableRow
              key={offer.id}
              hover={!!onSelectOffer}
              onClick={() => handleRowClick(offer)}
              sx={{ cursor: onSelectOffer ? "pointer" : "default" }}
            >
              <TableCell>{mockProperties[offer.propertyId as keyof typeof mockProperties]?.name}</TableCell>
              <TableCell>{mockLeads[offer.prospectId as keyof typeof mockLeads]?.name}</TableCell>
              <TableCell>{formatCurrency(offer.amount, offer.currency)}</TableCell>
              <TableCell>{formatCurrency(offer.amountCommission, offer.currencyCommission)}</TableCell>
              <TableCell>{formatDate(offer.expirationDate)}</TableCell>
              <TableCell>{getStageChip(offer.stage)}</TableCell>
              <TableCell>{offer.swap ? "Sí" : "No"}</TableCell>
              <TableCell>{mockAgents[offer.assignAgentId as keyof typeof mockAgents]?.name}</TableCell>
              {actionButtons && <TableCell align="right">{actionButtons(offer)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
