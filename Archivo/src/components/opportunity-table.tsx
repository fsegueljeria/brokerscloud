"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Person as PersonIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material"
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
  {
    id: 4,
    name: "Piso Estudiantes",
    customer: "Isabel Díaz",
    amount: 120000000,
    curCode: "CLP",
    budget: 130000000,
    budgetCurrency: "CLP",
    probability: 90,
    stage: "OFFER_MADE",
    source: "Referido",
    expectedCloseDate: "2023-05-30",
    description: "Busca piso para alquilar a estudiantes cerca de la universidad",
    active: true,
    createdAt: "2023-04-10T16:20:00Z",
    updatedAt: "2023-04-15T09:10:00Z",
    contact: {
      name: "Isabel Díaz",
      email: "isabel@example.com",
      phone: "+56 9 7777 8888",
    },
    assignAgent: {
      id: 1,
      name: "Ana García",
    },
    properties: [
      {
        id: 4,
        name: "Piso Universidad",
        type: "Apartamento",
      },
    ],
  },
  {
    id: 5,
    name: "Chalet Montaña",
    customer: "Roberto Fernández",
    amount: 450000000,
    curCode: "CLP",
    budget: 500000000,
    budgetCurrency: "CLP",
    probability: 30,
    stage: "VIEWING_SCHEDULED",
    source: "Portal Inmobiliario",
    expectedCloseDate: "2023-09-15",
    description: "Interesado en chalet en la montaña para fines de semana",
    active: true,
    createdAt: "2023-04-12T11:00:00Z",
    updatedAt: "2023-04-18T14:30:00Z",
    contact: {
      name: "Roberto Fernández",
      email: "roberto@example.com",
      phone: "+56 9 3333 4444",
    },
    assignAgent: {
      id: 2,
      name: "Pedro Martínez",
    },
    properties: [
      {
        id: 5,
        name: "Chalet Sierra",
        type: "Casa",
      },
    ],
  },
]

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

// Componente para mostrar una oportunidad en formato móvil
const OpportunityCard = ({ opportunity, onEdit, onView }) => {
  const theme = useTheme()

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {opportunity.name}
          </Typography>
          <Chip
            label={stageInfo[opportunity.stage]?.label || opportunity.stage}
            color={stageInfo[opportunity.stage]?.color || "default"}
            size="small"
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <PersonIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="body2">{opportunity.customer}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <MoneyIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="body2">{formatCurrency(opportunity.amount, opportunity.curCode)}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <CalendarIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="body2">{new Date(opportunity.expectedCloseDate).toLocaleDateString()}</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, gap: 1 }}>
          <Button variant="outlined" size="small" startIcon={<VisibilityIcon />} onClick={() => onView(opportunity)}>
            Ver
          </Button>
          <Button variant="outlined" size="small" startIcon={<EditIcon />} onClick={() => onEdit(opportunity)}>
            Editar
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export function OpportunityTable({ onEditOpportunity, onViewOpportunity }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  const [stageFilter, setStageFilter] = useState("")
  const [agentFilter, setAgentFilter] = useState("")

  // Filtrar oportunidades
  const filteredOpportunities = mockOpportunities.filter((opportunity) => {
    const matchesSearch =
      opportunity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (opportunity.description && opportunity.description.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStage = stageFilter === "" || opportunity.stage === stageFilter
    const matchesAgent =
      agentFilter === "" || (opportunity.assignAgent && opportunity.assignAgent.id.toString() === agentFilter)

    return matchesSearch && matchesStage && matchesAgent
  })

  // Paginación
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  // Obtener agentes únicos para el filtro
  const uniqueAgents = Array.from(
    new Set(
      mockOpportunities
        .filter((opp) => opp.assignAgent)
        .map((opp) => JSON.stringify({ id: opp.assignAgent.id, name: opp.assignAgent.name })),
    ),
  ).map((str) => JSON.parse(str))

  return (
    <Box>
      {/* Filtros */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Buscar oportunidades"
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
                  <MenuItem value="INITIAL_CONTACT">Contacto Inicial</MenuItem>
                  <MenuItem value="VIEWING_SCHEDULED">Visita Programada</MenuItem>
                  <MenuItem value="NEEDS_ANALYSIS">Análisis de Necesidades</MenuItem>
                  <MenuItem value="NEGOTIATION">Negociación</MenuItem>
                  <MenuItem value="OFFER_MADE">Oferta Realizada</MenuItem>
                  <MenuItem value="CLOSED_WON">Cerrada Ganada</MenuItem>
                  <MenuItem value="CLOSED_LOST">Cerrada Perdida</MenuItem>
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

      {/* Vista móvil */}
      {isMobile ? (
        <Box>
          {filteredOpportunities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              onEdit={onEditOpportunity}
              onView={onViewOpportunity}
            />
          ))}
        </Box>
      ) : (
        /* Vista desktop */
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="tabla de oportunidades">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell>Etapa</TableCell>
                <TableCell>Probabilidad</TableCell>
                <TableCell>Fecha Estimada</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOpportunities.length > 0 ? (
                filteredOpportunities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((opportunity) => (
                  <TableRow key={opportunity.id} hover>
                    <TableCell>{opportunity.name}</TableCell>
                    <TableCell>{opportunity.customer}</TableCell>
                    <TableCell>{formatCurrency(opportunity.amount, opportunity.curCode)}</TableCell>
                    <TableCell>
                      <Chip
                        label={stageInfo[opportunity.stage]?.label || opportunity.stage}
                        color={stageInfo[opportunity.stage]?.color || "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{opportunity.probability}%</TableCell>
                    <TableCell>{new Date(opportunity.expectedCloseDate).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Tooltip title="Ver detalles">
                          <IconButton size="small" color="primary" onClick={() => onViewOpportunity(opportunity)}>
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                          <IconButton size="small" color="primary" onClick={() => onEditOpportunity(opportunity)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No se encontraron oportunidades con los filtros seleccionados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredOpportunities.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
        </TableContainer>
      )}

      {/* Paginación para móvil */}
      {isMobile && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredOpportunities.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      )}
    </Box>
  )
}
