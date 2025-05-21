"use client"

import { useTheme, useMediaQuery } from "@mui/material"
import { FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer } from "recharts"

// Datos de ejemplo
const data = [
  { name: "Calificación", value: 120, fill: "#42a5f5" },
  { name: "Propuesta", value: 80, fill: "#ab47bc" },
  { name: "Negociación", value: 40, fill: "#ff9800" },
  { name: "Ganada", value: 25, fill: "#4caf50" },
]

interface OpportunitiesFunnelChartProps {
  timeRange: string
}

export function OpportunitiesFunnelChart({ timeRange }: OpportunitiesFunnelChartProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // En un caso real, aquí filtrarías los datos según el timeRange

  return (
    <ResponsiveContainer width="100%" height="100%">
      <FunnelChart>
        <Tooltip
          formatter={(value) => [`${value} oportunidades`]}
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 8,
            fontSize: isMobile ? "0.75rem" : "0.875rem",
          }}
        />
        <Funnel dataKey="value" data={data} isAnimationActive>
          <LabelList position="right" fill="#000" stroke="none" dataKey="name" fontSize={isMobile ? 10 : 12} />
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  )
}
