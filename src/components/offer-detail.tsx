"use client"

import type React from "react"
import ReactDOM from "react-dom/client"

import { useState, useEffect, useCallback } from "react"
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  SpeedDialIcon,
  Tab,
  Tabs,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Snackbar,
} from "@mui/material"
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  History as HistoryIcon,
  Info as InfoIcon,
  Timeline as TimelineIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon,
  MoreVert as MoreVertIcon,
  PictureAsPdf,
} from "@mui/icons-material"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import {
  offerService,
  mockProperties,
  mockProspects,
  mockAgents,
  mockOpportunities,
  offerStageColors,
} from "@/libs/services/offer-service"
import { formatCurrency } from "@/libs/utils"
import type { Offer, AuditLog, OfferStage } from "@/types/types"
import { OfferSpeedDial, type SpeedDialActionItem } from "./offer-speed-dial"
import { OfferPDFGenerator } from "./offer-pdf-generator"
import { OfferPDFPreview } from "./offer-pdf-preview"

interface OfferDetailProps {
  offerId: string | number
}

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
      id={`offer-tabpanel-${index}`}
      aria-labelledby={`offer-tab-${index}`}
      {...other}
      style={{ paddingTop: "20px" }}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

// Definir las transiciones de estado posibles
const OFFER_STATE_TRANSITIONS: Record<string, string[]> = {
  BORRADOR : ["ENVIADA", "CANCELADA"],
  ENVIADA: ["PENDIENTE_APROBACION_CLIENTE", "PENDIENTE_APROBACION_PROPIETARIO", "CONTRAOFERTA", "RECHAZADA", "CANCELADA"],
  CONTRAOFERTA: ["PENDIENTE_APROBACION_CLIENTE", "PENDIENTE_APROBACION_PROPIETARIO", "ACEPTADA", "RECHAZADA", "CANCELADA"],
  PENDIENTE_APROBACION_CLIENTE: ["ACEPTADA", "CONTRAOFERTA", "RECHAZADA", "CANCELADA"],
  PENDIENTE_APROBACION_PROPIETARIO: ["ACEPTADA", "CONTRAOFERTA", "RECHAZADA", "CANCELADA"],
  PENDIENTE_APROBACION_CAPTADOR: ["ACEPTADA", "CONTRAOFERTA", "RECHAZADA", "CANCELADA"],
  PENDIENTE_APROBACION_COLOCADOR: ["ACEPTADA", "CONTRAOFERTA", "RECHAZADA", "CANCELADA"],
  ACEPTADA: ["NEGOCIACION", "PROPUESTA", "CIERRE", "NECESIDAD_ANALISIS", "FINALIZADO", "CANCELADA"],
  RECHAZADA: ["BORRADOR", "CONTRAOFERTA"],
  EXPIRADA: ["BORRADOR"],
  NEGOCIACION: ["PROPUESTA", "CIERRE", "NECESIDAD_ANALISIS", "FINALIZADO", "CANCELADA"],
  PROPUESTA: ["CIERRE", "NECESIDAD_ANALISIS", "FINALIZADO", "CANCELADA"],
  CIERRE: ["NECESIDAD_ANALISIS", "FINALIZADO", "CANCELADA"],
  NECESIDAD_ANALISIS: ["FINALIZADO", "CANCELADA"],
  FINALIZADO: [],
  CANCELADA: ["BORRADOR"],
}

// Definir los pasos del flujo de oferta para el stepper
const OFFER_FLOW_STEPS = [
  { state: "PROPUESTA", label: "Propuesta" },
  { state: "ENVIADA", label: "Enviada" },
  { state: "PENDIENTE_APROBACION_CLIENTE", label: "Pendiente Cliente" },
  { state: "ACEPTADA", label: "Aceptada" },
  { state: "FINALIZADO", label: "Finalizada" },
]

interface StateChangeDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: (newState: string, observation: string) => void
  currentState: string
  possibleStates: string[]
  initialState?: string
}

// Componente para el diálogo de cambio de estado
function StateChangeDialog({
  open,
  onClose,
  onConfirm,
  currentState,
  possibleStates,
  initialState,
}: StateChangeDialogProps) {
  const [newState, setNewState] = useState<string>("")
  const [observation, setObservation] = useState<string>("")

  useEffect(() => {
    if (open) {
      if (initialState) {
        setNewState(initialState)
      } else if (possibleStates.length > 0) {
        setNewState(possibleStates[0])
      } else {
        setNewState("")
      }
      setObservation("")
    }
  }, [open, possibleStates, initialState])

  const handleConfirm = () => {
    onConfirm(newState, observation)
    setObservation("")
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Cambiar Estado de la Oferta</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Seleccione el nuevo estado para la oferta y añada una observación si es necesario.
        </DialogContentText>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="new-state-label">Nuevo Estado</InputLabel>
          <Select
            labelId="new-state-label"
            value={newState}
            label="Nuevo Estado"
            onChange={(e) => setNewState(e.target.value)}
          >
            {possibleStates.map((state) => (
              <MenuItem key={state} value={state}>
                {offerStageColors[state as keyof typeof offerStageColors]?.label || state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          autoFocus
          margin="dense"
          id="observation"
          label="Observación"
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">
          Confirmar Cambio
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// Modificar la función OfferDetail para añadir la nueva pestaña y funcionalidad
export function OfferDetail({ offerId }: OfferDetailProps) {
  const [offer, setOffer] = useState<Offer | null>(null)
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [tabValue, setTabValue] = useState(0)
  const [stateDialogOpen, setStateDialogOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" })
  const [newStateForChange, setNewStateForChange] = useState<string>("")
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false)

  // Función para cargar los datos de la oferta y su historial
  const fetchOfferData = useCallback(async () => {
    try {
      setLoading(true)
      const offerData = await offerService.getOfferById(offerId)
      setOffer(offerData)

      if (offerData) {
        const logs = await offerService.getAuditLogsByOfferId(offerData.id)
        setAuditLogs(logs)
      }
    } catch (error) {
      console.error("Error fetching offer data:", error)
      setSnackbar({
        open: true,
        message: "Error al cargar los datos de la oferta",
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
  }, [offerId])

  useEffect(() => {
    fetchOfferData()
  }, [fetchOfferData])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: es })
  }

  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: es })
  }

  const getStageChip = (stage: string) => {
    const stageInfo = offerStageColors[stage as keyof typeof offerStageColors] || {
      label: stage,
      color: "#424242",
      bg: "#f5f5f5",
    }

    return (
      <Chip
        label={stageInfo.label}
        style={{
          backgroundColor: stageInfo.bg,
          color: stageInfo.color,
          fontWeight: "bold",
        }}
      />
    )
  }

  // Función para manejar el cambio de estado de la oferta
  const handleStateChange = async (newState: string, observation: string) => {
    if (!offer) return

    try {
      setLoading(true)
      setStateDialogOpen(false)

      // Actualizar la oferta con el nuevo estado
      const updatedOffer = await offerService.updateOffer(offer.id, {
        stage: newState as OfferStage,
        observation: observation
          ? `${offer.observation}\n\n[${new Date().toLocaleString()}] ${observation}`
          : offer.observation,
      })

      if (updatedOffer) {
        setOffer(updatedOffer)

        // Recargar los logs de auditoría
        const logs = await offerService.getAuditLogsByOfferId(updatedOffer.id)
        setAuditLogs(logs)

        setSnackbar({
          open: true,
          message: `Oferta actualizada a estado: ${offerStageColors[newState as keyof typeof offerStageColors]?.label || newState}`,
          severity: "success",
        })
      }
    } catch (error) {
      console.error("Error updating offer state:", error)
      setSnackbar({
        open: true,
        message: "Error al actualizar el estado de la oferta",
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  // Obtener los estados posibles según el estado actual
  const getPossibleNextStates = (currentState: string): string[] => {
    return OFFER_STATE_TRANSITIONS[currentState] || []
  }

  // Obtener el índice del estado actual en el flujo de oferta
  const getCurrentStateIndex = (state: string): number => {
    return OFFER_FLOW_STEPS.findIndex((step) => step.state === state)
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 4, height: "50vh" }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!offer) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          No se pudo cargar la oferta. Por favor, inténtelo de nuevo.
        </Typography>
      </Box>
    )
  }

  const property = mockProperties[offer.propertyId as keyof typeof mockProperties]
  const prospect = mockProspects[offer.prospectId as keyof typeof mockProspects]
  const agent = mockAgents[offer.assignAgentId as keyof typeof mockAgents]
  const opportunity = mockOpportunities[offer.opportunityId as keyof typeof mockOpportunities]
  const possibleNextStates = getPossibleNextStates(offer.stage)
  const currentStateIndex = getCurrentStateIndex(offer.stage)

  // Configurar las acciones rápidas
  const quickActions: SpeedDialActionItem[] = [
    {
      icon: <EditIcon />,
      name: "Editar",
      onClick: () => console.log("Editar oferta"),
    },
    {
      icon: <DeleteIcon />,
      name: "Eliminar",
      onClick: () => console.log("Eliminar oferta"),
    },
    {
      icon: <PrintIcon />,
      name: "Imprimir",
      onClick: () => setPdfPreviewOpen(true),
    },
    {
      icon: <PictureAsPdf />,
      name: "Generar PDF",
      onClick: () => {
        // Crear un elemento temporal para renderizar el OfferPDFGenerator
        const tempDiv = document.createElement('div');
        tempDiv.style.display = 'none';
        document.body.appendChild(tempDiv);
        
        // Renderizar el componente en el elemento temporal
        const root = ReactDOM.createRoot(tempDiv);
        root.render(
          <OfferPDFGenerator 
            offer={offer} 
            buttonLabel="Descargar PDF" 
            buttonVariant="contained" 
            buttonColor="primary" 
          />
        );
        
        // Simular un clic en el botón después de un breve retraso
        setTimeout(() => {
          const button = tempDiv.querySelector('button');
          if (button) {
            button.click();
          }
          
          // Limpiar el elemento temporal
          setTimeout(() => {
            document.body.removeChild(tempDiv);
          }, 100);
        }, 100);
      },
    },
    {
      icon: <ShareIcon />,
      name: "Compartir",
      onClick: () => console.log("Compartir oferta"),
    },
  ]

  // Configurar las acciones de transición de estado
  const stateActions: SpeedDialActionItem[] = possibleNextStates.map((state) => {
    const stageInfo = offerStageColors[state as keyof typeof offerStageColors] || {
      label: state,
      color: "#424242",
      bg: "#f5f5f5",
    }

    let icon
    if (state === "ACCEPTED") icon = <CheckIcon />
    else if (state === "REJECTED") icon = <CloseIcon />
    else icon = <ArrowForwardIcon />

    return {
      icon: icon,
      name: stageInfo.label || state,
      onClick: () => {
        setNewStateForChange(state)
        setStateDialogOpen(true)
      },
      color: stageInfo.color,
      bgColor: stageInfo.bg,
    }
  })

  return (
    <Box sx={{ position: "relative", pb: 4 }}>
      {/* SpeedDial para acciones rápidas */}
      <OfferSpeedDial
        actions={quickActions}
        icon={<SpeedDialIcon />}
        visible={tabValue !== 1}
        position={{ top: 16, right: 16 }}
        onlyIcon={false}
      />

      {/* SpeedDial para acciones de transición de estado */}
      <OfferSpeedDial
        actions={stateActions}
        icon={<MoreVertIcon />}
        visible={tabValue === 1 && possibleNextStates.length > 0}
        position={{ top: 16, right: 16 }}
        onlyIcon={false}
      />

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="Pestañas de oferta">
          <Tab icon={<InfoIcon />} label="Detalles" id="offer-tab-0" aria-controls="offer-tabpanel-0" />
          <Tab icon={<TimelineIcon />} label="Eventos y Acciones" id="offer-tab-1" aria-controls="offer-tabpanel-1" />
          <Tab icon={<HistoryIcon />} label="Historial de Cambios" id="offer-tab-2" aria-controls="offer-tabpanel-2" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="h5" component="h1">
                    {offer.title}
                  </Typography>
                  {getStageChip(offer.stage)}
                </Box>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Referencia: {offer.reference}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Monto:</strong> {formatCurrency(offer.amount, offer.currency)}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Comisión:</strong> {offer.commission}% (
                      {formatCurrency(offer.amountCommission, offer.currencyCommission)})
                    </Typography>
                    <Typography variant="body1">
                      <strong>Fecha de expiración:</strong> {formatDate(offer.expirationDate)}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Incluye canje:</strong> {offer.swap ? "Sí" : "No"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Fecha de creación:</strong> {formatDate(offer.createdAt)}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Última actualización:</strong> {formatDate(offer.updatedAt)}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Estado:</strong> {offer.active ? "Activa" : "Inactiva"}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              {/* <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
                {offer && (
                  <>
                    <OfferPDFPreview offer={offer} />
                    <OfferPDFGenerator offer={offer} buttonLabel="Descargar PDF" showIcon={true} />
                  </>
                )}
              </Box> */}
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Propiedad
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {property ? (
                  <>
                    <Typography variant="body1">
                      <strong>Título:</strong> {property.title}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Dirección:</strong> {property.address}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Ciudad:</strong> {property.city}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Tipo:</strong> {property.type}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Precio:</strong> {formatCurrency(property.price, property.currency)}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    Información de propiedad no disponible
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Cliente
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {prospect ? (
                  <>
                    <Typography variant="body1">
                      <strong>Nombre:</strong> {prospect.firstName} {prospect.lastName}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Email:</strong> {prospect.email}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Teléfono:</strong> {prospect.phone || "No disponible"}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Tipo:</strong> {prospect.type}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Estado:</strong> {prospect.status}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    Información de cliente no disponible
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Agente Asignado
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {agent ? (
                  <>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar sx={{ mr: 2 }}>
                        {agent.firstName.charAt(0)}
                        {agent.lastName.charAt(0)}
                      </Avatar>
                      <Typography variant="body1">
                        {agent.firstName} {agent.lastName}
                      </Typography>
                    </Box>
                    <Typography variant="body1">
                      <strong>Email:</strong> {agent.email}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Teléfono:</strong> {agent.phone}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Rol:</strong> {agent.role}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    Información de agente no disponible
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Oportunidad
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {opportunity ? (
                  <>
                    <Typography variant="body1">
                      <strong>Nombre:</strong> {opportunity.name}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Etapa:</strong> {opportunity.stage}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Probabilidad:</strong> {opportunity.probability}%
                    </Typography>
                    <Typography variant="body1">
                      <strong>Fecha estimada de cierre:</strong> {formatDate(opportunity.expectedCloseDate)}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Fuente:</strong> {opportunity.source}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    Información de oportunidad no disponible
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Observaciones
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
                  {offer.observation || "No hay observaciones registradas."}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Estado Actual y Flujo de Oferta
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Box sx={{ mb: 4 }}>
                  <Stepper activeStep={currentStateIndex} alternativeLabel>
                    {OFFER_FLOW_STEPS.map((step, index) => {
                      const stageColor = offerStageColors[step.state as keyof typeof offerStageColors]
                      return (
                        <Step key={step.state} completed={index < currentStateIndex}>
                          <StepLabel
                            StepIconProps={{
                              style: {
                                color: step.state === offer.stage ? stageColor?.color : undefined,
                              },
                            }}
                          >
                            {step.label}
                          </StepLabel>
                        </Step>
                      )
                    })}
                  </Stepper>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ mr: 2 }}>
                    Estado actual:
                  </Typography>
                  {getStageChip(offer.stage)}
                </Box>

                <Typography variant="h6" gutterBottom>
                  Acciones Disponibles
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {possibleNextStates.length > 0 ? (
                  <Typography variant="body1" paragraph>
                    Utilice el botón flotante para realizar cambios de estado en esta oferta.
                  </Typography>
                ) : (
                  <Alert severity="info" sx={{ mb: 3 }}>
                    Esta oferta se encuentra en un estado final y no permite más transiciones.
                  </Alert>
                )}

                <Typography variant="h6" gutterBottom>
                  Últimas Acciones
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {auditLogs.length > 0 ? (
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Fecha</TableCell>
                          <TableCell>Acción</TableCell>
                          <TableCell>Usuario</TableCell>
                          <TableCell>Detalles</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {auditLogs.slice(0, 5).map((log) => (
                          <TableRow key={log.id}>
                            <TableCell>{formatDateTime(log.timestamp)}</TableCell>
                            <TableCell>
                              {log.actionType === "CAMBIO_ESTADO" ? (
                                <Chip
                                  label="Cambio de Estado"
                                  size="small"
                                  sx={{ backgroundColor: "#e3f2fd", color: "#0d47a1" }}
                                />
                              ) : (
                                <Chip label={log.actionType} size="small" />
                              )}
                            </TableCell>
                            <TableCell>{log.userName}</TableCell>
                            <TableCell>
                              {log.actionType === "CAMBIO_ESTADO" ? (
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                  <Chip
                                    label={
                                      offerStageColors[log.previousValue as keyof typeof offerStageColors]?.label ||
                                      log.previousValue
                                    }
                                    size="small"
                                    sx={{ backgroundColor: "#f5f5f5" }}
                                  />
                                  <ArrowForwardIcon fontSize="small" />
                                  <Chip
                                    label={
                                      offerStageColors[log.newValue as keyof typeof offerStageColors]?.label ||
                                      log.newValue
                                    }
                                    size="small"
                                    sx={{ backgroundColor: "#e8f5e9", color: "#1b5e20" }}
                                  />
                                </Box>
                              ) : (
                                log.description
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No hay acciones registradas para esta oferta.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Historial de Cambios
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {auditLogs.length === 0 ? (
              <Typography variant="body1" color="text.secondary" align="center">
                No hay registros de cambios para esta oferta.
              </Typography>
            ) : (
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Usuario</TableCell>
                      <TableCell>Acción</TableCell>
                      <TableCell>Valor Anterior</TableCell>
                      <TableCell>Valor Nuevo</TableCell>
                      <TableCell>Detalles</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{formatDateTime(log.timestamp)}</TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: "0.75rem" }}>
                              {log.userName.charAt(0)}
                            </Avatar>
                            {log.userName}
                          </Box>
                        </TableCell>
                        <TableCell>
                          {log.actionType === "CAMBIO_ESTADO" ? (
                            <Chip
                              label="Cambio de Estado"
                              size="small"
                              sx={{ backgroundColor: "#e3f2fd", color: "#0d47a1" }}
                            />
                          ) : log.actionType === "CREADO" ? (
                            <Chip label="Creación" size="small" sx={{ backgroundColor: "#e8f5e9", color: "#1b5e20" }} />
                          ) : log.actionType === "CAMBIO_MONTO" ? (
                            <Chip
                              label="Cambio de Monto"
                              size="small"
                              sx={{ backgroundColor: "#fff3e0", color: "#e65100" }}
                            />
                          ) : (
                            <Chip label={log.actionType} size="small" />
                          )}
                        </TableCell>
                        <TableCell>
                          {log.previousValue && log.actionType === "CAMBIO_ESTADO"
                            ? offerStageColors[log.previousValue as keyof typeof offerStageColors]?.label ||
                              log.previousValue
                            : log.previousValue || "-"}
                        </TableCell>
                        <TableCell>
                          {log.newValue && log.actionType === "CAMBIO_ESTADO"
                            ? offerStageColors[log.newValue as keyof typeof offerStageColors]?.label || log.newValue
                            : log.newValue || "-"}
                        </TableCell>
                        <TableCell>{log.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </TabPanel>

      {/* Diálogo para cambio de estado */}
      <StateChangeDialog
        open={stateDialogOpen}
        onClose={() => setStateDialogOpen(false)}
        onConfirm={handleStateChange}
        currentState={offer.stage}
        possibleStates={possibleNextStates}
        initialState={newStateForChange}
      />

      {/* Componente OfferPDFPreview controlado por estado */}
      {offer && pdfPreviewOpen && (
        <OfferPDFPreview
          offer={offer}
          open={pdfPreviewOpen}
          onClose={() => setPdfPreviewOpen(false)}
        />
      )}

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
