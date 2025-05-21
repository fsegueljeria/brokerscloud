"use client"

import { useTheme, useMediaQuery } from "@mui/material"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Datos de ejemplo para la tendencia temporal
const data = [
  { month: "Ene", enviadas: 12, aceptadas: 5, rechazadas: 3, finalizadas: 2 },
  { month: "Feb", enviadas: 15, aceptadas: 7, rechazadas: 4, finalizadas: 3 },
  { month: "Mar", enviadas: 20, aceptadas: 10, rechazadas: 5, finalizadas: 4 },
  { month: "Abr", enviadas: 25, aceptadas: 12, rechazadas: 6, finalizadas: 5 },
  { month: "May", enviadas: 30, aceptadas: 15, rechazadas: 8, finalizadas: 7 },
  { month: "Jun", enviadas: 28, aceptadas: 14, rechazadas: 7, finalizadas: 6 },
]

export function OfferTimelineChart() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: isMobile ? 10 : 30,
          left: isMobile ? 5 : 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
        <XAxis dataKey="month" tick={{ fontSize: isMobile ? 10 : 12 }} />
        <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} width={isMobile ? 25 : 35} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 8,
            fontSize: isMobile ? "0.75rem" : "0.875rem",
            boxShadow: theme.shadows[3],
          }}
        />
        <Legend wrapperStyle={{ fontSize: isMobile ? "0.7rem" : "0.8rem" }} />
        <Line
          type="monotone"
          dataKey="enviadas"
          stroke="#42a5f5"
          strokeWidth={2}
          activeDot={{ r: 6 }}
          name="Enviadas"
        />
        <Line type="monotone" dataKey="aceptadas" stroke="#4caf50" strokeWidth={2} name="Aceptadas" />
        <Line type="monotone" dataKey="rechazadas" stroke="#f44336" strokeWidth={2} name="Rechazadas" />
        <Line type="monotone" dataKey="finalizadas" stroke="#009688" strokeWidth={2} name="Finalizadas" />
      </LineChart>
    </ResponsiveContainer>
  )
}
