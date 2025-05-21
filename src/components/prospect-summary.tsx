"use client"

import { useState } from "react"

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import BusinessIcon from "@mui/icons-material/Business"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import CloseIcon from "@mui/icons-material/Close"

import type { Prospect, ProspectStatus, ProspectType, TypePropertyType } from "@/types/types"

interface ProspectSummaryProps {
  prospect: Prospect
  onBack: () => void
  onEdit: (prospect: Prospect) => void
  onDelete: (id: number) => void
  isOpen: boolean
  onClose: () => void
}

export function ProspectSummary({ prospect, onBack, onEdit, onDelete, isOpen, onClose }: ProspectSummaryProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (!prospect) return null

  const getStatusColor = (status: ProspectStatus) => {
    switch (status) {
      case "ACTIVO":
        return "success"
      case "INACTIVO":
        return "default"
      case "POTENCIAL":
        return "info"
      case "CALIFICADO":
        return "primary"
      case "CONVERTIDO":
        return "secondary"
      case "PERDIDO":
        return "error"
      default:
        return "default"
    }
  }

  const getStatusLabel = (status: ProspectStatus) => {
    switch (status) {
      case "ACTIVO":
        return "Activo"
      case "INACTIVO":
        return "Inactivo"
      case "POTENCIAL":
        return "Potencial"
      case "CALIFICADO":
        return "Calificado"
      case "CONVERTIDO":
        return "Convertido"
      case "PERDIDO":
        return "Perdido"
      default:
        return status
    }
  }

  const getTypeLabel = (type: ProspectType) => {
    switch (type) {
      case "COMPRADOR":
        return "Comprador"
      case "VENDEDOR":
        return "Vendedor"
      case "INVERSIONISTA":
        return "Inversionista"
      case "ARRENDATARIO":
        return "Arrendatario"
      case "PROPIETARIO":
        return "Propietario"
      case "OTRO":
        return "Otro"
      default:
        return type
    }
  }

  const getPropertyTypeLabel = (type: TypePropertyType) => {
    switch (type) {
      case "APARTAMENTO":
        return "Apartamento"
      case "CASA":
        return "Casa"
      case "TERRENO":
        return "Terreno"
      case "COMERCIAL":
        return "Local Comercial"
      case "OFICINA":
        return "Oficina"
      case "GARAGE":
        return "Garaje"
      case "ALMACEN":
        return "Almacén"
      case "OTRO":
        return "Otro"
      default:
        return type
    }
  }

  const handleDeleteClick = () => {
    setConfirmDelete(true)
  }

  const handleConfirmDelete = () => {
    onDelete(prospect.id)
    setConfirmDelete(false)
    onClose()
  }

  const handleCancelDelete = () => {
    setConfirmDelete(false)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth fullScreen={isMobile}>
      <DialogTitle sx={{ p: isMobile ? 2 : 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <IconButton edge="start" color="inherit" onClick={onBack} aria-label="back" sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
              Detalles del Prospecto
            </Typography>
          </Box>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ p: isMobile ? 2 : 3 }}>
        <Box sx={{ mb: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap">
            <Box>
              <Typography variant="h5" component="h1" gutterBottom>
                {prospect.firstName} {prospect.lastName}
              </Typography>
              <Box display="flex" alignItems="center" flexWrap="wrap" gap={1} mb={1}>
                <Chip
                  label={getStatusLabel(prospect.status)}
                  color={getStatusColor(prospect.status)}
                  size={isMobile ? "small" : "medium"}
                />
                <Chip label={getTypeLabel(prospect.type)} variant="outlined" size={isMobile ? "small" : "medium"} />
                {prospect.source && (
                  <Chip label={prospect.source} variant="outlined" size={isMobile ? "small" : "medium"} />
                )}
              </Box>
            </Box>
            <Box display="flex" gap={1} mt={isMobile ? 2 : 0}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => onEdit(prospect)}
                size={isMobile ? "small" : "medium"}
              >
                Editar
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteClick}
                size={isMobile ? "small" : "medium"}
              >
                Eliminar
              </Button>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Información de Contacto
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <EmailIcon fontSize="small" color="action" />
                    <Typography variant="body2">{prospect.email}</Typography>
                  </Box>
                  {prospect.phone && (
                    <Box display="flex" alignItems="center" gap={1}>
                      <PhoneIcon fontSize="small" color="action" />
                      <Typography variant="body2">{prospect.phone}</Typography>
                    </Box>
                  )}
                  {prospect.secondaryPhone && (
                    <Box display="flex" alignItems="center" gap={1}>
                      <PhoneIcon fontSize="small" color="action" />
                      <Typography variant="body2">{prospect.secondaryPhone} (Secundario)</Typography>
                    </Box>
                  )}
                  {prospect.preferredContactMethod && (
                    <Box display="flex" alignItems="center" gap={1}>
                      {prospect.preferredContactMethod === "EMAIL" && <EmailIcon fontSize="small" color="action" />}
                      {prospect.preferredContactMethod === "PHONE" && <PhoneIcon fontSize="small" color="action" />}
                      {prospect.preferredContactMethod === "WHATSAPP" && (
                        <WhatsAppIcon fontSize="small" color="action" />
                      )}
                      <Typography variant="body2">
                        Método preferido: {prospect.preferredContactMethod === "EMAIL" && "Email"}
                        {prospect.preferredContactMethod === "PHONE" && "Teléfono"}
                        {prospect.preferredContactMethod === "WHATSAPP" && "WhatsApp"}
                        {prospect.preferredContactMethod === "PRESENCIAL" && "En persona"}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>

            {(prospect.company || prospect.position) && (
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Información Laboral
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {prospect.company && (
                      <Box display="flex" alignItems="center" gap={1}>
                        <BusinessIcon fontSize="small" color="action" />
                        <Typography variant="body2">{prospect.company}</Typography>
                      </Box>
                    )}
                    {prospect.position && (
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2">Cargo: {prospect.position}</Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            )}

            {(prospect.address || prospect.city || prospect.province || prospect.country) && (
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Dirección
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Box display="flex" alignItems="flex-start" gap={1}>
                      <LocationOnIcon fontSize="small" color="action" sx={{ mt: 0.5 }} />
                      <Typography variant="body2">
                        {prospect.address && `${prospect.address}, `}
                        {prospect.city && `${prospect.city}, `}
                        {prospect.province && `${prospect.province}, `}
                        {prospect.country && `${prospect.country} `}
                        {prospect.postalCode && `(${prospect.postalCode})`}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            )}

            {prospect.budget && (
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Presupuesto
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <AttachMoneyIcon fontSize="small" color="action" />
                      <Typography variant="body2">
                        {prospect.budget.toLocaleString()} {prospect.budgetCurrency}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            )}

            {prospect.tags && prospect.tags.length > 0 && (
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Etiquetas
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {prospect.tags.map((tag, index) => (
                      <Chip key={index} label={tag} size="small" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            {prospect.propertyPreferences && (
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Preferencias de Propiedad
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {prospect.propertyPreferences.types && prospect.propertyPreferences.types.length > 0 && (
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>
                          Tipos de propiedad
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {prospect.propertyPreferences.types.map((type, index) => (
                            <Chip
                              key={index}
                              label={getPropertyTypeLabel(type as TypePropertyType)}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </Box>
                    )}

                    {(prospect.propertyPreferences.minBedrooms !== undefined ||
                      prospect.propertyPreferences.maxBedrooms !== undefined) && (
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>
                          Dormitorios
                        </Typography>
                        <Typography variant="body2">
                          {prospect.propertyPreferences.minBedrooms !== undefined &&
                            `Mínimo: ${prospect.propertyPreferences.minBedrooms}`}
                          {prospect.propertyPreferences.minBedrooms !== undefined &&
                            prospect.propertyPreferences.maxBedrooms !== undefined &&
                            " - "}
                          {prospect.propertyPreferences.maxBedrooms !== undefined &&
                            `Máximo: ${prospect.propertyPreferences.maxBedrooms}`}
                        </Typography>
                      </Box>
                    )}

                    {(prospect.propertyPreferences.minBathrooms !== undefined ||
                      prospect.propertyPreferences.maxBathrooms !== undefined) && (
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>
                          Baños
                        </Typography>
                        <Typography variant="body2">
                          {prospect.propertyPreferences.minBathrooms !== undefined &&
                            `Mínimo: ${prospect.propertyPreferences.minBathrooms}`}
                          {prospect.propertyPreferences.minBathrooms !== undefined &&
                            prospect.propertyPreferences.maxBathrooms !== undefined &&
                            " - "}
                          {prospect.propertyPreferences.maxBathrooms !== undefined &&
                            `Máximo: ${prospect.propertyPreferences.maxBathrooms}`}
                        </Typography>
                      </Box>
                    )}

                    {(prospect.propertyPreferences.minArea !== undefined ||
                      prospect.propertyPreferences.maxArea !== undefined) && (
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>
                          Superficie (m²)
                        </Typography>
                        <Typography variant="body2">
                          {prospect.propertyPreferences.minArea !== undefined &&
                            `Mínimo: ${prospect.propertyPreferences.minArea} m²`}
                          {prospect.propertyPreferences.minArea !== undefined &&
                            prospect.propertyPreferences.maxArea !== undefined &&
                            " - "}
                          {prospect.propertyPreferences.maxArea !== undefined &&
                            `Máximo: ${prospect.propertyPreferences.maxArea} m²`}
                        </Typography>
                      </Box>
                    )}

                    {prospect.propertyPreferences.locations && prospect.propertyPreferences.locations.length > 0 && (
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>
                          Ubicaciones preferidas
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {prospect.propertyPreferences.locations.map((location, index) => (
                            <Chip key={index} label={location} size="small" variant="outlined" />
                          ))}
                        </Box>
                      </Box>
                    )}

                    {prospect.propertyPreferences.features && prospect.propertyPreferences.features.length > 0 && (
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>
                          Características deseadas
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {prospect.propertyPreferences.features.map((feature, index) => (
                            <Chip key={index} label={feature} size="small" variant="outlined" />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            )}

            {prospect.notes && (
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Notas
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                    {prospect.notes}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: isMobile ? 1.5 : 2, justifyContent: "space-between" }}>
        <Button onClick={onBack} startIcon={<ArrowBackIcon />} size={isMobile ? "small" : "medium"}>
          Volver a la lista
        </Button>
        <Button
          onClick={() => onEdit(prospect)}
          variant="contained"
          startIcon={<EditIcon />}
          size={isMobile ? "small" : "medium"}
        >
          Editar
        </Button>
      </DialogActions>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog open={confirmDelete} onClose={handleCancelDelete}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Está seguro de que desea eliminar el prospecto {prospect.firstName} {prospect.lastName}? Esta acción no se
            puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  )
}
