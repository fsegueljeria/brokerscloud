"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
} from "@mui/material"
import { Visibility as VisibilityIcon } from "@mui/icons-material"

// Datos de ejemplo
const pendingOffers = [
  {
    id: "OF-2023-001",
    property: "Apartamento en Centro",
    customer: "Juan Pérez",
    stage: "PENDING_CLIENT_APPROVAL",
  },
  {
    id: "OF-2023-002",
    property: "Casa en Zona Norte",
    customer: "María González",
    stage: "PENDING_OWNER_APPROVAL",
  },
  {
    id: "OF-2023-003",
    property: "Local Comercial",
    customer: "Carlos Rodríguez",
    stage: "PENDING_CAPTURER_APPROVAL",
  },
]

// Mapeo de etapas a colores y etiquetas
const stageInfo = {
  PENDING_CLIENT_APPROVAL: { color: "success", label: "Pendiente Cliente" },
  PENDING_OWNER_APPROVAL: { color: "primary", label: "Pendiente Propietario" },
  PENDING_CAPTURER_APPROVAL: { color: "warning", label: "Pendiente Captador" },
  PENDING_PLACER_APPROVAL: { color: "info", label: "Pendiente Colocador" },
}

export function PendingOffersTable() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  // Renderizado para dispositivos móviles usando tarjetas en lugar de tabla
  if (isMobile) {
    return (
      <Box sx={{ maxHeight: 350, overflow: "auto" }}>
        <Stack spacing={1} sx={{ p: 1 }}>
          {pendingOffers.map((offer) => (
            <Card key={offer.id} variant="outlined" sx={{ bgcolor: "background.paper" }}>
              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    {offer.id}
                  </Typography>

                  <Typography variant="subtitle2" noWrap fontWeight="bold">
                    {offer.property}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {offer.customer}
                  </Typography>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Chip
                      label={stageInfo[offer.stage]?.label || offer.stage}
                      color={stageInfo[offer.stage]?.color || "default"}
                      size="small"
                      sx={{ maxWidth: "60%" }}
                    />
                    <Tooltip title="Ver detalles">
                      <IconButton size="small" color="primary">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    )
  }

  // Renderizado para tablets y escritorio
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
        borderRadius: 2,
        overflow: "hidden",
        maxHeight: 350,
      }}
    >
      <Table size={isTablet ? "small" : "medium"} stickyHeader>
        <TableHead>
          <TableRow sx={{ bgcolor: theme.palette.mode === "dark" ? "grey.800" : "grey.100" }}>
            <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Propiedad</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Cliente</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Estado
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Acción
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pendingOffers.map((offer) => (
            <TableRow key={offer.id} hover>
              <TableCell>
                <Typography variant="body2">{offer.id}</Typography>
              </TableCell>
              <TableCell>
                <Tooltip title={offer.property}>
                  <Typography variant="body2" noWrap sx={{ maxWidth: isTablet ? 120 : 200 }}>
                    {offer.property}
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{offer.customer}</Typography>
              </TableCell>
              <TableCell align="center">
                <Chip
                  label={stageInfo[offer.stage]?.label || offer.stage}
                  color={stageInfo[offer.stage]?.color || "default"}
                  size="small"
                  sx={{ minWidth: isTablet ? 80 : 120 }}
                />
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Ver detalles">
                  <IconButton size="small" color="primary">
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
