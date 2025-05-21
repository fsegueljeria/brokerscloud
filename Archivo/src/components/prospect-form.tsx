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
  Divider,
  Chip,
  Autocomplete,
  FormHelperText,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import type { Prospect, ProspectStatus, ProspectType, TypePropertyType } from "@/types/types"

interface ProspectFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Partial<Prospect>) => void
  initialData?: Prospect
}

export function ProspectForm({ isOpen, onClose, onSubmit, initialData }: ProspectFormProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [formData, setFormData] = useState<Partial<Prospect>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    secondaryPhone: "",
    address: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
    company: "",
    position: "",
    status: "POTENTIAL",
    type: "BUYER",
    source: "",
    budget: undefined,
    budgetCurrency: "CLP",
    preferredContactMethod: "EMAIL",
    notes: "",
    tags: [],
    propertyPreferences: {
      types: [],
      minBedrooms: undefined,
      maxBedrooms: undefined,
      minBathrooms: undefined,
      maxBathrooms: undefined,
      minArea: undefined,
      maxArea: undefined,
      locations: [],
      features: [],
    },
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        propertyPreferences: initialData.propertyPreferences || {
          types: [],
          locations: [],
          features: [],
        },
      })
    } else {
      // Resetear el formulario si es un nuevo prospecto
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        secondaryPhone: "",
        address: "",
        city: "",
        province: "",
        country: "",
        postalCode: "",
        company: "",
        position: "",
        status: "POTENTIAL",
        type: "BUYER",
        source: "",
        budget: undefined,
        budgetCurrency: "CLP",
        preferredContactMethod: "EMAIL",
        notes: "",
        tags: [],
        propertyPreferences: {
          types: [],
          minBedrooms: undefined,
          maxBedrooms: undefined,
          minBathrooms: undefined,
          maxBathrooms: undefined,
          minArea: undefined,
          maxArea: undefined,
          locations: [],
          features: [],
        },
      })
    }
    setErrors({})
  }, [initialData, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target

    // Manejo especial para campos anidados (propertyPreferences)
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }

    // Limpiar error cuando el usuario escribe
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const handleTagsChange = (event, newValue) => {
    setFormData({
      ...formData,
      tags: newValue,
    })
  }

  const handlePropertyTypesChange = (event, newValue) => {
    setFormData({
      ...formData,
      propertyPreferences: {
        ...formData.propertyPreferences,
        types: newValue,
      },
    })
  }

  const handleLocationsChange = (event, newValue) => {
    setFormData({
      ...formData,
      propertyPreferences: {
        ...formData.propertyPreferences,
        locations: newValue,
      },
    })
  }

  const handleFeaturesChange = (event, newValue) => {
    setFormData({
      ...formData,
      propertyPreferences: {
        ...formData.propertyPreferences,
        features: newValue,
      },
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName?.trim()) {
      newErrors.firstName = "El nombre es obligatorio"
    }

    if (!formData.lastName?.trim()) {
      newErrors.lastName = "El apellido es obligatorio"
    }

    if (!formData.email?.trim()) {
      newErrors.email = "El email es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    if (!formData.status) {
      newErrors.status = "El estado es obligatorio"
    }

    if (!formData.type) {
      newErrors.type = "El tipo es obligatorio"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const getStatusLabel = (status: ProspectStatus) => {
    switch (status) {
      case "ACTIVE":
        return "Activo"
      case "INACTIVE":
        return "Inactivo"
      case "POTENTIAL":
        return "Potencial"
      case "QUALIFIED":
        return "Calificado"
      case "CONVERTED":
        return "Convertido"
      case "LOST":
        return "Perdido"
      default:
        return status
    }
  }

  const getTypeLabel = (type: ProspectType) => {
    switch (type) {
      case "BUYER":
        return "Comprador"
      case "SELLER":
        return "Vendedor"
      case "INVESTOR":
        return "Inversionista"
      case "TENANT":
        return "Arrendatario"
      case "LANDLORD":
        return "Propietario"
      case "OTHER":
        return "Otro"
      default:
        return type
    }
  }

  const getPropertyTypeLabel = (type: TypePropertyType) => {
    switch (type) {
      case "APARTMENT":
        return "Apartamento"
      case "HOUSE":
        return "Casa"
      case "LAND":
        return "Terreno"
      case "COMMERCIAL":
        return "Local Comercial"
      case "OFFICE":
        return "Oficina"
      case "GARAGE":
        return "Garaje"
      case "STORAGE":
        return "Bodega"
      case "OTHER":
        return "Otro"
      default:
        return type
    }
  }

  const propertyTypes = ["APARTMENT", "HOUSE", "LAND", "COMMERCIAL", "OFFICE", "GARAGE", "STORAGE", "OTHER"]
  const commonFeatures = [
    "Piscina",
    "Jardín",
    "Terraza",
    "Balcón",
    "Estacionamiento",
    "Seguridad 24h",
    "Gimnasio",
    "Ascensor",
  ]
  const commonLocations = [
    "Santiago Centro",
    "Providencia",
    "Las Condes",
    "Vitacura",
    "Ñuñoa",
    "La Reina",
    "Lo Barnechea",
    "Huechuraba",
  ]

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth fullScreen={isMobile}>
      <DialogTitle sx={{ p: isMobile ? 2 : 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
            {initialData ? "Editar Prospecto" : "Nuevo Prospecto"}
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ p: isMobile ? 2 : 3 }}>
        <Box sx={{ mb: 2 }}>
          <Button
            variant={activeTab === 0 ? "contained" : "outlined"}
            onClick={() => setActiveTab(0)}
            sx={{ mr: 1, mb: 1 }}
          >
            Información Personal
          </Button>
          <Button
            variant={activeTab === 1 ? "contained" : "outlined"}
            onClick={() => setActiveTab(1)}
            sx={{ mr: 1, mb: 1 }}
          >
            Preferencias
          </Button>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {activeTab === 0 && (
          <Grid container spacing={isMobile ? 1 : 2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                label="Nombre"
                value={formData.firstName || ""}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.firstName}
                helperText={errors.firstName}
                size={isMobile ? "small" : "medium"}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                label="Apellido"
                value={formData.lastName || ""}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.lastName}
                helperText={errors.lastName}
                size={isMobile ? "small" : "medium"}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                label="Email"
                type="email"
                value={formData.email || ""}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.email}
                helperText={errors.email}
                size={isMobile ? "small" : "medium"}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="phone"
                label="Teléfono"
                value={formData.phone || ""}
                onChange={handleChange}
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="secondaryPhone"
                label="Teléfono Secundario"
                value={formData.secondaryPhone || ""}
                onChange={handleChange}
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.type} size={isMobile ? "small" : "medium"} sx={{ mb: 2 }}>
                <InputLabel id="type-label">Tipo</InputLabel>
                <Select
                  labelId="type-label"
                  name="type"
                  value={formData.type || "BUYER"}
                  onChange={handleChange}
                  label="Tipo"
                >
                  <MenuItem value="BUYER">{getTypeLabel("BUYER")}</MenuItem>
                  <MenuItem value="SELLER">{getTypeLabel("SELLER")}</MenuItem>
                  <MenuItem value="INVESTOR">{getTypeLabel("INVESTOR")}</MenuItem>
                  <MenuItem value="TENANT">{getTypeLabel("TENANT")}</MenuItem>
                  <MenuItem value="LANDLORD">{getTypeLabel("LANDLORD")}</MenuItem>
                  <MenuItem value="OTHER">{getTypeLabel("OTHER")}</MenuItem>
                </Select>
                {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                required
                error={!!errors.status}
                size={isMobile ? "small" : "medium"}
                sx={{ mb: 2 }}
              >
                <InputLabel id="status-label">Estado</InputLabel>
                <Select
                  labelId="status-label"
                  name="status"
                  value={formData.status || "POTENTIAL"}
                  onChange={handleChange}
                  label="Estado"
                >
                  <MenuItem value="ACTIVE">{getStatusLabel("ACTIVE")}</MenuItem>
                  <MenuItem value="INACTIVE">{getStatusLabel("INACTIVE")}</MenuItem>
                  <MenuItem value="POTENTIAL">{getStatusLabel("POTENTIAL")}</MenuItem>
                  <MenuItem value="QUALIFIED">{getStatusLabel("QUALIFIED")}</MenuItem>
                  <MenuItem value="CONVERTED">{getStatusLabel("CONVERTED")}</MenuItem>
                  <MenuItem value="LOST">{getStatusLabel("LOST")}</MenuItem>
                </Select>
                {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size={isMobile ? "small" : "medium"} sx={{ mb: 2 }}>
                <InputLabel id="source-label">Fuente</InputLabel>
                <Select
                  labelId="source-label"
                  name="source"
                  value={formData.source || ""}
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
                  <MenuItem value="Lead convertido">Lead convertido</MenuItem>
                  <MenuItem value="Otro">Otro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size={isMobile ? "small" : "medium"} sx={{ mb: 2 }}>
                <InputLabel id="contact-method-label">Método de contacto preferido</InputLabel>
                <Select
                  labelId="contact-method-label"
                  name="preferredContactMethod"
                  value={formData.preferredContactMethod || "EMAIL"}
                  onChange={handleChange}
                  label="Método de contacto preferido"
                >
                  <MenuItem value="EMAIL">Email</MenuItem>
                  <MenuItem value="PHONE">Teléfono</MenuItem>
                  <MenuItem value="WHATSAPP">WhatsApp</MenuItem>
                  <MenuItem value="IN_PERSON">En persona</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }}>Información de Empresa</Divider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="company"
                label="Empresa"
                value={formData.company || ""}
                onChange={handleChange}
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="position"
                label="Cargo"
                value={formData.position || ""}
                onChange={handleChange}
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }}>Dirección</Divider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address"
                label="Dirección"
                value={formData.address || ""}
                onChange={handleChange}
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="city"
                label="Ciudad"
                value={formData.city || ""}
                onChange={handleChange}
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="province"
                label="Provincia/Región"
                value={formData.province || ""}
                onChange={handleChange}
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="country"
                label="País"
                value={formData.country || ""}
                onChange={handleChange}
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="postalCode"
                label="Código Postal"
                value={formData.postalCode || ""}
                onChange={handleChange}
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }}>Etiquetas</Divider>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={formData.tags || []}
                onChange={handleTagsChange}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} key={index} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Etiquetas"
                    placeholder="Añadir etiqueta"
                    helperText="Presiona Enter para añadir una etiqueta"
                    size={isMobile ? "small" : "medium"}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="notes"
                label="Notas"
                value={formData.notes || ""}
                onChange={handleChange}
                fullWidth
                multiline
                rows={isMobile ? 3 : 4}
                size={isMobile ? "small" : "medium"}
                sx={{ mt: 2 }}
              />
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Grid container spacing={isMobile ? 1 : 2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Presupuesto
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="budget"
                label="Presupuesto"
                type="number"
                value={formData.budget || ""}
                onChange={handleChange}
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size={isMobile ? "small" : "medium"} sx={{ mb: 2 }}>
                <InputLabel id="budget-currency-label">Moneda</InputLabel>
                <Select
                  labelId="budget-currency-label"
                  name="budgetCurrency"
                  value={formData.budgetCurrency || "CLP"}
                  onChange={handleChange}
                  label="Moneda"
                >
                  <MenuItem value="CLP">CLP</MenuItem>
                  <MenuItem value="UF">UF</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }}>Preferencias de Propiedad</Divider>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={propertyTypes}
                getOptionLabel={(option) => getPropertyTypeLabel(option as TypePropertyType)}
                value={formData.propertyPreferences?.types || []}
                onChange={handlePropertyTypesChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tipos de propiedad"
                    placeholder="Seleccionar tipos"
                    size={isMobile ? "small" : "medium"}
                  />
                )}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="propertyPreferences.minBedrooms"
                label="Dormitorios (mínimo)"
                type="number"
                value={formData.propertyPreferences?.minBedrooms || ""}
                onChange={handleChange}
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="propertyPreferences.maxBedrooms"
                label="Dormitorios (máximo)"
                type="number"
                value={formData.propertyPreferences?.maxBedrooms || ""}
                onChange={handleChange}
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="propertyPreferences.minBathrooms"
                label="Baños (mínimo)"
                type="number"
                value={formData.propertyPreferences?.minBathrooms || ""}
                onChange={handleChange}
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="propertyPreferences.maxBathrooms"
                label="Baños (máximo)"
                type="number"
                value={formData.propertyPreferences?.maxBathrooms || ""}
                onChange={handleChange}
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="propertyPreferences.minArea"
                label="Superficie (mínimo m²)"
                type="number"
                value={formData.propertyPreferences?.minArea || ""}
                onChange={handleChange}
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="propertyPreferences.maxArea"
                label="Superficie (máximo m²)"
                type="number"
                value={formData.propertyPreferences?.maxArea || ""}
                onChange={handleChange}
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                freeSolo
                options={commonLocations}
                value={formData.propertyPreferences?.locations || []}
                onChange={handleLocationsChange}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} key={index} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ubicaciones preferidas"
                    placeholder="Añadir ubicación"
                    size={isMobile ? "small" : "medium"}
                  />
                )}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                freeSolo
                options={commonFeatures}
                value={formData.propertyPreferences?.features || []}
                onChange={handleFeaturesChange}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} key={index} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Características deseadas"
                    placeholder="Añadir característica"
                    size={isMobile ? "small" : "medium"}
                  />
                )}
              />
            </Grid>
          </Grid>
        )}
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
