import { Grid, Card, CardContent, Chip, Divider, useTheme, useMediaQuery, IconButton, Tooltip, Accordion, AccordionSummary, AccordionDetails, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"
import { Box, Button, Typography } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import HomeIcon from "@mui/icons-material/Home"
import ApartmentIcon from "@mui/icons-material/Apartment"
import StoreIcon from "@mui/icons-material/Store"
import LandscapeIcon from "@mui/icons-material/Landscape"
import DraftsIcon from "@mui/icons-material/Drafts"
import PublicIcon from "@mui/icons-material/Public"
import CalendarIcon from "@mui/icons-material/CalendarMonth"
import MoneyIcon from "@mui/icons-material/MonetizationOn"
import PersonIcon from "@mui/icons-material/Person"
import BusinessIcon from "@mui/icons-material/Business"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import VisibilityIcon from "@mui/icons-material/Visibility"
import DeleteIcon from "@mui/icons-material/Delete"
import { formatCurrency } from "@/libs/utils"
import type { Property, PropertyState } from "@/types/types"
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineOppositeContent,
} from "@mui/lab"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
import ShareIcon from "@mui/icons-material/Share"
import PublicOffIcon from "@mui/icons-material/PublicOff"
import { useState } from "react"
import { PropertyPDFPreview } from "./property-pdf-preview"
import CloseIcon from "@mui/icons-material/Close"

type PaletteColor = {
  main: string;
  light: string;
  dark: string;
};

type Palette = {
  primary: PaletteColor;
  secondary: PaletteColor;
  error: PaletteColor;
  warning: PaletteColor;
  info: PaletteColor;
  success: PaletteColor;
  grey: PaletteColor;
  text: PaletteColor;
  background: PaletteColor;
  [key: string]: PaletteColor; // Permitir claves dinámicas
};

type Theme = {
  palette: Palette;
  breakpoints: {
    down: (key: string) => string;
  };
};

// Mapeo de tipos de propiedad a iconos
const propertyTypeIcons = {
  HOUSE: <HomeIcon />,
  APARTMENT: <ApartmentIcon />,
  COMMERCIAL: <StoreIcon />,
  LAND: <LandscapeIcon />,
}

// Mapeo de estados a colores
const propertyStateColors: Record<PropertyState, "success" | "warning" | "error" | "info" | "default" | "secondary" | "primary"> = {
  AVAILABLE: "success",
  RESERVED: "warning",
  SOLD: "error",
  RENTED: "info",
  UNAVAILABLE: "default",
  UNDER_CONSTRUCTION: "secondary",
  DRAFT: "default",
  PUBLISHED: "primary",
}

// Mapeo de estados a texto en español
const propertyStateLabels: Record<PropertyState, string> = {
  AVAILABLE: "Disponible",
  RESERVED: "Reservada",
  SOLD: "Vendida",
  RENTED: "Alquilada",
  UNAVAILABLE: "No Disponible",
  UNDER_CONSTRUCTION: "En Construcción",
  DRAFT: "Borrador",
  PUBLISHED: "Publicada",
}

// Mapeo de tipos a texto en español
const propertyTypeLabels = {
  HOUSE: "Casa",
  APARTMENT: "Apartamento",
  COMMERCIAL: "Local Comercial",
  LAND: "Terreno",
}

// Mock data for related information
const mockRelatedVisits = [
  {
    id: 101,
    date: "2023-05-15",
    startTime: "10:00",
    endTime: "11:00",
    status: "COMPLETED",
    visitorName: "Carlos Rodríguez",
    agentName: "Ana García",
    notes: "Cliente muy interesado en la ubicación",
  },
  {
    id: 102,
    date: "2023-05-20",
    startTime: "16:30",
    endTime: "17:30",
    status: "SCHEDULED",
    visitorName: "María López",
    agentName: "Pedro Martínez",
    notes: "Segunda visita para revisar detalles",
  },
  {
    id: 103,
    date: "2023-05-10",
    startTime: "12:00",
    endTime: "13:00",
    status: "CANCELLED",
    visitorName: "Juan Pérez",
    agentName: "Ana García",
    notes: "Cancelada por el cliente",
  },
]

const mockRelatedOpportunities = [
  {
    id: 201,
    name: "Venta Apartamento Centro",
    customer: "Carlos Rodríguez",
    amount: 120000000,
    currency: "CLP",
    probability: 80,
    stage: "NEGOTIATION",
    agent: "Ana García",
    createdAt: "2023-04-15",
  },
  {
    id: 202,
    name: "Inversión Propiedad",
    customer: "Empresa Inversiones XYZ",
    amount: 150000000,
    currency: "CLP",
    probability: 60,
    stage: "INITIAL_CONTACT",
    agent: "Pedro Martínez",
    createdAt: "2023-05-05",
  },
]

const mockRelatedOffers = [
  {
    id: 301,
    amount: 115000000,
    currency: "CLP",
    date: "2023-05-10",
    status: "PENDING",
    prospectName: "Carlos Rodríguez",
    validUntil: "2023-05-25",
    notes: "Oferta inicial",
  },
  {
    id: 302,
    amount: 118000000,
    currency: "CLP",
    date: "2023-05-18",
    status: "ACCEPTED",
    prospectName: "Carlos Rodríguez",
    validUntil: "2023-06-01",
    notes: "Contraoferta aceptada",
  },
  {
    id: 303,
    amount: 145000000,
    currency: "CLP",
    date: "2023-05-12",
    status: "REJECTED",
    prospectName: "Empresa Inversiones XYZ",
    validUntil: "2023-05-26",
    notes: "Oferta rechazada por estar muy por debajo del valor de mercado",
  },
]

type OfferStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED" | "WITHDRAWN";

const offerStatusColors: Record<OfferStatus, string> = {
  PENDING: "warning",
  ACCEPTED: "success",
  REJECTED: "error",
  EXPIRED: "default",
  WITHDRAWN: "default",
};

// Add this mapping for offer status labels
const offerStatusLabels = {
  PENDING: "Pendiente",
  ACCEPTED: "Aceptada",
  REJECTED: "Rechazada",
  EXPIRED: "Expirada",
  WITHDRAWN: "Retirada",
}

interface PropertyDetailProps {
  property: Property
  onEdit: (property: Property) => void
  onDelete?: (propertyId: string) => void
}

export function PropertyDetail({ property, onEdit, onDelete }: PropertyDetailProps) {
  const theme = useTheme() as Theme;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false)

  const handleOpenPdfPreview = () => {
    setPdfPreviewOpen(true)
  }

  const handleClosePdfPreview = () => {
    setPdfPreviewOpen(false)
  }

  return (
    <Box sx={{ px: 3, pb: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" component="h2" fontWeight="bold">
          Detalles de la Propiedad
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            sx={{ mr: 2 }}
            onClick={() => onEdit(property)}
          >
            Editar
          </Button>
          {/* {onDelete && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => onDelete(property.id)}
            >
              Eliminar
            </Button>
          )} */}
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Información principal */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                <Box>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {property.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    {propertyTypeIcons[property.type as keyof typeof propertyTypeIcons] || <HomeIcon />}
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      {propertyTypeLabels[property.type as keyof typeof propertyTypeLabels]}
                    </Typography>
                    <Chip
                      label={propertyStateLabels[property.state]}
                      color={propertyStateColors[property.state]}
                      size="small"
                      sx={{ ml: 2 }}
                      icon={
                        property.state === "DRAFT" ? (
                          <DraftsIcon fontSize="small" />
                        ) : property.state === "PUBLISHED" ? (
                          <PublicIcon fontSize="small" />
                        ) : undefined
                      }
                    />
                  </Box>
                </Box>
                <Typography variant="h5" color="primary.main" fontWeight="bold">
                  {formatCurrency(property.price, property.currency)}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Dirección
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {property.address}, {property.city}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Código de Referencia
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    REF-{property.id.padStart ? property.id.padStart(6, "0") : property.id}
                  </Typography>
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, mt: 3 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Área Total
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {property.area} m²
                  </Typography>
                </Box>
                {property.bedrooms > 0 && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Dormitorios
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {property.bedrooms}
                    </Typography>
                  </Box>
                )}
                {property.bathrooms > 0 && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Baños
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {property.bathrooms}
                    </Typography>
                  </Box>
                )}
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Antigüedad
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {property.yearBuilt ? new Date().getFullYear() - property.yearBuilt : "No especificado"} años
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Características adicionales */}
          <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Características
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <Chip
                  label="Estacionamiento"
                  variant="outlined"
                  size="small"
                  sx={{ 
                    borderRadius: '16px',
                    borderColor: 'divider',
                    '& .MuiChip-label': {
                      px: 1.5,
                      py: 0.5
                    }
                  }}
                />
                <Chip
                  label="Piscina"
                  variant="outlined"
                  size="small"
                  sx={{ 
                    borderRadius: '16px',
                    borderColor: 'divider',
                    '& .MuiChip-label': {
                      px: 1.5,
                      py: 0.5
                    }
                  }}
                />
                <Chip
                  label="Jardín"
                  variant="outlined"
                  size="small"
                  sx={{ 
                    borderRadius: '16px',
                    borderColor: 'divider',
                    '& .MuiChip-label': {
                      px: 1.5,
                      py: 0.5
                    }
                  }}
                />
                <Chip
                  label="Seguridad 24h"
                  variant="outlined"
                  size="small"
                  sx={{ 
                    borderRadius: '16px',
                    borderColor: 'divider',
                    '& .MuiChip-label': {
                      px: 1.5,
                      py: 0.5
                    }
                  }}
                />
                <Chip
                  label="Amueblado"
                  variant="outlined"
                  size="small"
                  sx={{ 
                    borderRadius: '16px',
                    borderColor: 'divider',
                    '& .MuiChip-label': {
                      px: 1.5,
                      py: 0.5
                    }
                  }}
                />
                <Chip
                  label="Aire acondicionado"
                  variant="outlined"
                  size="small"
                  sx={{ 
                    borderRadius: '16px',
                    borderColor: 'divider',
                    '& .MuiChip-label': {
                      px: 1.5,
                      py: 0.5
                    }
                  }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Descripción */}
          <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Descripción
              </Typography>
              <Typography variant="body2" paragraph>
                Hermosa propiedad ubicada en una zona privilegiada de {property.city}. Cuenta con
                excelentes acabados y distribución funcional. Ideal para familias que buscan comodidad y
                seguridad.
              </Typography>
              <Typography variant="body2" paragraph>
                La propiedad ofrece espacios amplios y luminosos, con vistas despejadas y excelente ventilación.
                Su ubicación estratégica permite fácil acceso a servicios, comercios y vías principales.
              </Typography>
              <Typography variant="body2">
                Disponibilidad inmediata. No deje pasar esta oportunidad única de inversión.
              </Typography>
            </CardContent>
          </Card>

          {/* Oportunidades Asociadas */}
          <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6">Oportunidades Asociadas</Typography>
                {/* <Button size="small" variant="outlined" startIcon={<BusinessIcon />}>
                  Generar Oportunidad
                </Button> */}
              </Box>

              {mockRelatedOpportunities.length > 0 ? (
                <Box sx={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>Nombre</th>
                        <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>Cliente</th>
                        <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>Monto</th>
                        <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>Etapa</th>
                        <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>Prob.</th>
                        <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>Agente</th>
                        <th style={{ textAlign: "right", padding: "8px", borderBottom: "1px solid #ddd" }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockRelatedOpportunities.map((opportunity) => {
                        const stageInfo = {
                          INITIAL_CONTACT: { color: "default", label: "Contacto Inicial" },
                          VIEWING_SCHEDULED: { color: "info", label: "Visita Programada" },
                          NEEDS_ANALYSIS: { color: "primary", label: "Análisis de Necesidades" },
                          NEGOTIATION: { color: "warning", label: "Negociación" },
                          OFFER_MADE: { color: "secondary", label: "Oferta Realizada" },
                          CLOSED_WON: { color: "success", label: "Cerrada Ganada" },
                          CLOSED_LOST: { color: "error", label: "Cerrada Perdida" },
                        }

                        return (
                          <tr key={opportunity.id}>
                            <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{opportunity.name}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{opportunity.customer}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                              {formatCurrency(opportunity.amount, opportunity.currency)}
                            </td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                              <Chip
                                label={stageInfo[opportunity.stage as keyof typeof stageInfo]?.label || opportunity.stage}
                                color={stageInfo[opportunity.stage as keyof typeof stageInfo]?.color as any}
                                size="small"
                              />
                            </td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{opportunity.probability}%</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{opportunity.agent}</td>
                            <td style={{ padding: "8px", borderBottom: "1px solid #ddd", textAlign: "right" }}>
                              <Tooltip title="Ver detalles">
                                <IconButton size="small">
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: "center" }}>
                  No hay oportunidades asociadas a esta propiedad.
                </Typography>
              )}
            </CardContent>
          </Card>

          {/* Visitas Asociadas */}
          <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6">Visitas Asociadas</Typography>
                {/* <Button size="small" variant="outlined" startIcon={<CalendarIcon />}>
                  Programar Visita
                </Button> */}
              </Box>

              {mockRelatedVisits.length > 0 ? (
                <Timeline position="right" sx={{ p: 0, m: 0 }}>
                  {mockRelatedVisits.map((visit) => {
                    const visitStatusColor =
                      visit.status === "COMPLETED"
                        ? "success"
                        : visit.status === "SCHEDULED"
                          ? "primary"
                          : visit.status === "CANCELLED"
                            ? "error"
                            : "default"

                    return (
                      <TimelineItem key={visit.id}>
                        <TimelineOppositeContent sx={{ flex: 0.2, py: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(visit.date).toLocaleDateString()}
                          </Typography>
                          <Typography variant="caption">
                            {visit.startTime} - {visit.endTime}
                          </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot color={visitStatusColor as any}>
                            <CalendarIcon fontSize="small" />
                          </TimelineDot>
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: 1, px: 2 }}>
                          <Box
                            sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
                          >
                            <Box>
                              <Typography variant="subtitle2">
                                Visita{" "}
                                {visit.status === "COMPLETED"
                                  ? "realizada"
                                  : visit.status === "SCHEDULED"
                                    ? "programada"
                                    : "cancelada"}
                              </Typography>
                              <Typography variant="body2">Visitante: {visit.visitorName}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                Agente: {visit.agentName}
                              </Typography>
                            </Box>
                            <Chip
                              label={
                                visit.status === "COMPLETED"
                                  ? "Completada"
                                  : visit.status === "SCHEDULED"
                                    ? "Programada"
                                    : "Cancelada"
                              }
                              size="small"
                              color={visitStatusColor as any}
                            />
                          </Box>
                          {visit.notes && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 1, fontStyle: "italic" }}
                            >
                              "{visit.notes}"
                            </Typography>
                          )}
                        </TimelineContent>
                      </TimelineItem>
                    )
                  })}
                </Timeline>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: "center" }}>
                  No hay visitas asociadas a esta propiedad.
                </Typography>
              )}
            </CardContent>
          </Card>

          {/* Ofertas Asociadas */}
          <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6">Ofertas Asociadas</Typography>
                {/* <Button size="small" variant="outlined" startIcon={<MoneyIcon />}>
                  Nueva Oferta
                </Button> */}
              </Box>

              {mockRelatedOffers.length > 0 ? (
                <>
                  {mockRelatedOffers.map((offer) => (
                    <Accordion key={offer.id} sx={{ mb: 1, "&:before": { display: "none" } }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{
                          borderLeft: `4px solid ${theme.palette[offerStatusColors[offer.status as keyof typeof offerStatusColors] as any].main}`,
                          "&.Mui-expanded": {
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                          },
                        }}
                      >
                        <Grid container alignItems="center">
                          <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle2">
                              {formatCurrency(offer.amount, offer.currency)}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <PersonIcon fontSize="small" sx={{ mr: 0.5, color: "text.secondary" }} />
                              <Typography variant="body2">{offer.prospectName}</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Typography variant="body2" color="text.secondary">
                              {new Date(offer.date).toLocaleDateString()}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={2} sx={{ textAlign: { xs: "left", sm: "right" } }}>
                            <Chip
                              label={offerStatusLabels[offer.status as keyof typeof offerStatusLabels]}
                              size="small"
                              color={offerStatusColors[offer.status as keyof typeof offerStatusColors] as any}
                            />
                          </Grid>
                        </Grid>
                      </AccordionSummary>
                      <AccordionDetails sx={{ pt: 0 }}>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Detalles de la oferta
                            </Typography>
                            <Typography variant="body2" paragraph>
                              {offer.notes}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Fecha de oferta
                              </Typography>
                              <Typography variant="body2">
                                {new Date(offer.date).toLocaleDateString()}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Válida hasta
                              </Typography>
                              <Typography variant="body2">
                                {new Date(offer.validUntil).toLocaleDateString()}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Estado
                              </Typography>
                              <Chip
                                label={offerStatusLabels[offer.status as keyof typeof offerStatusLabels]}
                                size="small"
                                color={offerStatusColors[offer.status as keyof typeof offerStatusColors] as any}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                          <Button size="small" variant="outlined" sx={{ mr: 1 }}>
                            Ver Detalles
                          </Button>
                          {offer.status === "PENDING" && (
                            <>
                              <Button size="small" variant="outlined" color="success" sx={{ mr: 1 }}>
                                Aceptar
                              </Button>
                              <Button size="small" variant="outlined" color="error">
                                Rechazar
                              </Button>
                            </>
                          )}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: "center" }}>
                  No hay ofertas asociadas a esta propiedad.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar con información adicional */}
        <Grid item xs={12} md={4}>
          {/* Estado de publicación */}
          <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Estado de Publicación
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Estado actual
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                    {property.state === "PUBLISHED" ? (
                      <PublicIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                    ) : property.state === "DRAFT" ? (
                      <DraftsIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                    ) : null}
                    <Typography variant="body1" fontWeight="medium">
                      {propertyStateLabels[property.state]}
                    </Typography>
                  </Box>
                </Box>
                {property.state === "DRAFT" && (
                  <Button variant="contained" size="small">
                    Publicar
                  </Button>
                )}
                {property.state === "PUBLISHED" && (
                  <Button variant="outlined" size="small" color="warning">
                    Despublicar
                  </Button>
                )}
              </Box>
              {property.state === "PUBLISHED" && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    Publicado en portales
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                    <Chip label="Portal Inmobiliario" size="small" />
                    <Chip label="Yapo.cl" size="small" />
                    <Chip label="Sitio web propio" size="small" />
                  </Box>
                </>
              )}
            </CardContent>
          </Card>

          {/* Información financiera */}
          <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Información Financiera
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Precio de venta
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {formatCurrency(property.price, property.currency)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Precio por m²
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {formatCurrency(
                    Math.round(property.price / property.area),
                    property.currency,
                  )}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Gastos comunes est.
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {formatCurrency(Math.round(property.price * 0.002), property.currency)}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Contacto y acciones */}
          <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Acciones Rápidas
              </Typography>
              <Button 
                variant="outlined" 
                fullWidth 
                sx={{ mb: 2 }}
                startIcon={<PictureAsPdfIcon />}
                onClick={handleOpenPdfPreview}
              >
                Generar Ficha PDF
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                sx={{ mb: 2 }}
                startIcon={<ShareIcon />}
              >
                Compartir Propiedad
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                sx={{ mb: 2 }}
                startIcon={<BusinessIcon />}
              >
                Generar Oportunidad
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                sx={{ mb: 2 }}
                startIcon={<PublicOffIcon />}
              >
                Despublicar Propiedad
              </Button>
            </CardContent>
          </Card>

          {/* Historial */}
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Historial
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Creada
                </Typography>
                <Typography variant="body2">{new Date().toLocaleDateString()}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Última modificación
                </Typography>
                <Typography variant="body2">{new Date().toLocaleDateString()}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Visitas totales
                </Typography>
                <Typography variant="body2">{Math.floor(Math.random() * 50)}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog 
        open={pdfPreviewOpen} 
        onClose={handleClosePdfPreview}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Vista Previa de PDF - {property.title}
          <IconButton
            aria-label="close"
            onClick={handleClosePdfPreview}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <PropertyPDFPreview property={property} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePdfPreview}>Cerrar</Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              // Aquí iría la lógica para descargar el PDF
              handleClosePdfPreview()
            }}
          >
            Descargar PDF
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
} 