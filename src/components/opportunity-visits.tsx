"use client"

import { useState } from "react"

import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  Grid,
  Paper,
  Avatar,
  Tooltip,
} from "@mui/material"
import {
  Event as EventIcon,
  AccessTime as TimeIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material"

import type { Visit } from "@/types/types"
import { VisitForm } from "./visit-form"

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
    title: "Segunda visita Apartamento Centro",
    opportunityId: 1,
    propertyId: 1,
    date: "2023-04-20",
    startTime: "16:30",
    endTime: "17:30",
    status: "SCHEDULED",
    notes: "Revisión de detalles y mediciones",
    assignedAgentId: 1,
    attendees: {
      contacts: [1],
      prospects: [],
    },
    createdAt: "2023-04-15T14:00:00Z",
    updatedAt: "2023-04-15T14:00:00Z",
  },
  {
    id: 3,
    title: "Visita Villa Playa",
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
    id: 4,
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
    id: 5,
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
]

// Colores para los estados de visita
const visitStatusColors = {
  SCHEDULED: { bg: "#e3f2fd", color: "#1565c0", label: "Programada" },
  COMPLETED: { bg: "#e8f5e9", color: "#2e7d32", label: "Completada" },
  CANCELLED: { bg: "#ffebee", color: "#c62828", label: "Cancelada" },
  RESCHEDULED: { bg: "#fff8e1", color: "#f57f17", label: "Reprogramada" },
  PENDING_CONFIRMATION: { bg: "#f3e5f5", color: "#7b1fa2", label: "Pendiente" },
}

interface OpportunityVisitsProps {
  opportunityId: number
  propertyIds?: number[]
}

export function OpportunityVisits({ opportunityId, propertyIds = [] }: OpportunityVisitsProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  // Filtrar visitas por oportunidad y propiedades
  const filteredVisits = mockVisits.filter((visit) => {
    const matchesOpportunity = visit.opportunityId === opportunityId
    const matchesProperty = propertyIds.length === 0 || propertyIds.includes(visit.propertyId)

    
return matchesOpportunity && matchesProperty
  })

  // Ordenar visitas por fecha (más recientes primero)
  const sortedVisits = [...filteredVisits].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const handleOpenVisitDetails = (visit: Visit) => {
    setSelectedVisit(visit)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  const handleCreateVisit = () => {
    setSelectedVisit(null)
    setIsFormOpen(true)
  }

  const handleEditVisit = (visit: Visit) => {
    setSelectedVisit(visit)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setSelectedVisit(null)
  }

  const handleDeleteVisit = (visitId: number) => {
    console.log(`Eliminar visita ${visitId}`)

    // Aquí iría la lógica para eliminar la visita
    setDialogOpen(false)
  }

  // Componente para mostrar los detalles de una visita
  const VisitDetails = ({ visit }: { visit: Visit }) => {
    const property = mockProperties[visit.propertyId]
    const agent = mockAgents[visit.assignedAgentId]
    const status = visitStatusColors[visit.status]

    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
            {visit.title}
          </Typography>
          <Chip label={status.label} sx={{ bgcolor: status.bg, color: status.color }} />
        </Box>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <EventIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="subtitle2">Fecha y Hora</Typography>
              </Box>
              <Typography variant="body2">
                {new Date(visit.date).toLocaleDateString()} • {visit.startTime} - {visit.endTime}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <HomeIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="subtitle2">Propiedad</Typography>
              </Box>
              <Typography variant="body2">{property.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {property.address}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PersonIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="subtitle2">Agente Asignado</Typography>
              </Box>
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
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PersonIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="subtitle2">Asistentes</Typography>
              </Box>
              <Typography variant="body2">
                {(visit.attendees.contacts?.length || 0) + (visit.attendees.prospects?.length || 0)} asistente(s)
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {visit.notes && (
          <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 2 }, mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Notas
            </Typography>
            <Typography variant="body2">{visit.notes}</Typography>
          </Paper>
        )}
      </Box>
    )
  }

  return (
    <>
      <Card sx={{ mt: 3 }}>
        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Typography variant="h6" component="h3" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
              Visitas Programadas
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              size={isMobile ? "small" : "medium"}
              onClick={handleCreateVisit}
            >
              Nueva Visita
            </Button>
          </Box>

          {sortedVisits.length > 0 ? (
            <List sx={{ width: "100%", p: 0 }}>
              {sortedVisits.map((visit, index) => {
                const property = mockProperties[visit.propertyId]
                const agent = mockAgents[visit.assignedAgentId]
                const status = visitStatusColors[visit.status]

                return (
                  <Box key={visit.id}>
                    {index > 0 && <Divider sx={{ my: 1 }} />}
                    <ListItem
                      disablePadding
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "flex-start", sm: "center" },
                        py: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                          width: { xs: "100%", sm: "auto" },
                          mb: { xs: 1, sm: 0 },
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                          <Chip
                            label={status.label}
                            size="small"
                            sx={{
                              bgcolor: status.bg,
                              color: status.color,
                              mr: 1,
                              height: 20,
                              fontSize: "0.7rem",
                            }}
                          />
                          <Typography variant="subtitle2" sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                            {visit.title}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: { xs: 1, sm: 2 } }}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <EventIcon fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: "1rem" }} />
                            <Typography variant="body2" color="text.secondary">
                              {new Date(visit.date).toLocaleDateString()}
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <TimeIcon fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: "1rem" }} />
                            <Typography variant="body2" color="text.secondary">
                              {visit.startTime} - {visit.endTime}
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <HomeIcon fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: "1rem" }} />
                            <Typography variant="body2" color="text.secondary">
                              {property.name}
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <PersonIcon fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: "1rem" }} />
                            <Typography variant="body2" color="text.secondary">
                              {agent.name}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: { xs: "flex-end", sm: "flex-end" },
                          width: { xs: "100%", sm: "auto" },
                          mt: { xs: 1, sm: 0 },
                        }}
                      >
                        <Tooltip title="Ver detalles">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpenVisitDetails(visit)}
                            sx={{ mr: 1 }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleEditVisit(visit)}
                            sx={{ mr: 1 }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </ListItem>
                  </Box>
                )
              })}
            </List>
          ) : (
            <Box sx={{ py: 4, textAlign: "center" }}>
              <Typography variant="body1" color="text.secondary">
                No hay visitas programadas para esta oportunidad.
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
                onClick={handleCreateVisit}
                size={isMobile ? "small" : "medium"}
              >
                Programar una visita
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Diálogo para mostrar detalles de la visita */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : undefined,
            m: isMobile ? 0 : undefined,
          },
        }}
      >
        <DialogTitle sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
          Detalles de la Visita
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <EditIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: { xs: 1.5, sm: 2 } }}>
          {selectedVisit && <VisitDetails visit={selectedVisit} />}
        </DialogContent>
        <DialogActions sx={{ p: { xs: 1.5, sm: 2 }, flexWrap: "wrap", gap: 1 }}>
          <Button onClick={handleCloseDialog} size={isMobile ? "small" : "medium"}>
            Cerrar
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => {
              handleCloseDialog()
              if (selectedVisit) handleEditVisit(selectedVisit)
            }}
            size={isMobile ? "small" : "medium"}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => selectedVisit && handleDeleteVisit(selectedVisit.id)}
            size={isMobile ? "small" : "medium"}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para el formulario de visita */}
      <Dialog
        open={isFormOpen}
        onClose={handleFormClose}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : undefined,
            m: isMobile ? 0 : undefined,
          },
        }}
      >
        <DialogContent dividers sx={{ p: 0 }}>
          <VisitForm
            visit={selectedVisit}
            onComplete={handleFormClose}
            onDelete={(visitId) => {
              handleDeleteVisit(visitId)
              handleFormClose()
            }}
            opportunityId={opportunityId}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
