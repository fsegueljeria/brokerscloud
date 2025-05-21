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
import { Visibility as VisibilityIcon, Edit as EditIcon } from "@mui/icons-material"
import { formatCurrency } from "@/libs/utils"

// Datos de ejemplo
const pendingOffers = [
  {
    id: "1",
    property: "Apartamento en Centro",
    customer: "Juan Pérez",
    amount: 120000000,
    currency: "CLP",
    stage: "PENDING_CLIENT_APPROVAL",
    expirationDate: "2023-12-15",
  },
  {
    id: "2",
    property: "Casa en Zona Norte",
    customer: "María González",
    amount: 4500,
    currency: "UF",
    stage: "PENDING_OWNER_APPROVAL",
    expirationDate: "2023-12-20",
  },
  {
    id: "3",
    property: "Local Comercial",
    customer: "Carlos Rodríguez",
    amount: 250000,
    currency: "USD",
    stage: "PENDING_CAPTURER_APPROVAL",
    expirationDate: "2023-12-18",
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

  // Función para formatear fecha
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  // Renderizado para dispositivos móviles usando tarjetas en lugar de tabla
  if (isMobile) {
    return (
      <Box sx={{ maxHeight: 350, overflow: "auto" }}>
        <Stack spacing={1} sx={{ p: 1 }}>
          {pendingOffers.map((offer) => (
            <Card key={offer.id} variant="outlined" sx={{ bgcolor: "background.paper" }}>
              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                <Stack spacing={1}>
                  <Typography variant="subtitle2" noWrap fontWeight="bold">
                    {offer.property}
                  </Typography>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      {offer.customer}
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {formatCurrency(offer.amount, offer.currency)}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Chip
                      label={stageInfo[offer.stage]?.label || offer.stage}
                      color={stageInfo[offer.stage]?.color || "default"}
                      size="small"
                      sx={{ maxWidth: "60%" }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Expira: {formatDate(offer.expirationDate)}
                    </Typography>
                  </Stack>

                  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                    <Tooltip title="Ver detalles">
                      <IconButton size="small" color="primary">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar oferta">
                      <IconButton size="small" color="primary">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
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
            <TableCell sx={{ fontWeight: "bold" }}>Propiedad</TableCell>
            {!isTablet && <TableCell sx={{ fontWeight: "bold" }}>Cliente</TableCell>}
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Monto
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Estado
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Expira
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pendingOffers.map((offer) => (
            <TableRow key={offer.id} hover>
              <TableCell>
                <Tooltip title={offer.property}>
                  <Typography variant="body2" noWrap sx={{ maxWidth: isTablet ? 120 : 200 }}>
                    {offer.property}
                  </Typography>
                </Tooltip>
              </TableCell>
              {!isTablet && (
                <TableCell>
                  <Typography variant="body2">{offer.customer}</Typography>
                </TableCell>
              )}
              <TableCell align="right">
                <Typography variant="body2" fontWeight="medium">
                  {formatCurrency(offer.amount, offer.currency)}
                </Typography>
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
                <Typography variant="body2">{formatDate(offer.expirationDate)}</Typography>
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Tooltip title="Ver detalles">
                    <IconButton size="small" color="primary">
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar oferta">
                    <IconButton size="small" color="primary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
