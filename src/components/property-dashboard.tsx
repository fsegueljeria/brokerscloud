"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent
} from "@mui/material"
import {
  Add as AddIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Home as HomeIcon,
  Apartment as ApartmentIcon,
  Store as StoreIcon,
  Landscape as LandscapeIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Drafts as DraftsIcon,
  Public as PublicIcon,
  ExpandMore as ExpandMoreIcon,
  CalendarMonth as CalendarIcon,
  MonetizationOn as MoneyIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
} from "@mui/icons-material"
import { formatCurrency } from "@/libs/utils"
import { PropertyForm } from "./property-form"
import { PropertyDetail } from "./property-detail"
import { propertyService } from '@/libs/services/property-service'
import { Property, TypePropertyType, PropertyState } from '@/types/types'

// Datos de ejemplo
const propertySummary = {
  total: 48,
  available: 32,
  reserved: 8,
  sold: 8,
  draft: 5,
  published: 25,
  byType: {
    houses: 18,
    apartments: 22,
    commercial: 5,
    land: 3,
  },
}


// Mapeo de tipos de propiedad a iconos
const propertyTypeIcons = {
  CASA: <HomeIcon />,
  APARTAMENTO: <ApartmentIcon />,
  COMERCIAL: <StoreIcon />,
  TERRENO: <LandscapeIcon />,
  OFICINA: <StoreIcon />,
  GARAGE: <StoreIcon />,
  ALMACEN: <StoreIcon />,
  OTRO: <StoreIcon />,
}

// Mapeo de estados a colores
const propertyStateColors: Record<PropertyState, "success" | "error" | "warning" | "default" | "primary" | "secondary" | "info"> = {
  DISPONIBLE: "success",
  RESERVADO: "warning",
  VENDIDO: "error",
  ALQUILADO: "info",
  INACTIVO: "default",
  EN_CONSTRUCCION: "secondary",
  BORRADOR: "default",
  PUBLICADO: "primary",
}

// Mapeo de estados a texto en español
const propertyStateLabels = {
  DISPONIBLE: "Disponible",
  RESERVADO: "Reservada",
  VENDIDO: "Vendida",
  ALQUILADO: "Alquilada",
  INACTIVO: "No Disponible",
  EN_CONSTRUCCION: "En Construcción",
  BORRADOR: "Borrador",
  PUBLICADO: "Publicada",
}

// Mapeo de tipos a texto en español
const propertyTypeLabels = {
  CASA: "Casa",
  APARTAMENTO: "Apartamento",
  COMERCIAL: "Local Comercial",
  TERRENO: "Terreno",
  OFICINA: "Oficina",
  GARAGE: "Garaje",
  ALMACEN: "Almacén",
  OTRO: "Otro",
}

export function PropertyDashboard() {
  const [activeTab, setActiveTab] = useState(0)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [viewingProperty, setViewingProperty] = useState<Property | null>(null)
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<TypePropertyType | "">("")
  const [filterState, setFilterState] = useState<PropertyState | "">("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [showFilters, setShowFilters] = useState(false)
  const [tableTabValue, setTableTabValue] = useState(0)

  useEffect(() => {
    loadProperties()
  }, [searchTerm, filterType, filterState])

  const loadProperties = async () => {
    setLoading(true)
    try {
      const data = await propertyService.getPropertiesSearch({
        page: page + 1,
        limit: rowsPerPage,
        search: searchTerm.trim(),
        type: filterType || undefined,
        status: filterState || undefined
      })
      setProperties(data)
    } catch (error) {
      console.error("Error loading properties:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, propertyId: string) => {
    setAnchorEl(event.currentTarget)
    setSelectedProperty(propertyId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedProperty(null)
  }

  const handleCreateNew = () => {
    setEditingProperty(null)
    setActiveTab(2)
  }

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property)
    setActiveTab(2)
    handleMenuClose()
  }

  const handleViewProperty = (property: Property) => {
    setViewingProperty(property)
    setActiveTab(3)
    handleMenuClose()
  }

  const handleFormComplete = async () => {
    setActiveTab(0)
    setEditingProperty(null)
    await loadProperties()
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleTableTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTableTabValue(newValue)
    switch (newValue) {
      case 0:
        setFilterState("")
        break
      case 1:
        setFilterState("DISPONIBLE")
        break
      case 2:
        setFilterState("BORRADOR")
        break
      case 3:
        setFilterState("PUBLICADO")
        break
      case 4:
        setFilterState("RESERVADO")
        break
      case 5:
        setFilterState("VENDIDO")
        break
      default:
        setFilterState("")
    }
    setPage(0)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(1)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setPage(1)
  }

  const handleFilterTypeChange = (event: SelectChangeEvent<TypePropertyType | "">) => {
    setFilterType(event.target.value as TypePropertyType | "")
    setPage(0)
  }

  const handleFilterStateChange = (event: SelectChangeEvent<PropertyState | "">) => {
    setFilterState(event.target.value as PropertyState | "")
    setPage(0)
  }

  const handleDeleteProperty = async (id: string) => {
    try {
      await propertyService.deleteProperty(Number(id))
      setProperties(properties.filter(p => p.id !== id))
    } catch (error) {
      console.error("Error deleting property:", error)
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold" sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}>
          Gestión de Propiedades
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
          size={isMobile ? "medium" : "large"}
        >
          Nueva Propiedad
        </Button>
      </Box>

      <Paper sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="propiedades tabs"
            variant={isMobile ? "scrollable" : "fullWidth"}
            scrollButtons={isMobile ? "auto" : false}
          >
            <Tab label="Dashboard" />
            <Tab label="Lista de Propiedades" />
            <Tab label={editingProperty ? "Editar Propiedad" : "Nueva Propiedad"} />
            <Tab label="Detalles de Propiedad" />
          </Tabs>
        </Box>

        {/* Tab Panel para Dashboard */}
        <Box
          role="tabpanel"
          hidden={activeTab !== 0}
          id="property-tabpanel-0"
          aria-labelledby="property-tab-0"
          sx={{ width: "100%", pt: 3, px: 3, pb: 3 }}
        >
          {activeTab === 0 && (
            <>
              <Grid container spacing={3}>
                {/* Tarjetas de resumen */}
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: "100%", borderRadius: 2, boxShadow: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Resumen de Propiedades
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Total
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {propertySummary.total}
                        </Typography>
                      </Box>
                      <Divider />
                      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Disponibles
                        </Typography>
                        <Chip label={propertySummary.available} color="success" size="small" />
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Borradores
                        </Typography>
                        <Chip label={propertySummary.draft} color="default" size="small" />
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Publicadas
                        </Typography>
                        <Chip label={propertySummary.published} color="primary" size="small" />
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Reservadas
                        </Typography>
                        <Chip label={propertySummary.reserved} color="warning" size="small" />
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Vendidas
                        </Typography>
                        <Chip label={propertySummary.sold} color="error" size="small" />
                      </Box>
                      <Divider />
                      <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                        Por Tipo
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <HomeIcon fontSize="small" sx={{ mr: 1, color: "primary.main" }} />
                          <Typography variant="body2">Casas</Typography>
                        </Box>
                        <Typography variant="body2" fontWeight="medium">
                          {propertySummary.byType.houses}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <ApartmentIcon fontSize="small" sx={{ mr: 1, color: "secondary.main" }} />
                          <Typography variant="body2">Apartamentos</Typography>
                        </Box>
                        <Typography variant="body2" fontWeight="medium">
                          {propertySummary.byType.apartments}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <StoreIcon fontSize="small" sx={{ mr: 1, color: "info.main" }} />
                          <Typography variant="body2">Comerciales</Typography>
                        </Box>
                        <Typography variant="body2" fontWeight="medium">
                          {propertySummary.byType.commercial}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <LandscapeIcon fontSize="small" sx={{ mr: 1, color: "success.main" }} />
                          <Typography variant="body2">Terrenos</Typography>
                        </Box>
                        <Typography variant="body2" fontWeight="medium">
                          {propertySummary.byType.land}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Propiedades recientes */}
                <Grid item xs={12} md={8}>
                  <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6">Propiedades Recientes</Typography>
                        <Button size="small" onClick={() => setActiveTab(1)}>
                          Ver todas
                        </Button>
                      </Box>
                      <Grid container spacing={2}>
                        {properties.slice(0, 3).map((property) => (
                          <Grid item xs={12} sm={6} md={4} key={property.id}>
                            <Card
                              sx={{
                                height: "100%",
                                borderRadius: 1,
                                boxShadow: 1,
                                position: "relative",
                                "&:hover": { boxShadow: 3 },
                              }}
                            >
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 8,
                                  right: 8,
                                  zIndex: 1,
                                }}
                              >
                                <IconButton
                                  size="small"
                                  onClick={(e) => handleMenuClick(e, property.id)}
                                  sx={{ bgcolor: "background.paper", boxShadow: 1 }}
                                >
                                  <MoreVertIcon fontSize="small" />
                                </IconButton>
                              </Box>
                              <CardContent>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 1,
                                  }}
                                >
                                  {propertyTypeIcons[property.type] || <HomeIcon />}
                                  <Chip
                                    label={propertyStateLabels[property.status]}
                                    color={propertyStateColors[property.status]}
                                    size="small"
                                  />
                                </Box>
                                <Typography variant="subtitle1" noWrap sx={{ fontWeight: "medium" }}>
                                  {property.title}
                                </Typography>
                                <Typography variant="h6" color="primary.main" sx={{ my: 1, fontWeight: "bold" }}>
                                  {formatCurrency(property.price, property.currency)}
                                </Typography>
                                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                                  <Typography variant="body2" color="text.secondary">
                                    {property.area} m²
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {property.bedrooms > 0 ? `${property.bedrooms} hab` : ""}{" "}
                                    {property.bathrooms > 0 ? `| ${property.bathrooms} baños` : ""}
                                  </Typography>
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </>
          )}
        </Box>

        {/* Tab Panel para Lista de Propiedades */}
        <Box
          role="tabpanel"
          hidden={activeTab !== 1}
          id="property-tabpanel-1"
          aria-labelledby="property-tab-1"
          sx={{ width: "100%", pt: 3 }}
        >
          {activeTab === 1 && (
            <>
              <Box sx={{ px: 3, mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Typography variant="h6" component="h2">
                    Listado de Propiedades
                  </Typography>
                  <Box>
                    <Button
                      variant="outlined"
                      startIcon={showFilters ? <CloseIcon /> : <FilterListIcon />}
                      sx={{ mr: 2 }}
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      {showFilters ? "Ocultar Filtros" : "Filtros"}
                    </Button>
                  </Box>
                </Box>

                <Card sx={{ mb: 3, display: showFilters ? "block" : "none" }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          label="Buscar"
                          variant="outlined"
                          size="small"
                          value={searchTerm}
                          onChange={handleSearchChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Tipo de Propiedad</InputLabel>
                          <Select value={filterType} onChange={handleFilterTypeChange} label="Tipo de Propiedad">
                            <MenuItem value="">Todos</MenuItem>
                            <MenuItem value="CASA">Casa</MenuItem>
                            <MenuItem value="APARTAMENTO">Apartamento</MenuItem>
                            <MenuItem value="COMERCIAL">Local Comercial</MenuItem>
                            <MenuItem value="TERRENO">Terreno</MenuItem>
                            <MenuItem value="OFICINA">Oficina</MenuItem>
                            <MenuItem value="GARAGE">Garaje</MenuItem>
                            <MenuItem value="ALMACEN">Almacén</MenuItem>
                            <MenuItem value="OTRO">Otro</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Estado</InputLabel>
                          <Select value={filterState} onChange={handleFilterStateChange} label="Estado">
                            <MenuItem value="">Todos</MenuItem>
                            <MenuItem value="DISPONIBLE">Disponible</MenuItem>
                            <MenuItem value="BORRADOR">Borrador</MenuItem>
                            <MenuItem value="PUBLICADO">Publicada</MenuItem>
                            <MenuItem value="RESERVADO">Reservada</MenuItem>
                            <MenuItem value="VENDIDO">Vendida</MenuItem>
                            <MenuItem value="ALQUILADO">Alquilada</MenuItem>
                            <MenuItem value="INACTIVO">No Disponible</MenuItem>
                            <MenuItem value="EN_CONSTRUCCION">En Construcción</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                <Card>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={tableTabValue}
                      onChange={handleTableTabChange}
                      aria-label="property tabs"
                      variant={isMobile ? "scrollable" : "standard"}
                      scrollButtons="auto"
                    >
                      <Tab label="Todas" />
                      <Tab label="Disponibles" />
                      <Tab 
                        label="Borradores" 
                        icon={isMobile ? <DraftsIcon /> : undefined} 
                        iconPosition="start" 
                      />
                      <Tab 
                        label="Publicadas" 
                        icon={isMobile ? <PublicIcon /> : undefined} 
                        iconPosition="start" 
                      />
                      <Tab label="Reservadas" />
                      <Tab label="Vendidas" />
                    </Tabs>
                  </Box>

                  <TableContainer component={Paper} sx={{ maxHeight: "calc(100vh - 300px)" }}>
                    <Table stickyHeader aria-label="tabla de propiedades">
                      <TableHead>
                        <TableRow>
                          <TableCell>Título</TableCell>
                          <TableCell>Tipo</TableCell>
                          <TableCell>Ubicación</TableCell>
                          <TableCell>Precio</TableCell>
                          <TableCell>Estado</TableCell>
                          <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {loading ? (
                          <TableRow>
                            <TableCell colSpan={6} align="center">
                              Cargando...
                            </TableCell>
                          </TableRow>
                        ) : properties.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} align="center">
                              No se encontraron propiedades con los criterios de búsqueda
                            </TableCell>
                          </TableRow>
                        ) : (
                          properties
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((property) => (
                              <TableRow key={property.id} hover>
                                <TableCell>{property.title}</TableCell>
                                <TableCell>{propertyTypeLabels[property.type]}</TableCell>
                                <TableCell>
                                  {property.address}, {property.city}
                                </TableCell>
                                <TableCell>{formatCurrency(property.price, property.currency)}</TableCell>
                                <TableCell>
                                  <Chip
                                    label={propertyStateLabels[property.status]}
                                    color={propertyStateColors[property.status]}
                                    size="small"
                                    icon={
                                      property.status === "BORRADOR" ? (
                                        <DraftsIcon />
                                      ) : property.status === "PUBLICADO" ? (
                                        <PublicIcon />
                                      ) : undefined
                                    }
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  <Tooltip title="Ver detalles">
                                    <IconButton size="small" color="primary" onClick={() => handleViewProperty(property)}>
                                      <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Editar">
                                    <IconButton
                                      size="small"
                                      color="primary"
                                      onClick={() => handleEditProperty(property)}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  {/* <Tooltip title="Eliminar">
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={(e) => handleDeleteProperty(property.id)}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip> */}
                                </TableCell>
                              </TableRow>
                            ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={properties.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Filas por página:"
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                  />
                </Card>
              </Box>
            </>
          )}
        </Box>

        {/* Tab Panel para Formulario de Propiedad */}
        <Box
          role="tabpanel"
          hidden={activeTab !== 2}
          id="property-tabpanel-2"
          aria-labelledby="property-tab-2"
          sx={{ width: "100%", pt: 3 }}
        >
          {activeTab === 2 && (
            <Box sx={{ px: 3, pb: 3 }}>
              <PropertyForm property={editingProperty} onComplete={handleFormComplete} />
            </Box>
          )}
        </Box>

        {/* Tab Panel para Detalles de Propiedad */}
        <Box
          role="tabpanel"
          hidden={activeTab !== 3}
          id="property-tabpanel-3"
          aria-labelledby="property-tab-3"
          sx={{ width: "100%", pt: 3 }}
        >
          {activeTab === 3 && viewingProperty && (
            <PropertyDetail 
              property={viewingProperty} 
              onEdit={handleEditProperty}
              onDelete={(id) => {
                // TODO: Implementar lógica de eliminación
                console.log("Eliminar propiedad:", id)
              }}
            />
          )}
        </Box>
      </Paper>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleViewProperty(properties.find((p) => p.id === selectedProperty) as Property)}>
          Ver detalles
        </MenuItem>
        <MenuItem onClick={() => handleEditProperty(properties.find((p) => p.id === selectedProperty) as Property)}>
          Editar
        </MenuItem>
      </Menu>
    </Box>
  )
}
