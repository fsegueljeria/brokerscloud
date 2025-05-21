"use client"

import { useState } from "react"

import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  Avatar,
  Tooltip,
  Badge,
  Button,
} from "@mui/material"
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Today as TodayIcon,
  Add as AddIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material"
import dayjs from "dayjs"

import "dayjs/locale/es"
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

const mockContacts = {
  1: { name: "Carlos Rodríguez", email: "carlos@example.com" },
  2: { name: "Laura Sánchez", email: "laura@example.com" },
  3: { name: "Miguel Torres", email: "miguel@example.com" },
  4: { name: "Isabel Díaz", email: "isabel@example.com" },
  5: { name: "Roberto Fernández", email: "roberto@example.com" },
}

const mockProspects = {
  1: { name: "Carlos Rodríguez" },
  2: { name: "Laura Sánchez" },
  3: { name: "Miguel Torres" },
  4: { name: "Isabel Díaz" },
  5: { name: "Roberto Fernández" },
}

// Colores para los estados de visita
const visitStatusColors = {
  SCHEDULED: { bg: "#e3f2fd", color: "#1565c0", label: "Programada" },
  COMPLETED: { bg: "#e8f5e9", color: "#2e7d32", label: "Completada" },
  CANCELLED: { bg: "#ffebee", color: "#c62828", label: "Cancelada" },
  RESCHEDULED: { bg: "#fff8e1", color: "#f57f17", label: "Reprogramada" },
  PENDING_CONFIRMATION: { bg: "#f3e5f5", color: "#7b1fa2", label: "Pendiente" },
}

// Función para generar días del mes
const generateCalendarDays = (year: number, month: number) => {
  const firstDay = dayjs(new Date(year, month, 1))
  const daysInMonth = firstDay.daysInMonth()
  const startingDayOfWeek = firstDay.day() // 0 = Sunday, 1 = Monday, etc.

  // Ajustar para que la semana comience en lunes (0 = lunes, 6 = domingo)
  const adjustedStartingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1

  const days = []

  // Días del mes anterior
  for (let i = 0; i < adjustedStartingDay; i++) {
    const prevMonthDay = firstDay.subtract(adjustedStartingDay - i, "day")

    days.push({
      date: prevMonthDay.format("YYYY-MM-DD"),
      day: prevMonthDay.date(),
      isCurrentMonth: false,
    })
  }

  // Días del mes actual
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: dayjs(new Date(year, month, i)).format("YYYY-MM-DD"),
      day: i,
      isCurrentMonth: true,
    })
  }

  // Días del mes siguiente para completar la última semana
  const remainingDays = 7 - (days.length % 7)

  if (remainingDays < 7) {
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonthDay = dayjs(new Date(year, month + 1, i))

      days.push({
        date: nextMonthDay.format("YYYY-MM-DD"),
        day: i,
        isCurrentMonth: false,
      })
    }
  }

  return days
}

// Componente para mostrar una visita en el calendario
const VisitCard = ({ visit, onEdit }) => {
  const property = mockProperties[visit.propertyId]
  const agent = mockAgents[visit.assignedAgentId]
  const status = visitStatusColors[visit.status]

  // Contar el número total de asistentes
  const totalAttendees = (visit.attendees.contacts?.length || 0) + (visit.attendees.prospects?.length || 0)

  return (
    <Card
      sx={{
        mb: 1,
        borderLeft: `4px solid ${status.color}`,
        boxShadow: 1,
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
          <Typography variant="subtitle2" noWrap sx={{ fontWeight: "bold", maxWidth: "70%" }}>
            {visit.title}
          </Typography>
          <Chip
            label={status.label}
            size="small"
            sx={{
              bgcolor: status.bg,
              color: status.color,
              fontSize: "0.7rem",
              height: 20,
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          <TimeIcon fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: "0.9rem" }} />
          <Typography variant="caption" color="text.secondary">
            {visit.startTime} - {visit.endTime}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          <HomeIcon fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: "0.9rem" }} />
          <Typography variant="caption" color="text.secondary" noWrap>
            {property.name}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
          <Tooltip title={agent.name}>
            <Avatar
              sx={{
                width: 24,
                height: 24,
                fontSize: "0.75rem",
                bgcolor: status.color,
              }}
            >
              {agent.avatar}
            </Avatar>
          </Tooltip>

          <Tooltip title={`${totalAttendees} asistente(s)`}>
            <Badge
              badgeContent={totalAttendees}
              color="primary"
              sx={{ "& .MuiBadge-badge": { fontSize: "0.7rem", height: 16, minWidth: 16 } }}
            >
              <PersonIcon fontSize="small" sx={{ color: "text.secondary" }} />
            </Badge>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  )
}

export function VisitCalendar({ onCreateVisit, onEditVisit }) {
  const today = dayjs()
  const [currentDate, setCurrentDate] = useState(today)
  const [currentView, setCurrentView] = useState<"month" | "week" | "day">("month")

  const currentYear = currentDate.year()
  const currentMonth = currentDate.month()
  const calendarDays = generateCalendarDays(currentYear, currentMonth)

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"))
  }

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"))
  }

  const handleToday = () => {
    setCurrentDate(today)
  }

  // Filtrar visitas por día
  const getVisitsForDay = (date: string) => {
    return mockVisits.filter((visit) => visit.date === date)
  }

  return (
    <Paper sx={{ p: { xs: 1, sm: 2, md: 3 }, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" component="h2" sx={{ mr: 2 }}>
            Calendario de Visitas
          </Typography>
          <Chip label={currentDate.format("MMMM YYYY")} color="primary" variant="outlined" />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handlePrevMonth} size="small">
            <ChevronLeftIcon />
          </IconButton>
          <Button variant="text" size="small" onClick={handleToday} startIcon={<TodayIcon />} sx={{ mx: 1 }}>
            Hoy
          </Button>
          <IconButton onClick={handleNextMonth} size="small">
            <ChevronRightIcon />
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={onCreateVisit}
            sx={{ ml: 2, display: { xs: "none", sm: "flex" } }}
            size="small"
          >
            Nueva Visita
          </Button>
        </Box>
      </Box>

      <Grid container spacing={0} sx={{ border: "1px solid", borderColor: "divider" }}>
        {/* Días de la semana */}
        {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day, index) => (
          <Grid
            item
            xs={12 / 7}
            key={day}
            sx={{
              p: 1,
              textAlign: "center",
              borderBottom: "1px solid",
              borderRight: index < 6 ? "1px solid" : "none",
              borderColor: "divider",
              bgcolor: "action.hover",
            }}
          >
            <Typography variant="subtitle2">{day}</Typography>
          </Grid>
        ))}

        {/* Días del calendario */}
        {calendarDays.map((day, index) => {
          const isToday = day.date === today.format("YYYY-MM-DD")
          const dayVisits = getVisitsForDay(day.date)

          return (
            <Grid
              item
              xs={12 / 7}
              key={index}
              sx={{
                height: { xs: 120, sm: 150, md: 180 },
                p: 0.5,
                borderBottom: index < calendarDays.length - 7 ? "1px solid" : "none",
                borderRight: index % 7 !== 6 ? "1px solid" : "none",
                borderColor: "divider",
                bgcolor: !day.isCurrentMonth ? "action.disabledBackground" : "transparent",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  bgcolor: isToday ? "primary.main" : "transparent",
                  color: isToday ? "white" : day.isCurrentMonth ? "text.primary" : "text.disabled",
                  mb: 0.5,
                }}
              >
                <Typography variant="body2">{day.day}</Typography>
              </Box>

              <Box sx={{ overflowY: "auto", maxHeight: { xs: 90, sm: 120, md: 150 } }}>
                {dayVisits.map((visit) => (
                  <VisitCard key={visit.id} visit={visit} onEdit={() => onEditVisit(visit)} />
                ))}
              </Box>
            </Grid>
          )
        })}
      </Grid>

      <Box sx={{ display: { xs: "flex", sm: "none" }, justifyContent: "center", mt: 2 }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={onCreateVisit} fullWidth>
          Nueva Visita
        </Button>
      </Box>
    </Paper>
  )
}
