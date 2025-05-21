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

export function LeadForm({ isOpen, onClose, onSubmit, initialData }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isXsScreen = useMediaQuery(theme.breakpoints.down("xs") || "(max-width:450px)")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    propertyId: "",
    propertyTitle: "",
    notes: "",
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        source: initialData.source || "",
        propertyId: initialData.propertyId || "",
        propertyTitle: initialData.propertyTitle || "",
        notes: initialData.notes || "",
      })
    } else {
      // Resetear el formulario si es un nuevo lead
      setFormData({
        name: "",
        email: "",
        phone: "",
        source: "",
        propertyId: "",
        propertyTitle: "",
        notes: "",
      })
    }
    setErrors({})
  }, [initialData, isOpen])

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

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    if (!formData.source) {
      newErrors.source = "La fuente es obligatoria"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth fullScreen={isMobile}>
      <DialogTitle sx={{ p: isMobile ? 2 : 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
            {initialData ? "Editar Lead" : "Nuevo Lead"}
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ p: isMobile ? 2 : 3 }}>
        <Grid container spacing={isMobile ? 1 : 2} sx={{ mt: isMobile ? 0.5 : 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="name"
              label="Nombre"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.name}
              helperText={errors.name}
              size={isMobile ? "small" : "medium"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email}
              size={isMobile ? "small" : "medium"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="phone"
              label="Teléfono"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              size={isMobile ? "small" : "medium"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required error={!!errors.source} size={isMobile ? "small" : "medium"}>
              <InputLabel id="source-label">Fuente</InputLabel>
              <Select
                labelId="source-label"
                name="source"
                value={formData.source}
                onChange={handleChange}
                label="Fuente"
              >
                <MenuItem value="">Seleccionar</MenuItem>
                <MenuItem value="Portal Inmobiliario">Portal Inmobiliario</MenuItem>
                <MenuItem value="Yapo.cl">Yapo.cl</MenuItem>
                <MenuItem value="Sitio web">Sitio web</MenuItem>
                <MenuItem value="Referido">Referido</MenuItem>
                <MenuItem value="Instagram">Instagram</MenuItem>
                <MenuItem value="Facebook">Facebook</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
              </Select>
              {errors.source && (
                <Typography variant="caption" color="error">
                  {errors.source}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="propertyId"
              label="ID de Propiedad"
              value={formData.propertyId}
              onChange={handleChange}
              fullWidth
              size={isMobile ? "small" : "medium"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="propertyTitle"
              label="Título de Propiedad"
              value={formData.propertyTitle}
              onChange={handleChange}
              fullWidth
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
          {initialData ? "Actualizar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
