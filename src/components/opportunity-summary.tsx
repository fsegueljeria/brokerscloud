"use client"

import type React from "react"

import { useState } from "react"

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

import { formatCurrency } from "@/libs/utils"
import { OpportunityVisits } from "./opportunity-visits"
import { OpportunityOffers } from "./opportunity-offers"
import { Opportunity, Prospect } from "@/types/types"

// Mapeo de etapas a colores y etiquetas
const stageInfo = {
  CONTACTO_INICIAL: { color: "default", label: "Contacto Inicial" },
  PROSPECCION: { color: "default", label: "Prospección" },
  CALIFICACION: { color: "default", label: "Calificación" },
  VISITA_PROGRAMADA: { color: "info", label: "Visita Programada" },
  ANALISIS_NECESIDADES: { color: "primary", label: "Análisis de Necesidades" },
  NEGOCIACION: { color: "warning", label: "Negociación" },
  PROPUESTA: { color: "secondary", label: "Oferta Realizada" },
  CIERRE: { color: "success", label: "Cerrada Ganada" },
  PERDIDO: { color: "error", label: "Cerrada Perdida" },
  POST_VENTA: { color: "success", label: "Post Venta" },
  GESTION_RELACIONES: { color: "info", label: "Gestión de Relaciones" },
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

// Datos de ejemplo para prospectos
const mockProspects: Prospect[] = [
  {
    id: 1,
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan@example.com",
    phone: "+56 9 1234 5678",
    status: "ACTIVO",
    type: "COMPRADOR",
    createdAt: "2023-04-01T10:00:00Z",
    updatedAt: "2023-04-10T15:30:00Z",
  },
  {
    id: 2,
    firstName: "María",
    lastName: "González",
    email: "maria@example.com",
    phone: "+56 9 8765 4321",
    status: "POTENCIAL",
    type: "VENDEDOR",
    createdAt: "2023-05-01T11:00:00Z",
    updatedAt: "2023-05-10T16:30:00Z",
  },
  {
    id: 3,
    firstName: "Pedro",
    lastName: "Soto",
    email: "Pedro@example.com",
    phone: "+56 9 2345 6789",
    status: "CALIFICADO",
    type: "INVERSIONISTA",
    createdAt: "2023-06-01T12:00:00Z",
    updatedAt: "2023-06-10T17:30:00Z",
  },
  {
    id: 4,
    firstName: "Carolina",
    lastName: "Muñoz",
    email: "carolina@example.com",
    phone: "+56 9 3456 7890",
    status: "CONVERTIDO",
    type: "ARRENDATARIO",
    createdAt: "2023-07-01T13:00:00Z",
    updatedAt: "2023-07-10T18:30:00Z",
  },
  {
    id: 5,
    firstName: "Roberto",
    lastName: "Álvarez",
    email: "roberto@example.com",
    phone: "+56 9 4567 8901",
    status: "PERDIDO",
    type: "PROPIETARIO",
    createdAt: "2023-08-01T14:00:00Z",
    updatedAt: "2023-08-10T19:30:00Z",
  },
]

export function OpportunitySummary({ opportunity, onBack, onEdit }: { opportunity: Opportunity, onBack: () => void, onEdit: (opportunity: Opportunity) => void }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [activeTab, setActiveTab] = useState(0)

  // Obtener el prospecto asociado a la oportunidad
  const prospect = mockProspects.find((p) => p.id === opportunity.prospectId)

  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    if (!dateString) return "No definida"
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }

    
return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
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
                <PersonIcon sx={{ mr: 1 }} /> Información Cliente Potencial
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {prospect ? (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Nombre:</Typography>
                    <Typography variant="body1">{prospect.firstName} {prospect.lastName}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Email:</Typography>
                    <Typography variant="body1">{prospect.email}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Teléfono:</Typography>
                    <Typography variant="body1">{prospect.phone}</Typography>
                  </Grid>
                </Grid>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No hay información del cliente
                </Typography>
              )}
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
                    <Typography variant="body1">{opportunity.probability}</Typography>
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
                  {opportunity.properties.map((property: string) => (
                    <ListItem key={property} disablePadding sx={{ py: 1 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                          <HomeIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={`Propiedad ${property}`} />
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
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      Ofertas
                      <Chip label="1" size="small" color="primary" sx={{ ml: 1 }} />
                    </Box>
                  }
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
