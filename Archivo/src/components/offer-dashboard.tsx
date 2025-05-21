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
  Card,
  CardContent,
  Grid,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme,
  useMediaQuery,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  AttachMoney as MoneyIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  SwapHoriz as SwapIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
} from "@mui/icons-material"
import { OfferForm } from "./offer-form"
import { OfferWizard } from "./offer-wizard"
import type { Offer } from "@/types/types"
import { formatCurrency } from "@/libs/utils"

// Datos de ejemplo para las ofertas
const mockOffers: Offer[] = [
  {
    id: 1,
    amount: 240000000,
    currency: "CLP",
    commission: 3,
    amountCommission: 7200000,
    currencyCommission: "CLP",
    expirationDate: "2023-05-15",
    observation: "Primera oferta por el apartamento",
    stage: "SUBMITTED",
    swap: false,
    active: true,
    organizationId: 1,
    opportunityId: 1,
    propertyId: 1,
    prospectId: 1,
    assignAgentId: 1,
    assignSupervisorId: 4,
    createdAt: "2023-04-10T10:00:00Z",
    updatedAt: "2023-04-10T10:00:00Z",
  },
  {
    id: 2,
    amount: 8500,
    currency: "UF",
    commission: 3,
    amountCommission: 255,
    currencyCommission: "UF",
    expirationDate: "2023-05-20",
    observation: "Contraoferta del vendedor",
    stage: "COUNTER_OFFER",
    swap: false,
    active: true,
    organizationId: 1,
    opportunityId: 1,
    propertyId: 1,
    prospectId: 1,
    assignAgentId: 1,
    assignSupervisorId: 4,
    createdAt: "2023-04-15T14:00:00Z",
    updatedAt: "2023-04-15T14:00:00Z",
  },
  {
    id: 3,
    amount: 235000,
    currency: "USD",
    commission: 3,
    amountCommission: 7050,
    currencyCommission: "USD",
    expirationDate: "2023-05-25",
    observation: "Oferta final",
    stage: "ACCEPTED",
    swap: false,
    active: true,
    organizationId: 1,
    opportunityId: 1,
    propertyId: 1,
    prospectId: 1,
    assignAgentId: 1,
    assignSupervisorId: 4,
    createdAt: "2023-04-18T09:00:00Z",
    updatedAt: "2023-04-18T09:00:00Z",
  },
  {
    id: 4,
    amount: 420000000,
    currency: "CLP",
    commission: 3,
    amountCommission: 12600000,
    currencyCommission: "CLP",
    expirationDate: "2023-05-10",
    observation: "Oferta inicial por la villa",
    stage: "REJECTED",
    swap: true,
    active: false,
    organizationId: 1,
    opportunityId: 2,
    propertyId: 2,
    prospectId: 2,
    assignAgentId: 2,
    assignSupervisorId: 5,
    createdAt: "2023-04-05T11:00:00Z",
    updatedAt: "2023-04-12T14:30:00Z",
  },
  {
    id: 5,
    amount: 6300,
    currency: "UF",
    commission: 3,
    amountCommission: 189,
    currencyCommission: "UF",
    expirationDate: "2023-04-30",
    observation: "Oferta por el local comercial",
    stage: "EXPIRED",
    swap: false,
    active: false,
    organizationId: 1,
    opportunityId: 3,
    propertyId: 3,
    prospectId: 3,
    assignAgentId: 1,
    assignSupervisorId: null,
    createdAt: "2023-04-01T10:00:00Z",
    updatedAt: "2023-05-01T00:00:00Z",
  },
]

// Datos de ejemplo para propiedades, agentes y contactos
const mockProperties = {
  1: { name: "Apartamento Centro", address: "Calle Mayor 10" },
  2: { name: "Villa Playa", address: "Paseo Marítimo 25" },
  3: { name: "Local Centro", address: "Gran Vía 45" },
  4: { name: "Piso Universidad", address: "Calle Universidad 8" },
  5: { name: "Chalet Sierra", address: "Camino Montaña 12" },
}

const mockAgents = {
  1: { name: "Ana García", avatar: "AG" },
  2: { name: "Pedro Martínez", avatar: "PM" },
  3: { name: "Laura Fernández", avatar: "LF" },
  4: { name: "Carlos López", avatar: "CL" },
  5: { name: "María Rodríguez", avatar: "MR" },
}

const mockLeads = {
  1: { name: "Carlos Rodríguez", email: "carlos@example.com" },
  2: { name: "Laura Sánchez", email: "laura@example.com" },
  3: { name: "Miguel Torres", email: "miguel@example.com" },
  4: { name: "Isabel Díaz", email: "isabel@example.com" },
  5: { name: "Roberto Fernández", email: "roberto@example.com" },
}

const mockOpportunities = {
  1: { name: "Apartamento Centro" },
  2: { name: "Casa Playa" },
  3: { name: "Local Comercial" },
  4: { name: "Piso Estudiantes" },
  5: { name: "Chalet Montaña" },
}

// Colores para las etapas de oferta
const offerStageColors = {
  DRAFT: { bg: "#e3f2fd", color: "#1565c0", label: "Borrador" },
  SUBMITTED: { bg: "#f3e5f5", color: "#7b1fa2", label: "Enviada" },
  COUNTER_OFFER: { bg: "#e0f7fa", color: "#0097a7", label: "Contraoferta" },
  CONFIRM_FOR_EXCHANGE: { bg: "#fff3e0", color: "#e65100", label: "Confirmar Por Canje" },
  PENDING_CLIENT_APPROVAL: { bg: "#e8f5e9", color: "#2e7d32", label: "Pendiente Visar Cliente" },
  PENDING_CAPTURER_APPROVAL: { bg: "#f1f8e9", color: "#558b2f", label: "Pendiente Visar Captador" },
  PENDING_PLACER_APPROVAL: { bg: "#f9fbe7", color: "#827717", label: "Pendiente Visar Colocador" },
  PENDING_OWNER_APPROVAL: { bg: "#fffde7", color: "#f57f17", label: "Pendiente Visar Propietario" },
  ACCEPTED: { bg: "#e8f5e9", color: "#2e7d32", label: "Aceptada" },
  REJECTED: { bg: "#ffebee", color: "#c62828", label: "Rechazada" },
  EXPIRED: { bg: "#f5f5f5", color: "#757575", label: "Expirada" },
  FINALIZED: { bg: "#e0f2f1", color: "#00796b", label: "Finalizada" },
  CANCELLED: { bg: "#fafafa", color: "#424242", label: "Cancelada" },
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
      style={{ width: "100%" }}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3, width: "100%" }}>{children}</Box>}
    </div>
  )
}

// Componente para mostrar una oferta en formato móvil
const OfferCard = ({ offer, onEdit }) => {
  const property = mockProperties[offer.propertyId]
  const agent = mockAgents[offer.assignAgentId]
  const lead = mockLeads[offer.prospectId]
  const opportunity = mockOpportunities[offer.opportunityId]
  const status = offerStageColors[offer.stage]

  return (
    <Card sx={{ mb: 2, borderLeft: `4px solid ${status.color}` }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <MoneyIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="subtitle1" fontWeight="bold">
              {formatCurrency(offer.amount, offer.currency)}
            </Typography>
            {offer.swap && (
              <Tooltip title="Incluye canje">
                <SwapIcon fontSize="small" sx={{ ml: 1, color: "info.main" }} />
              </Tooltip>
            )}
          </Box>
          <Chip label={status.label} size="small" sx={{ bgcolor: status.bg, color: status.color }} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <HomeIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="body2">
            {property.name} ({opportunity.name})
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <PersonIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="body2">{lead.name}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <CalendarIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="body2">Exp: {new Date(offer.expirationDate).toLocaleDateString()}</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <Button variant="outlined" size="small" startIcon={<EditIcon />} onClick={() => onEdit(offer)}>
            Editar
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export function OfferDashboard() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const [activeTab, setActiveTab] = useState(0)
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [stageFilter, setStageFilter] = useState("")
  const [agentFilter, setAgentFilter] = useState("")
  const [page, setPage] = useState(1)
  const [rowsPerPage] = useState(isMobile ? 5 : 10)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [createMode, setCreateMode] = useState<"form" | "wizard">("form")

  const handleCreateNew = () => {
    setEditingOffer(null)
    setActiveTab(1)
  }

  const handleEditOffer = (offer: Offer) => {
    setEditingOffer(offer)
    setActiveTab(1)
  }

  const handleFormComplete = () => {
    setActiveTab(0)
    setEditingOffer(null)
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, offer: Offer) => {
    setAnchorEl(event.currentTarget)
    setSelectedOffer(offer)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    if (selectedOffer) {
      handleEditOffer(selectedOffer)
    }
    handleMenuClose()
  }

  const handleDelete = () => {
    // Implementar lógica de eliminación
    console.log(`Eliminar oferta ${selectedOffer?.id}`)
    handleMenuClose()
  }

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage)
  }

  const handleCreateModeChange = (event: React.MouseEvent<HTMLElement>, newMode: "form" | "wizard") => {
    if (newMode !== null) {
      setCreateMode(newMode)
    }
  }

  // Filtrar ofertas
  const filteredOffers = mockOffers.filter((offer) => {
    const property = mockProperties[offer.propertyId]
    const agent = mockAgents[offer.assignAgentId]
    const lead = mockLeads[offer.prospectId]
    const opportunity = mockOpportunities[offer.opportunityId]

    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (offer.observation && offer.observation.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStage = stageFilter === "" || offer.stage === stageFilter
    const matchesAgent = agentFilter === "" || offer.assignAgentId.toString() === agentFilter

    return matchesSearch && matchesStage && matchesAgent
  })

  // Paginación
  const startIndex = (page - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const paginatedOffers = filteredOffers.slice(startIndex, endIndex)

  // Obtener agentes únicos para el filtro
  const uniqueAgents = Array.from(
    new Set(
      mockOffers.map((offer) =>
        JSON.stringify({
          id: offer.assignAgentId,
          name: mockAgents[offer.assignAgentId].name,
        }),
      ),
    ),
  ).map((str) => JSON.parse(str))

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
          <Typography variant="h4" component="h1" fontWeight="bold" sx={{ fontSize: { xs: "1.5rem", md: "2.125rem" } }}>
            Gestión de Ofertas
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateNew}
            size={isMobile ? "medium" : "large"}
          >
            Nueva Oferta
          </Button>
        </Box>

        <Paper sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="ofertas tabs"
              variant="fullWidth"
              sx={{
                "& .MuiTab-root": {
                  minHeight: { xs: "48px", sm: "64px" },
                  py: { xs: 1, sm: 2 },
                },
              }}
            >
              <Tab label="Lista de Ofertas" />
              <Tab label={editingOffer ? "Editar Oferta" : "Nueva Oferta"} />
            </Tabs>
          </Box>
          <TabPanel value={activeTab} index={0}>
            <Box sx={{ mb: 3 }}>
              <Card>
                <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Buscar ofertas"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="stage-filter-label">Etapa</InputLabel>
                        <Select
                          labelId="stage-filter-label"
                          id="stage-filter"
                          value={stageFilter}
                          label="Etapa"
                          onChange={(e) => setStageFilter(e.target.value)}
                          startAdornment={
                            <InputAdornment position="start">
                              <FilterIcon fontSize="small" />
                            </InputAdornment>
                          }
                        >
                          <MenuItem value="">Todas las etapas</MenuItem>
                          <MenuItem value="DRAFT">Borrador</MenuItem>
                          <MenuItem value="SUBMITTED">Enviada</MenuItem>
                          <MenuItem value="COUNTER_OFFER">Contraoferta</MenuItem>
                          <MenuItem value="CONFIRM_FOR_EXCHANGE">Confirmar Por Canje</MenuItem>
                          <MenuItem value="PENDING_CLIENT_APPROVAL">Pendiente Visar Cliente</MenuItem>
                          <MenuItem value="PENDING_CAPTURER_APPROVAL">Pendiente Visar Captador</MenuItem>
                          <MenuItem value="PENDING_PLACER_APPROVAL">Pendiente Visar Colocador</MenuItem>
                          <MenuItem value="PENDING_OWNER_APPROVAL">Pendiente Visar Propietario</MenuItem>
                          <MenuItem value="ACCEPTED">Aceptada</MenuItem>
                          <MenuItem value="REJECTED">Rechazada</MenuItem>
                          <MenuItem value="EXPIRED">Expirada</MenuItem>
                          <MenuItem value="FINALIZED">Finalizada</MenuItem>
                          <MenuItem value="CANCELLED">Cancelada</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="agent-filter-label">Agente</InputLabel>
                        <Select
                          labelId="agent-filter-label"
                          id="agent-filter"
                          value={agentFilter}
                          label="Agente"
                          onChange={(e) => setAgentFilter(e.target.value)}
                          startAdornment={
                            <InputAdornment position="start">
                              <FilterIcon fontSize="small" />
                            </InputAdornment>
                          }
                        >
                          <MenuItem value="">Todos los agentes</MenuItem>
                          {uniqueAgents.map((agent) => (
                            <MenuItem key={agent.id} value={agent.id.toString()}>
                              {agent.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>

            {isMobile ? (
              // Vista móvil con tarjetas
              <Box>
                {paginatedOffers.length > 0 ? (
                  paginatedOffers.map((offer) => <OfferCard key={offer.id} offer={offer} onEdit={handleEditOffer} />)
                ) : (
                  <Box sx={{ py: 4, textAlign: "center" }}>
                    <Typography variant="body1" color="text.secondary">
                      No se encontraron ofertas con los filtros seleccionados.
                    </Typography>
                    <Button variant="outlined" startIcon={<AddIcon />} sx={{ mt: 2 }} onClick={handleCreateNew}>
                      Nueva Oferta
                    </Button>
                  </Box>
                )}

                <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                  <Pagination
                    count={Math.ceil(filteredOffers.length / rowsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                    size="small"
                  />
                </Box>
              </Box>
            ) : (
              // Vista desktop con tabla
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="tabla de ofertas">
                  <TableHead>
                    <TableRow>
                      <TableCell>Monto</TableCell>
                      <TableCell>Etapa</TableCell>
                      <TableCell>Propiedad</TableCell>
                      <TableCell>Oportunidad</TableCell>
                      <TableCell>Cliente</TableCell>
                      <TableCell>Agente</TableCell>
                      <TableCell>Fecha Expiración</TableCell>
                      <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedOffers.length > 0 ? (
                      paginatedOffers.map((offer) => {
                        const property = mockProperties[offer.propertyId]
                        const agent = mockAgents[offer.assignAgentId]
                        const lead = mockLeads[offer.prospectId]
                        const opportunity = mockOpportunities[offer.opportunityId]
                        const status = offerStageColors[offer.stage]

                        return (
                          <TableRow key={offer.id} hover>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <MoneyIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                                <Typography variant="body2" fontWeight="medium">
                                  {formatCurrency(offer.amount, offer.currency)}
                                </Typography>
                                {offer.swap && (
                                  <Tooltip title="Incluye canje">
                                    <SwapIcon fontSize="small" sx={{ ml: 1, color: "info.main" }} />
                                  </Tooltip>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={status.label}
                                size="small"
                                sx={{ bgcolor: status.bg, color: status.color }}
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <HomeIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                                <Typography variant="body2">{property.name}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">{opportunity.name}</Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <PersonIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                                <Typography variant="body2">{lead.name}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{agent.name}</TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <CalendarIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                                <Typography variant="body2">
                                  {new Date(offer.expirationDate).toLocaleDateString()}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              <IconButton
                                aria-label="más opciones"
                                onClick={(e) => handleMenuOpen(e, offer)}
                                size="small"
                              >
                                <MoreVertIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                          No se encontraron ofertas con los filtros seleccionados.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                  <Pagination
                    count={Math.ceil(filteredOffers.length / rowsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                  />
                </Box>
              </TableContainer>
            )}

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleEdit}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Editar</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText sx={{ color: "error.main" }}>Eliminar</ListItemText>
              </MenuItem>
            </Menu>
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            {/* Selector de modo de creación */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <ToggleButtonGroup
                value={createMode}
                exclusive
                onChange={handleCreateModeChange}
                aria-label="modo de creación de oferta"
                color="primary"
              >
                <ToggleButton value="form" aria-label="formulario completo">
                  <ViewListIcon sx={{ mr: 1 }} />
                  Formulario Completo
                </ToggleButton>
                <ToggleButton value="wizard" aria-label="asistente paso a paso">
                  <ViewModuleIcon sx={{ mr: 1 }} />
                  Asistente Paso a Paso
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {createMode === "form" ? (
              <OfferForm offer={editingOffer} onComplete={handleFormComplete} onDelete={handleFormComplete} />
            ) : (
              <OfferWizard offer={editingOffer} onComplete={handleFormComplete} onCancel={handleFormComplete} />
            )}
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  )
}
