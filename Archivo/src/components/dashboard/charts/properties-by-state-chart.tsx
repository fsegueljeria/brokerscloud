"use client"

import { useTheme, useMediaQuery } from "@mui/material"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Datos de ejemplo
const data = [
  { name: "Disponible", value: 42, color: "#4caf50" },
  { name: "Reservada", value: 15, color: "#ff9800" },
  { name: "Vendida", value: 28, color: "#2196f3" },
  { name: "Alquilada", value: 18, color: "#9c27b0" },
  { name: "No Disponible", value: 7, color: "#f44336" },
]

export function PropertiesByStateChart() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: isMobile ? 10 : 30,
          left: isMobile ? 0 : 20,
          bottom: 5,
        }}
        barSize={isMobile ? 15 : 20}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: isMobile ? 10 : 12 }} tickMargin={isMobile ? 5 : 10} />
        <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} width={isMobile ? 25 : 35} />
        <Tooltip
          formatter={(value) => [`${value} propiedades`]}
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 8,
            fontSize: isMobile ? "0.75rem" : "0.875rem",
          }}
        />
        <Legend wrapperStyle={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }} />
        {data.map((entry, index) => (
          <Bar key={`bar-${index}`} dataKey="value" name={entry.name} fill={entry.color} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
