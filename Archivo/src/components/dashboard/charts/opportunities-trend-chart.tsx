"use client"

import { useTheme, useMediaQuery } from "@mui/material"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Datos de ejemplo
const data = [
  { name: "Ene", nuevas: 40, ganadas: 24, perdidas: 10 },
  { name: "Feb", nuevas: 30, ganadas: 18, perdidas: 8 },
  { name: "Mar", nuevas: 45, ganadas: 28, perdidas: 12 },
  { name: "Abr", nuevas: 50, ganadas: 32, perdidas: 15 },
  { name: "May", nuevas: 65, ganadas: 40, perdidas: 20 },
  { name: "Jun", nuevas: 75, ganadas: 45, perdidas: 22 },
]

interface OpportunitiesTrendChartProps {
  timeRange: string
}

export function OpportunitiesTrendChart({ timeRange }: OpportunitiesTrendChartProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // En un caso real, aquí filtrarías los datos según el timeRange

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: isMobile ? 10 : 30,
          left: isMobile ? 0 : 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: isMobile ? 10 : 12 }} tickMargin={isMobile ? 5 : 10} />
        <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} width={isMobile ? 25 : 35} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 8,
            fontSize: isMobile ? "0.75rem" : "0.875rem",
          }}
        />
        <Legend wrapperStyle={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }} />
        <Line
          type="monotone"
          dataKey="nuevas"
          stroke="#2196f3"
          activeDot={{ r: isMobile ? 6 : 8 }}
          name="Nuevas"
          strokeWidth={isMobile ? 1.5 : 2}
        />
        <Line type="monotone" dataKey="ganadas" stroke="#4caf50" name="Ganadas" strokeWidth={isMobile ? 1.5 : 2} />
        <Line type="monotone" dataKey="perdidas" stroke="#f44336" name="Perdidas" strokeWidth={isMobile ? 1.5 : 2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
