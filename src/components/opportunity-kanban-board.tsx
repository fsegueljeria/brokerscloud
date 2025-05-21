"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import type { DropResult, DroppableProvided, DraggableProvided } from "react-beautiful-dnd"
import { opportunityService } from "@/libs/services/opportunity-service"
import type { Opportunity } from "@/types/types"
import { formatCurrency } from "@/libs/utils"

// Material UI imports
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import CardActions from "@mui/material/CardActions"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

// Material Icons
import MoreVertIcon from "@mui/icons-material/MoreVert"
import PersonIcon from "@mui/icons-material/Person"
import HomeIcon from "@mui/icons-material/Home"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import VisibilityIcon from "@mui/icons-material/Visibility"
import EditIcon from "@mui/icons-material/Edit"
import EventIcon from "@mui/icons-material/Event"
import DescriptionIcon from "@mui/icons-material/Description"
import DeleteIcon from "@mui/icons-material/Delete"
import RefreshIcon from "@mui/icons-material/Refresh"

// Definimos las etapas del flujo de trabajo
const STAGES = [
  { id: "INITIAL_CONTACT", name: "Contacto Inicial" },
  { id: "QUALIFIED", name: "Calificado" },
  { id: "VISIT_SCHEDULED", name: "Visita Programada" },
  { id: "PROPOSAL", name: "Propuesta" },
  { id: "NEGOTIATION", name: "Negociación" },
  { id: "CLOSED_WON", name: "Cerrado Ganado" },
  { id: "CLOSED_LOST", name: "Cerrado Perdido" },
]

// Colores para las etapas
const STAGE_COLORS: Record<
  string,
  { color: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default" }
> = {
  INITIAL_CONTACT: { color: "info" },
  QUALIFIED: { color: "secondary" },
  VISIT_SCHEDULED: { color: "warning" },
  PROPOSAL: { color: "primary" },
  NEGOTIATION: { color: "warning" },
  CLOSED_WON: { color: "success" },
  CLOSED_LOST: { color: "error" },
}

export function OpportunityKanbanBoard() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar oportunidades
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true)
        const data = await opportunityService.getOpportunities()
        setOpportunities(data)
        setError(null)
      } catch (err) {
        setError("Error al cargar las oportunidades")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchOpportunities()
  }, [])
  // Manejar el evento de arrastrar y soltar
  const handleDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result

    console.log('DragEnd - draggableId:', draggableId)
    console.log('DragEnd - opportunities:', opportunities)

    // Si no hay destino o el destino es el mismo que el origen, no hacemos nada
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // Encontrar la oportunidad que se está moviendo
    const opportunityId = Number.parseInt(draggableId, 10)
    const opportunity = opportunities.find((opp) => opp.id === opportunityId)

    if (!opportunity) {
      console.error('No se encontró la oportunidad con ID:', opportunityId)
      return
    }

    // Crear una copia de las oportunidades
    const updatedOpportunities = [...opportunities]
    const movedOpportunity = { ...opportunity, stage: destination.droppableId }

    // Actualizar la etapa de la oportunidad en el estado local
    const opportunityIndex = updatedOpportunities.findIndex((opp) => opp.id === opportunityId)
    updatedOpportunities[opportunityIndex] = movedOpportunity
    setOpportunities(updatedOpportunities)

    // Actualizar en el servidor
    try {
      await opportunityService.updateOpportunity(opportunityId, { stage: destination.droppableId })
    } catch (err) {
      // Si hay un error, revertimos el cambio
      setError("Error al actualizar la oportunidad")
      console.error(err)

      // Recargar las oportunidades para asegurar consistencia
      const refreshedData = await opportunityService.getOpportunities()
      setOpportunities(refreshedData)
    }
  }

  // Agrupar oportunidades por etapa
  const getOpportunitiesByStage = (stage: string) => {
    return opportunities.filter((opportunity) => opportunity.stage === stage)
  }

  if (loading) {
    return <KanbanSkeleton />
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={() => {
            setLoading(true)
            setError(null)
            opportunityService
              .getOpportunities()
              .then((data) => setOpportunities(data))
              .catch((err) => setError("Error al cargar las oportunidades"))
              .finally(() => setLoading(false))
          }}
        >
          Reintentar
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Tablero de Oportunidades
      </Typography>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={2} sx={{ overflowX: "auto" }}>
          {STAGES.map((stage) => (
            <Grid item key={stage.id} xs={12} sm={6} md={4} lg={3} xl={12 / 7}>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "grey.50",
                  p: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 300,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {stage.name}
                  </Typography>
                  <Chip label={getOpportunitiesByStage(stage.id).length} size="small" variant="outlined" />
                </Box>

                <Droppable 
                  droppableId={stage.id} 
                  type="DEFAULT"
                  isDropDisabled={false}
                  isCombineEnabled={false}
                  ignoreContainerClipping={false}
                  direction="vertical"
                  mode="standard"
                >
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      {getOpportunitiesByStage(stage.id).map((opportunity, index) => {
                        console.log('Rendering Draggable - opportunity.id:', opportunity.id)
                        return (
                          <Draggable
                            key={opportunity.id}
                            draggableId={opportunity.id.toString()}
                            index={index}
                            isDragDisabled={false}
                          >
                            {(provided) => (
                              <Box 
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{ mb: 2 }}
                              >
                                <OpportunityCard opportunity={opportunity} />
                              </Box>
                            )}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </Box>
  )
}

// Componente para la tarjeta de oportunidad
function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const stageColor = STAGE_COLORS[opportunity.stage]?.color || "default"

  return (
    <Card
      variant="outlined"
      sx={{ bgcolor: "background.paper", transition: "box-shadow 0.3s", "&:hover": { boxShadow: 3 } }}
    >
      <CardHeader
        action={
          <IconButton aria-label="settings" size="small" onClick={handleClick}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        }
        title={
          <Typography variant="subtitle2" noWrap title={opportunity.name}>
            {opportunity.name}
          </Typography>
        }
        sx={{ pb: 1 }}
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Ver detalles</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <EventIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Programar visita</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DescriptionIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Crear oferta</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Eliminar</ListItemText>
        </MenuItem>
      </Menu>

      <CardContent sx={{ pt: 0, pb: 1 }}>
        <Chip
          label={STAGES.find((s) => s.id === opportunity.stage)?.name || opportunity.stage}
          size="small"
          color={stageColor}
          sx={{ mb: 1.5 }}
        />

        <Stack spacing={1} sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PersonIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="body2" noWrap color="text.secondary">
              {opportunity.customer || "Cliente no asignado"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AttachMoneyIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {formatCurrency(opportunity.amount, opportunity.curCode)}
            </Typography>
          </Box>

          {opportunity.properties && opportunity.properties.length > 0 && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <HomeIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
              <Typography variant="body2" noWrap color="text.secondary">
                {opportunity.properties[0].name}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {new Date(opportunity.expectedCloseDate).toLocaleDateString()}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      {opportunity.assignAgent && (
        <CardActions sx={{ pt: 0, borderTop: 1, borderColor: "divider" }}>
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Avatar
              src={`/placeholder.svg?height=32&width=32&query=avatar`}
              alt={opportunity.assignAgent.name}
              sx={{ width: 24, height: 24, mr: 1 }}
            >
              {opportunity.assignAgent.name.substring(0, 2).toUpperCase()}
            </Avatar>
            <Typography variant="caption" color="text.secondary">
              {opportunity.assignAgent.name}
            </Typography>
          </Box>
        </CardActions>
      )}
    </Card>
  )
}

// Componente de esqueleto para el estado de carga
function KanbanSkeleton() {
  return (
    <Box sx={{ p: 4 }}>
      <Skeleton variant="text" width={250} height={40} sx={{ mb: 3 }} />
      <Grid container spacing={2}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
            <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Skeleton variant="text" width={120} />
                <Skeleton variant="rounded" width={30} height={20} />
              </Box>
              <Stack spacing={2}>
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} variant="rounded" height={120} />
                ))}
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
