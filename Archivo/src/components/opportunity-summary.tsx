"use client"

import type React from "react"

import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Divider,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  useTheme,
  useMediaQuery,
  Button,
  Tabs,
  Tab,
} from "@mui/material"
import {
  Person as PersonIcon,
  Home as HomeIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  Source as SourceIcon,
  Percent as PercentIcon,
  Description as DescriptionIcon,
  BusinessCenter as BusinessCenterIcon,
} from "@mui/icons-material"
import { useState } from "react"
import { formatCurrency } from "@/libs/utils"
import { OpportunityVisits } from "./opportunity-visits"
import { OpportunityOffers } from "./opportunity-offers"

// Mapeo de etapas a colores y etiquetas
const stageInfo = {
  INITIAL_CONTACT: { color: "default", label: "Contacto Inicial" },
  VIEWING_SCHEDULED: { color: "info", label: "Visita Programada" },
  NEEDS_ANALYSIS: { color: "primary", label: "Análisis de Necesidades" },
  NEGOTIATION: { color: "warning", label: "Negociación" },
  OFFER_MADE: { color: "secondary", label: "Oferta Realizada" },
  CLOSED_WON: { color: "success", label: "Cerrada Ganada" },
  CLOSED_LOST: { color: "error", label: "Cerrada Perdida" },
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
      id={`opportunity-detail-tabpanel-${index}`}
      aria-labelledby={`opportunity-detail-tab-${index}`}
      style={{ width: "100%" }}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2, width: "100%" }}>{children}</Box>}
    </div>
  )
}

export function OpportunitySummary({ opportunity, onBack, onEdit }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [activeTab, setActiveTab] = useState(0)

  // Función para formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return "No definida"
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  if (!opportunity) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6">No se ha seleccionado ninguna oportunidad</Typography>
        <Button variant="outlined" onClick={onBack} sx={{ mt: 2 }}>
          Volver a la lista
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight="bold">
            {opportunity.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Chip
              label={stageInfo[opportunity.stage]?.label || opportunity.stage}
              color={stageInfo[opportunity.stage]?.color || "default"}
              sx={{ mr: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              Creada el {formatDate(opportunity.createdAt)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" onClick={onBack}>
            Volver
          </Button>
          <Button variant="contained" onClick={() => onEdit(opportunity)}>
            Editar
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <PersonIcon sx={{ mr: 1 }} /> Información del Cliente
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Cliente:</Typography>
                  <Typography variant="body1">{opportunity.customer}</Typography>
                </Grid>
                {opportunity.contact && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Contacto:</Typography>
                    <Typography variant="body1">
                      {opportunity.contact.name} {opportunity.contact.email && `(${opportunity.contact.email})`}
                    </Typography>
                  </Grid>
                )}
                {opportunity.assignAgent && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Agente Asignado:</Typography>
                    <Typography variant="body1">{opportunity.assignAgent.name}</Typography>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <MoneyIcon sx={{ mr: 1 }} /> Información Financiera
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Presupuesto:</Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {formatCurrency(opportunity.budget, opportunity.budgetCurrency)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Monto:</Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {formatCurrency(opportunity.amount, opportunity.curCode)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Probabilidad:</Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PercentIcon sx={{ mr: 0.5, fontSize: "small", color: "action.active" }} />
                    <Typography variant="body1">{opportunity.probability}%</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Fecha Estimada de Cierre:</Typography>
                  <Typography variant="body1">{formatDate(opportunity.expectedCloseDate)}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <HomeIcon sx={{ mr: 1 }} /> Propiedades Relacionadas
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {opportunity.properties && opportunity.properties.length > 0 ? (
                <List>
                  {opportunity.properties.map((property) => (
                    <ListItem key={property.id} disablePadding sx={{ py: 1 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                          <HomeIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={property.name} secondary={property.type || "Propiedad"} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No hay propiedades relacionadas
                </Typography>
              )}
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <DescriptionIcon sx={{ mr: 1 }} /> Información Adicional
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Fuente:</Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <SourceIcon sx={{ mr: 0.5, fontSize: "small", color: "action.active" }} />
                    <Typography variant="body1">{opportunity.source || "No especificada"}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Estado:</Typography>
                  <Typography variant="body1">{opportunity.active ? "Activa" : "Inactiva"}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Descripción:</Typography>
                  <Typography variant="body1">{opportunity.description || "Sin descripción"}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Pestañas para Visitas y Ofertas */}
        <Grid item xs={12}>
          <Paper sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                aria-label="pestañas de detalles de oportunidad"
                variant={isMobile ? "scrollable" : "fullWidth"}
                scrollButtons={isMobile ? "auto" : false}
              >
                <Tab
                  label="Visitas"
                  icon={<CalendarIcon />}
                  iconPosition="start"
                  sx={{ minHeight: { xs: "48px", sm: "64px" } }}
                />
                <Tab
                  label="Ofertas"
                  icon={<BusinessCenterIcon />}
                  iconPosition="start"
                  sx={{ minHeight: { xs: "48px", sm: "64px" } }}
                />
              </Tabs>
            </Box>

            <TabPanel value={activeTab} index={0}>
              {opportunity && opportunity.id ? (
                <OpportunityVisits opportunityId={opportunity.id} />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No se pueden cargar las visitas
                </Typography>
              )}
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              {opportunity && opportunity.id ? (
                <OpportunityOffers opportunityId={opportunity.id} />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No se pueden cargar las ofertas
                </Typography>
              )}
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
