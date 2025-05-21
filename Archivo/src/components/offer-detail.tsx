"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Fab,
  Grid,
  MenuItem,
  Paper,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography,
  useMediaQuery,
  useTheme,
  Tab,
  Tabs,
} from "@mui/material"
import {
  ArrowBack as ArrowBackIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Home as HomeIcon,
  MoreVert as MoreVertIcon,
  Person as PersonIcon,
  SwapHoriz as SwapIcon,
  Timeline as TimelineIcon,
  Visibility as VisibilityIcon,
  Send as SendIcon,
  Reply as ReplyIcon,
  Cancel as CancelIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  SwapHorizontalCircle as SwapHorizontalCircleIcon,
  History as HistoryIcon,
} from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { formatCurrency } from "@/libs/utils"
import type { Offer, OfferStage } from "@/types/types"
import { offerService } from "@/libs/services/offer-service"
import { mockProperties, mockLeads, mockAgents, mockOpportunities, offerStageColors } from "@/libs/mock-data"
import { OfferAuditLog } from "./offer-audit-log"

// Definir las acciones disponibles según el estado de la oferta
interface OfferAction {
  icon: React.ReactNode
  name: string
  action: () => void
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning"
}

const getAvailableActions = (offer: Offer, updateOfferStage: (newStage: OfferStage) => void): OfferAction[] => {
  switch (offer.stage) {
    case "DRAFT":
      return [
        {
          icon: <SendIcon />,
          name: "Enviar Oferta",
          action: () => updateOfferStage("SUBMITTED"),
          color: "primary",
        },
      ]
    case "SUBMITTED":
      return [
        {
          icon: <CheckCircleIcon />,
          name: "Aceptar",
          action: () => updateOfferStage("ACCEPTED"),
          color: "success",
        },
        {
          icon: <CloseIcon />,
          name: "Rechazar",
          action: () => updateOfferStage("REJECTED"),
          color: "error",
        },
        {
          icon: <ReplyIcon />,
          name: "Contraofertar",
          action: () => updateOfferStage("COUNTER_OFFER"),
          color: "info",
        },
      ]
    case "ACCEPTED":
      if (offer.swap) {
        return [
          {
            icon: <SwapHorizontalCircleIcon />,
            name: "Confirmar por Canje",
            action: () => updateOfferStage("CONFIRM_FOR_EXCHANGE"),
            color: "warning",
          },
        ]
      } else {
        return [
          {
            icon: <VisibilityIcon />,
            name: "Pendiente Visar por Propietarios",
            action: () => updateOfferStage("PENDING_OWNER_APPROVAL"),
            color: "info",
          },
        ]
      }
    case "COUNTER_OFFER":
      return [
        {
          icon: <CheckCircleIcon />,
          name: "Aceptar Contraoferta",
          action: () => updateOfferStage("ACCEPTED"),
          color: "success",
        },
        {
          icon: <CloseIcon />,
          name: "Rechazar Contraoferta",
          action: () => updateOfferStage("REJECTED"),
          color: "error",
        },
        {
          icon: <ReplyIcon />,
          name: "Nueva Contraoferta",
          action: () => updateOfferStage("COUNTER_OFFER"),
          color: "info",
        },
      ]
    case "CONFIRM_FOR_EXCHANGE":
      return [
        {
          icon: <CheckCircleOutlineIcon />,
          name: "Confirmar Canje Completado",
          action: () => updateOfferStage("FINALIZED"),
          color: "success",
        },
        {
          icon: <CancelIcon />,
          name: "Cancelar Canje",
          action: () => updateOfferStage("CANCELLED"),
          color: "error",
        },
      ]
    case "PENDING_OWNER_APPROVAL":
      return [
        {
          icon: <CheckCircleOutlineIcon />,
          name: "Aprobado por Propietario",
          action: () => updateOfferStage("FINALIZED"),
          color: "success",
        },
        {
          icon: <CancelIcon />,
          name: "Rechazado por Propietario",
          action: () => updateOfferStage("REJECTED"),
          color: "error",
        },
      ]
    case "PENDING_CLIENT_APPROVAL":
    case "PENDING_CAPTURER_APPROVAL":
    case "PENDING_PLACER_APPROVAL":
      return [
        {
          icon: <CheckCircleOutlineIcon />,
          name: "Aprobar",
          action: () => updateOfferStage("ACCEPTED"),
          color: "success",
        },
        {
          icon: <CancelIcon />,
          name: "Rechazar",
          action: () => updateOfferStage("REJECTED"),
          color: "error",
        },
      ]
    case "REJECTED":
    case "EXPIRED":
    case "FINALIZED":
    case "CANCELLED":
      return [
        {
          icon: <EditIcon />,
          name: "Crear Nueva Oferta",
          action: () => console.log("Redirigir a crear nueva oferta"),
          color: "primary",
        },
      ]
    default:
      return []
  }
}

// Componente para mostrar la información de la oferta
export function OfferDetail({ offerId }: { offerId: string }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const router = useRouter()
  const [offer, setOffer] = useState<Offer | null>(null)
  const [loading, setLoading] = useState(true)
  const [speedDialOpen, setSpeedDialOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  // Simular la carga de datos
  useEffect(() => {
    const fetchOffer = async () => {
      // Simulamos una llamada a la API
      setTimeout(() => {
        const foundOffer = offerService.getOfferById(Number.parseInt(offerId))
        setOffer(foundOffer || null)
        setLoading(false)
      }, 500)
    }

    fetchOffer()
  }, [offerId])

  // Función para actualizar el estado de la oferta
  const updateOfferStage = (newStage: OfferStage) => {
    if (offer) {
      const updatedOffer = offerService.updateOfferStage(offer.id, newStage)
      if (updatedOffer) {
        setOffer(updatedOffer)
        console.log(`Oferta ${offer.id} actualizada a estado: ${newStage}`)
      }
    }
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Cargando detalles de la oferta...</Typography>
      </Container>
    )
  }

  if (!offer) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>No se encontró la oferta con ID {offerId}</Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => router.push("/ofertas")} sx={{ mt: 2 }}>
          Volver a Ofertas
        </Button>
      </Container>
    )
  }

  const property = mockProperties[offer.propertyId]
  const agent = mockAgents[offer.assignAgentId]
  const lead = mockLeads[offer.prospectId]
  const opportunity = mockOpportunities[offer.opportunityId]
  const status = offerStageColors[offer.stage]
  const availableActions = getAvailableActions(offer, updateOfferStage)

  return (
    <main>
      {/* Botón para volver */}
      <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => router.push("/ofertas")} variant="outlined">
          Volver a Ofertas
        </Button>
      </Box>

      {/* Título y estado */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          Oferta #{offer.id}
        </Typography>
        <Chip
          label={status.label}
          sx={{
            bgcolor: status.bg,
            color: status.color,
            fontWeight: "bold",
            fontSize: "1rem",
            py: 1,
            px: 2,
          }}
        />
      </Box>

      {/* Pestañas */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="pestañas de oferta">
          <Tab label="Detalles" id="tab-0" aria-controls="tabpanel-0" />
          <Tab
            label="Historial de Cambios"
            id="tab-1"
            aria-controls="tabpanel-1"
            icon={<HistoryIcon />}
            iconPosition="start"
          />
        </Tabs>
      </Box>

      {/* Contenido de las pestañas */}
      <div role="tabpanel" hidden={activeTab !== 0} id="tabpanel-0" aria-labelledby="tab-0">
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {/* Información principal */}
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Detalles de la Oferta
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <MoneyIcon sx={{ mr: 1, color: "primary.main" }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          Monto:
                        </Typography>
                      </Box>
                      <Typography variant="h5" sx={{ ml: 4 }}>
                        {formatCurrency(offer.amount, offer.currency)}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <MoneyIcon sx={{ mr: 1, color: "primary.main" }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          Comisión:
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ ml: 4 }}>
                        {offer.commission}% ({formatCurrency(offer.amountCommission, offer.currencyCommission)})
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <HomeIcon sx={{ mr: 1, color: "primary.main" }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          Propiedad:
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ ml: 4 }}>
                        {property.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                        {property.address}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <TimelineIcon sx={{ mr: 1, color: "primary.main" }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          Oportunidad:
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ ml: 4 }}>
                        {opportunity.name}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <PersonIcon sx={{ mr: 1, color: "primary.main" }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          Cliente:
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ ml: 4 }}>
                        {lead.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                        {lead.email}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <PersonIcon sx={{ mr: 1, color: "primary.main" }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          Agente:
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ ml: 4 }}>
                        {agent.name}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <CalendarIcon sx={{ mr: 1, color: "primary.main" }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          Fecha de Expiración:
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ ml: 4 }}>
                        {new Date(offer.expirationDate).toLocaleDateString()}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <SwapIcon sx={{ mr: 1, color: offer.swap ? "info.main" : "text.secondary" }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          Canje:
                        </Typography>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          ml: 4,
                          color: offer.swap ? "info.main" : "text.secondary",
                          fontWeight: offer.swap ? "bold" : "normal",
                        }}
                      >
                        {offer.swap ? "Incluye canje" : "No incluye canje"}
                      </Typography>
                    </Grid>
                  </Grid>

                  {offer.observation && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Observaciones:
                      </Typography>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.50" }}>
                        <Typography variant="body1">{offer.observation}</Typography>
                      </Paper>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Información adicional y timeline */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Historial
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Box sx={{ py: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Creada:
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(offer.createdAt).toLocaleString()}
                    </Typography>
                  </Box>

                  <Box sx={{ py: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Última actualización:
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(offer.updatedAt).toLocaleString()}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Estado actual:
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Chip
                      label={status.label}
                      sx={{
                        bgcolor: status.bg,
                        color: status.color,
                        fontWeight: "bold",
                      }}
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Acciones disponibles:
                  </Typography>
                  {availableActions.length > 0 ? (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      {availableActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outlined"
                          color={action.color || "primary"}
                          startIcon={action.icon}
                          onClick={action.action}
                          fullWidth
                        >
                          {action.name}
                        </Button>
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No hay acciones disponibles para el estado actual.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </div>

      <div role="tabpanel" hidden={activeTab !== 1} id="tabpanel-1" aria-labelledby="tab-1">
        {activeTab === 1 && <OfferAuditLog offerId={Number.parseInt(offerId)} />}
      </div>

      {/* Botón flotante con acciones */}
      {!isMobile ? (
        <SpeedDial
          ariaLabel="Acciones de oferta"
          sx={{ position: "fixed", top: 80, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={() => setSpeedDialOpen(false)}
          onOpen={() => setSpeedDialOpen(true)}
          open={speedDialOpen}
          direction="down"
        >
          {availableActions.map((action, index) => (
            <SpeedDialAction
              key={index}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={() => {
                action.action()
                setSpeedDialOpen(false)
              }}
            />
          ))}
        </SpeedDial>
      ) : (
        <Fab
          color="primary"
          aria-label="acciones"
          sx={{ position: "fixed", top: 80, right: 16 }}
          onClick={() => setSpeedDialOpen(!speedDialOpen)}
        >
          {speedDialOpen ? <CloseIcon /> : <MoreVertIcon />}
        </Fab>
      )}

      {/* Menú móvil para acciones */}
      {isMobile && speedDialOpen && (
        <Paper
          elevation={3}
          sx={{
            position: "fixed",
            top: 140,
            right: 16,
            width: "auto",
            minWidth: 200,
            zIndex: 1300,
          }}
        >
          {availableActions.map((action, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                action.action()
                setSpeedDialOpen(false)
              }}
              sx={{ color: theme.palette[action.color || "primary"].main }}
            >
              <Box sx={{ mr: 1 }}>{action.icon}</Box>
              {action.name}
            </MenuItem>
          ))}
        </Paper>
      )}
    </main>
  )
}
