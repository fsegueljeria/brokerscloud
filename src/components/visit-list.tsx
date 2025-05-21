"use client"

import { useState } from "react"

import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Pagination,
  Avatar,
  Menu,
  ListItemIcon,
  ListItemText,
  Button,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
} from "@mui/material"
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Add as AddIcon,
} from "@mui/icons-material"

import type { Visit } from "@/types/types"

// Datos de ejemplo para las visitas
const mockVisits: Visit[] = [
  {
    id: 1,
    title: "Visita Apartamento Centro",
    opportunityId: 1,
    propertyId: 1,
    date: "2023-04-15",
    startTime: "10:00",
    endTime: "11:00",
    status: "SCHEDULED",
    notes: "Cliente muy interesado en la ubicación",
    assignedAgentId: 1,
    attendees: {
      contacts: [1],
      prospects: [],
    },
    createdAt: "2023-04-10T10:00:00Z",
    updatedAt: "2023-04-10T10:00:00Z",
  },
  {
    id: 2,
    title: "Segunda visita Villa Playa",
    opportunityId: 2,
    propertyId: 2,
    date: "2023-04-15",
    startTime: "12:30",
    endTime: "13:30",
    status: "SCHEDULED",
    notes: "Revisar detalles del jardín",
    assignedAgentId: 2,
    attendees: {
      contacts: [2],
      prospects: [3],
    },
    createdAt: "2023-04-11T09:00:00Z",
    updatedAt: "2023-04-11T09:00:00Z",
  },
  {
    id: 3,
    title: "Visita Local Comercial",
    opportunityId: 3,
    propertyId: 3,
    date: "2023-04-16",
    startTime: "09:00",
    endTime: "10:30",
    status: "SCHEDULED",
    notes: "Traer planos de distribución",
    assignedAgentId: 1,
    attendees: {
      contacts: [3],
      prospects: [],
    },
    createdAt: "2023-04-12T14:00:00Z",
    updatedAt: "2023-04-12T14:00:00Z",
  },
  {
    id: 4,
    title: "Visita Piso Estudiantes",
    opportunityId: 4,
    propertyId: 4,
    date: "2023-04-14",
    startTime: "16:00",
    endTime: "17:00",
    status: "COMPLETED",
    notes: "Cliente satisfecho con la visita",
    assignedAgentId: 2,
    attendees: {
      contacts: [4],
      prospects: [],
    },
    createdAt: "2023-04-10T11:00:00Z",
    updatedAt: "2023-04-14T17:30:00Z",
  },
  {
    id: 5,
    title: "Visita Chalet Montaña",
    opportunityId: 5,
    propertyId: 5,
    date: "2023-04-17",
    startTime: "11:00",
    endTime: "12:30",
    status: "CANCELLED",
    notes: "Cancelada por el cliente",
    assignedAgentId: 1,
    attendees: {
      contacts: [5],
      prospects: [],
    },
    createdAt: "2023-04-13T10:00:00Z",
    updatedAt: "2023-04-16T09:00:00Z",
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
}

const mockOpportunities = {
  1: { name: "Apartamento Centro" },
  2: { name: "Casa Playa" },
  3: { name: "Local Comercial" },
  4: { name: "Piso Estudiantes" },
  5: { name: "Chalet Montaña" },
}

// Colores para los estados de visita
const visitStatusColors = {
  SCHEDULED: { bg: "#e3f2fd", color: "#1565c0", label: "Programada" },
  COMPLETED: { bg: "#e8f5e9", color: "#2e7d32", label: "Completada" },
  CANCELLED: { bg: "#ffebee", color: "#c62828", label: "Cancelada" },
  RESCHEDULED: { bg: "#fff8e1", color: "#f57f17", label: "Reprogramada" },
  PENDING_CONFIRMATION: { bg: "#f3e5f5", color: "#7b1fa2", label: "Pendiente" },
}

// Componente para mostrar una visita en formato móvil
const VisitCard = ({ visit, onEdit }) => {
  const property = mockProperties[visit.propertyId]
  const agent = mockAgents[visit.assignedAgentId]
  const opportunity = mockOpportunities[visit.opportunityId]
  const status = visitStatusColors[visit.status]

  // Contar el número total de asistentes
  const totalAttendees = (visit.attendees.contacts?.length || 0) + (visit.attendees.prospects?.length || 0)

  return (
    <Card sx={{ mb: 2, borderLeft: `4px solid ${status.color}` }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {visit.title}
          </Typography>
          <Chip label={status.label} size="small" sx={{ bgcolor: status.bg, color: status.color }} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <EventIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="body2">
            {new Date(visit.date).toLocaleDateString()} • {visit.startTime} - {visit.endTime}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <HomeIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="body2">
            {property.name} ({opportunity.name})
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <PersonIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="body2">
            {agent.name} • {totalAttendees} asistente(s)
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <Button variant="outlined" size="small" startIcon={<EditIcon />} onClick={() => onEdit(visit)}>
            Editar
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export function VisitList({ onCreateVisit, onEditVisit }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [agentFilter, setAgentFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [page, setPage] = useState(1)
  const [rowsPerPage] = useState(5)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedVisit, setSelectedVisit] = useState(null)

  const handleMenuOpen = (event, visit) => {
    setAnchorEl(event.currentTarget)
    setSelectedVisit(visit)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    onEditVisit(selectedVisit)
    handleMenuClose()
  }

  const handleDelete = () => {
    // Implementar lógica de eliminación
    handleMenuClose()
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  // Filtrar visitas
  const filteredVisits = mockVisits.filter((visit) => {
    const matchesSearch =
      visit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (visit.notes && visit.notes.toLowerCase().includes(searchTerm.toLowerCase())) ||
      mockProperties[visit.propertyId].name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "" || visit.status === statusFilter
    const matchesAgent = agentFilter === "" || visit.assignedAgentId.toString() === agentFilter
    const matchesDate = dateFilter === "" || visit.date === dateFilter

    return matchesSearch && matchesStatus && matchesAgent && matchesDate
  })

  // Paginación
  const startIndex = (page - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const paginatedVisits = filteredVisits.slice(startIndex, endIndex)

  return (
    <Paper sx={{ p: { xs: 1, sm: 2, md: 3 }, width: "100%" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Lista de Visitas
        </Typography>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, mb: 2 }}>
          <TextField
            label="Buscar visitas"
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

          <Box sx={{ display: "flex", gap: 2, width: { xs: "100%", md: "auto" } }}>
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="status-filter-label">Estado</InputLabel>
              <Select
                labelId="status-filter-label"
                id="status-filter"
                value={statusFilter}
                label="Estado"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="SCHEDULED">Programada</MenuItem>
                <MenuItem value="COMPLETED">Completada</MenuItem>
                <MenuItem value="CANCELLED">Cancelada</MenuItem>
                <MenuItem value="RESCHEDULED">Reprogramada</MenuItem>
                <MenuItem value="PENDING_CONFIRMATION">Pendiente</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="agent-filter-label">Agente</InputLabel>
              <Select
                labelId="agent-filter-label"
                id="agent-filter"
                value={agentFilter}
                label="Agente"
                onChange={(e) => setAgentFilter(e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                {Object.entries(mockAgents).map(([id, agent]) => (
                  <MenuItem key={id} value={id}>
                    {agent.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Fecha"
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              sx={{ minWidth: 150 }}
            />
          </Box>
        </Box>
      </Box>

      {isMobile ? (

        // Vista móvil con tarjetas
        <Box>
          {paginatedVisits.length > 0 ? (
            paginatedVisits.map((visit) => <VisitCard key={visit.id} visit={visit} onEdit={onEditVisit} />)
          ) : (
            <Typography align="center" sx={{ py: 3 }}>
              No se encontraron visitas con los filtros seleccionados.
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={Math.ceil(filteredVisits.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        </Box>
      ) : (

        // Vista desktop con tabla
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="tabla de visitas">
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Fecha y Hora</TableCell>
                <TableCell>Propiedad</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Agente</TableCell>
                <TableCell>Asistentes</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedVisits.length > 0 ? (
                paginatedVisits.map((visit) => {
                  const property = mockProperties[visit.propertyId]
                  const agent = mockAgents[visit.assignedAgentId]
                  const status = visitStatusColors[visit.status]

                  const totalAttendees =
                    (visit.attendees.contacts?.length || 0) + (visit.attendees.prospects?.length || 0)

                  return (
                    <TableRow key={visit.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {visit.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {mockOpportunities[visit.opportunityId].name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <EventIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                          <Box>
                            <Typography variant="body2">{new Date(visit.date).toLocaleDateString()}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {visit.startTime} - {visit.endTime}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <HomeIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                          <Typography variant="body2">{property.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={status.label} size="small" sx={{ bgcolor: status.bg, color: status.color }} />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              width: 24,
                              height: 24,
                              fontSize: "0.75rem",
                              bgcolor: status.color,
                              mr: 1,
                            }}
                          >
                            {agent.avatar}
                          </Avatar>
                          <Typography variant="body2">{agent.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip icon={<PersonIcon />} label={totalAttendees} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton aria-label="más opciones" onClick={(e) => handleMenuOpen(e, visit)} size="small">
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    No se encontraron visitas con los filtros seleccionados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <Pagination
              count={Math.ceil(filteredVisits.length / rowsPerPage)}
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

      <Box sx={{ display: { xs: "flex", md: "none" }, justifyContent: "center", mt: 2 }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={onCreateVisit} fullWidth>
          Nueva Visita
        </Button>
      </Box>
    </Paper>
  )
}
