"use client"

import type React from "react"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material"
import {
  Save as SaveIcon,
  Close as CloseIcon,
  Description as DescriptionIcon,
  AttachMoney as MoneyIcon,
  Home as HomeIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Delete as DeleteIcon,
  Language as LanguageIcon,
  PhotoLibrary as PhotoIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material"
import { useState } from "react"
import type { Property, PropertyImage } from "@/types/types"
import { PortalsStep } from "./wizard-steps/portals-step"
import { ImagesStep } from "./wizard-steps/images-step"

// Datos de ejemplo para los selectores
const mockOrganizations = [
  { id: 1, name: "Inmobiliaria XYZ" },
  { id: 2, name: "Propiedades ABC" },
]

const mockOwners = [
  { id: 1, name: "Carlos Rodríguez", email: "carlos@example.com" },
  { id: 2, name: "Laura Sánchez", email: "laura@example.com" },
  { id: 3, name: "Miguel Torres", email: "miguel@example.com" },
  { id: 4, name: "Isabel Díaz", email: "isabel@example.com" },
  { id: 5, name: "Roberto Fernández", email: "roberto@example.com" },
  { id: 6, name: "Empresa Constructora S.L.", email: "info@constructora.com", type: "COMPANY" },
]

// Esquema de validación para el formulario
const propertyFormSchema = z.object({
  code: z.string().min(1, { message: "El código es obligatorio" }),
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  description: z.string().optional(),
  type: z.string({ required_error: "Selecciona un tipo de propiedad" }),
  price: z.coerce.number().min(0, { message: "El precio debe ser un valor positivo" }),
  curCode: z.string({ required_error: "Selecciona una moneda" }),
  shared: z.boolean().default(false),
  numberOfBedrooms: z.coerce.number().min(0),
  numberOfBathrooms: z.coerce.number().min(0),
  yearBuilt: z.coerce
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 5),
  m2Built: z.coerce.number().min(0),
  m2SemiCovered: z.coerce.number().min(0),
  area: z.coerce.number().min(0),
  address: z.string().min(1, { message: "La dirección es obligatoria" }),
  zip: z.string().optional(),
  city: z.string().min(1, { message: "La ciudad es obligatoria" }),
  x: z.coerce.number(),
  y: z.coerce.number(),
  state: z.string({ required_error: "Selecciona un estado" }),
  organization: z.string().nullable(),
  owner: z.string().nullable(),
  portalPublications: z.array(z.any()).optional(),
  images: z.array(z.any()).optional(),
})

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`property-form-tabpanel-${index}`}
      aria-labelledby={`property-form-tab-${index}`}
      style={{ width: "100%" }}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2, width: "100%" }}>{children}</Box>}
    </div>
  )
}

// Componente para secciones con título
const FormSection = ({ title, icon, children, fullWidth = false }) => (
  <Box sx={{ width: "100%", mb: { xs: 2, sm: 3 } }}>
    <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
      {icon}
      <Typography variant="h6" component="h3" sx={{ ml: 1, fontWeight: 600 }}>
        {title}
      </Typography>
    </Box>
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2 },
        bgcolor: "background.paper",
        borderRadius: 1,
        width: "100%",
        ...(fullWidth && { maxWidth: "100%" }),
      }}
    >
      {children}
    </Paper>
  </Box>
)

interface PropertyFormProps {
  property: Property | null
  onComplete: () => void
}

export function PropertyForm({ property, onComplete }: PropertyFormProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  const [activeTab, setActiveTab] = useState(0)
  const [portalPublications, setPortalPublications] = useState(property?.portalPublications || [])
  const [images, setImages] = useState<PropertyImage[]>(property?.images || [])

  // Inicializar el formulario con valores por defecto o los de la propiedad a editar
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: property
      ? {
          ...property,
          organization: property.organization ? String(property.organization) : null,
          owner: property.owner ? String(property.owner) : null,
        }
      : {
          code: "",
          name: "",
          description: "",
          type: "APARTMENT",
          price: 0,
          curCode: "CLP",
          shared: false,
          numberOfBedrooms: 0,
          numberOfBathrooms: 0,
          yearBuilt: new Date().getFullYear(),
          m2Built: 0,
          m2SemiCovered: 0,
          area: 0,
          address: "",
          zip: "",
          city: "",
          x: 0,
          y: 0,
          state: "AVAILABLE",
          organization: null,
          owner: null,
          portalPublications: [],
          images: [],
        },
  })

  function onSubmit(values) {
    // Combinar los valores del formulario con los portales seleccionados e imágenes
    const finalValues = {
      ...values,
      portalPublications,
      images,
    }

    console.log(finalValues)
    // Aquí iría la lógica para guardar en la base de datos
    onComplete()
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleDelete = () => {
    // Implementar lógica de eliminación
    console.log(`Eliminar propiedad ${property?.id}`)
    onComplete()
  }

  const handleUpdatePortals = (data) => {
    setPortalPublications(data.portalPublications)
  }

  const handleUpdateImages = (updatedImages: PropertyImage[]) => {
    setImages(updatedImages)
  }

  // Función para renderizar el título de la pestaña según el dispositivo
  const renderTabLabel = (icon, label) => {
    if (isMobile) {
      return icon
    }
    return (
      <Box sx={{ display: "flex", alignItems: "center", flexDirection: isTablet ? "column" : "row" }}>
        {icon}
        <span
          style={{
            marginLeft: isTablet ? 0 : 8,
            marginTop: isTablet ? 4 : 0,
            fontSize: isTablet ? "0.7rem" : "inherit",
          }}
        >
          {label}
        </span>
      </Box>
    )
  }

  return (
    <Card sx={{ width: "100%", maxWidth: "100%", overflow: "visible" }}>
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile && (
              <IconButton edge="start" color="inherit" onClick={onComplete} sx={{ mr: 1 }} aria-label="volver">
                <ArrowBackIcon />
              </IconButton>
            )}
            <Typography variant="h6" component="h2">
              {property ? "Editar Propiedad" : "Nueva Propiedad"}
            </Typography>
          </Box>
        }
        sx={{
          bgcolor: theme.palette.primary.light,
          color: theme.palette.primary.contrastText,
          p: { xs: 2, sm: 3 },
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="pestañas de propiedad"
            variant={isMobile ? "scrollable" : "fullWidth"}
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              ".MuiTabs-scrollButtons": {
                "&.Mui-disabled": { opacity: 0.3 },
              },
              ".MuiTab-root": {
                minWidth: isMobile ? "40px" : "120px",
                p: isMobile ? 1 : 2,
              },
            }}
          >
            <Tab
              icon={renderTabLabel(<DescriptionIcon fontSize={isMobile ? "small" : "medium"} />, "Información")}
              aria-label="Información Básica"
            />
            <Tab
              icon={renderTabLabel(<MoneyIcon fontSize={isMobile ? "small" : "medium"} />, "Financiera")}
              aria-label="Información Financiera"
            />
            <Tab
              icon={renderTabLabel(<HomeIcon fontSize={isMobile ? "small" : "medium"} />, "Características")}
              aria-label="Características"
            />
            <Tab
              icon={renderTabLabel(<LocationIcon fontSize={isMobile ? "small" : "medium"} />, "Ubicación")}
              aria-label="Ubicación"
            />
            <Tab
              icon={renderTabLabel(<PersonIcon fontSize={isMobile ? "small" : "medium"} />, "Propiedad")}
              aria-label="Propiedad"
            />
            <Tab
              icon={renderTabLabel(<PhotoIcon fontSize={isMobile ? "small" : "medium"} />, "Imágenes")}
              aria-label="Imágenes"
            />
            <Tab
              icon={renderTabLabel(<LanguageIcon fontSize={isMobile ? "small" : "medium"} />, "Portales")}
              aria-label="Portales"
            />
          </Tabs>
        </Box>

        <CardContent
          sx={{
            p: { xs: 1, sm: 2, md: 3 },
            width: "100%",
            height: isMobile ? "calc(100vh - 200px)" : "auto",
            overflowY: "auto",
          }}
        >
          <TabPanel value={activeTab} index={0}>
            <FormSection title="Información Básica" icon={<DescriptionIcon color="primary" />} fullWidth>
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="code"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Código"
                        placeholder="Ej. APT-001"
                        fullWidth
                        error={!!errors.code}
                        helperText={errors.code?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={field.value || ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Nombre"
                        placeholder="Ej. Apartamento Centro"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={field.value || ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Descripción"
                        placeholder="Describe la propiedad..."
                        fullWidth
                        multiline
                        rows={isMobile ? 2 : 3}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={field.value || ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={!!errors.type}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                      >
                        <InputLabel id="type-label">Tipo de Propiedad</InputLabel>
                        <Select
                          {...field}
                          labelId="type-label"
                          label="Tipo de Propiedad"
                          value={field.value || "APARTMENT"}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: isMobile ? 200 : 300,
                              },
                            },
                          }}
                        >
                          <MenuItem value="APARTMENT">Apartamento</MenuItem>
                          <MenuItem value="HOUSE">Casa</MenuItem>
                          <MenuItem value="LAND">Terreno</MenuItem>
                          <MenuItem value="COMMERCIAL">Local Comercial</MenuItem>
                          <MenuItem value="OFFICE">Oficina</MenuItem>
                          <MenuItem value="GARAGE">Garaje</MenuItem>
                          <MenuItem value="STORAGE">Trastero</MenuItem>
                          <MenuItem value="OTHER">Otro</MenuItem>
                        </Select>
                        {errors.type && <FormHelperText>{errors.type.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </FormSection>
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <FormSection title="Información Financiera" icon={<MoneyIcon color="primary" />} fullWidth>
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Precio"
                        type="number"
                        fullWidth
                        inputProps={{ min: 0, step: 1000 }}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={field.value || 0}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MoneyIcon color="action" fontSize={isMobile ? "small" : "medium"} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="curCode"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={!!errors.curCode}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                      >
                        <InputLabel id="currency-label">Moneda</InputLabel>
                        <Select
                          {...field}
                          labelId="currency-label"
                          label="Moneda"
                          value={field.value || "CLP"}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: isMobile ? 200 : 300,
                              },
                            },
                          }}
                        >
                          <MenuItem value="CLP">CLP</MenuItem>
                          <MenuItem value="UF">UF</MenuItem>
                          <MenuItem value="USD">USD</MenuItem>
                        </Select>
                        {errors.curCode && <FormHelperText>{errors.curCode.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="shared"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={field.value || false}
                            onChange={(e) => field.onChange(e.target.checked)}
                            color="primary"
                          />
                        }
                        label="Propiedad compartida"
                        sx={{
                          border: "1px solid #e0e0e0",
                          borderRadius: 1,
                          p: 1,
                          width: "100%",
                          bgcolor: "background.paper",
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={!!errors.state}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                      >
                        <InputLabel id="state-label">Estado</InputLabel>
                        <Select
                          {...field}
                          labelId="state-label"
                          label="Estado"
                          value={field.value || "AVAILABLE"}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: isMobile ? 200 : 300,
                              },
                            },
                          }}
                        >
                          <MenuItem value="AVAILABLE">Disponible</MenuItem>
                          <MenuItem value="RESERVED">Reservada</MenuItem>
                          <MenuItem value="SOLD">Vendida</MenuItem>
                          <MenuItem value="RENTED">Alquilada</MenuItem>
                          <MenuItem value="UNAVAILABLE">No Disponible</MenuItem>
                          <MenuItem value="UNDER_CONSTRUCTION">En Construcción</MenuItem>
                        </Select>
                        {errors.state && <FormHelperText>{errors.state.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </FormSection>
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <FormSection title="Características Físicas" icon={<HomeIcon color="primary" />} fullWidth>
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                <Grid item xs={6} sm={6} md={4}>
                  <Controller
                    name="numberOfBedrooms"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Dormitorios"
                        type="number"
                        fullWidth
                        inputProps={{ min: 0 }}
                        error={!!errors.numberOfBedrooms}
                        helperText={errors.numberOfBedrooms?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={field.value || 0}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={6} sm={6} md={4}>
                  <Controller
                    name="numberOfBathrooms"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Baños"
                        type="number"
                        fullWidth
                        inputProps={{ min: 0 }}
                        error={!!errors.numberOfBathrooms}
                        helperText={errors.numberOfBathrooms?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={field.value || 0}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Controller
                    name="yearBuilt"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Año de construcción"
                        type="number"
                        fullWidth
                        inputProps={{ min: 1900, max: new Date().getFullYear() + 5 }}
                        error={!!errors.yearBuilt}
                        helperText={errors.yearBuilt?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={field.value || new Date().getFullYear()}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Controller
                    name="m2Built"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Metros cuadrados construidos"
                        type="number"
                        fullWidth
                        inputProps={{ min: 0 }}
                        error={!!errors.m2Built}
                        helperText={errors.m2Built?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={field.value || 0}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Controller
                    name="m2SemiCovered"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={isMobile ? "M² semicubiertos" : "Metros cuadrados semicubiertos"}
                        type="number"
                        fullWidth
                        inputProps={{ min: 0 }}
                        error={!!errors.m2SemiCovered}
                        helperText={errors.m2SemiCovered?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={field.value || 0}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Controller
                    name="area"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Área total"
                        type="number"
                        fullWidth
                        inputProps={{ min: 0 }}
                        error={!!errors.area}
                        helperText={errors.area?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={field.value || 0}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </FormSection>
          </TabPanel>

          <TabPanel value={activeTab} index={3}>
            <FormSection title="Ubicación" icon={<LocationIcon color="primary" />} fullWidth>
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                <Grid item xs={12}>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Dirección"
                        placeholder="Ej. Calle Mayor 10"
                        fullWidth
                        error={!!errors.address}
                        helperText={errors.address?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={field.value || ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Ciudad"
                        placeholder="Ej. Santiago"
                        fullWidth
                        error={!!errors.city}
                        helperText={errors.city?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={field.value || ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="zip"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Código Postal"
                        placeholder="Ej. 8320000"
                        fullWidth
                        error={!!errors.zip}
                        helperText={errors.zip?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={field.value || ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    name="x"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Latitud"
                        type="number"
                        fullWidth
                        error={!!errors.x}
                        helperText={errors.x?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={field.value || 0}
                        inputProps={{ step: "0.000001" }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    name="y"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Longitud"
                        type="number"
                        fullWidth
                        error={!!errors.y}
                        helperText={errors.y?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={field.value || 0}
                        inputProps={{ step: "0.000001" }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </FormSection>
          </TabPanel>

          <TabPanel value={activeTab} index={4}>
            <FormSection title="Propiedad y Organización" icon={<PersonIcon color="primary" />} fullWidth>
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="organization"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={!!errors.organization}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                      >
                        <InputLabel id="organization-label">Organización</InputLabel>
                        <Select
                          {...field}
                          labelId="organization-label"
                          label="Organización"
                          value={field.value || ""}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: isMobile ? 200 : 300,
                              },
                            },
                          }}
                        >
                          <MenuItem value="">Sin organización</MenuItem>
                          {mockOrganizations.map((org) => (
                            <MenuItem key={org.id} value={org.id.toString()}>
                              {org.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.organization && <FormHelperText>{errors.organization.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="owner"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={!!errors.owner}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                      >
                        <InputLabel id="owner-label">Propietario</InputLabel>
                        <Select
                          {...field}
                          labelId="owner-label"
                          label="Propietario"
                          value={field.value || ""}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: isMobile ? 200 : 300,
                              },
                            },
                          }}
                        >
                          <MenuItem value="">Sin propietario</MenuItem>
                          {mockOwners.map((owner) => (
                            <MenuItem key={owner.id} value={owner.id.toString()}>
                              <Box>
                                <Typography variant="body2">{owner.name}</Typography>
                                {owner.email && (
                                  <Typography variant="caption" color="text.secondary">
                                    {owner.email}
                                  </Typography>
                                )}
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.owner && <FormHelperText>{errors.owner.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </FormSection>
          </TabPanel>

          <TabPanel value={activeTab} index={5}>
            <FormSection title="Imágenes" icon={<PhotoIcon color="primary" />} fullWidth>
              <Box
                sx={{
                  width: "100%",
                  overflowX: "hidden",
                  ".MuiGrid-container": {
                    width: "100%",
                  },
                }}
              >
                <ImagesStep images={images} onChange={handleUpdateImages} />
              </Box>
            </FormSection>
          </TabPanel>

          <TabPanel value={activeTab} index={6}>
            <FormSection title="Portales Inmobiliarios" icon={<LanguageIcon color="primary" />} fullWidth>
              <Box
                sx={{
                  width: "100%",
                  overflowX: "hidden",
                  ".MuiGrid-container": {
                    width: "100%",
                  },
                }}
              >
                <PortalsStep data={{ portalPublications }} onUpdateData={handleUpdatePortals} />
              </Box>
            </FormSection>
          </TabPanel>
        </CardContent>

        <Divider />
        <CardActions
          sx={{
            justifyContent: "space-between",
            p: { xs: 1.5, sm: 2, md: 2.5 },
            flexDirection: isMobile ? "column" : "row",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              width: isMobile ? "100%" : "auto",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<CloseIcon />}
              onClick={onComplete}
              size={isMobile ? "medium" : "large"}
              fullWidth={isMobile}
            >
              Cancelar
            </Button>

            {property && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
                size={isMobile ? "medium" : "large"}
                fullWidth={isMobile}
              >
                Eliminar
              </Button>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            color="primary"
            size={isMobile ? "medium" : "large"}
            fullWidth={isMobile}
          >
            {property ? "Actualizar" : "Guardar"} Propiedad
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}
