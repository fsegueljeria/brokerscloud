"use client"
import { Box, Grid, Paper, Typography, useTheme, useMediaQuery } from "@mui/material"
import {
  AttachMoney as MoneyIcon,
  CalendarMonth as CalendarIcon,
  Person as PersonIcon,
  Notes as NotesIcon,
  SwapHoriz as SwapIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material"

// Función para formatear moneda
const formatCurrency = (amount, currency) => {
  if (currency === "CLP") {
    return `${amount.toLocaleString("es-CL")}`
  } else if (currency === "UF") {
    return `${amount.toLocaleString("es-CL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} UF`
  } else if (currency === "USD") {
    return `US${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
  return `${amount} ${currency}`
}

// Función para formatear fecha
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString("es-ES", options)
}

// Mapeo de etapas a nombres legibles
const stageNames = {
  DRAFT: "Borrador",
  SUBMITTED: "Enviada",
  COUNTER_OFFER: "Contraoferta",
  CONFIRM_FOR_EXCHANGE: "Confirmar Por Canje",
  PENDING_CLIENT_APPROVAL: "Pendiente Visar Cliente",
  PENDING_CAPTURER_APPROVAL: "Pendiente Visar Captador",
  PENDING_PLACER_APPROVAL: "Pendiente Visar Colocador",
  PENDING_OWNER_APPROVAL: "Pendiente Visar Propietario",
  ACCEPTED: "Aceptada",
  REJECTED: "Rechazada",
  EXPIRED: "Expirada",
  FINALIZED: "Finalizada",
  CANCELLED: "Cancelada",
}

// Datos de ejemplo para mostrar información relacionada
const mockData = {
  properties: {
    "1": { name: "Apartamento Centro", address: "Calle Mayor 10" },
    "2": { name: "Villa Playa", address: "Paseo Marítimo 25" },
    "3": { name: "Local Centro", address: "Gran Vía 45" },
    "4": { name: "Piso Universidad", address: "Calle Universidad 8" },
    "5": { name: "Chalet Sierra", address: "Camino Montaña 12" },
  },
  opportunities: {
    "1": { name: "Apartamento Centro" },
    "2": { name: "Casa Playa" },
    "3": { name: "Local Comercial" },
    "4": { name: "Piso Estudiantes" },
    "5": { name: "Chalet Montaña" },
  },
  leads: {
    "1": { name: "Carlos Rodríguez", email: "carlos@example.com" },
    "2": { name: "Laura Sánchez", email: "laura@example.com" },
    "3": { name: "Miguel Torres", email: "miguel@example.com" },
    "4": { name: "Isabel Díaz", email: "isabel@example.com" },
    "5": { name: "Roberto Fernández", email: "roberto@example.com" },
  },
  agents: {
    "1": { name: "Ana García" },
    "2": { name: "Pedro Martínez" },
    "3": { name: "Laura Fernández" },
  },
  supervisors: {
    "4": { name: "Carlos López" },
    "5": { name: "María Rodríguez" },
  },
  organizations: {
    "1": { name: "Inmobiliaria XYZ" },
    "2": { name: "Propiedades ABC" },
  },
}

// Componente para secciones con título
const SummarySection = ({ title, icon, children }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Box sx={{ width: "100%", mb: { xs: 2, sm: 3 } }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        {icon}
        <Typography
          variant={isMobile ? "subtitle1" : "h6"}
          component="h3"
          sx={{ ml: 1, fontWeight: 600, fontSize: { xs: "1rem", sm: "1.25rem" } }}
        >
          {title}
        </Typography>
      </Box>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.5, sm: 2 },
          bgcolor: "background.paper",
          borderRadius: 1,
          width: "100%",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {children}
      </Paper>
    </Box>
  )
}

// Componente para mostrar un campo de información
const InfoField = ({ label, value, fullWidth = false }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Box sx={{ mb: 1, width: fullWidth ? "100%" : "auto" }}>
      <Typography variant="caption" color="text.secondary" component="div">
        {label}
      </Typography>
      <Typography
        variant={isMobile ? "body2" : "body1"}
        component="div"
        sx={{ fontWeight: fullWidth ? 400 : 500, wordBreak: "break-word" }}
      >
        {value || "-"}
      </Typography>
    </Box>
  )
}

export function OfferSummaryStep({ formData, isMobile }) {
  const theme = useTheme()

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Resumen de la Oferta
      </Typography>

      <SummarySection title="Información Económica" icon={<MoneyIcon color="primary" />}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <InfoField label="Monto de la Oferta" value={formatCurrency(formData.amount, formData.currency)} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoField label="Moneda" value={formData.currency} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoField label="Comisión (%)" value={`${formData.commission}%`} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoField
              label="Monto de Comisión"
              value={formatCurrency(formData.amountCommission, formData.currencyCommission)}
            />
          </Grid>
        </Grid>
      </SummarySection>

      <SummarySection title="Detalles de la Oferta" icon={<CalendarIcon color="primary" />}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <InfoField label="Fecha de Expiración" value={formatDate(formData.expirationDate)} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoField label="Etapa" value={stageNames[formData.stage] || formData.stage} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SwapIcon color={formData.swap ? "info" : "disabled"} sx={{ mr: 1 }} />
              <InfoField label="Canje" value={formData.swap ? "Incluye canje" : "Sin canje"} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {formData.active ? (
                <CheckCircleIcon color="success" sx={{ mr: 1 }} />
              ) : (
                <CancelIcon color="error" sx={{ mr: 1 }} />
              )}
              <InfoField label="Estado" value={formData.active ? "Activa" : "Inactiva"} />
            </Box>
          </Grid>
        </Grid>
      </SummarySection>

      <SummarySection title="Relaciones" icon={<PersonIcon color="primary" />}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <InfoField
              label="Organización"
              value={mockData.organizations[formData.organizationId]?.name || formData.organizationId}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <InfoField
              label="Oportunidad"
              value={mockData.opportunities[formData.opportunityId]?.name || formData.opportunityId}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <InfoField
              label="Propiedad"
              value={
                mockData.properties[formData.propertyId]
                  ? `${mockData.properties[formData.propertyId].name} (${
                      mockData.properties[formData.propertyId].address
                    })`
                  : formData.propertyId
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <InfoField
              label="Cliente"
              value={
                mockData.leads[formData.customerLeadId]
                  ? `${mockData.leads[formData.customerLeadId].name} (${mockData.leads[formData.customerLeadId].email})`
                  : formData.customerLeadId
              }
            />
          </Grid>
        </Grid>
      </SummarySection>

      <SummarySection title="Asignaciones" icon={<PersonIcon color="primary" />}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InfoField
              label="Agente Asignado"
              value={mockData.agents[formData.assignAgentId]?.name || formData.assignAgentId}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoField
              label="Supervisor"
              value={
                formData.assignSupervisorId
                  ? mockData.supervisors[formData.assignSupervisorId]?.name || formData.assignSupervisorId
                  : "Sin supervisor"
              }
            />
          </Grid>
        </Grid>
      </SummarySection>

      {formData.observation && (
        <SummarySection title="Observaciones" icon={<NotesIcon color="primary" />}>
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
            {formData.observation}
          </Typography>
        </SummarySection>
      )}
    </Box>
  )
}
