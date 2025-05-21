"use client"

import { useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import {
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  MoreVert as MoreVertIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"

// Datos de ejemplo para los gráficos
const leadSourceData = [
  { name: "Portal Inmobiliario", value: 35 },
  { name: "Sitio Web", value: 25 },
  { name: "Referidos", value: 20 },
  { name: "Redes Sociales", value: 15 },
  { name: "Otros", value: 5 },
]

const leadStatusData = [
  { name: "Nuevo", value: 30 },
  { name: "Contactado", value: 25 },
  { name: "Calificado", value: 20 },
  { name: "No calificado", value: 15 },
  { name: "Convertido", value: 10 },
]

const leadTrendData = [
  { name: "Ene", nuevos: 20, contactados: 15, calificados: 10, convertidos: 5 },
  { name: "Feb", nuevos: 25, contactados: 18, calificados: 12, convertidos: 7 },
  { name: "Mar", nuevos: 30, contactados: 22, calificados: 15, convertidos: 8 },
  { name: "Abr", nuevos: 35, contactados: 25, calificados: 18, convertidos: 10 },
  { name: "May", nuevos: 40, contactados: 30, calificados: 20, convertidos: 12 },
  { name: "Jun", nuevos: 45, contactados: 35, calificados: 25, convertidos: 15 },
]

const leadAssignmentData = [
  { name: "Automático", value: 65 },
  { name: "Manual", value: 35 },
]

const interactionData = [
  { name: "Llamadas", value: 40 },
  { name: "Emails", value: 30 },
  { name: "Mensajes", value: 20 },
  { name: "Reuniones", value: 10 },
]

const responseTimeData = [
  { name: "< 1 hora", value: 40 },
  { name: "1-4 horas", value: 30 },
  { name: "4-24 horas", value: 20 },
  { name: "> 24 horas", value: 10 },
]

const conversionRateData = [
  { name: "Ene", tasa: 15 },
  { name: "Feb", tasa: 18 },
  { name: "Mar", tasa: 20 },
  { name: "Abr", tasa: 22 },
  { name: "May", tasa: 25 },
  { name: "Jun", tasa: 28 },
]

const leadQualificationData = [
  { name: "Alta", value: 25 },
  { name: "Media", value: 45 },
  { name: "Baja", value: 30 },
]

const agentPerformanceData = [
  { name: "Ana", leads: 45, convertidos: 15, tasa: 33 },
  { name: "Carlos", leads: 38, convertidos: 10, tasa: 26 },
  { name: "María", leads: 52, convertidos: 18, tasa: 35 },
  { name: "Juan", leads: 30, convertidos: 8, tasa: 27 },
  { name: "Laura", leads: 35, convertidos: 12, tasa: 34 },
]

const followUpData = [
  { name: "Pendientes", value: 15 },
  { name: "Completados", value: 25 },
  { name: "Atrasados", value: 10 },
]

// Datos para notificaciones y recordatorios
const notificationsData = [
  {
    id: 1,
    type: "nuevo_lead",
    message: "Nuevo lead: Juan Pérez interesado en Departamento en Providencia",
    time: "Hace 10 minutos",
    read: false,
  },
  {
    id: 2,
    type: "seguimiento",
    message: "Recordatorio: Seguimiento a María González sobre Casa en Las Condes",
    time: "Hace 1 hora",
    read: false,
  },
  {
    id: 3,
    type: "calificacion",
    message: "Lead calificado: Pedro Soto muestra alto interés en Departamento en Ñuñoa",
    time: "Hace 3 horas",
    read: true,
  }
]

// Datos para tareas pendientes
const pendingTasksData = [
  {
    id: 1,
    leadName: "Juan Pérez",
    task: "Llamada de seguimiento",
    dueDate: "Hoy, 15:00",
    priority: "alta",
  },
  {
    id: 2,
    leadName: "María González",
    task: "Enviar información adicional",
    dueDate: "Mañana, 10:00",
    priority: "media",
  },
  {
    id: 3,
    leadName: "Pedro Soto",
    task: "Coordinar visita a propiedad",
    dueDate: "En 2 días",
    priority: "alta",
  },
]

// Datos de ejemplo para las nuevas tablas
const leadsSinContactoData = [
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "juan@email.com",
    telefono: "+56912345678",
    fechaIngreso: "2024-03-20",
    diasSinContacto: 3,
    prioridad: "alta",
  },
  {
    id: 2,
    nombre: "María González",
    email: "maria@email.com",
    telefono: "+56987654321",
    fechaIngreso: "2024-03-19",
    diasSinContacto: 4,
    prioridad: "alta",
  },
  {
    id: 3,
    nombre: "Carlos López",
    email: "carlos@email.com",
    telefono: "+56923456789",
    fechaIngreso: "2024-03-18",
    diasSinContacto: 5,
    prioridad: "media",
  },
]

const leadsRequerimientosIncompletosData = [
  {
    id: 1,
    nombre: "Ana Martínez",
    email: "ana@email.com",
    telefono: "+56934567890",
    fechaIngreso: "2024-03-20",
    faltantes: ["Presupuesto", "Zona de interés"],
    prioridad: "media",
  },
  {
    id: 2,
    nombre: "Pedro Sánchez",
    email: "pedro@email.com",
    telefono: "+56945678901",
    fechaIngreso: "2024-03-19",
    faltantes: ["Tipo de propiedad"],
    prioridad: "baja",
  },
  {
    id: 3,
    nombre: "Laura Díaz",
    email: "laura@email.com",
    telefono: "+56956789012",
    fechaIngreso: "2024-03-18",
    faltantes: ["Presupuesto", "Tipo de propiedad", "Zona de interés"],
    prioridad: "alta",
  },
]

const leadsOportunidadesEstancadasData = [
  {
    id: 1,
    nombre: "Roberto Silva",
    email: "roberto@email.com",
    telefono: "+56967890123",
    oportunidad: "OP-001",
    diasSinAvance: 15,
    ultimoEstado: "En negociación",
    prioridad: "alta",
  },
  {
    id: 2,
    nombre: "Sofía Herrera",
    email: "sofia@email.com",
    telefono: "+56978901234",
    oportunidad: "OP-002",
    diasSinAvance: 10,
    ultimoEstado: "En evaluación",
    prioridad: "media",
  },
  {
    id: 3,
    nombre: "Miguel Torres",
    email: "miguel@email.com",
    telefono: "+56989012345",
    oportunidad: "OP-003",
    diasSinAvance: 20,
    ultimoEstado: "En negociación",
    prioridad: "alta",
  },
]

// Colores para los gráficos
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]
const STATUS_COLORS = {
  Nuevo: "#2196f3",
  Contactado: "#ff9800",
  Calificado: "#4caf50",
  "No calificado": "#f44336",
  Convertido: "#9c27b0",
}

export function LeadAnalyticsDashboard() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  const [timeFilter, setTimeFilter] = useState("month")

  const handleTimeFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeFilter(event.target.value)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "error"
      case "media":
        return "warning"
      case "baja":
        return "info"
      default:
        return "default"
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Filtros y encabezado */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: { xs: "wrap", md: "nowrap" },
          gap: 2,
        }}
      >
        <Typography variant="h5" component="h2" fontWeight="bold">          
        </Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="time-filter-label">Periodo</InputLabel>
          <Select
            labelId="time-filter-label"
            id="time-filter"
            value={timeFilter}
            label="Periodo"
            onChange={handleTimeFilterChange}
          >
            <MenuItem value="week">Esta semana</MenuItem>
            <MenuItem value="month">Este mes</MenuItem>
            <MenuItem value="quarter">Este trimestre</MenuItem>
            <MenuItem value="year">Este año</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Tarjetas de resumen */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box>
                  <Typography color="textSecondary" variant="subtitle2" gutterBottom>
                    Leads Totales
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    145
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <ArrowUpwardIcon color="success" fontSize="small" />
                    <Typography variant="body2" color="success.main" sx={{ ml: 0.5 }}>
                      12% vs mes anterior
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ bgcolor: "primary.main", color: "white" }}>
                  <PersonIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box>
                  <Typography color="textSecondary" variant="subtitle2" gutterBottom>
                    Tasa de Conversión
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    28%
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <ArrowUpwardIcon color="success" fontSize="small" />
                    <Typography variant="body2" color="success.main" sx={{ ml: 0.5 }}>
                      3% vs mes anterior
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ bgcolor: "success.main", color: "white" }}>
                  <TrendingUpIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box>
                  <Typography color="textSecondary" variant="subtitle2" gutterBottom>
                    Tiempo de Respuesta
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    2.5h
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <ArrowDownwardIcon color="success" fontSize="small" />
                    <Typography variant="body2" color="success.main" sx={{ ml: 0.5 }}>
                      15% vs mes anterior
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ bgcolor: "info.main", color: "white" }}>
                  <AccessTimeIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box>
                  <Typography color="textSecondary" variant="subtitle2" gutterBottom>
                    Leads Calificados
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    65
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <ArrowUpwardIcon color="success" fontSize="small" />
                    <Typography variant="body2" color="success.main" sx={{ ml: 0.5 }}>
                      8% vs mes anterior
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ bgcolor: "warning.main", color: "white" }}>
                  <CheckCircleIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Notificaciones y tareas pendientes */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Notificaciones */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" component="h3" fontWeight="medium">
                  Notificaciones Recientes
                </Typography>
                <Chip
                  label={`${notificationsData.filter((n) => !n.read).length} nuevas`}
                  color="primary"
                  size="small"
                />
              </Box>
              <List sx={{ width: "100%" }}>
                {notificationsData.map((notification) => (
                  <ListItem
                    key={notification.id}
                    alignItems="flex-start"
                    sx={{
                      bgcolor: notification.read ? "transparent" : "action.hover",
                      borderRadius: 1,
                      mb: 1,
                      
                    }}
                    secondaryAction={
                      <IconButton edge="end" aria-label="más opciones" size="small">
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor:
                            notification.type === "nuevo_lead"
                              ? "primary.main"
                              : notification.type === "seguimiento"
                                ? "warning.main"
                                : notification.type === "calificacion"
                                  ? "success.main"
                                  : "secondary.main",
                          color: "white",
                        }}
                      >
                        {notification.type === "nuevo_lead" ? (
                          <PersonIcon />
                        ) : notification.type === "seguimiento" ? (
                          <AccessTimeIcon />
                        ) : notification.type === "calificacion" ? (
                          <CheckCircleIcon />
                        ) : (
                          <TrendingUpIcon />
                        )}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={notification.message}
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          {notification.time}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button variant="text" color="primary">
                  Ver todas las notificaciones
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Tareas pendientes */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" component="h3" fontWeight="medium">
                  Tareas Pendientes
                </Typography>
                <Chip label={`${pendingTasksData.length} tareas`} color="warning" size="small" />
              </Box>
              <List sx={{ width: "100%" }}>
                {pendingTasksData.map((task) => (
                  <ListItem
                    key={task.id}
                    alignItems="flex-start"
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                    secondaryAction={
                      <IconButton edge="end" aria-label="completar tarea" size="small" color="success">
                        <CheckCircleIcon fontSize="small" />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: getPriorityColor(task.priority) + ".main", color: "white" }}>
                        <AssignmentIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="body1" component="span">
                            {task.task}
                          </Typography>
                          <Chip
                            label={task.priority}
                            color={getPriorityColor(task.priority)}
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" component="span" color="text.primary">
                            {task.leadName}
                          </Typography>
                          <Typography variant="caption" component="span" color="text.secondary" sx={{ ml: 1 }}>
                            • {task.dueDate}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button variant="text" color="primary">
                  Ver todas las tareas
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Leads sin contacto inicial y requerimientos incompletos */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Leads sin contacto inicial */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" component="h3" fontWeight="medium">
                  Leads Sin Contacto Inicial
                </Typography>
                <Chip
                  label={`${leadsSinContactoData.length} leads sin contacto`}
                  color="error"
                  size="small"
                />
              </Box>
              <List sx={{ width: "100%" }}>
                {leadsSinContactoData.map((lead) => (
                  <ListItem
                    key={lead.id}
                    alignItems="flex-start"
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                    secondaryAction={
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<PersonIcon />}
                      >
                        Contactar ahora
                      </Button>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: getPriorityColor(lead.prioridad) + ".main", color: "white" }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="body1" component="span">
                            {lead.nombre}
                          </Typography>
                          <Chip
                            label={`${lead.diasSinContacto} días sin contacto`}
                            color={lead.diasSinContacto > 3 ? "error" : "warning"}
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" component="span" color="text.primary">
                            {lead.email} • {lead.telefono}
                          </Typography>
                          <Typography variant="caption" component="span" color="text.secondary" sx={{ ml: 1 }}>
                            • Ingresó el {new Date(lead.fechaIngreso).toLocaleDateString()}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Leads con requerimientos incompletos */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" component="h3" fontWeight="medium">
                  Leads con Requerimientos Incompletos
                </Typography>
                <Chip
                  label={`${leadsRequerimientosIncompletosData.length} leads incompletos`}
                  color="warning"
                  size="small"
                />
              </Box>
              <List sx={{ width: "100%" }}>
                {leadsRequerimientosIncompletosData.map((lead) => (
                  <ListItem
                    key={lead.id}
                    alignItems="flex-start"
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                    secondaryAction={
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        startIcon={<AssignmentIcon />}
                      >
                        Solicitar info
                      </Button>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: getPriorityColor(lead.prioridad) + ".main", color: "white" }}>
                        <AssignmentIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="body1" component="span">
                            {lead.nombre}
                          </Typography>
                          <Chip
                            label={`${lead.faltantes.length} campos faltantes`}
                            color="warning"
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" component="span" color="text.primary">
                            {lead.email} • {lead.telefono}
                          </Typography>
                          <Typography variant="caption" component="span" color="text.secondary" sx={{ ml: 1 }}>
                            • Faltantes: {lead.faltantes.join(", ")}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Gráficos principales */}
      <Grid container spacing={3}>

        {/* Tendencia de leads */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom fontWeight="medium">
                Tendencia de Leads
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Evolución mensual de leads por estado
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={leadTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="nuevos"
                      stackId="1"
                      stroke={STATUS_COLORS.Nuevo}
                      fill={STATUS_COLORS.Nuevo}
                    />
                    <Area
                      type="monotone"
                      dataKey="contactados"
                      stackId="1"
                      stroke={STATUS_COLORS.Contactado}
                      fill={STATUS_COLORS.Contactado}
                    />
                    <Area
                      type="monotone"
                      dataKey="calificados"
                      stackId="1"
                      stroke={STATUS_COLORS.Calificado}
                      fill={STATUS_COLORS.Calificado}
                    />
                    <Area
                      type="monotone"
                      dataKey="convertidos"
                      stackId="1"
                      stroke={STATUS_COLORS.Convertido}
                      fill={STATUS_COLORS.Convertido}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Distribución por estado */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom fontWeight="medium">
                Distribución por Estado
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Porcentaje de leads en cada etapa
              </Typography>
              <Box sx={{ height: 300, display: "flex", justifyContent: "center" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={leadStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {leadStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS] || COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
