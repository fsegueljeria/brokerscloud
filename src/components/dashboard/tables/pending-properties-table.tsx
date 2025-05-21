"use client"

import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
  Box,
  Chip,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
} from "@mui/material"
import { Home as HomeIcon } from "@mui/icons-material"

// Datos de ejemplo
const pendingProperties = [
  {
    id: 1,
    name: "Apartamento Centro",
    type: "APARTMENT",
    pendingPortals: ["Portal Inmobiliario", "Yapo.cl"],
  },
  {
    id: 2,
    name: "Casa Playa",
    type: "HOUSE",
    pendingPortals: ["TocToc", "Mercado Libre"],
  },
  {
    id: 3,
    name: "Local Comercial",
    type: "COMMERCIAL",
    pendingPortals: ["Portal Inmobiliario", "Zoom Inmobiliario"],
  },
  {
    id: 4,
    name: "Oficina Centro",
    type: "OFFICE",
    pendingPortals: ["Portal Inmobiliario"],
  },
]

const typeColors = {
  APARTMENT: "#2196f3",
  HOUSE: "#4caf50",
  COMMERCIAL: "#ff9800",
  OFFICE: "#9c27b0",
  LAND: "#795548",
}

export function PendingPropertiesTable() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  if (isMobile) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {pendingProperties.map((property) => (
          <Card key={property.id} variant="outlined" sx={{ mb: 0.5 }}>
            <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Avatar
                  sx={{
                    bgcolor: typeColors[property.type] || "#9e9e9e",
                    width: 32,
                    height: 32,
                    mr: 1.5,
                  }}
                >
                  <HomeIcon fontSize="small" />
                </Avatar>
                <Typography variant="subtitle2">{property.name}</Typography>
              </Box>

              <Box sx={{ pl: 0.5 }}>
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                  Pendiente en:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {property.pendingPortals.map((portal) => (
                    <Chip key={portal} label={portal} size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    )
  }

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper", p: 0 }}>
      {pendingProperties.map((property, index) => (
        <Box key={property.id}>
          {index > 0 && <Divider component="li" />}
          <ListItem alignItems="flex-start" sx={{ py: 1.5 }}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: typeColors[property.type] || "#9e9e9e" }}>
                <HomeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={property.name}
              secondary={
                <Box component="span" sx={{ mt: 0.5 }}>
                  <Typography component="span" variant="body2" color="text.primary">
                    Pendiente en:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
                    {property.pendingPortals.map((portal) => (
                      <Chip key={portal} label={portal} size="small" variant="outlined" />
                    ))}
                  </Box>
                </Box>
              }
            />
          </ListItem>
        </Box>
      ))}
    </List>
  )
}
