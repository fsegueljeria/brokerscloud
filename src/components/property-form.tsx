"use client"

import type React from "react"

import { useState } from "react"

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
  Autocomplete,
  Chip,
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
  Share as ShareIcon,
} from "@mui/icons-material"

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
  title: z.string().min(2, { message: "El título debe tener al menos 2 caracteres" }),
  description: z.string().optional(),
  type: z.enum(["APARTAMENTO", "CASA", "TERRENO", "COMERCIAL", "OFICINA", "GARAGE", "ALMACEN", "OTRO"], {
    required_error: "Selecciona un tipo de propiedad",
  }),
  status: z.enum(["DISPONIBLE", "RESERVADO", "VENDIDO", "ALQUILADO", "INACTIVO", "EN_CONSTRUCCION", "BORRADOR", "PUBLICADO"], {
    required_error: "Selecciona un estado",
  }),
  shared: z.boolean().default(false),
  price: z.coerce.number().min(0, { message: "El precio debe ser un valor positivo" }),
  currency: z.enum(["CLP", "UF", "USD"], { required_error: "Selecciona una moneda" }),
  address: z.string().min(1, { message: "La dirección es obligatoria" }),
  city: z.string().min(1, { message: "La ciudad es obligatoria" }),
  province: z.string().min(1, { message: "La provincia es obligatoria" }),
  zipCode: z.string().optional(),
  country: z.string().min(1, { message: "El país es obligatorio" }),
  bedrooms: z.coerce.number().min(0),
  bathrooms: z.coerce.number().min(0),
  area: z.coerce.number().min(0),
  features: z.array(z.string()).optional(),
  images: z.array(z.any()).optional(),
  organization: z.number().nullable(),
  owner: z.number().nullable(),
  portalPublications: z.array(z.any()).optional(),
  m2Built: z.coerce.number().min(0),
  m2SemiCovered: z.coerce.number().min(0),
  yearBuilt: z.coerce.number().min(1900).max(new Date().getFullYear()),
})

// Definir el tipo para los valores del formulario
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
      {value === index && (
        <Box sx={{ p: 3, width: "100%" }}>
          {children}
        </Box>
      )}
    </div>
  )
}

// Componente para secciones con título
interface FormSectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  fullWidth?: boolean
}

const FormSection = ({ title, icon, children, fullWidth = false }: FormSectionProps) => (
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

// Lista de características predefinidas
const predefinedFeatures = [
  "Piscina",
  "Jardín",
  "Estacionamiento",
  "Seguridad 24/7",
  "Gimnasio",
  "Sala de eventos",
  "Quincho",
  "Terraza",
  "Logia",
  "Bodega",
  "Amoblado",
  "Cocina equipada",
  "Closet",
  "Aire acondicionado",
  "Calefacción",
  "Paneles solares",
  "Sistema de riego",
  "Cerca eléctrica",
  "Alarma",
  "Cámaras de seguridad",
]

export function PropertyForm({ property, onComplete }: PropertyFormProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  const [activeTab, setActiveTab] = useState(0)
  const [portalPublications, setPortalPublications] = useState(property?.portalPublications || [])
  const [images, setImages] = useState<PropertyImage[]>(property?.images || [])

  console.log(property);
  // Inicializar el formulario con valores por defecto o los de la propiedad a editar
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: property
      ? {
          code: property.code ?? "",
          title: property.title,
          description: property.description ?? "",
          type: property.type,
          status: property.status,
          shared: property.shared ?? false,
          price: property.price,
          currency: property.currency,
          address: property.address,
          city: property.city,
          province: property.province,
          zipCode: property.zipCode ?? "",
          country: property.country,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          area: property.area,
          features: property.features ?? [],
          images: property.images ?? [],
          organization: property.organization ?? null,
          owner: property.owner ?? null,
          portalPublications: property.portalPublications ?? [],
          m2Built: property.m2Built,
          m2SemiCovered: property.m2SemiCovered,
          yearBuilt: property.yearBuilt,
        }
      : {
          code: "",
          title: "",
          description: "",
          type: "APARTAMENTO",
          status: "BORRADOR",
          shared: false,
          price: 0,
          currency: "CLP",
          address: "",
          city: "",
          province: "",
          zipCode: "",
          country: "Chile",
          bedrooms: 0,
          bathrooms: 0,
          area: 0,
          features: [],
          images: [],
          organization: null,
          owner: null,
          portalPublications: [],
          m2Built: 0,
          m2SemiCovered: 0,
          yearBuilt: new Date().getFullYear(),
        },
  })

  function onSubmit(values: z.infer<typeof propertyFormSchema>) {
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleDelete = () => {
    // Implementar lógica de eliminación
    console.log(`Eliminar propiedad ${property?.id}`)
    onComplete()
  }

  const handleUpdatePortals = (data: { portalPublications: any[] }) => {
    setPortalPublications(data.portalPublications)
  }

  const handleUpdateImages = (updatedImages: PropertyImage[]) => {
    setImages(updatedImages)
  }

  // Modificar la función renderTabLabel para que retorne un ReactElement
  const renderTabLabel = (icon: React.ReactNode, label: string): React.ReactElement => {
    if (isMobile) {
      return icon as React.ReactElement
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
                        value={field.value || ""}
                        label="Código"
                        placeholder="Ej. APT-001"
                        fullWidth
                        error={!!errors.code}
                        helperText={errors.code?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Título"
                        placeholder="Ej. Apartamento Centro"
                        fullWidth
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
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
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
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
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: isMobile ? 200 : 300,
                              },
                            },
                          }}
                        >
                          <MenuItem value="APARTAMENTO">Apartamento</MenuItem>
                          <MenuItem value="CASA">Casa</MenuItem>
                          <MenuItem value="TERRENO">Terreno</MenuItem>
                          <MenuItem value="COMERCIAL">Local Comercial</MenuItem>
                          <MenuItem value="OFICINA">Oficina</MenuItem>
                          <MenuItem value="GARAGE">Garaje</MenuItem>
                          <MenuItem value="ALMACEN">Almacén</MenuItem>
                          <MenuItem value="OTRO">Otro</MenuItem>
                        </Select>
                        {errors.type && <FormHelperText>{errors.type.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={!!errors.status}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                      >
                        <InputLabel id="status-label">Estado</InputLabel>
                        <Select
                          {...field}
                          labelId="status-label"
                          label="Estado"
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: isMobile ? 200 : 300,
                              },
                            },
                          }}
                        >
                          <MenuItem value="DISPONIBLE">Disponible</MenuItem>
                          <MenuItem value="RESERVADO">Reservada</MenuItem>
                          <MenuItem value="VENDIDO">Vendida</MenuItem>
                          <MenuItem value="ALQUILADO">Alquilada</MenuItem>
                          <MenuItem value="INACTIVO">Inactivo</MenuItem>
                          <MenuItem value="EN_CONSTRUCCION">En Construcción</MenuItem>
                          <MenuItem value="BORRADOR">Borrador</MenuItem>
                          <MenuItem value="PUBLICADO">Publicada</MenuItem>
                        </Select>
                        {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <ShareIcon color="action" />
            </Box>
            <Controller
              name="shared"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} color="primary" size={isMobile ? "small" : "medium"} />
                  }
                  label={field.value ? "Compartir" : "NO compartir"}
                />
              )}
            />
          </Box>
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
                    name="currency"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={!!errors.currency}
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
                        {errors.currency && <FormHelperText>{errors.currency.message}</FormHelperText>}
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
                    name="bedrooms"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Dormitorios"
                        type="number"
                        fullWidth
                        inputProps={{ min: 0 }}
                        error={!!errors.bedrooms}
                        helperText={errors.bedrooms?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={field.value || 0}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={6} sm={6} md={4}>
                  <Controller
                    name="bathrooms"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Baños"
                        type="number"
                        fullWidth
                        inputProps={{ min: 0 }}
                        error={!!errors.bathrooms}
                        helperText={errors.bathrooms?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={field.value || 0}
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
                        label="Metros cuadrados semi-cubiertos"
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
                    name="yearBuilt"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Año de construcción"
                        type="number"
                        fullWidth
                        inputProps={{ min: 1900, max: new Date().getFullYear() }}
                        error={!!errors.yearBuilt}
                        helperText={errors.yearBuilt?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={field.value || new Date().getFullYear()}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="features"
                    control={control}
                    render={({ field: { onChange, value, ...field } }) => (
                      <Autocomplete
                        {...field}
                        multiple
                        freeSolo
                        options={predefinedFeatures}
                        value={value || []}
                        onChange={(_, newValue) => onChange(newValue)}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => {
                            const { key, ...tagProps } = getTagProps({ index });
                            return (
                              <Chip
                                key={key}
                                label={option}
                                {...tagProps}
                                size={isMobile ? "small" : "medium"}
                              />
                            );
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Características"
                            placeholder="Selecciona o escribe características..."
                            error={!!errors.features}
                            helperText={errors.features?.message}
                            variant="outlined"
                            size={isMobile ? "small" : "medium"}
                          />
                        )}
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
                <Grid item xs={12} sm={6}>
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
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="zipCode"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Código Postal"
                        placeholder="Ej. 8320000"
                        fullWidth
                        error={!!errors.zipCode}
                        helperText={errors.zipCode?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={field.value || ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="País"
                        placeholder="Ej. Chile"
                        fullWidth
                        error={!!errors.country}
                        helperText={errors.country?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={field.value || ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    name="province"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Provincia"
                        placeholder="Ej. Metropolitana de Santiago"
                        fullWidth
                        error={!!errors.province}
                        helperText={errors.province?.message}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={field.value || ""}
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
                <PortalsStep 
                  data={{ portalPublications: portalPublications || [] }} 
                  onUpdateData={(data) => handleUpdatePortals(data as { portalPublications: any[] })} 
                />
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
