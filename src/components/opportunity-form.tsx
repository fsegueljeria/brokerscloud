"use client"

import type React from "react"

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
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
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
  Tabs,
  Tab,
  Container,
  IconButton,
} from "@mui/material"
import {
  Save as SaveIcon,
  Close as CloseIcon,
  Description as DescriptionIcon,
  Source as SourceIcon,
  CalendarMonth as CalendarIcon,
  ToggleOn as ToggleIcon,
  AttachMoney as MoneyIcon,
  Percent as PercentIcon,
  Person as PersonIcon,
  ContactPhone as ContactIcon,
  Home as HomeIcon,
  Event as EventIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material"
import { useState } from "react"

// Añadir la importación del componente OpportunityVisits al inicio del archivo, junto con las demás importaciones
import { OpportunityVisits } from "./opportunity-visits"
import { OpportunityOffers } from "./opportunity-offers"
import type { Opportunity } from "@/types/types"
// Datos de ejemplo para los selectores
const mockAgents = [
  { id: 1, name: "Ana García" },
  { id: 2, name: "Pedro Martínez" },
  { id: 3, name: "Laura Fernández" },
]

const mockContacts = [
  { id: 1, name: "Carlos Rodríguez", email: "carlos@example.com" },
  { id: 2, name: "Laura Sánchez", email: "laura@example.com" },
  { id: 3, name: "Miguel Torres", email: "miguel@example.com" },
  { id: 4, name: "Isabel Díaz", email: "isabel@example.com" },
  { id: 5, name: "Roberto Fernández", email: "roberto@example.com" },
]

const mockProperties = [
  { id: 1, name: "Apartamento Centro", address: "Calle Mayor 10" },
  { id: 2, name: "Villa Playa", address: "Paseo Marítimo 25" },
  { id: 3, name: "Local Centro", address: "Gran Vía 45" },
  { id: 4, name: "Piso Universidad", address: "Calle Universidad 8" },
  { id: 5, name: "Chalet Sierra", address: "Camino Montaña 12" },
]

// Modificar el esquema para aceptar string o Date para la fecha
const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  stage: z.string({
    required_error: "Por favor selecciona una etapa.",
  }),
  description: z.string().optional(),
  source: z.string().optional(),
  expectedCloseDate: z.any(), // Cambiado para aceptar cualquier valor de fecha
  probability: z.coerce.number().min(0).max(100),
  amount: z.coerce.number().min(0),
  curCode: z.string().default("CLP"),
  active: z.boolean().default(true),
  assignAgentId: z.string({
    required_error: "Por favor selecciona un agente.",
  }),
  contactId: z.string({
    required_error: "Por favor selecciona un prospecto.",
  }),
  properties: z.array(z.string()).default([]),
})

// Modificar el componente FormSection para aceptar un prop de columnas
const FormSection = ({ title, icon, children, fullWidth = false, columns = 1 }) => (
  <Box sx={{ width: "100%", mb: { xs: 2, sm: 3 } }}>
    <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
      {icon}
      <Typography variant="h6" component="h3" sx={{ ml: 1, fontWeight: 600 }}>
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

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`opportunity-tabpanel-${index}`}
      aria-labelledby={`opportunity-tab-${index}`}
      style={{ width: "100%" }}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2, width: "100%" }}>{children}</Box>}
    </div>
  )
}

export function OpportunityForm({ opportunity = null, onComplete }: { opportunity: Opportunity | null, onComplete: () => void }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"))
  const [activeTab, setActiveTab] = useState(0)

  // Inicializar el formulario con valores por defecto o los de la oportunidad a editar
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: opportunity
      ? {
          name: opportunity.name,
          stage: opportunity.stage,
          description: opportunity.description || "",
          source: opportunity.source || "",
          expectedCloseDate: opportunity.expectedCloseDate || new Date().toISOString().split("T")[0],
          probability: opportunity.probability || 50,
          amount: opportunity.amount || 0,
          curCode: opportunity.curCode || "CLP",
          active: opportunity.active !== undefined ? opportunity.active : true,
          // Verificar si assignAgent existe y tiene id antes de acceder a él
          assignAgentId: opportunity.assignAgentId?.toString() || "",
          // Verificar si contact existe y tiene id antes de acceder a él
          prospectId: opportunity.prospectId?.toString() || "",
          // Verificar si properties existe antes de mapearlo
          properties: Array.isArray(opportunity.properties)
            ? opportunity.properties.map((p) => p?.toString() || "").filter(Boolean)
            : [],
        }
      : {
          name: "",
          stage: "QUALIFICATION",
          description: "",
          source: "",
          expectedCloseDate: new Date().toISOString().split("T")[0], // Formato YYYY-MM-DD
          probability: 50,
          amount: 0,
          curCode: "CLP",
          active: true,
          assignAgentId: "",
          contactId: "",
          properties: [],
        },
  })

  const selectedProperties = watch("properties") || []
  const prospectId = watch("prospectId")

  function onSubmit(values) {
    console.log(values)
    // Aquí iría la lógica para guardar en la base de datos
    onComplete()
  }

  const handlePropertyToggle = (propertyId, currentProperties, onChange) => {
    const currentValue = [...(currentProperties || [])]
    const currentIndex = currentValue.indexOf(propertyId)
    const newValue = [...currentValue]

    if (currentIndex === -1) {
      newValue.push(propertyId)
    } else {
      newValue.splice(currentIndex, 1)
    }

    onChange(newValue)
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  // Obtener el color de la etapa para el encabezado
  const getStageColor = (stage) => {
    const stageColors = {
      CONTACTO_INICIAL: "#e3f2fd",
      PROSPECCION: "#e3f2fd",
      CALIFICACION: "#e3f2fd",
      VISITA_PROGRAMADA: "#e3f2fd",
      PROPUESTA: "#f3e5f5",
      NEGOCIACION: "#fff8e1",
      CIERRE: "#e8f5e9",
      PERDIDO: "#ffebee",
      POST_VENTA: "#e3f2fd",
      GESTION_RELACIONES: "#e3f2fd",
    }
    return stageColors[stage] || theme.palette.grey[100]
  }

  const currentStage = watch("stage")

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
          </Box>
        }
        sx={{
          bgcolor: theme.palette.primary.light,
          color: theme.palette.primary.contrastText,
          p: { xs: 2, sm: 3 },
        }}
      />
    
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        {/* Pestañas para navegar entre información básica, visitas y ofertas */}
        {opportunity && (
          <Box sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="pestañas de oportunidad"
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons={isMobile ? "auto" : false}
              allowScrollButtonsMobile
            >
              <Tab icon={<DescriptionIcon />} label={isMobile ? "" : "Información"} />
              <Tab icon={<EventIcon />} label={isMobile ? "" : "Visitas"} />
              <Tab icon={<MoneyIcon />} label={isMobile ? "" : "Ofertas"} />
            </Tabs>
          </Box>
        )}

        <TabPanel value={activeTab} index={0}>
          <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 }, width: "100%" }}>
            <Container maxWidth={false} disableGutters sx={{ width: "100%" }}>
              <Box sx={{ width: "100%" }}>
                {/* Sección de información básica */}
                <FormSection
                  title="Información Básica"
                  icon={<DescriptionIcon color="primary" />}
                  fullWidth
                  columns={1}
                >
                  <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Nombre de la Oportunidad"
                            placeholder="Ej. Apartamento Centro"
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            variant="outlined"
                            size={isMobile ? "small" : "medium"}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
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
                              <MenuItem value="PROSPECTION">Prospección</MenuItem>
                              <MenuItem value="QUALIFICATION">Calificación</MenuItem>
                              <MenuItem value="INITIAL_CONTACT">Contacto Inicial</MenuItem>
                              <MenuItem value="NEEDS_ANALYSIS">Análisis de Necesidades</MenuItem>
                              <MenuItem value="NEGOTIATION">Negociación</MenuItem>
                              <MenuItem value="PROPOSAL">Propuesta</MenuItem>
                              <MenuItem value="CLOSING">Cierre</MenuItem>
                              <MenuItem value="POST_SALE">Post-Venta</MenuItem>
                              <MenuItem value="RELATIONSHIP_MANAGEMENT">Gestión de Relación</MenuItem>
                            </Select>
                            {errors.stage && <FormHelperText>{errors.stage.message}</FormHelperText>}
                          </FormControl>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Descripción"
                            placeholder="Describe la oportunidad..."
                            fullWidth
                            multiline
                            rows={isMobile ? 2 : 3}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                            variant="outlined"
                            size={isMobile ? "small" : "medium"}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <DescriptionIcon color="action" fontSize={isMobile ? "small" : "medium"} />
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </FormSection>

                {/* Sección de detalles */}
                <FormSection
                  title="Detalles de la Oportunidad"
                  icon={<SourceIcon color="primary" />}
                  fullWidth
                  columns={3}
                >
                  <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Controller
                        name="source"
                        control={control}
                        render={({ field }) => (
                          <FormControl
                            fullWidth
                            error={!!errors.source}
                            variant="outlined"
                            size={isMobile ? "small" : "medium"}
                          >
                            <InputLabel id="source-label">Fuente</InputLabel>
                            <Select
                              {...field}
                              labelId="source-label"
                              label="Fuente"
                              startAdornment={
                                <InputAdornment position="start">
                                  <SourceIcon color="action" fontSize={isMobile ? "small" : "medium"} />
                                </InputAdornment>
                              }
                            >
                              <MenuItem value="Web">Web</MenuItem>
                              <MenuItem value="Referido">Referido</MenuItem>
                              <MenuItem value="Llamada">Llamada</MenuItem>
                              <MenuItem value="Email">Email</MenuItem>
                              <MenuItem value="Feria">Feria</MenuItem>
                              <MenuItem value="Otro">Otro</MenuItem>
                            </Select>
                            {errors.source && <FormHelperText>{errors.source.message}</FormHelperText>}
                          </FormControl>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Controller
                        name="expectedCloseDate"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Fecha de Cierre Estimada"
                            type="date"
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            error={!!errors.expectedCloseDate}
                            helperText={errors.expectedCloseDate?.message}
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

                    <Grid item xs={12} sm={12} md={4} lg={4}>
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
                                <ToggleIcon
                                  color={field.value ? "success" : "action"}
                                  fontSize={isMobile ? "small" : "medium"}
                                />
                                <Typography variant={isMobile ? "body2" : "subtitle2"} sx={{ ml: 1 }}>
                                  Estado de la Oportunidad
                                </Typography>
                              </Box>
                              <FormGroup>
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
                              </FormGroup>
                            </FormControl>
                          </Paper>
                        )}
                      />
                    </Grid>
                  </Grid>
                </FormSection>

                {/* Sección financiera */}
                <FormSection title="Información Financiera" icon={<MoneyIcon color="primary" />} fullWidth columns={3}>
                  <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Controller
                        name="amount"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Monto"
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

                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Controller
                        name="curCode"
                        control={control}
                        render={({ field }) => (
                          <FormControl
                            fullWidth
                            error={!!errors.curCode}
                            variant="outlined"
                            size={isMobile ? "small" : "medium"}
                          >
                            <InputLabel id="currency-label">Moneda</InputLabel>
                            <Select {...field} labelId="currency-label" label="Moneda">
                              <MenuItem value="CLP">CLP</MenuItem>
                              <MenuItem value="UF">UF</MenuItem>
                              <MenuItem value="USD">USD</MenuItem>
                            </Select>
                            {errors.curCode && <FormHelperText>{errors.curCode.message}</FormHelperText>}
                          </FormControl>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <Controller
                        name="probability"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Probabilidad (%)"
                            type="number"
                            fullWidth
                            InputProps={{
                              endAdornment: <InputAdornment position="end">%</InputAdornment>,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PercentIcon color="action" fontSize={isMobile ? "small" : "medium"} />
                                </InputAdornment>
                              ),
                            }}
                            inputProps={{ min: 0, max: 100 }}
                            error={!!errors.probability}
                            helperText={errors.probability?.message}
                            variant="outlined"
                            size={isMobile ? "small" : "medium"}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </FormSection>

                {/* Sección de contactos */}
                <FormSection title="Prospectos y Agentes" icon={<PersonIcon color="primary" />} fullWidth columns={2}>
                  <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
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
                            <Select
                              {...field}
                              labelId="agent-label"
                              label="Agente Asignado"
                              startAdornment={
                                <InputAdornment position="start">
                                  <PersonIcon color="action" fontSize={isMobile ? "small" : "medium"} />
                                </InputAdornment>
                              }
                            >
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

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Controller
                        name="contactId"
                        control={control}
                        render={({ field }) => (
                          <FormControl
                            fullWidth
                            error={!!errors.contactId}
                            variant="outlined"
                            size={isMobile ? "small" : "medium"}
                          >
                            <InputLabel id="contact-label">Prospecto / Cliente Potencial</InputLabel>
                            <Select
                              {...field}
                              labelId="contact-label"
                              label="Prospecto / Cliente Potencial"
                              startAdornment={
                                <InputAdornment position="start">
                                  <ContactIcon color="action" fontSize={isMobile ? "small" : "medium"} />
                                </InputAdornment>
                              }
                            >
                              {mockContacts.map((contact) => (
                                <MenuItem key={contact.id} value={contact.id.toString()}>
                                  <Box>
                                    <Typography variant="body2">{contact.name}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {contact.email}
                                    </Typography>
                                  </Box>
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.contactId && <FormHelperText>{errors.contactId.message}</FormHelperText>}
                          </FormControl>
                        )}
                      />
                    </Grid>
                  </Grid>
                </FormSection>

                {/* Sección de propiedades */}
                <FormSection title="Propiedades Relacionadas" icon={<HomeIcon color="primary" />} fullWidth columns={4}>
                  <Controller
                    name="properties"
                    control={control}
                    render={({ field }) => (
                      <Box sx={{ width: "100%" }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Selecciona las propiedades relacionadas con esta oportunidad
                        </Typography>
                        <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
                          {mockProperties.map((property) => {
                            const propertyId = property.id.toString()
                            const isSelected = field.value?.includes(propertyId)

                            return (
                              <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
                                <Paper
                                  elevation={isSelected ? 2 : 1}
                                  sx={{
                                    p: { xs: 1.5, sm: 2 },
                                    border: isSelected ? 2 : 1,
                                    borderColor: isSelected ? "primary.main" : "divider",
                                    bgcolor: isSelected ? "action.selected" : "background.paper",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                      boxShadow: 3,
                                    },
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={isSelected}
                                        onChange={() => handlePropertyToggle(propertyId, field.value, field.onChange)}
                                        color="primary"
                                        size={isMobile ? "small" : "medium"}
                                      />
                                    }
                                    label={
                                      <Box>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                          <HomeIcon
                                            fontSize={isMobile ? "small" : "medium"}
                                            color="action"
                                            sx={{ mr: 1 }}
                                          />
                                          <Typography
                                            variant={isMobile ? "body2" : "body1"}
                                            fontWeight={isSelected ? "bold" : "regular"}
                                          >
                                            {property.name}
                                          </Typography>
                                        </Box>
                                        <Typography
                                          variant={isMobile ? "caption" : "body2"}
                                          color="text.secondary"
                                          sx={{ mt: 0.5 }}
                                        >
                                          {property.address}
                                        </Typography>
                                      </Box>
                                    }
                                    sx={{ width: "100%", m: 0 }}
                                  />
                                </Paper>
                              </Grid>
                            )
                          })}
                        </Grid>
                      </Box>
                    )}
                  />
                </FormSection>
              </Box>
            </Container>
          </CardContent>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          {opportunity && opportunity.id && (
            <OpportunityVisits
              opportunityId={opportunity.id}
              propertyIds={
                Array.isArray(opportunity.properties) ? opportunity.properties.map((p) => p?.id).filter(Boolean) : []
              }
            />
          )}
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          {opportunity && opportunity.id && (
            <OpportunityOffers
              opportunityId={opportunity.id}
            />
          )}
        </TabPanel>

        <Divider />
        <CardActions
          sx={{
            justifyContent: "space-between",
            p: { xs: 1.5, sm: 2, md: 2.5 },
            flexDirection: isMobile ? "column" : "row",
            gap: 1,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={onComplete}
            size={isMobile ? "medium" : "large"}
            fullWidth={isMobile}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            color="primary"
            size={isMobile ? "medium" : "large"}
            fullWidth={isMobile}
          >
            {opportunity ? "Actualizar" : "Guardar"} Oportunidad
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}
