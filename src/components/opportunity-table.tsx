"use client"

import { useState, useEffect } from "react"

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
  Collapse,
} from "@mui/material"
import {
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Person as PersonIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  Close as CloseIcon,
  Clear as ClearIcon,
  Add as AddIcon,
} from "@mui/icons-material"

import { formatCurrency } from "@/libs/utils"
import type { Opportunity, OpportunityStage } from "@/types/types"
import type { ChipProps } from "@mui/material"
import { opportunityService } from "@/libs/services/opportunity-service"

// Mapeo de etapas a colores y etiquetas
const stageInfo: Record<OpportunityStage, { color: ChipProps["color"]; label: string }> = {
  PROSPECCION: { color: "default", label: "Prospección" },
  CALIFICACION: { color: "info", label: "Calificación" },
  CONTACTO_INICIAL: { color: "primary", label: "Contacto Inicial" },
  ANALISIS_NECESIDADES: { color: "warning", label: "Análisis de Necesidades" },
  NEGOCIACION: { color: "secondary", label: "Negociación" },
  PROPUESTA: { color: "info", label: "Propuesta" },
  CIERRE: { color: "success", label: "Cierre" },
  POST_VENTA: { color: "success", label: "Post Venta" },
  GESTION_RELACIONES: { color: "primary", label: "Gestión de Relación" },
  PERDIDO: { color: "error", label: "Perdido" },
  VISITA_PROGRAMADA: { color: "info", label: "Visita Programada" },
}

// Mapeo de IDs de prospectos a nombres
const prospectNames: Record<number, string> = {
  1: "Juan Pérez",
  2: "María González",
  3: "Pedro Soto",
  4: "Carolina Muñoz",
  5: "Roberto Álvarez",
  6: "Gabriel Pérez",
  7: "Soledad Salas",
  8: "Jose Revol",
  9: "Yesica Manglus",
  10: "Roberto Armninio",
}

// Componente para mostrar una oportunidad en formato móvil
const OpportunityCard = ({ opportunity }: { opportunity: Opportunity }) => {
  const stage = stageInfo[opportunity.stage]
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {opportunity.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Chip
            label={stage.label}
            color={stage.color}
            size="small"
            sx={{ mr: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            {formatCurrency(opportunity.amount, opportunity.curCode)}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Probabilidad: {opportunity.probability}%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fecha de cierre esperada: {new Date(opportunity.expectedCloseDate).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  )
}

interface OpportunityTableProps {
  onEditOpportunity: (opportunity: Opportunity) => void
  onViewOpportunity: (opportunity: Opportunity) => void
}

export function OpportunityTable({ onEditOpportunity, onViewOpportunity }: OpportunityTableProps) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [stageFilter, setStageFilter] = useState("")
  const [agentFilter, setAgentFilter] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const loadOpportunities = async () => {
      try {
        const response = await opportunityService.getOpportunities()
        setOpportunities(response || [])
      } catch (error) {
        console.error("Error al cargar oportunidades:", error)
      }
    }

    loadOpportunities()
  }, [])

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const matchesSearch =
      opportunity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.description?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStage = stageFilter === "" || opportunity.stage === stageFilter

    const matchesAgent =
      agentFilter === "" || opportunity.assignAgentId.toString() === agentFilter

    return matchesSearch && matchesStage && matchesAgent
  })

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const uniqueAgents = Array.from(
    new Set(
      opportunities.map((opp) => opp.assignAgentId.toString())
    ),
  )

  const clearFilters = () => {
    setSearchTerm("")
    setStageFilter("")
    setAgentFilter("")
  }

  const handleEditClick = (opportunity: Opportunity) => {
    setIsEditing(true)
    onEditOpportunity(opportunity)
  }

  const handleCreateClick = () => {
    setIsEditing(false)
    onEditOpportunity({} as Opportunity)
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h6" component="h2">
          Listado de Oportunidades
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={showFilters ? <CloseIcon /> : <FilterIcon />}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Ocultar Filtros" : "Filtros"}
          </Button>
        </Box>
      </Box>

      <Collapse in={showFilters}>
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
                    <MenuItem value="CONTACTO_INICIAL">Contacto Inicial</MenuItem>
                    <MenuItem value="">Todas las etapas</MenuItem>
                    <MenuItem value="PROSPECCION">Prospección</MenuItem>
                    <MenuItem value="CALIFICACION">Calificación</MenuItem>
                    <MenuItem value="VISITA_PROGRAMADA">Visita Programada</MenuItem>
                    <MenuItem value="ANALISIS_NECESIDADES">Análisis de Necesidades</MenuItem>
                    <MenuItem value="NEGOCIACION">Negociación</MenuItem>
                    <MenuItem value="PROPUESTA">Propuesta</MenuItem>
                    <MenuItem value="CIERRE">Cierre</MenuItem>
                    <MenuItem value="PERDIDO">Perdido</MenuItem>
                    <MenuItem value="POST_VENTA">Post Venta</MenuItem>
                    <MenuItem value="GESTION_RELACIONES">Gestión de Relación</MenuItem>                    
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
                      <MenuItem key={agent} value={agent}>
                        {agent}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {(searchTerm || stageFilter || agentFilter) && (
                <Grid item xs={12} display="flex" justifyContent="flex-end">
                  <Button variant="text" startIcon={<ClearIcon />} onClick={clearFilters} size="small">
                    Limpiar filtros
                  </Button>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Collapse>

      {isMobile ? (
        <Box>
          {filteredOpportunities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
            />
          ))}
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="tabla de oportunidades">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Prospecto</TableCell>
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
                    <TableCell>{prospectNames[opportunity.prospectId]}</TableCell>
                    <TableCell>{formatCurrency(opportunity.amount, opportunity.curCode)}</TableCell>
                    <TableCell>
                      <Chip
                        label={stageInfo[opportunity.stage].label}
                        color={stageInfo[opportunity.stage].color}
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
                          <IconButton size="small" color="primary" onClick={() => handleEditClick(opportunity)}>
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
