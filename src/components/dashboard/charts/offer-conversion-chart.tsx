"use client"

import { useTheme, useMediaQuery } from "@mui/material"
import { FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer } from "recharts"

// Datos de ejemplo para el embudo de conversión
const data = [
  { name: "Ofertas Enviadas", value: 100, fill: "#42a5f5" },
  { name: "Análisis Cliente", value: 80, fill: "#ab47bc" },
  { name: "Revisión Condiciones", value: 60, fill: "#ff9800" },
  { name: "Negociación", value: 40, fill: "#f06292" },
  { name: "Aceptadas", value: 25, fill: "#4caf50" },
  { name: "Cerradas", value: 20, fill: "#009688" },
]

export function OfferConversionChart() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <FunnelChart>
        <Tooltip
          formatter={(value) => [`${value} ofertas`, "Cantidad"]}
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 8,
            fontSize: isMobile ? "0.75rem" : "0.875rem",
            boxShadow: theme.shadows[3],
          }}
        />
        <Funnel dataKey="value" data={data} isAnimationActive>
          <LabelList position="right" fill="#000" stroke="none" dataKey="name" fontSize={isMobile ? 10 : 12} />
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  )
}
