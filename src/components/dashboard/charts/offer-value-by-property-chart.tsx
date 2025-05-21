"use client"

import { useTheme, useMediaQuery } from "@mui/material"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Datos de ejemplo para el valor por tipo de propiedad
const data = [
  { name: "Apartamentos", value: 450000000, display: "450M" },
  { name: "Casas", value: 750000000, display: "750M" },
  { name: "Comerciales", value: 300000000, display: "300M" },
  { name: "Terrenos", value: 200000000, display: "200M" },
]

export function OfferValueByPropertyChart() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 5,
          right: isMobile ? 10 : 30,
          left: isMobile ? 60 : 80,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.5} />
        <XAxis type="number" domain={[0, "dataMax"]} hide />
        <YAxis dataKey="name" type="category" tick={{ fontSize: isMobile ? 10 : 12 }} width={80} />
        <Tooltip
          formatter={(value) => [`$${(value / 1000000).toFixed(1)}M`, "Valor"]}
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 8,
            fontSize: isMobile ? "0.75rem" : "0.875rem",
            boxShadow: theme.shadows[3],
          }}
          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
        />
        <Bar dataKey="value" fill="#1e88e5" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <text
              key={`label-${index}`}
              x="95%"
              y={index * 45 + 30}
              textAnchor="end"
              fill="#fff"
              fontSize={isMobile ? 10 : 12}
            >
              {entry.display}
            </text>
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
