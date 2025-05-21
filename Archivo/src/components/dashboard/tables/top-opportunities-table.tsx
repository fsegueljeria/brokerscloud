"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
} from "@mui/material"

// Datos de ejemplo
const topOpportunities = [
  {
    id: 1,
    name: "Apartamento Centro",
    stage: "NEGOTIATION",
    probability: 75,
    amount: 250000,
    curCode: "EUR",
    agent: "Ana García",
    contact: "Carlos Rodríguez",
  },
  {
    id: 2,
    name: "Casa Playa",
    stage: "PROPOSAL",
    probability: 60,
    amount: 450000,
    curCode: "EUR",
    agent: "Pedro Martínez",
    contact: "Laura Sánchez",
  },
  {
    id: 3,
    name: "Local Comercial",
    stage: "QUALIFICATION",
    probability: 45,
    amount: 180000,
    curCode: "EUR",
    agent: "Ana García",
    contact: "Miguel Torres",
  },
  {
    id: 4,
    name: "Chalet Montaña",
    stage: "PROPOSAL",
    probability: 55,
    amount: 350000,
    curCode: "EUR",
    agent: "Ana García",
    contact: "Roberto Fernández",
  },
  {
    id: 5,
    name: "Oficina Centro",
    stage: "NEGOTIATION",
    probability: 70,
    amount: 280000,
    curCode: "EUR",
    agent: "Pedro Martínez",
    contact: "Isabel Díaz",
  },
]

const stageColors = {
  QUALIFICATION: { bgcolor: "#e3f2fd", color: "#1565c0", label: "Calificación" },
  PROPOSAL: { bgcolor: "#f3e5f5", color: "#7b1fa2", label: "Propuesta" },
  NEGOTIATION: { bgcolor: "#fff8e1", color: "#f57f17", label: "Negociación" },
  CLOSED_WON: { bgcolor: "#e8f5e9", color: "#2e7d32", label: "Ganada" },
  CLOSED_LOST: { bgcolor: "#ffebee", color: "#c62828", label: "Perdida" },
}

export function TopOpportunitiesTable() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // Ordenar por probabilidad y monto
  const sortedOpportunities = [...topOpportunities].sort((a, b) => {
    if (b.probability === a.probability) {
      return b.amount - a.amount
    }
    return b.probability - a.probability
  })

  if (isMobile) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sortedOpportunities.map((opportunity) => {
          const stage = stageColors[opportunity.stage]
          return (
            <Card key={opportunity.id} variant="outlined" sx={{ mb: 1 }}>
              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                  <Typography variant="subtitle1" component="div" fontWeight="medium">
                    {opportunity.name}
                  </Typography>
                  <Chip label={stage.label} size="small" sx={{ bgcolor: stage.bgcolor, color: stage.color }} />
                </Box>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {opportunity.contact}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                  <Typography variant="body2" fontWeight="medium">
                    {new Intl.NumberFormat("es-ES", {
                      style: "currency",
                      currency: opportunity.curCode,
                    }).format(opportunity.amount)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {opportunity.agent}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mt: 1.5 }}>
                  <Box sx={{ width: "100%", mr: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={opportunity.probability}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: "#e0e0e0",
                        "& .MuiLinearProgress-bar": {
                          bgcolor:
                            opportunity.probability > 70
                              ? "#4caf50"
                              : opportunity.probability > 40
                                ? "#ff9800"
                                : "#f44336",
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${opportunity.probability}%`}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )
        })}
      </Box>
    )
  }

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Oportunidad</TableCell>
            <TableCell>Etapa</TableCell>
            <TableCell>Monto</TableCell>
            <TableCell>Probabilidad</TableCell>
            <TableCell>Agente</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedOpportunities.map((opportunity) => {
            const stage = stageColors[opportunity.stage]
            return (
              <TableRow key={opportunity.id} hover>
                <TableCell>
                  <Typography variant="body2" component="span" fontWeight="medium" display="block">
                    {opportunity.name}
                  </Typography>
                  <Typography variant="caption" component="span" color="text.secondary" display="block">
                    {opportunity.contact}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip label={stage.label} size="small" sx={{ bgcolor: stage.bgcolor, color: stage.color }} />
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: opportunity.curCode,
                  }).format(opportunity.amount)}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ width: "100%", mr: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={opportunity.probability}
                        sx={{
                          height: 8,
                          borderRadius: 5,
                          bgcolor: "#e0e0e0",
                          "& .MuiLinearProgress-bar": {
                            bgcolor:
                              opportunity.probability > 70
                                ? "#4caf50"
                                : opportunity.probability > 40
                                  ? "#ff9800"
                                  : "#f44336",
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                      <Typography variant="body2" color="text.secondary">{`${opportunity.probability}%`}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{opportunity.agent}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
