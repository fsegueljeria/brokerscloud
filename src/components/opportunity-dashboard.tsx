"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  Paper,
  Container,
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
} from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { OpportunityTable } from "./opportunity-table"
import { OpportunityForm } from "./opportunity-form"
import { OpportunitySummary } from "./opportunity-summary"
import { formatCurrency } from "@/libs/utils"

// Datos de ejemplo para las oportunidades
const mockOpportunities = [
  {
    id: 1,
    name: "Apartamento Centro",
    customer: "Carlos Rodríguez",
    amount: 240000000,
    curCode: "CLP",
    budget: 250000000,
    budgetCurrency: "CLP",
    probability: 80,
    stage: "NEGOTIATION",
    source: "Referido",
    expectedCloseDate: "2023-06-15",
    description: "Cliente interesado en apartamento de 2 habitaciones en el centro",
    active: true,
    createdAt: "2023-04-01T10:00:00Z",
    updatedAt: "2023-04-10T15:30:00Z",
    contact: {
      name: "Carlos Rodríguez",
      email: "carlos@example.com",
      phone: "+56 9 1234 5678",
    },
    assignAgent: {
      id: 1,
      name: "Ana García",
    },
    properties: [
      {
        id: 1,
        name: "Apartamento Centro",
        type: "Apartamento",
      },
    ],
  },
  {
    id: 2,
    name: "Casa Playa",
    customer: "Laura Sánchez",
    amount: 350000000,
    curCode: "CLP",
    budget: 380000000,
    budgetCurrency: "CLP",
    probability: 60,
    stage: "INITIAL_CONTACT",
    source: "Portal Inmobiliario",
    expectedCloseDate: "2023-07-20",
    description: "Interesada en casa cerca de la playa para vacaciones",
    active: true,
    createdAt: "2023-04-05T09:15:00Z",
    updatedAt: "2023-04-05T09:15:00Z",
    contact: {
      name: "Laura Sánchez",
      email: "laura@example.com",
      phone: "+56 9 8765 4321",
    },
    assignAgent: {
      id: 2,
      name: "Pedro Martínez",
    },
    properties: [
      {
        id: 2,
        name: "Villa Playa",
        type: "Casa",
      },
    ],
  },
  {
    id: 3,
    name: "Local Comercial",
    customer: "Miguel Torres",
    amount: 180000000,
    curCode: "CLP",
    budget: 200000000,
    budgetCurrency: "CLP",
    probability: 40,
    stage: "NEEDS_ANALYSIS",
    source: "Página Web",
    expectedCloseDate: "2023-08-10",
    description: "Busca local comercial para abrir tienda de ropa",
    active: true,
    createdAt: "2023-04-08T14:30:00Z",
    updatedAt: "2023-04-12T11:45:00Z",
    contact: {
      name: "Miguel Torres",
      email: "miguel@example.com",
      phone: "+56 9 5555 6666",
    },
    assignAgent: {
      id: 3,
      name: "Laura Fernández",
    },
    properties: [
      {
        id: 3,
        name: "Local Centro",
        type: "Local Comercial",
      },
    ],
  },
]

// Mapeo de etapas a colores y etiquetas
const stageInfo = {
  INITIAL_CONTACT: { color: "default", label: "Contacto Inicial", bgColor: "#e0e0e0" },
  VIEWING_SCHEDULED: { color: "info", label: "Visita Programada", bgColor: "#bbdefb" },
  NEEDS_ANALYSIS: { color: "primary", label: "Análisis de Necesidades", bgColor: "#90caf9" },
  NEGOTIATION: { color: "warning", label: "Negociación", bgColor: "#ffe082" },
  OFFER_MADE: { color: "secondary", label: "Oferta Realizada", bgColor: "#ce93d8" },
  CLOSED_WON: { color: "success", label: "Cerrada Ganada", bgColor: "#a5d6a7" },
  CLOSED_LOST: { color: "error", label: "Cerrada Perdida", bgColor: "#ef9a9a" },
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
      id={`opportunity-tabpanel-${index}`}
      aria-labelledby={`opportunity-tab-${index}`}
      style={{ width: "100%" }}
      {...other}
    >
      {value === index && <Box sx={{ width: "100%" }}>{children}</Box>}
    </div>
  )
}

// Componente para mostrar una tarjeta de oportunidad reciente
const OpportunityCard = ({ opportunity }) => {
  const theme = useTheme()
  const stage = stageInfo[opportunity.stage] || { color: "default", label: opportunity.stage, bgColor: "#e0e0e0" }

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
          <Typography variant="subtitle1" component="div" fontWeight="medium" noWrap>
            {opportunity.name}
          </Typography>
          <Chip
            label={stage.label}
            size="small"
            sx={{
              bgcolor: stage.bgColor,
              color: theme.palette.getContrastText(stage.bgColor),
            }}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {opportunity.customer}
        </Typography>

        <Typography variant="h6" component="div" sx={{ mt: 2, mb: 1 }}>
          {formatCurrency(opportunity.amount, opportunity.curCode)}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {new Date(opportunity.expectedCloseDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {opportunity.probability}% prob.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export function OpportunityDashboard() {
  const [activeTab, setActiveTab] = useState(0)
  const [editingOpportunity, setEditingOpportunity] = useState(null)
  const [viewingOpportunity, setViewingOpportunity] = useState(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleCreateNew = () => {
    setEditingOpportunity(null)
    setActiveTab(2)
  }

  const handleEditOpportunity = (opportunity) => {
    setEditingOpportunity(opportunity)
    setActiveTab(2)
  }

  const handleViewOpportunity = (opportunity) => {
    setViewingOpportunity(opportunity)
    setActiveTab(3)
  }

  const handleBackToList = () => {
    setActiveTab(1)
    setViewingOpportunity(null)
  }

  const handleFormComplete = () => {
    setActiveTab(0)
    setEditingOpportunity(null)
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  // Contar oportunidades por etapa
  const opportunityCounts = {
    total: mockOpportunities.length,
    byStage: {
      INITIAL_CONTACT: mockOpportunities.filter((o) => o.stage === "INITIAL_CONTACT").length,
      VIEWING_SCHEDULED: mockOpportunities.filter((o) => o.stage === "VIEWING_SCHEDULED").length,
      NEEDS_ANALYSIS: mockOpportunities.filter((o) => o.stage === "NEEDS_ANALYSIS").length,
      NEGOTIATION: mockOpportunities.filter((o) => o.stage === "NEGOTIATION").length,
      OFFER_MADE: mockOpportunities.filter((o) => o.stage === "OFFER_MADE").length,
      CLOSED_WON: mockOpportunities.filter((o) => o.stage === "CLOSED_WON").length,
      CLOSED_LOST: mockOpportunities.filter((o) => o.stage === "CLOSED_LOST").length,
    },
    bySource: {
      Referido: mockOpportunities.filter((o) => o.source === "Referido").length,
      "Portal Inmobiliario": mockOpportunities.filter((o) => o.source === "Portal Inmobiliario").length,
      "Página Web": mockOpportunities.filter((o) => o.source === "Página Web").length,
    },
  }

  // Ordenar oportunidades por fecha de creación (más recientes primero)
  const recentOpportunities = [...mockOpportunities]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)

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
            Gestión de Oportunidades
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={handleCreateNew}
            size={isMobile ? "medium" : "large"}
          >
            Nueva Oportunidad
          </Button>
        </Box>

        <Paper sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="oportunidades tabs"
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons={isMobile ? "auto" : false}
            >
              <Tab label="Dashboard" />
              <Tab label="Lista De Oportunidades" />
              <Tab label={editingOpportunity ? "Editar Oportunidad" : "Nueva Oportunidad"} />
              <Tab label="Detalles De Oportunidad" />
            </Tabs>
          </Box>

          {/* Dashboard Tab */}
          <TabPanel value={activeTab} index={0}>
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {/* Panel izquierdo - Resumen de oportunidades */}
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, height: "100%" }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      Resumen de Oportunidades
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Typography variant="body1">Total</Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {opportunityCounts.total}
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 2 }} />

                      {/* Por etapa */}
                      {Object.entries(stageInfo).map(([stage, info]) => (
                        <Box key={stage} sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                          <Typography variant="body2">{info.label}</Typography>
                          <Chip
                            label={opportunityCounts.byStage[stage] || 0}
                            size="small"
                            sx={{
                              bgcolor: info.bgColor,
                              color: theme.palette.getContrastText(info.bgColor),
                            }}
                          />
                        </Box>
                      ))}

                      <Divider sx={{ my: 2 }} />

                      {/* Por fuente */}
                      <Typography variant="subtitle1" gutterBottom>
                        Por Fuente
                      </Typography>
                      {Object.entries(opportunityCounts.bySource).map(([source, count]) => (
                        <Box key={source} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                          <Typography variant="body2">{source}</Typography>
                          <Typography variant="body2">{count}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </Grid>

                {/* Panel derecho - Oportunidades recientes */}
                <Grid item xs={12} md={8}>
                  <Paper sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography variant="h6" component="h2">
                        Oportunidades Recientes
                      </Typography>
                      <Button color="primary" size="small" onClick={() => setActiveTab(1)}>
                        Ver todas
                      </Button>
                    </Box>

                    <Grid container spacing={2}>
                      {recentOpportunities.map((opportunity) => (
                        <Grid item xs={12} sm={6} md={4} key={opportunity.id}>
                          <OpportunityCard opportunity={opportunity} />
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          {/* Lista de Oportunidades Tab */}
          <TabPanel value={activeTab} index={1}>
            <Box sx={{ p: 3 }}>
              <OpportunityTable onEditOpportunity={handleEditOpportunity} onViewOpportunity={handleViewOpportunity} />
            </Box>
          </TabPanel>

          {/* Nueva/Editar Oportunidad Tab */}
          <TabPanel value={activeTab} index={2}>
            <Box sx={{ p: 3 }}>
              <OpportunityForm opportunity={editingOpportunity} onComplete={handleFormComplete} />
            </Box>
          </TabPanel>

          {/* Detalles de Oportunidad Tab */}
          <TabPanel value={activeTab} index={3}>
            <Box sx={{ p: 3 }}>
              <OpportunitySummary
                opportunity={viewingOpportunity}
                onBack={handleBackToList}
                onEdit={handleEditOpportunity}
              />
            </Box>
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  )
}
