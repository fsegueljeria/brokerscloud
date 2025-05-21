"use client"

import { useState, useEffect } from "react"

import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Avatar,
} from "@mui/material"
import {
  History as HistoryIcon,
  Edit as EditIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Comment as CommentIcon,
} from "@mui/icons-material"

import type { AuditLog } from "@/types/types"
import { offerService } from "@/libs/services/offer-service"
import { offerStageColors } from "@/libs/mock-data"

// Función para obtener el icono según el tipo de acción
const getActionIcon = (actionType: string) => {
  switch (actionType) {
    case "CAMBIO_ESTADO":
      return <HistoryIcon fontSize="small" />
    case "CAMBIO_MONTO":
    case "CAMBIO_COMISION":
      return <MoneyIcon fontSize="small" />
    case "CAMBIO_OBSERVACION":
      return <CommentIcon fontSize="small" />
    case "CAMBIO_FECHA_EXPIRACION":
      return <CalendarIcon fontSize="small" />
    case "CAMBIO_ASIGNACION":
      return <PersonIcon fontSize="small" />
    case "CREADO":
    case "ACTUALIZADO":
    case "ELIMINADO":
    default:
      return <EditIcon fontSize="small" />
  }
}

// Función para formatear el tipo de acción
const formatActionType = (actionType: string): string => {
  switch (actionType) {
    case "CAMBIO_ESTADO":
      return "Cambio de Estado"
    case "CAMBIO_MONTO":
      return "Cambio de Monto"
    case "CAMBIO_COMISION":
      return "Cambio de Comisión"
    case "CAMBIO_OBSERVACION":
      return "Cambio de Observación"
    case "CAMBIO_FECHA_EXPIRACION":
      return "Cambio de Fecha de Expiración"
    case "CAMBIO_ASIGNACION":
      return "Cambio de Asignación"
    case "CREADO":
      return "Creación"
    case "ACTUALIZADO":
      return "Actualización"
    case "ELIMINADO":
      return "Eliminación"
    default:
      return actionType
  }
}

// Componente para mostrar el valor anterior y nuevo en cambios de estado
const StateChangeValue = ({ value }: { value?: string }) => {
  if (!value || !offerStageColors[value as keyof typeof offerStageColors]) {
    return <span>-</span>
  }

  const stageColor = offerStageColors[value as keyof typeof offerStageColors]

  return (
    <Chip
      label={stageColor.label}
      size="small"
      sx={{
        bgcolor: stageColor.bg,
        color: stageColor.color,
        fontWeight: "medium",
      }}
    />
  )
}

export function OfferAuditLog({ offerId }: { offerId: number }) {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogs = async () => {
      // Simulamos una llamada a la API
      setTimeout(() => {
        const auditLogs = offerService.getAuditLogsByOfferId(offerId)

        setLogs(auditLogs)
        setLoading(false)
      }, 300)
    }

    fetchLogs()
  }, [offerId])

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Typography>Cargando historial de cambios...</Typography>
        </CardContent>
      </Card>
    )
  }

  if (logs.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Historial de Cambios
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography>No hay registros de cambios para esta oferta.</Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Historial de Cambios
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Acción</TableCell>
                <TableCell>Valor Anterior</TableCell>
                <TableCell>Nuevo Valor</TableCell>
                <TableCell>Usuario</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} hover>
                  <TableCell>
                    <Typography variant="body2">{new Date(log.timestamp).toLocaleDateString()}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {getActionIcon(log.actionType)}
                      <Typography variant="body2">{formatActionType(log.actionType)}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {log.actionType === "CAMBIO_ESTADO" ? (
                      <StateChangeValue value={log.previousValue} />
                    ) : (
                      <Typography variant="body2">{log.previousValue || "-"}</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {log.actionType === "CAMBIO_ESTADO" ? (
                      <StateChangeValue value={log.newValue} />
                    ) : (
                      <Typography variant="body2">{log.newValue || "-"}</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          fontSize: "0.75rem",
                          bgcolor: "primary.main",
                        }}
                      >
                        {log.userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar>
                      <Typography variant="body2">{log.userName}</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}
