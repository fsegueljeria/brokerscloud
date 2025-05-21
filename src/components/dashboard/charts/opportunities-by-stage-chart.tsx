"use client"

import { useTheme, useMediaQuery } from "@mui/material"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Datos de ejemplo
const data = [
  { name: "Prospección", value: 20, color: "#2e7d32" },
  { name: "Calificación", value: 25, color: "#1565c0" },
  { name: "Contacto Inicial", value: 18, color: "#7b1fa2" },
  { name: "Análisis de Necesidades", value: 15, color: "#00838f" },
  { name: "Negociación", value: 12, color: "#f57f17" },
  { name: "Propuesta", value: 10, color: "#7b1fa2" },
  { name: "Cierre", value: 8, color: "#d84315" },
  { name: "Post-Venta", value: 5, color: "#2e7d32" },
  { name: "Gestión de Relación", value: 3, color: "#00695c" },
]

interface OpportunitiesByStageChartProps {
  timeRange: string
}

export function OpportunitiesByStageChart({ timeRange }: OpportunitiesByStageChartProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // En un caso real, aquí filtrarías los datos según el timeRange

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={isMobile ? 60 : 80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            isMobile ? `${(percent * 100).toFixed(0)}%` : `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`${value} oportunidades`, name]}
          contentStyle={{ backgroundColor: theme.palette.background.paper, borderRadius: 8 }}
        />
        <Legend
          layout={isMobile ? "horizontal" : "vertical"}
          verticalAlign={isMobile ? "bottom" : "middle"}
          align={isMobile ? "center" : "right"}
          wrapperStyle={isMobile ? { fontSize: "0.75rem" } : {}}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
