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
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
  ToggleButton,
  ToggleButtonGroup  
} from "@mui/material"
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Apartment as ApartmentIcon,
  Home as HomeIcon,
  Business as BusinessIcon,
  Landscape as LandscapeIcon,
  Visibility as VisibilityIcon
} from "@mui/icons-material"
import { OfferList } from "./offer-list"
import { OfferForm } from "./offer-form"
import { OfferDetail } from "./offer-detail"
import { offerService, offerStageColors } from "@/libs/services/offer-service"
import { formatCurrency } from "@/libs/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { OfferConversionChart } from "./dashboard/charts/offer-conversion-chart"
import { OfferStatusDistributionChart } from "./dashboard/charts/offer-status-distribution-chart"
import { OfferTimelineChart } from "./dashboard/charts/offer-timeline-chart"
import { OfferValueByPropertyChart } from "./dashboard/charts/offer-value-by-property-chart"
import { OfferWizard } from "@/components/offer-wizard"
import type { Offer } from "@/types/types"
import { DeleteIcon, ViewIcon } from "lucide-react"
import EditIcon from "@mui/icons-material/Edit"
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

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
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

export function OfferDashboard() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  const [tabValue, setTabValue] = useState(0)
  const [creationMode, setCreationMode] = useState<"form" | "wizard">("form")
  const [offers, setOffers] = useState<Offer[]>([])
  const [recentOffers, setRecentOffers] = useState<Offer[]>([])
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [offerStats, setOfferStats] = useState({
    total: 0,
    draft: 0,
    submitted: 0,
    counterOffer: 0,
    pendingApproval: 0,
    accepted: 0,
    rejected: 0,
    cancelled: 0,
    finalized: 0,
  })
  const [offersByProperty, setOffersByProperty] = useState({
    apartment: 0,
    house: 0,
    commercial: 0,
    land: 0,
  })

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true)
        const fetchedOffers = await offerService.getOffers()
        setOffers(fetchedOffers)

        // Get recent offers (last 5)
        const sortedOffers = [...fetchedOffers].sort(
          (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        )
        setRecentOffers(sortedOffers.slice(0, 5))

        // Calculate stats
        const stats = {
          total: fetchedOffers.length,
          draft: fetchedOffers.filter((o) => o.stage === "BORRADOR").length,
          submitted: fetchedOffers.filter((o) => o.stage === "ENVIADA").length,
          counterOffer: fetchedOffers.filter((o) => o.stage === "CONTRAOFERTA").length,
          pendingApproval: fetchedOffers.filter(
            (o) =>
              o.stage === "PENDIENTE_APROBACION_CLIENTE" ||
              o.stage === "PENDIENTE_APROBACION_PROPIETARIO" ||
              o.stage === "PENDIENTE_APROBACION_CAPTADOR" ||
              o.stage === "PENDIENTE_APROBACION_COLOCADOR",
          ).length,
          accepted: fetchedOffers.filter((o) => o.stage === "ACEPTADO").length,
          rejected: fetchedOffers.filter((o) => o.stage === "RECHAZADO").length,
          cancelled: fetchedOffers.filter((o) => o.stage === "CANCELADO").length,
          finalized: fetchedOffers.filter((o) => o.stage === "FINALIZADO").length,
        }
        setOfferStats(stats)

        // Calculate property type stats
        // In a real app, you would get this from the properties linked to offers
        setOffersByProperty({
          apartment: Math.floor(fetchedOffers.length * 0.45), // Example distribution
          house: Math.floor(fetchedOffers.length * 0.3),
          commercial: Math.floor(fetchedOffers.length * 0.15),
          land: fetchedOffers.length - Math.floor(fetchedOffers.length * 0.9), // Remainder
        })
      } catch (error) {
        console.error("Error fetching offers:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOffers()
  }, [])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleSelectOffer = (offer: Offer) => {
    setSelectedOffer(offer)
    setTabValue(3) // Switch to details tab
  }

  const handleCreateNewOffer = () => {
    setSelectedOffer(undefined)
    setTabValue(2) // Switch to new offer tab
  }

  const handleSuccess = () => {
    setTabValue(0) // Return to dashboard
  }

  const handleCreationModeChange = (event: React.MouseEvent<HTMLElement>, newMode: "form" | "wizard") => {
    if (newMode !== null) {
      setCreationMode(newMode)
    }
  }

  const handleEditOffer = (offer: Offer) => {
    setSelectedOffer(offer)
    setTabValue(2) // Switch to edit/new offer tab
  }

  const handleDeleteOffer = (offer: Offer) => {
    setSelectedOffer(offer)
    setIsDeleteDialogOpen(true)
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy", { locale: es })
  }

  const getOfferTypeIcon = (propertyType: string) => {
    switch (propertyType?.toLowerCase()) {
      case "apartment":
        return <ApartmentIcon />
      case "house":
        return <HomeIcon />
      case "commercial":
        return <BusinessIcon />
      case "land":
        return <LandscapeIcon />
      default:
        return <HomeIcon />
    }
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
        size="small"
      />
    )
  }

  const handleClearSelection = () => {
    setSelectedOffer(undefined);
    setTabValue(0);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setSelectedOffer(undefined)
  }

  return (
    <Container 
    maxWidth={false} 
    disableGutters 
    sx={{ px: { xs: 1, sm: 2, md: 3 }, py: { xs: 2, md: 3 }, width: "100%" }}
    >
      <Box sx={{ width: "100%" }}>
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
          <Typography variant="h4" component="h1" fontWeight="bold" sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}>
            Gestión de Ofertas
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size={isMobile ? "small" : "medium"}
            startIcon={<AddIcon />}
            onClick={handleCreateNewOffer}
          >
            Nueva Oferta
          </Button>
        </Box>

        {/* Tabs */}
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant={isTablet ? "scrollable" : "fullWidth"}
              scrollButtons={isTablet}
              allowScrollButtonsMobile={isTablet}
            >
              <Tab label="Dashboard" id="offer-tab-0" />
              <Tab label="Lista de Ofertas" id="offer-tab-1" />
              <Tab label={selectedOffer ? "Editar Oferta" : "Nueva Oferta"} id="offer-tab-2" />
              <Tab label="Detalles de Oferta" id="offer-tab-3" disabled={!selectedOffer} />
            </Tabs>
          </Box>

          {/* Dashboard Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {/* Left panel - Offer summary */}
                <Grid item xs={12} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Resumen de Ofertas
                      </Typography>
                      <Divider sx={{ mb: 2 }} />

                      <List disablePadding dense>
                        <ListItem sx={{ py: 1 }}>
                          <ListItemText primary="Total" />
                          <Typography variant="body1" fontWeight="bold">
                            {offerStats.total}
                          </Typography>
                        </ListItem>

                        <ListItem sx={{ py: 1 }}>
                          <ListItemText primary="Borradores" />
                          <Chip
                            label={offerStats.draft}
                            size="small"
                            sx={{ bgcolor: "#e0e0e0", color: "#424242", fontWeight: "bold" }}
                          />
                        </ListItem>

                        <ListItem sx={{ py: 1 }}>
                          <ListItemText primary="Enviadas" />
                          <Chip
                            label={offerStats.submitted}
                            size="small"
                            sx={{ bgcolor: "#bbdefb", color: "#1976d2", fontWeight: "bold" }}
                          />
                        </ListItem>

                        <ListItem sx={{ py: 1 }}>
                          <ListItemText primary="Contraofertas" />
                          <Chip
                            label={offerStats.counterOffer}
                            size="small"
                            sx={{ bgcolor: "#fff9c4", color: "#f57f17", fontWeight: "bold" }}
                          />
                        </ListItem>

                        <ListItem sx={{ py: 1 }}>
                          <ListItemText primary="Pendientes de Aprobación" />
                          <Chip
                            label={offerStats.pendingApproval}
                            size="small"
                            sx={{ bgcolor: "#ffcc80", color: "#e65100", fontWeight: "bold" }}
                          />
                        </ListItem>

                        <ListItem sx={{ py: 1 }}>
                          <ListItemText primary="Aceptadas" />
                          <Chip
                            label={offerStats.accepted}
                            size="small"
                            sx={{ bgcolor: "#c8e6c9", color: "#2e7d32", fontWeight: "bold" }}
                          />
                        </ListItem>

                        <ListItem sx={{ py: 1 }}>
                          <ListItemText primary="Rechazadas" />
                          <Chip
                            label={offerStats.rejected}
                            size="small"
                            sx={{ bgcolor: "#ffcdd2", color: "#c62828", fontWeight: "bold" }}
                          />
                        </ListItem>

                        <ListItem sx={{ py: 1 }}>
                          <ListItemText primary="Canceladas" />
                          <Chip
                            label={offerStats.cancelled}
                            size="small"
                            sx={{ bgcolor: "#d1c4e9", color: "#4527a0", fontWeight: "bold" }}
                          />
                        </ListItem>

                        <ListItem sx={{ py: 1 }}>
                          <ListItemText primary="Finalizadas" />
                          <Chip
                            label={offerStats.finalized}
                            size="small"
                            sx={{ bgcolor: "#b2dfdb", color: "#00695c", fontWeight: "bold" }}
                          />
                        </ListItem>
                      </List>

                      <Divider sx={{ my: 2 }} />
                      <Typography variant="subtitle1" gutterBottom>
                        Por Tipo de Propiedad
                      </Typography>

                      <List disablePadding dense>
                        <ListItem sx={{ py: 1 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <ApartmentIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Apartamentos" />
                          <Typography variant="body2">{offersByProperty.apartment}</Typography>
                        </ListItem>
                        <ListItem sx={{ py: 1 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <HomeIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Casas" />
                          <Typography variant="body2">{offersByProperty.house}</Typography>
                        </ListItem>
                        <ListItem sx={{ py: 1 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <BusinessIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Comerciales" />
                          <Typography variant="body2">{offersByProperty.commercial}</Typography>
                        </ListItem>
                        <ListItem sx={{ py: 1 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <LandscapeIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Terrenos" />
                          <Typography variant="body2">{offersByProperty.land}</Typography>
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Main content - Recent offers and charts */}
                <Grid item xs={12} md={9}>
                  {/* Recent offers */}
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography variant="h6">Ofertas Recientes</Typography>
                      <Button color="primary" size="small" onClick={() => setTabValue(1)}>
                        Ver todas
                      </Button>
                    </Box>

                    <Grid container spacing={2}>
                      {recentOffers.map((offer) => (
                        <Grid item xs={12} sm={6} md={4} key={offer.id}>
                          <Card
                            sx={{
                              cursor: "pointer",
                              "&:hover": { boxShadow: 3 },
                            }}
                            onClick={() => handleSelectOffer(offer)}
                          >
                            <CardContent>
                              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                  {getOfferTypeIcon("apartment")} {/* Use actual property type */}
                                  <Typography variant="subtitle1" noWrap sx={{ maxWidth: 150 }}>
                                    {offer.title || `Oferta ${offer.reference}`}
                                  </Typography>
                                </Box>
                                <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                                  <MoreVertIcon fontSize="small" />
                                </IconButton>
                              </Box>

                              <Typography variant="h6" color="primary" sx={{ my: 1 }}>
                                {formatCurrency(offer.amount, offer.currency)}
                              </Typography>

                              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                                {getStageChip(offer.stage)}
                                {offer.swap && (
                                  <Chip label="Canje" size="small" sx={{ bgcolor: "#e1f5fe", color: "#0277bd" }} />
                                )}
                              </Box>

                              <Divider sx={{ my: 1 }} />

                              <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                                <Typography variant="body2" color="text.secondary">
                                  Exp: {formatDate(offer.expirationDate)}
                                </Typography>
                                {offer.commission > 0 && (
                                  <Typography variant="body2" color="text.secondary">
                                    {offer.commission}%
                                  </Typography>
                                )}
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {/* Charts for offer tracking and conversion */}
                  <Grid container spacing={3}>
                    {/* Conversion Funnel */}
                    <Grid item xs={12} md={6}>
                      <Card sx={{ height: "100%" }}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Embudo de Conversión de Ofertas
                          </Typography>
                          <Divider sx={{ mb: 2 }} />
                          <Box sx={{ height: 300 }}>
                            <OfferConversionChart />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Status Distribution */}
                    <Grid item xs={12} md={6}>
                      <Card sx={{ height: "100%" }}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Distribución por Estado
                          </Typography>
                          <Divider sx={{ mb: 2 }} />
                          <Box sx={{ height: 300 }}>
                            <OfferStatusDistributionChart />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Timeline Chart */}
                    <Grid item xs={12} md={8}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Tendencia de Ofertas
                          </Typography>
                          <Divider sx={{ mb: 2 }} />
                          <Box sx={{ height: 300 }}>
                            <OfferTimelineChart />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Value by Property Type */}
                    <Grid item xs={12} md={4}>
                      <Card sx={{ height: "100%" }}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Valor por Tipo de Propiedad
                          </Typography>
                          <Divider sx={{ mb: 2 }} />
                          <Box sx={{ height: 300 }}>
                            <OfferValueByPropertyChart />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          {/* List Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ p: 3 }}>
              <OfferList 
              // onSelectOffer={handleSelectOffer}
              actionButtons={
                (offer) => (
                <Box sx={{ display: "flex" }}>
                  <IconButton size="small" color="primary" onClick={() => handleSelectOffer(offer)}>
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="primary" component="a" href={`/ofertas/${offer.id}`} target="_blank" rel="noopener noreferrer">
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="primary" onClick={() => handleEditOffer(offer)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  {/* <IconButton size="small" color="error" onClick={() => handleDeleteOffer(offer)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton> */}
                </Box>
              )
        }
         />
            </Box>
          </TabPanel>

          {/* New/Edit Offer Tab */}
          <TabPanel value={tabValue} index={2}>
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
                <ToggleButtonGroup
                  value={creationMode}
                  exclusive
                  onChange={handleCreationModeChange}
                  aria-label="modo de creación"
                  size="small"
                >
                  <ToggleButton value="form" aria-label="formulario">
                    Formulario
                  </ToggleButton>
                  <ToggleButton value="wizard" aria-label="asistente">
                    Asistente
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
              {creationMode === "form" ? (
                <OfferForm 
                  offer={selectedOffer || undefined} 
                  opportunityId={0}
                  onComplete={handleSuccess}
                  onDelete={() => setIsDeleteDialogOpen(true)}
                />
              ) : (
                <OfferWizard offer={selectedOffer || undefined} onSuccess={handleSuccess} />
              )}
            </Box>
          </TabPanel>

          {/* Offer Details Tab */}
          <TabPanel value={tabValue} index={3}>
            <Box sx={{ p: 3 }}>
              {selectedOffer && <OfferDetail offerId={selectedOffer.id} />}
            </Box>
          </TabPanel>

        </Paper>
      </Box>
    </Container>
  )
}
