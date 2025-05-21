"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Container,
} from "@mui/material"
import {
  Save as SaveIcon,
  Close as CloseIcon,
  AttachMoney as MoneyIcon,
  CalendarMonth as CalendarIcon,
  Person as PersonIcon,
  Delete as DeleteIcon,
  Percent as PercentIcon,
  Notes as NotesIcon,
  SwapHoriz as SwapIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material"
import type { Currency, OfferStage } from "@/types/types"

// Datos de ejemplo para los selectores
const mockProperties = [
  { id: 1, name: "Apartamento Centro", address: "Calle Mayor 10" },
  { id: 2, name: "Villa Playa", address: "Paseo Marítimo 25" },
  { id: 3, name: "Local Centro", address: "Gran Vía 45" },
  { id: 4, name: "Piso Universidad", address: "Calle Universidad 8" },
  { id: 5, name: "Chalet Sierra", address: "Camino Montaña 12" },
]

const mockAgents = [
  { id: 1, name: "Ana García" },
  { id: 2, name: "Pedro Martínez" },
  { id: 3, name: "Laura Fernández" },
]

const mockSupervisors = [
  { id: 4, name: "Carlos López" },
  { id: 5, name: "María Rodríguez" },
]

const mockLeads = [
  { id: 1, name: "Carlos Rodríguez", email: "carlos@example.com" },
  { id: 2, name: "Laura Sánchez", email: "laura@example.com" },
  { id: 3, name: "Miguel Torres", email: "miguel@example.com" },
  { id: 4, name: "Isabel Díaz", email: "isabel@example.com" },
  { id: 5, name: "Roberto Fernández", email: "roberto@example.com" },
]

const mockOpportunities = [
  { id: 1, name: "Apartamento Centro" },
  { id: 2, name: "Casa Playa" },
  { id: 3, name: "Local Comercial" },
  { id: 4, name: "Piso Estudiantes" },
  { id: 5, name: "Chalet Montaña" },
]

const mockOrganizations = [
  { id: 1, name: "Inmobiliaria XYZ" },
  { id: 2, name: "Propiedades ABC" },
]

// Esquema de validación para el formulario
const offerFormSchema = z.object({
  amount: z.coerce.number().positive({
    message: "El monto debe ser un valor positivo.",
  }),
  currency: z.string({
    required_error: "Por favor selecciona una moneda.",
  }),
  commission: z.coerce.number().min(0).max(100, {
    message: "La comisión debe estar entre 0 y 100%.",
  }),
  amountCommission: z.coerce.number().min(0),
  currencyCommission: z.string({
    required_error: "Por favor selecciona una moneda para la comisión.",
  }),
  expirationDate: z.string({
    required_error: "Por favor selecciona una fecha de expiración.",
  }),
  observation: z.string().optional(),
  stage: z.string({
    required_error: "Por favor selecciona una etapa.",
  }),
  swap: z.boolean().default(false),
  active: z.boolean().default(true),
  organizationId: z.string({
    required_error: "Por favor selecciona una organización.",
  }),
  opportunityId: z.string({
    required_error: "Por favor selecciona una oportunidad.",
  }),
  propertyId: z.string({
    required_error: "Por favor selecciona una propiedad.",
  }),
  customerLeadId: z.string({
    required_error: "Por favor selecciona un cliente.",
  }),
  assignAgentId: z.string({
    required_error: "Por favor selecciona un agente.",
  }),
  assignSupervisorId: z.string().optional(),
})

// Componente para secciones con título
const FormSection = ({ title, icon, children, fullWidth = false }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Box sx={{ width: "100%", mb: { xs: 2, sm: 3 } }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
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
          ...(fullWidth && { maxWidth: "100%" }),
        }}
      >
        {children}
      </Paper>
    </Box>
  )
}

// Colores para las etapas de oferta
const offerStageColors = {
  DRAFT: { bg: "#e3f2fd", color: "#1565c0", label: "Borrador" },
  SUBMITTED: { bg: "#f3e5f5", color: "#7b1fa2", label: "Enviada" },
  COUNTER_OFFER: { bg: "#e0f7fa", color: "#0097a7", label: "Contraoferta" },
  CONFIRM_FOR_EXCHANGE: { bg: "#fff3e0", color: "#e65100", label: "Confirmar Por Canje" },
  PENDING_CLIENT_APPROVAL: { bg: "#e8f5e9", color: "#2e7d32", label: "Pendiente Visar Cliente" },
  PENDING_CAPTURER_APPROVAL: { bg: "#f1f8e9", color: "#558b2f", label: "Pendiente Visar Captador" },
  PENDING_PLACER_APPROVAL: { bg: "#e0f2f1", color: "#00695c", label: "Pendiente Visar Colocador" },
  PENDING_OWNER_APPROVAL: { bg: "#e3f2fd", color: "#0d47a1", label: "Pendiente Visar Propietario" },
  ACCEPTED: { bg: "#e8f5e9", color: "#2e7d32", label: "Aceptada" },
  REJECTED: { bg: "#ffebee", color: "#c62828", label: "Rechazada" },
  EXPIRED: { bg: "#f5f5f5", color: "#757575", label: "Expirada" },
  FINALIZED: { bg: "#e8eaf6", color: "#3949ab", label: "Finalizada" },
  CANCELLED: { bg: "#fafafa", color: "#424242", label: "Cancelada" },
}

export function OfferForm({
  offer = null,
  onComplete,
  onDelete,
  opportunityId = null,
  propertyId = null,
  leadId = null,
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"))

  // Inicializar el formulario con valores por defecto o los de la oferta a editar
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(offerFormSchema),
    defaultValues: offer
      ? {
          amount: offer.amount,
          currency: offer.currency,
          commission: offer.commission,
          amountCommission: offer.amountCommission,
          currencyCommission: offer.currencyCommission,
          expirationDate: offer.expirationDate,
          observation: offer.observation || "",
          stage: offer.stage,
          swap: offer.swap,
          active: offer.active,
          organizationId: String(offer.organizationId),
          opportunityId: String(offer.opportunityId),
          propertyId: String(offer.propertyId),
          customerLeadId: String(offer.prospectId),
          assignAgentId: String(offer.assignAgentId),
          assignSupervisorId: offer.assignSupervisorId ? String(offer.assignSupervisorId) : "",
        }
      : {
          amount: 0,
          currency: "CLP",
          commission: 3,
          amountCommission: 0,
          currencyCommission: "CLP",
          expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 7 días desde hoy
          observation: "",
          stage: "DRAFT",
          swap: false,
          active: true,
          organizationId: "1", // Valor por defecto
          opportunityId: opportunityId ? String(opportunityId) : "",
          propertyId: propertyId ? String(propertyId) : "",
          customerLeadId: leadId ? String(leadId) : "",
          assignAgentId: "",
          assignSupervisorId: "",
        },
  })

  // Observar cambios en los campos para cálculos automáticos
  const watchAmount = watch("amount")
  const watchCurrency = watch("currency")
  const watchCommission = watch("commission")
  const watchStage = watch("stage") as OfferStage

  // Calcular automáticamente el monto de la comisión cuando cambia el monto o el porcentaje
  React.useEffect(() => {
    const commissionAmount = (watchAmount * watchCommission) / 100
    setValue("amountCommission", commissionAmount)
    setValue("currencyCommission", watchCurrency as Currency)
  }, [watchAmount, watchCommission, watchCurrency, setValue])

  function onSubmit(values) {
    console.log(values)
    // Aquí iría la lógica para guardar en la base de datos
    onComplete()
  }

  // Obtener el color de la etapa para el encabezado
  const getStageColor = (stage: OfferStage) => {
    return offerStageColors[stage]?.bg || theme.palette.grey[100]
  }

  return (
    <Card sx={{ width: "100%", maxWidth: "100%", overflow: "visible" }}>
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile && (
              <IconButton edge="start" color="inherit" onClick={onComplete} aria-label="back" sx={{ mr: 1 }}>
                <ArrowBackIcon />
              </IconButton>
            )}
            <Typography variant={isMobile ? "h6" : "h5"}>{offer ? "Editar Oferta" : "Nueva Oferta"}</Typography>
          </Box>
        }
        sx={{
          bgcolor: getStageColor(watchStage),
          transition: "background-color 0.3s ease",
          p: { xs: 2, sm: 3 },
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 }, width: "100%" }}>
          <Container maxWidth={false} disableGutters sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              {/* Sección de información económica */}
              <FormSection title="Información Económica" icon={<MoneyIcon color="primary" />} fullWidth>
                <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Controller
                      name="amount"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Monto de la Oferta"
                          type="number"
                          fullWidth
                          inputProps={{ min: 0, step: 1000 }}
                          error={!!errors.amount}
                          helperText={errors.amount?.message}
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MoneyIcon color="action" fontSize={isMobile ? "small" : "medium"} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Controller
                      name="currency"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          error={!!errors.currency}
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                        >
                          <InputLabel id="currency-label">Moneda</InputLabel>
                          <Select {...field} labelId="currency-label" label="Moneda">
                            <MenuItem value="CLP">CLP</MenuItem>
                            <MenuItem value="UF">UF</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                          </Select>
                          {errors.currency && <FormHelperText>{errors.currency.message}</FormHelperText>}
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Controller
                      name="commission"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Comisión (%)"
                          type="number"
                          fullWidth
                          inputProps={{ min: 0, max: 100, step: 0.5 }}
                          error={!!errors.commission}
                          helperText={errors.commission?.message}
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PercentIcon color="action" fontSize={isMobile ? "small" : "medium"} />
                              </InputAdornment>
                            ),
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Controller
                      name="amountCommission"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Monto de Comisión"
                          type="number"
                          fullWidth
                          disabled
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MoneyIcon color="action" fontSize={isMobile ? "small" : "medium"} />
                              </InputAdornment>
                            ),
                            endAdornment: <InputAdornment position="end">{watchCurrency}</InputAdornment>,
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </FormSection>

              {/* Sección de detalles de la oferta */}
              <FormSection title="Detalles de la Oferta" icon={<CalendarIcon color="primary" />} fullWidth>
                <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Controller
                      name="expirationDate"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Fecha de Expiración"
                          type="date"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={!!errors.expirationDate}
                          helperText={errors.expirationDate?.message}
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CalendarIcon color="action" fontSize={isMobile ? "small" : "medium"} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Controller
                      name="stage"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          error={!!errors.stage}
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                        >
                          <InputLabel id="stage-label">Etapa</InputLabel>
                          <Select {...field} labelId="stage-label" label="Etapa">
                            <MenuItem value="DRAFT">Borrador</MenuItem>
                            <MenuItem value="SUBMITTED">Enviada</MenuItem>
                            <MenuItem value="COUNTER_OFFER">Contraoferta</MenuItem>
                            <MenuItem value="CONFIRM_FOR_EXCHANGE">Confirmar Por Canje</MenuItem>
                            <MenuItem value="PENDING_CLIENT_APPROVAL">Pendiente Visar Cliente</MenuItem>
                            <MenuItem value="PENDING_CAPTURER_APPROVAL">Pendiente Visar Captador</MenuItem>
                            <MenuItem value="PENDING_PLACER_APPROVAL">Pendiente Visar Colocador</MenuItem>
                            <MenuItem value="PENDING_OWNER_APPROVAL">Pendiente Visar Propietario</MenuItem>
                            <MenuItem value="ACCEPTED">Aceptada</MenuItem>
                            <MenuItem value="REJECTED">Rechazada</MenuItem>
                            <MenuItem value="EXPIRED">Expirada</MenuItem>
                            <MenuItem value="FINALIZED">Finalizada</MenuItem>
                            <MenuItem value="CANCELLED">Cancelada</MenuItem>
                          </Select>
                          {errors.stage && <FormHelperText>{errors.stage.message}</FormHelperText>}
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={2}>
                    <Controller
                      name="swap"
                      control={control}
                      render={({ field }) => (
                        <Paper
                          elevation={0}
                          sx={{
                            p: { xs: 1.5, sm: 2 },
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            bgcolor: field.value ? "info.lighter" : "grey.100",
                            borderRadius: 1,
                          }}
                        >
                          <FormControl component="fieldset" variant="standard" sx={{ width: "100%" }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                              <SwapIcon
                                color={field.value ? "info" : "action"}
                                fontSize={isMobile ? "small" : "medium"}
                              />
                              <Typography variant={isMobile ? "body2" : "subtitle2"} sx={{ ml: 1 }}>
                                Canje
                              </Typography>
                            </Box>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={field.value}
                                  onChange={(e) => field.onChange(e.target.checked)}
                                  color="info"
                                  size={isMobile ? "small" : "medium"}
                                />
                              }
                              label={field.value ? "Incluye canje" : "Sin canje"}
                            />
                          </FormControl>
                        </Paper>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={2}>
                    <Controller
                      name="active"
                      control={control}
                      render={({ field }) => (
                        <Paper
                          elevation={0}
                          sx={{
                            p: { xs: 1.5, sm: 2 },
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            bgcolor: field.value ? "success.lighter" : "grey.100",
                            borderRadius: 1,
                          }}
                        >
                          <FormControl component="fieldset" variant="standard" sx={{ width: "100%" }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                              <MoneyIcon
                                color={field.value ? "success" : "action"}
                                fontSize={isMobile ? "small" : "medium"}
                              />
                              <Typography variant={isMobile ? "body2" : "subtitle2"} sx={{ ml: 1 }}>
                                Estado de la Oferta
                              </Typography>
                            </Box>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={field.value}
                                  onChange={(e) => field.onChange(e.target.checked)}
                                  color="success"
                                  size={isMobile ? "small" : "medium"}
                                />
                              }
                              label={field.value ? "Activa" : "Inactiva"}
                            />
                          </FormControl>
                        </Paper>
                      )}
                    />
                  </Grid>
                </Grid>
              </FormSection>

              {/* Sección de relaciones */}
              <FormSection title="Relaciones" icon={<PersonIcon color="primary" />} fullWidth>
                <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Controller
                      name="organizationId"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          error={!!errors.organizationId}
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                        >
                          <InputLabel id="organization-label">Organización</InputLabel>
                          <Select {...field} labelId="organization-label" label="Organización">
                            {mockOrganizations.map((org) => (
                              <MenuItem key={org.id} value={org.id.toString()}>
                                {org.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.organizationId && <FormHelperText>{errors.organizationId.message}</FormHelperText>}
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Controller
                      name="opportunityId"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          error={!!errors.opportunityId}
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                        >
                          <InputLabel id="opportunity-label">Oportunidad</InputLabel>
                          <Select
                            {...field}
                            labelId="opportunity-label"
                            label="Oportunidad"
                            disabled={opportunityId !== null}
                          >
                            {mockOpportunities.map((opportunity) => (
                              <MenuItem key={opportunity.id} value={opportunity.id.toString()}>
                                {opportunity.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.opportunityId && <FormHelperText>{errors.opportunityId.message}</FormHelperText>}
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Controller
                      name="propertyId"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          error={!!errors.propertyId}
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                        >
                          <InputLabel id="property-label">Propiedad</InputLabel>
                          <Select {...field} labelId="property-label" label="Propiedad" disabled={propertyId !== null}>
                            {mockProperties.map((property) => (
                              <MenuItem key={property.id} value={property.id.toString()}>
                                <Box>
                                  <Typography variant="body2">{property.name}</Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {property.address}
                                  </Typography>
                                </Box>
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.propertyId && <FormHelperText>{errors.propertyId.message}</FormHelperText>}
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Controller
                      name="customerLeadId"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          error={!!errors.customerLeadId}
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                        >
                          <InputLabel id="lead-label">Cliente</InputLabel>
                          <Select {...field} labelId="lead-label" label="Cliente" disabled={leadId !== null}>
                            {mockLeads.map((lead) => (
                              <MenuItem key={lead.id} value={lead.id.toString()}>
                                <Box>
                                  <Typography variant="body2">{lead.name}</Typography>
                                  {lead.email && (
                                    <Typography variant="caption" color="text.secondary">
                                      {lead.email}
                                    </Typography>
                                  )}
                                </Box>
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.customerLeadId && <FormHelperText>{errors.customerLeadId.message}</FormHelperText>}
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Controller
                      name="assignAgentId"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          error={!!errors.assignAgentId}
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                        >
                          <InputLabel id="agent-label">Agente Asignado</InputLabel>
                          <Select {...field} labelId="agent-label" label="Agente Asignado">
                            {mockAgents.map((agent) => (
                              <MenuItem key={agent.id} value={agent.id.toString()}>
                                {agent.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.assignAgentId && <FormHelperText>{errors.assignAgentId.message}</FormHelperText>}
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Controller
                      name="assignSupervisorId"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          error={!!errors.assignSupervisorId}
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                        >
                          <InputLabel id="supervisor-label">Supervisor</InputLabel>
                          <Select {...field} labelId="supervisor-label" label="Supervisor">
                            <MenuItem value="">Sin supervisor</MenuItem>
                            {mockSupervisors.map((supervisor) => (
                              <MenuItem key={supervisor.id} value={supervisor.id.toString()}>
                                {supervisor.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.assignSupervisorId && (
                            <FormHelperText>{errors.assignSupervisorId.message}</FormHelperText>
                          )}
                        </FormControl>
                      )}
                    />
                  </Grid>
                </Grid>
              </FormSection>

              {/* Sección de observaciones */}
              <FormSection title="Observaciones" icon={<NotesIcon color="primary" />} fullWidth>
                <Controller
                  name="observation"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Observaciones"
                      placeholder="Añade detalles adicionales sobre la oferta..."
                      fullWidth
                      multiline
                      rows={isMobile ? 3 : 4}
                      variant="outlined"
                      size={isMobile ? "small" : "medium"}
                    />
                  )}
                />
              </FormSection>
            </Box>
          </Container>
        </CardContent>
        <Divider />
        <CardActions
          sx={{
            justifyContent: "space-between",
            p: { xs: 1.5, sm: 2, md: 2.5 },
            flexDirection: isMobile ? "column" : "row",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", gap: 1, width: isMobile ? "100%" : "auto" }}>
            {!isMobile && (
              <Button
                variant="outlined"
                startIcon={<CloseIcon />}
                onClick={onComplete}
                size={isMobile ? "medium" : "large"}
                sx={{ width: isMobile ? "100%" : "auto" }}
              >
                Cancelar
              </Button>
            )}

            {offer && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => onDelete && onDelete(offer.id)}
                size={isMobile ? "medium" : "large"}
                sx={{ width: isMobile ? "100%" : "auto" }}
              >
                Eliminar
              </Button>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            color="primary"
            size={isMobile ? "medium" : "large"}
            sx={{ width: isMobile ? "100%" : "auto" }}
          >
            {offer ? "Actualizar" : "Guardar"} Oferta
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}
