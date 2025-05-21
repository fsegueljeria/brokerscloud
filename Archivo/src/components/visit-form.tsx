"use client"

import { useState } from "react"
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
  Chip,
  useTheme,
  useMediaQuery,
  Checkbox,
  ListItemText,
  IconButton,
} from "@mui/material"
import {
  Save as SaveIcon,
  Close as CloseIcon,
  Event as EventIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Notes as NotesIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material"

// Datos de ejemplo para los selectores
const mockOpportunities = [
  { id: 1, name: "Apartamento Centro" },
  { id: 2, name: "Casa Playa" },
  { id: 3, name: "Local Comercial" },
  { id: 4, name: "Piso Estudiantes" },
  { id: 5, name: "Chalet Montaña" },
]

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

const mockContacts = [
  { id: 1, name: "Carlos Rodríguez", email: "carlos@example.com" },
  { id: 2, name: "Laura Sánchez", email: "laura@example.com" },
  { id: 3, name: "Miguel Torres", email: "miguel@example.com" },
  { id: 4, name: "Isabel Díaz", email: "isabel@example.com" },
  { id: 5, name: "Roberto Fernández", email: "roberto@example.com" },
]

const mockProspects = [
  { id: 1, name: "Carlos Rodríguez" },
  { id: 2, name: "Laura Sánchez" },
  { id: 3, name: "Miguel Torres" },
  { id: 4, name: "Isabel Díaz" },
  { id: 5, name: "Roberto Fernández" },
]

// Esquema de validación para el formulario
const visitFormSchema = z.object({
  title: z.string().min(2, {
    message: "El título debe tener al menos 2 caracteres.",
  }),
  opportunityId: z.string({
    required_error: "Por favor selecciona una oportunidad.",
  }),
  propertyId: z.string({
    required_error: "Por favor selecciona una propiedad.",
  }),
  date: z.string({
    required_error: "Por favor selecciona una fecha.",
  }),
  startTime: z.string({
    required_error: "Por favor selecciona una hora de inicio.",
  }),
  endTime: z.string({
    required_error: "Por favor selecciona una hora de fin.",
  }),
  status: z.string({
    required_error: "Por favor selecciona un estado.",
  }),
  notes: z.string().optional(),
  assignedAgentId: z.string({
    required_error: "Por favor selecciona un agente.",
  }),
  contactIds: z.array(z.string()).optional(),
  prospectIds: z.array(z.string()).optional(),
  sendNotifications: z.boolean().default(true),
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

export function VisitForm({ visit = null, onComplete, onDelete, opportunityId = null }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // Estado para manejar la propiedad seleccionada de la oportunidad
  const [selectedOpportunity, setSelectedOpportunity] = useState(
    visit
      ? mockOpportunities.find((o) => o.id === visit.opportunityId)
      : opportunityId
        ? mockOpportunities.find((o) => o.id === opportunityId)
        : null,
  )

  // Inicializar el formulario con valores por defecto o los de la visita a editar
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(visitFormSchema),
    defaultValues: visit
      ? {
          title: visit.title,
          opportunityId: String(visit.opportunityId),
          propertyId: String(visit.propertyId),
          date: visit.date,
          startTime: visit.startTime,
          endTime: visit.endTime,
          status: visit.status,
          notes: visit.notes || "",
          assignedAgentId: String(visit.assignedAgentId),
          contactIds: visit.attendees.contacts.map((id) => String(id)),
          prospectIds: visit.attendees.prospects.map((id) => String(id)),
          sendNotifications: true,
        }
      : {
          title: "",
          opportunityId: opportunityId ? String(opportunityId) : "",
          propertyId: "",
          date: new Date().toISOString().split("T")[0],
          startTime: "10:00",
          endTime: "11:00",
          status: "SCHEDULED",
          notes: "",
          assignedAgentId: "",
          contactIds: [],
          prospectIds: [],
          sendNotifications: true,
        },
  })

  // Observar cambios en la oportunidad seleccionada
  const watchedOpportunityId = watch("opportunityId")

  // Actualizar la propiedad cuando cambia la oportunidad
  const handleOpportunityChange = (opportunityId) => {
    const opportunity = mockOpportunities.find((o) => String(o.id) === opportunityId)
    setSelectedOpportunity(opportunity || null)

    // Si es una nueva visita, actualizar el título automáticamente
    if (!visit && opportunity) {
      setValue("title", `Visita ${opportunity.name}`)
    }
  }

  function onSubmit(values) {
    console.log(values)
    // Aquí iría la lógica para guardar en la base de datos
    onComplete()
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
            <Typography variant={isMobile ? "h6" : "h5"}>{visit ? "Editar Visita" : "Nueva Visita"}</Typography>
          </Box>
        }
        sx={{
          bgcolor: theme.palette.primary.light,
          color: theme.palette.primary.contrastText,
          p: { xs: 2, sm: 3 },
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 }, width: "100%" }}>
          <Box sx={{ width: "100%" }}>
            {/* Sección de información básica */}
            <FormSection title="Información de la Visita" icon={<EventIcon color="primary" />} fullWidth>
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                <Grid item xs={12}>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Título de la Visita"
                        placeholder="Ej. Visita Apartamento Centro"
                        fullWidth
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
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
                          onChange={(e) => {
                            field.onChange(e)
                            handleOpportunityChange(e.target.value)
                          }}
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

                <Grid item xs={12} sm={6}>
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
                        <Select {...field} labelId="property-label" label="Propiedad">
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
              </Grid>
            </FormSection>

            {/* Sección de fecha y hora */}
            <FormSection title="Fecha y Hora" icon={<TimeIcon color="primary" />} fullWidth>
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={4}>
                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Fecha"
                        type="date"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={!!errors.date}
                        helperText={errors.date?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EventIcon color="action" fontSize={isMobile ? "small" : "medium"} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name="startTime"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Hora de inicio"
                        type="time"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={!!errors.startTime}
                        helperText={errors.startTime?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <TimeIcon color="action" fontSize={isMobile ? "small" : "medium"} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name="endTime"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Hora de fin"
                        type="time"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={!!errors.endTime}
                        helperText={errors.endTime?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <TimeIcon color="action" fontSize={isMobile ? "small" : "medium"} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </FormSection>

            {/* Sección de estado y agente */}
            <FormSection title="Estado y Responsable" icon={<PersonIcon color="primary" />} fullWidth>
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={!!errors.status}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                      >
                        <InputLabel id="status-label">Estado</InputLabel>
                        <Select {...field} labelId="status-label" label="Estado">
                          <MenuItem value="SCHEDULED">Programada</MenuItem>
                          <MenuItem value="COMPLETED">Completada</MenuItem>
                          <MenuItem value="CANCELLED">Cancelada</MenuItem>
                          <MenuItem value="RESCHEDULED">Reprogramada</MenuItem>
                          <MenuItem value="PENDING_CONFIRMATION">Pendiente de confirmación</MenuItem>
                        </Select>
                        {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="assignedAgentId"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={!!errors.assignedAgentId}
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
                        {errors.assignedAgentId && <FormHelperText>{errors.assignedAgentId.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </FormSection>

            {/* Sección de asistentes */}
            <FormSection title="Asistentes" icon={<GroupIcon color="primary" />} fullWidth>
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="contactIds"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth variant="outlined" size={isMobile ? "small" : "medium"}>
                        <InputLabel id="contacts-label">Contactos</InputLabel>
                        <Select
                          {...field}
                          labelId="contacts-label"
                          label="Contactos"
                          multiple
                          renderValue={(selected) => (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                              {selected.map((value) => {
                                const contact = mockContacts.find((c) => c.id.toString() === value)
                                return <Chip key={value} label={contact ? contact.name : value} size="small" />
                              })}
                            </Box>
                          )}
                        >
                          {mockContacts.map((contact) => (
                            <MenuItem key={contact.id} value={contact.id.toString()}>
                              <Checkbox checked={field.value.indexOf(contact.id.toString()) > -1} />
                              <ListItemText primary={contact.name} secondary={contact.email} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="prospectIds"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth variant="outlined" size={isMobile ? "small" : "medium"}>
                        <InputLabel id="prospects-label">Prospectos</InputLabel>
                        <Select
                          {...field}
                          labelId="prospects-label"
                          label="Prospectos"
                          multiple
                          renderValue={(selected) => (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                              {selected.map((value) => {
                                const prospect = mockProspects.find((p) => p.id.toString() === value)
                                return <Chip key={value} label={prospect ? prospect.name : value} size="small" />
                              })}
                            </Box>
                          )}
                        >
                          {mockProspects.map((prospect) => (
                            <MenuItem key={prospect.id} value={prospect.id.toString()}>
                              <Checkbox checked={field.value.indexOf(prospect.id.toString()) > -1} />
                              <ListItemText primary={prospect.name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="sendNotifications"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            color="primary"
                            size={isMobile ? "small" : "medium"}
                          />
                        }
                        label="Enviar notificaciones a los asistentes"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </FormSection>

            {/* Sección de notas */}
            <FormSection title="Notas" icon={<NotesIcon color="primary" />} fullWidth>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Notas adicionales"
                    placeholder="Añade información relevante para la visita..."
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

            {visit && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => onDelete && onDelete(visit.id)}
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
            {visit ? "Actualizar" : "Guardar"} Visita
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}
