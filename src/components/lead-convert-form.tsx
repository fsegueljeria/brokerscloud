"use client"

import { useState, useEffect } from "react"

import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormHelperText,
  Typography,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

export function LeadConvertForm({ isOpen, onClose, onSubmit, lead }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isXsScreen = useMediaQuery(theme.breakpoints.down("xs") || "(max-width:450px)")

  const [formData, setFormData] = useState({
    title: "",
    status: "Nueva",
    value: "",
    probability: "",
    estimatedCloseDate: "",
    notes: "",
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (lead) {
      setFormData({
        title: `Oportunidad para ${lead.name}`,
        status: "Nueva",
        value: "",
        probability: "50",
        estimatedCloseDate: "",
        notes: `Convertido desde lead. Propiedad de interés: ${lead.propertyTitle || "No especificada"}`,
      })
    }

    setErrors({})
  }, [lead, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })


    // Limpiar error cuando el usuario escribe
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "El título es obligatorio"
    }

    if (!formData.status) {
      newErrors.status = "El estado es obligatorio"
    }

    if (!formData.value) {
      newErrors.value = "El valor es obligatorio"
    } else if (isNaN(formData.value) || Number(formData.value) <= 0) {
      newErrors.value = "El valor debe ser un número positivo"
    }

    if (!formData.probability) {
      newErrors.probability = "La probabilidad es obligatoria"
    } else if (isNaN(formData.probability) || Number(formData.probability) < 0 || Number(formData.probability) > 100) {
      newErrors.probability = "La probabilidad debe ser un número entre 0 y 100"
    }

    if (!formData.estimatedCloseDate) {
      newErrors.estimatedCloseDate = "La fecha estimada de cierre es obligatoria"
    }

    setErrors(newErrors)
    
return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm() && lead) {
      onSubmit(lead.id, formData)
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth fullScreen={isMobile}>
      <DialogTitle sx={{ p: isMobile ? 2 : 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
            Convertir Lead a Oportunidad
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ p: isMobile ? 2 : 3 }}>
        {lead && (
          <Box sx={{ mb: isMobile ? 2 : 3, p: isMobile ? 1 : 2, bgcolor: "background.paper", borderRadius: 1 }}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, fontWeight: "medium" }}
            >
              Convertir a {lead.name} en una oportunidad
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
              Email: {lead.email} | Teléfono: {lead.phone || "No disponible"}
            </Typography>
            {lead.propertyTitle && (
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
                Propiedad de interés: {lead.propertyTitle}
              </Typography>
            )}
          </Box>
        )}
        <Grid container spacing={isMobile ? 1 : 2} sx={{ mt: isMobile ? 0.5 : 1 }}>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Título de la oportunidad"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.title}
              helperText={errors.title}
              size={isMobile ? "small" : "medium"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required error={!!errors.status} size={isMobile ? "small" : "medium"}>
              <InputLabel id="status-label">Estado</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={formData.status}
                onChange={handleChange}
                label="Estado"
              >
                <MenuItem value="Nueva">Nueva</MenuItem>
                <MenuItem value="En proceso">En proceso</MenuItem>
                <MenuItem value="Propuesta">Propuesta</MenuItem>
                <MenuItem value="Negociación">Negociación</MenuItem>
              </Select>
              {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="value"
              label="Valor ($)"
              type="number"
              value={formData.value}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.value}
              helperText={errors.value}
              InputProps={{
                inputProps: { min: 0 },
              }}
              size={isMobile ? "small" : "medium"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="probability"
              label="Probabilidad (%)"
              type="number"
              value={formData.probability}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.probability}
              helperText={errors.probability}
              InputProps={{
                inputProps: { min: 0, max: 100 },
              }}
              size={isMobile ? "small" : "medium"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="estimatedCloseDate"
              label="Fecha estimada de cierre"
              type="date"
              value={formData.estimatedCloseDate}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.estimatedCloseDate}
              helperText={errors.estimatedCloseDate}
              InputLabelProps={{
                shrink: true,
              }}
              size={isMobile ? "small" : "medium"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="notes"
              label="Notas"
              value={formData.notes}
              onChange={handleChange}
              fullWidth
              multiline
              rows={isMobile ? 3 : 4}
              size={isMobile ? "small" : "medium"}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: isMobile ? 1.5 : 2, justifyContent: "space-between" }}>
        <Button onClick={onClose} color="inherit" size={isMobile ? "small" : "medium"}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" size={isMobile ? "small" : "medium"}>
          Convertir
        </Button>
      </DialogActions>
    </Dialog>
  )
}
