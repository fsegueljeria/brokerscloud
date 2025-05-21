"use client"

import { useState, useMemo } from "react"
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
  useMediaQuery,
  Tooltip,
  IconButton,
} from "@mui/material"
import { Info as InfoIcon } from "@mui/icons-material"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
  Cell,
} from "recharts"

// Datos de ejemplo para el tiempo promedio en cada etapa (en días)
const stageTimeData = [
  { stage: "Prospección", avgDays: 5, color: "#2e7d32" },
  { stage: "Calificación", avgDays: 7, color: "#1565c0" },
  { stage: "Contacto Inicial", avgDays: 3, color: "#7b1fa2" },
  { stage: "Análisis de Necesidades", avgDays: 8, color: "#00838f" },
  { stage: "Negociación", avgDays: 12, color: "#f57f17" },
  { stage: "Propuesta", avgDays: 6, color: "#7b1fa2" },
  { stage: "Cierre", avgDays: 4, color: "#d84315" },
]

// Datos de ejemplo para el tiempo de transición entre etapas (en días)
const transitionTimeData = [
  { from: "Prospección", to: "Calificación", avgDays: 2 },
  { from: "Calificación", to: "Contacto Inicial", avgDays: 1 },
  { from: "Contacto Inicial", to: "Análisis de Necesidades", avgDays: 3 },
  { from: "Análisis de Necesidades", to: "Negociación", avgDays: 4 },
  { from: "Negociación", to: "Propuesta", avgDays: 2 },
  { from: "Propuesta", to: "Cierre", avgDays: 5 },
]

// Datos de ejemplo para el tiempo total del ciclo de ventas por tipo de propiedad
const salesCycleByPropertyType = [
  { type: "Apartamento", avgDays: 45, count: 24 },
  { type: "Casa", avgDays: 60, count: 18 },
  { type: "Terreno", avgDays: 90, count: 12 },
  { type: "Local Comercial", avgDays: 75, count: 8 },
]

interface OpportunityTimeReportProps {
  timeRange?: string
}

export function OpportunityTimeReport({ timeRange = "month" }: OpportunityTimeReportProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  const [reportType, setReportType] = useState("stageTime")
  const [propertyType, setPropertyType] = useState("all")

  // Filtrar datos según el tipo de propiedad seleccionado
  // En un caso real, esto se haría con datos reales filtrados desde la API
  const filteredData = useMemo(() => {
    // Aquí se implementaría la lógica real de filtrado basada en timeRange y propertyType
    return stageTimeData
  }, [timeRange, propertyType])

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value)
  }

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value)
  }

  // Función para renderizar el gráfico según el tipo de reporte seleccionado
  const renderChart = () => {
    switch (reportType) {
      case "stageTime":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={stageTimeData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 70,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" angle={-45} textAnchor="end" height={70} tick={{ fontSize: isMobile ? 10 : 12 }} />
              <YAxis
                label={{
                  value: "Días promedio",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle" },
                }}
              />
              <RechartsTooltip
                formatter={(value) => [`${value} días`, "Tiempo promedio"]}
                contentStyle={{ backgroundColor: theme.palette.background.paper }}
              />
              <Legend />
              <Bar dataKey="avgDays" name="Tiempo promedio (días)">
                {stageTimeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )

      case "transitionTime":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={transitionTimeData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 70,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="from"
                angle={-45}
                textAnchor="end"
                height={70}
                tick={{ fontSize: isMobile ? 10 : 12 }}
                label={{ value: "Etapa de origen", position: "insideBottom", offset: -15 }}
              />
              <YAxis
                label={{
                  value: "Días de transición",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle" },
                }}
              />
              <RechartsTooltip
                formatter={(value, name, props) => [`${value} días`, `De ${props.payload.from} a ${props.payload.to}`]}
                contentStyle={{ backgroundColor: theme.palette.background.paper }}
              />
              <Legend />
              <Bar dataKey="avgDays" name="Tiempo de transición (días)" fill={theme.palette.primary.main} />
            </BarChart>
          </ResponsiveContainer>
        )

      case "salesCycle":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={salesCycleByPropertyType}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 50,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" tick={{ fontSize: isMobile ? 10 : 12 }} />
              <YAxis
                yAxisId="left"
                orientation="left"
                label={{
                  value: "Días promedio",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle" },
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{
                  value: "Cantidad",
                  angle: 90,
                  position: "insideRight",
                  style: { textAnchor: "middle" },
                }}
              />
              <RechartsTooltip
                formatter={(value, name) => {
                  if (name === "Ciclo de venta") return [`${value} días`, name]
                  return [`${value} oportunidades`, name]
                }}
                contentStyle={{ backgroundColor: theme.palette.background.paper }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="avgDays" name="Ciclo de venta" fill={theme.palette.primary.main} />
              <Bar
                yAxisId="right"
                dataKey="count"
                name="Cantidad de oportunidades"
                fill={theme.palette.secondary.main}
              />
            </BarChart>
          </ResponsiveContainer>
        )

      default:
        return <Typography>Seleccione un tipo de reporte</Typography>
    }
  }

  return (
    <Card>
      <CardHeader
        title="Reporte de Tiempo por Etapa"
        titleTypographyProps={{ variant: isMobile ? "h6" : "h5" }}
        action={
          <Tooltip title="Este reporte muestra el tiempo promedio que las oportunidades permanecen en cada etapa y el tiempo de transición entre etapas.">
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="report-type-label">Tipo de Reporte</InputLabel>
              <Select
                labelId="report-type-label"
                id="report-type"
                value={reportType}
                label="Tipo de Reporte"
                onChange={handleReportTypeChange}
              >
                <MenuItem value="stageTime">Tiempo por Etapa</MenuItem>
                <MenuItem value="transitionTime">Tiempo de Transición</MenuItem>
                <MenuItem value="salesCycle">Ciclo de Venta por Tipo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="property-type-label">Tipo de Propiedad</InputLabel>
              <Select
                labelId="property-type-label"
                id="property-type"
                value={propertyType}
                label="Tipo de Propiedad"
                onChange={handlePropertyTypeChange}
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="apartment">Apartamentos</MenuItem>
                <MenuItem value="house">Casas</MenuItem>
                <MenuItem value="land">Terrenos</MenuItem>
                <MenuItem value="commercial">Locales Comerciales</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {renderChart()}

        <Box sx={{ mt: 2 }}>
          {reportType === "stageTime" && (
            <Typography variant="body2" color="text.secondary">
              Este gráfico muestra el tiempo promedio (en días) que las oportunidades permanecen en cada etapa del
              proceso de venta.
            </Typography>
          )}

          {reportType === "transitionTime" && (
            <Typography variant="body2" color="text.secondary">
              Este gráfico muestra el tiempo promedio (en días) que toma la transición entre etapas consecutivas del
              proceso de venta.
            </Typography>
          )}

          {reportType === "salesCycle" && (
            <Typography variant="body2" color="text.secondary">
              Este gráfico muestra el tiempo promedio del ciclo completo de venta por tipo de propiedad, junto con la
              cantidad de oportunidades analizadas.
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}
