"use client"

import { useState } from "react"

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material"
import {
  TrendingUp as TrendingUpIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material"

import { formatCurrency } from "@/libs/utils"

// Datos de ejemplo
const summaryData = {
  totalProperties: 48,
  activeOpportunities: 32,
  pendingOffers: 12,
  totalSales: {
    amount: 850000000,
    currency: "CLP",
    trend: 12.5,
  },
}
interface SummaryCardsProps {
  timeRange: string;
}

export function SummaryCards({ timeRange }: SummaryCardsProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, cardId) => {
    setAnchorEl(event.currentTarget)
    setSelectedCard(cardId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedCard(null)
  }

  // Configuración de las tarjetas
  const cards = [
    {
      id: "properties",
      title: "Propiedades",
      value: summaryData.totalProperties,
      icon: <HomeIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.main,
      lightColor: theme.palette.primary.light,
    },
    {
      id: "opportunities",
      title: "Oportunidades",
      value: summaryData.activeOpportunities,
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.success.main,
      lightColor: theme.palette.success.light,
    },
    {
      id: "offers",
      title: "Ofertas Pendientes",
      value: summaryData.pendingOffers,
      icon: <MoneyIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.warning.main,
      lightColor: theme.palette.warning.light,
    },
    {
      id: "sales",
      title: "Ventas Totales",
      value: formatCurrency(summaryData.totalSales.amount, summaryData.totalSales.currency),
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.info.main,
      lightColor: theme.palette.info.light,
      trend: summaryData.totalSales.trend,
    },
  ]

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={3} key={card.id}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 2,
              boxShadow: 2,
              position: "relative",
              overflow: "visible",
              "&:hover": {
                boxShadow: 4,
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -15,
                left: 20,
                width: 60,
                height: 60,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: card.color,
                color: "white",
                boxShadow: 2,
              }}
            >
              {card.icon}
            </Box>
            <CardContent sx={{ pt: 5, pb: 2, pl: 2, pr: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Typography variant="h6" component="div" color="text.secondary" gutterBottom>
                  {card.title}
                </Typography>
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuClick(e, card.id)}
                  sx={{ mt: -1, mr: -1 }}
                  aria-label="más opciones"
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: "bold", my: 1 }}>
                {card.value}
              </Typography>
              {card.trend && (
                <Chip
                  icon={<TrendingUpIcon fontSize="small" />}
                  label={`+${card.trend}%`}
                  size="small"
                  color="success"
                  sx={{ mt: 1 }}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Ver detalles</MenuItem>
        <MenuItem onClick={handleMenuClose}>Exportar datos</MenuItem>
        <MenuItem onClick={handleMenuClose}>Configurar alertas</MenuItem>
      </Menu>
    </Grid>
  )
}
