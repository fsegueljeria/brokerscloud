"use client"

import { useTheme, useMediaQuery } from "@mui/material"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

// Datos de ejemplo para la distribución por estado
const data = [
  { name: "Borrador", value: 15, color: "#e0e0e0" },
  { name: "Enviada", value: 25, color: "#42a5f5" },
  { name: "Contraoferta", value: 10, color: "#ffca28" },
  { name: "Pendiente", value: 20, color: "#ff9800" },
  { name: "Aceptada", value: 12, color: "#4caf50" },
  { name: "Rechazada", value: 8, color: "#f44336" },
  { name: "Finalizada", value: 10, color: "#009688" },
]

export function OfferStatusDistributionChart() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={isMobile ? 80 : 100}
          innerRadius={isMobile ? 40 : 60}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value} ofertas`, "Cantidad"]}
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 8,
            fontSize: isMobile ? "0.75rem" : "0.875rem",
            boxShadow: theme.shadows[3],
          }}
        />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{ fontSize: isMobile ? "0.7rem" : "0.8rem" }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
