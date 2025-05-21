"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormHelperText,
  Autocomplete,
  InputAdornment,
  FormControlLabel,
  Switch,
  IconButton,
  useTheme,
  useMediaQuery,
  CardHeader,
} from "@mui/material"
import {
  ArrowBack as ArrowBackIcon
} from "@mui/icons-material"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { AttachMoney as MoneyIcon } from "@mui/icons-material"
import type { Offer, Property, Prospect } from "@/types/types"
import { formatCurrency } from "@/libs/utils"
import { mockAgents } from "@/libs/services/offer-service"
import { propertyService } from "@/libs/services/property-service"
import { opportunityService } from "@/libs/services/opportunity-service"
import { agentService } from "@/libs/services/agent-service"
import { prospectService } from "@/libs/services/prospect-service"


const mockSupervisors = [
  { id: 4, name: "Carlos López" },
  { id: 5, name: "María Rodríguez" },
]

const mockOrganizations = [
  { id: 1, name: "Inmobiliaria XYZ" },
  { id: 2, name: "Propiedades ABC" },
]



const offerStages = [
  { value: "BORRADOR  ", label: "Borrador" },
  { value: "ENVIADA", label: "Enviada" },
  { value: "CONTRAOFERTA", label: "Contraoferta" },
  { value: "CONFIRMACION_POR_EXCHANGE", label: "Confirmar Por Canje" },
  { value: "PENDIENTE_APROBACION_CLIENTE", label: "Pendiente Visar Cliente" },
  { value: "PENDIENTE_APROBACION_CAPTADOR", label: "Pendiente Visar Captador" },
  { value: "PENDIENTE_APROBACION_COLOCADOR", label: "Pendiente Visar Colocador" },
  { value: "PENDIENTE_APROBACION_PROPIETARIO", label: "Pendiente Visar Propietario" },
  { value: "ACEPTADA", label: "Aceptada" },
  { value: "RECHAZADA", label: "Rechazada" },
  { value: "EXPIRADA", label: "Expirada" },
  { value: "NEGOCIACION", label: "Negociación" },
  { value: "PROPUESTA", label: "Propuesta" },
  { value: "CIERRE", label: "Cierre" },
  { value: "NECESIDAD_ANALISIS", label: "Necesidad Análisis" },
  { value: "FINALIZADO", label: "Finalizado" },
  { value: "CANCELADO", label: "Cancelado" },
]

const currencies = [
  { value: "CLP", label: "Peso Chileno (CLP)" },
  { value: "USD", label: "Dólar Estadounidense (USD)" },
  { value: "UF", label: "Unidad de Fomento (UF)" },
]

// Validation schema using zod
const schema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  reference: z.string().min(1, "La referencia es obligatoria"),
  amount: z.coerce.number().positive("El monto debe ser positivo"),
  currency: z.string().min(1, "La moneda es obligatoria"),
  commission: z.coerce
    .number()
    .min(0, "La comisión no puede ser negativa")
    .max(100, "La comisión no puede superar el 100%"),
  amountCommission: z.coerce.number().min(0, "El monto de comisión no puede ser negativo"),
  currencyCommission: z.string().min(1, "La moneda de comisión es obligatoria"),
  expirationDate: z.string().min(1, "La fecha de expiración es obligatoria"),
  observation: z.string().optional(),
  stage: z.string().min(1, "El estado es obligatorio"),
  swap: z.boolean().default(false),
  active: z.boolean().default(true),
  organizationId: z.string().min(1, "La organización es obligatoria"),
  opportunityId: z.string().min(1, "La oportunidad es obligatoria"),
  propertyId: z.string().min(1, "La propiedad es obligatoria"),
  prospectId: z.string().min(1, "El cliente es obligatorio"),
  assignAgentId: z.string().min(1, "El agente asignado es obligatorio"),
  assignSupervisorId: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface OfferFormProps {
  offer?: Offer;
  opportunityId: number;
  onComplete: () => void;
  onDelete: () => void;
}

export function OfferForm({ offer, opportunityId = 0, onComplete, onDelete }: OfferFormProps) {
  const [properties, setProperties] = useState<Property[]>([])
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [agents, setAgents] = useState<any[]>([])
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: offer?.title || "",
      reference: offer?.reference || `OF-${new Date().getTime().toString().slice(-6)}`,
      amount: offer?.amount || 0,
      currency: offer?.currency || "CLP",
      commission: offer?.commission || 0,
      amountCommission: offer?.amountCommission || 0,
      currencyCommission: offer?.currencyCommission || "CLP",
      expirationDate: offer?.expirationDate ? new Date(offer.expirationDate).toISOString().split("T")[0] : "",
      observation: offer?.observation || "",
      stage: offer?.stage || "DRAFT",
      swap: offer?.swap || false,
      active: offer?.active !== undefined ? offer.active : true,
      organizationId: offer?.organizationId?.toString() || "",
      opportunityId: offer?.opportunityId?.toString() || "",
      propertyId: offer?.propertyId?.toString() || "",
      prospectId: offer?.prospectId?.toString() || "",
      assignAgentId: offer?.assignAgentId?.toString() || "",
      assignSupervisorId: offer?.assignSupervisorId?.toString() || "",
    },
  })

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const response = await propertyService.getProperties({ page: 1, limit: 10, search: "", type: undefined })
        setProperties(response || [])
      } catch (error) {
        console.error("Error al cargar propiedades:", error)
      }
    }

    loadProperties()
  }, [])

  useEffect(() => {
    if (offer) {
      const property = properties.find((p) => p.id === offer.propertyId.toString()) || null
      setSelectedProperty(property)
    }
  }, [offer, properties])

  useEffect(() => {
    const loadOpportunities = async () => {
      try {
        const response = await opportunityService.getOpportunities()
        setOpportunities(response || [])
      } catch (error) {
        console.error("Error al cargar oportunidades:", error)
      }
    }

    loadOpportunities()
  }, [])

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const response = await agentService.getAgents()
        setAgents(response || [])
      } catch (error) {
        console.error("Error al cargar agentes:", error)
      }
    }

    loadAgents()
  }, [])

  useEffect(() => {
    const loadProspects = async () => {
      try {
        const response = await prospectService.getProspects()
        setProspects(response || [])
      } catch (error) {
        console.error("Error al cargar prospectos:", error)
      }
    }

    loadProspects()
  }, [])

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data)
    // Here you would typically save the data to your backend
    if (onComplete) {
      onComplete()
    }
  }

  const handlePropertyChange = (property: Property | null) => {
    setSelectedProperty(property)
  }

  return (
    <Card>
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile && (
              <IconButton edge="start" color="inherit" onClick={onComplete} aria-label="back" sx={{ mr: 1 }}>
                <ArrowBackIcon />
              </IconButton>
            )}
          </Box>
        }
        sx={{
          bgcolor: theme.palette.primary.light,
          color: theme.palette.primary.contrastText,
          p: { xs: 2, sm: 3 },
        }}
      />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3}>
            {/* Información básica */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                Información Básica
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Título"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="reference"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Referencia"
                    fullWidth
                    error={!!errors.reference}
                    helperText={errors.reference?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Monto"
                    type="number"
                    fullWidth
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MoneyIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="currency"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.currency}>
                    <InputLabel id="currency-label">Moneda</InputLabel>
                    <Select {...field} labelId="currency-label" label="Moneda">
                      {currencies.map((currency) => (
                        <MenuItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.currency && <FormHelperText>{errors.currency.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="commission"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Comisión (%)"
                    type="number"
                    fullWidth
                    error={!!errors.commission}
                    helperText={errors.commission?.message}
                    inputProps={{ min: 0, max: 100, step: 0.1 }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="amountCommission"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Monto de Comisión"
                    type="number"
                    fullWidth
                    error={!!errors.amountCommission}
                    helperText={errors.amountCommission?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MoneyIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="currencyCommission"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.currencyCommission}>
                    <InputLabel id="currency-commission-label">Moneda de Comisión</InputLabel>
                    <Select {...field} labelId="currency-commission-label" label="Moneda de Comisión">
                      {currencies.map((currency) => (
                        <MenuItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.currencyCommission && <FormHelperText>{errors.currencyCommission.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Detalles */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                Detalles de la Oferta
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
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
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="stage"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.stage}>
                    <InputLabel id="stage-label">Estado</InputLabel>
                    <Select {...field} labelId="stage-label" label="Estado">
                      {offerStages.map((stage) => (
                        <MenuItem key={stage.value} value={stage.value}>
                          {stage.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.stage && <FormHelperText>{errors.stage.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="swap"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Incluye canje"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="active"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        color="success"
                      />
                    }
                    label="Oferta activa"
                  />
                )}
              />
            </Grid>

            {/* Relaciones */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                Relaciones
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="organizationId"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.organizationId}>
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
            <Grid item xs={12} md={6}>
              <Controller
                name="opportunityId"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.opportunityId}>
                    <InputLabel id="opportunity-label">Oportunidad</InputLabel>
                    <Select {...field} labelId="opportunity-label" label="Oportunidad">
                      {opportunities.map((opportunity) => (
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
            <Grid item xs={12} md={6}>
              <Controller
                name="propertyId"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    id="property-select"
                    options={properties}
                    getOptionLabel={(option) => `${option.title} - ${formatCurrency(option.price, "CLP")}`}
                    value={selectedProperty}
                    onChange={(_, newValue) => {
                      handlePropertyChange(newValue)
                      field.onChange(newValue?.id || "")
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Propiedad"
                        error={!!errors.propertyId}
                        helperText={errors.propertyId?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="prospectId"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.prospectId}>
                    <InputLabel id="prospect-label">Cliente</InputLabel>
                    <Select {...field} labelId="prospect-label" label="Cliente">
                      {prospects.map((prospect) => (
                        <MenuItem key={prospect.id} value={prospect.id}>
                          {`${prospect.firstName} ${prospect.lastName}`}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.prospectId && <FormHelperText>{errors.prospectId.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Asignaciones */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                Asignaciones
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="assignAgentId"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.assignAgentId}>
                    <InputLabel id="agent-label">Agente Asignado</InputLabel>
                    <Select {...field} labelId="agent-label" label="Agente Asignado">
                      {agents.map((agent) => (
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
            <Grid item xs={12} md={6}>
              <Controller
                name="assignSupervisorId"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.assignSupervisorId}>
                    <InputLabel id="supervisor-label">Supervisor</InputLabel>
                    <Select {...field} labelId="supervisor-label" label="Supervisor">
                      <MenuItem value="">
                        <em>Ninguno</em>
                      </MenuItem>
                      {mockSupervisors.map((supervisor) => (
                        <MenuItem key={supervisor.id} value={supervisor.id.toString()}>
                          {supervisor.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.assignSupervisorId && <FormHelperText>{errors.assignSupervisorId.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Observaciones */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                Observaciones
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="observation"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Observaciones"
                    multiline
                    rows={4}
                    fullWidth
                    error={!!errors.observation}
                    helperText={errors.observation?.message}
                  />
                )}
              />
            </Grid>

            {/* Botones */}
            {opportunityId != 0 ? 
            null:
            (
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
                  <Button variant="outlined" onClick={() => reset()}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                  {offer ? "Actualizar" : "Crear"} Oferta
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}
