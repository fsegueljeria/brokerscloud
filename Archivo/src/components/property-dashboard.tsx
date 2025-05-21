"use client"

import { useState } from "react"
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
} from "@mui/icons-material"
import { formatCurrency } from "@/libs/utils"
import { PropertyForm } from "./property-form"

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

const mockProperties = [
  {
    id: "1",
    title: "Apartamento en Centro",
    type: "APARTMENT",
    price: 120000000,
    currency: "CLP",
    area: 85,
    bedrooms: 2,
    bathrooms: 2,
    state: "AVAILABLE",
    address: "Calle Principal 123",
    city: "Santiago",
  },
  {
    id: "2",
    title: "Casa en Zona Norte",
    type: "HOUSE",
    price: 4500,
    currency: "UF",
    area: 150,
    bedrooms: 3,
    bathrooms: 2,
    state: "RESERVED",
    address: "Avenida Norte 456",
    city: "Santiago",
  },
  {
    id: "3",
    title: "Local Comercial",
    type: "COMMERCIAL",
    price: 250000,
    currency: "USD",
    area: 120,
    bedrooms: 0,
    bathrooms: 1,
    state: "AVAILABLE",
    address: "Calle Comercio 789",
    city: "Viña del Mar",
  },
  {
    id: "4",
    title: "Terreno Urbanizable",
    type: "LAND",
    price: 3500,
    currency: "UF",
    area: 500,
    bedrooms: 0,
    bathrooms: 0,
    state: "DRAFT",
    address: "Camino Rural s/n",
    city: "Concón",
  },
  {
    id: "5",
    title: "Apartamento con Vista al Mar",
    type: "APARTMENT",
    price: 180000000,
    currency: "CLP",
    area: 95,
    bedrooms: 3,
    bathrooms: 2,
    state: "PUBLISHED",
    address: "Avenida Marina 234",
    city: "Viña del Mar",
  },
  {
    id: "6",
    title: "Casa Amplia con Jardín",
    type: "HOUSE",
    price: 6800,
    currency: "UF",
    area: 220,
    bedrooms: 4,
    bathrooms: 3,
    state: "SOLD",
    address: "Calle Los Aromos 567",
    city: "La Reina",
  },
  {
    id: "7",
    title: "Oficina Céntrica",
    type: "COMMERCIAL",
    price: 320000,
    currency: "USD",
    area: 150,
    bedrooms: 0,
    bathrooms: 2,
    state: "PUBLISHED",
    address: "Avenida Providencia 890",
    city: "Santiago",
  },
]

// Mapeo de tipos de propiedad a iconos
const propertyTypeIcons = {
  HOUSE: <HomeIcon />,
  APARTMENT: <ApartmentIcon />,
  COMMERCIAL: <StoreIcon />,
  LAND: <LandscapeIcon />,
}

// Mapeo de estados a colores
const propertyStateColors = {
  AVAILABLE: "success",
  RESERVED: "warning",
  SOLD: "error",
  RENTED: "info",
  UNAVAILABLE: "default",
  UNDER_CONSTRUCTION: "secondary",
  DRAFT: "default",
  PUBLISHED: "primary",
}

// Mapeo de estados a texto en español
const propertyStateLabels = {
  AVAILABLE: "Disponible",
  RESERVED: "Reservada",
  SOLD: "Vendida",
  RENTED: "Alquilada",
  UNAVAILABLE: "No Disponible",
  UNDER_CONSTRUCTION: "En Construcción",
  DRAFT: "Borrador",
  PUBLISHED: "Publicada",
}

// Mapeo de tipos a texto en español
const propertyTypeLabels = {
  HOUSE: "Casa",
  APARTMENT: "Apartamento",
  COMMERCIAL: "Local Comercial",
  LAND: "Terreno",
}

export function PropertyDashboard() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [viewMode, setViewMode] = useState("dashboard") // dashboard, table, form, detail
  const [tabValue, setTabValue] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("")
  const [filterState, setFilterState] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [showFilters, setShowFilters] = useState(false)
  const [propertyToEdit, setPropertyToEdit] = useState(null)

  const handleMenuClick = (event, propertyId) => {
    setAnchorEl(event.currentTarget)
    setSelectedProperty(propertyId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedProperty(null)
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
    // Cambiar el filtro de estado según la pestaña seleccionada
    switch (newValue) {
      case 0: // Todas
        setFilterState("")
        break
      case 1: // Disponibles
        setFilterState("AVAILABLE")
        break
      case 2: // Borradores
        setFilterState("DRAFT")
        break
      case 3: // Publicadas
        setFilterState("PUBLISHED")
        break
      case 4: // Reservadas
        setFilterState("RESERVED")
        break
      case 5: // Vendidas
        setFilterState("SOLD")
        break
      default:
        setFilterState("")
    }
    setPage(0)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setPage(0)
  }

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value)
    setPage(0)
  }

  const handleFilterStateChange = (event) => {
    setFilterState(event.target.value)
    setPage(0)

    // Actualizar la pestaña seleccionada según el estado
    switch (event.target.value) {
      case "":
        setTabValue(0)
        break
      case "AVAILABLE":
        setTabValue(1)
        break
      case "DRAFT":
        setTabValue(2)
        break
      case "PUBLISHED":
        setTabValue(3)
        break
      case "RESERVED":
        setTabValue(4)
        break
      case "SOLD":
        setTabValue(5)
        break
      default:
        setTabValue(0)
    }
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const handleCreateProperty = () => {
    setPropertyToEdit(null)
    setViewMode("form")
  }

  const handleEditProperty = (property) => {
    setPropertyToEdit(property)
    setViewMode("form")
    handleMenuClose()
  }

  const handleViewProperty = (property) => {
    setPropertyToEdit(property)
    setViewMode("detail")
    handleMenuClose()
  }

  const handleDeleteProperty = (propertyId) => {
    // Aquí iría la lógica para eliminar la propiedad
    console.log("Eliminar propiedad:", propertyId)
    handleMenuClose()
  }

  const handleFormComplete = () => {
    setViewMode("table")
    setPropertyToEdit(null)
  }

  const handleBackToTable = () => {
    setViewMode("table")
    setPropertyToEdit(null)
  }

  // Filtrar propiedades según los criterios de búsqueda
  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch =
      searchTerm === "" ||
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "" || property.type === filterType
    const matchesState = filterState === "" || property.state === filterState

    return matchesSearch && matchesType && matchesState
  })

  // Renderizar el contenido según el modo de vista
  const renderContent = () => {
    switch (viewMode) {
      case "dashboard":
        return renderDashboard()
      case "table":
        return renderTable()
      case "form":
        return <PropertyForm property={propertyToEdit} onComplete={handleFormComplete} />
      case "detail":
        return renderPropertyDetail()
      default:
        return renderDashboard()
    }
  }

  // Renderizar el dashboard con resumen y propiedades recientes
  const renderDashboard = () => (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" component="h1" fontWeight="bold">
          Propiedades
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            sx={{ mr: 2, display: { xs: "none", sm: "inline-flex" } }}
            onClick={() => setViewMode("table")}
          >
            Ver Todas
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateProperty}>
            {isMobile ? "Añadir" : "Nueva Propiedad"}
          </Button>
        </Box>
      </Box>

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
                <Button size="small" onClick={() => setViewMode("table")}>
                  Ver todas
                </Button>
              </Box>
              <Grid container spacing={2}>
                {mockProperties.slice(0, 3).map((property) => (
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
                            label={propertyStateLabels[property.state]}
                            color={propertyStateColors[property.state] || "default"}
                            size="small"
                            sx={{ ml: "auto" }}
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
  )

  // Renderizar la tabla de propiedades con búsqueda y filtros
  const renderTable = () => (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" component="h1" fontWeight="bold">
          Listado de Propiedades
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={showFilters ? <CloseIcon /> : <FilterListIcon />}
            sx={{ mr: 2 }}
            onClick={toggleFilters}
          >
            {showFilters ? "Ocultar Filtros" : "Filtros"}
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateProperty}>
            {isMobile ? "Añadir" : "Nueva Propiedad"}
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
                  <MenuItem value="HOUSE">Casa</MenuItem>
                  <MenuItem value="APARTMENT">Apartamento</MenuItem>
                  <MenuItem value="COMMERCIAL">Local Comercial</MenuItem>
                  <MenuItem value="LAND">Terreno</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Estado</InputLabel>
                <Select value={filterState} onChange={handleFilterStateChange} label="Estado">
                  <MenuItem value="">Todos</MenuItem>
                  <MenuItem value="AVAILABLE">Disponible</MenuItem>
                  <MenuItem value="DRAFT">Borrador</MenuItem>
                  <MenuItem value="PUBLISHED">Publicada</MenuItem>
                  <MenuItem value="RESERVED">Reservada</MenuItem>
                  <MenuItem value="SOLD">Vendida</MenuItem>
                  <MenuItem value="RENTED">Alquilada</MenuItem>
                  <MenuItem value="UNAVAILABLE">No Disponible</MenuItem>
                  <MenuItem value="UNDER_CONSTRUCTION">En Construcción</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="property tabs"
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons="auto"
          >
            <Tab label="Todas" />
            <Tab label="Disponibles" />
            <Tab label="Borradores" icon={isMobile ? <DraftsIcon /> : null} iconPosition="start" />
            <Tab label="Publicadas" icon={isMobile ? <PublicIcon /> : null} iconPosition="start" />
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
              {filteredProperties.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No se encontraron propiedades con los criterios de búsqueda
                  </TableCell>
                </TableRow>
              ) : (
                filteredProperties.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((property) => (
                  <TableRow key={property.id} hover>
                    <TableCell>{property.title}</TableCell>
                    <TableCell>{propertyTypeLabels[property.type]}</TableCell>
                    <TableCell>
                      {property.address}, {property.city}
                    </TableCell>
                    <TableCell>{formatCurrency(property.price, property.currency)}</TableCell>
                    <TableCell>
                      <Chip
                        label={propertyStateLabels[property.state]}
                        color={propertyStateColors[property.state] || "default"}
                        size="small"
                        icon={
                          property.state === "DRAFT" ? (
                            <DraftsIcon />
                          ) : property.state === "PUBLISHED" ? (
                            <PublicIcon />
                          ) : null
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Ver detalles">
                        <IconButton size="small" color="info" onClick={() => handleViewProperty(property)}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar">
                        <IconButton size="small" color="primary" onClick={() => handleEditProperty(property)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton size="small" color="error" onClick={() => handleDeleteProperty(property.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
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
          count={filteredProperties.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      </Card>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-start" }}>
        <Button variant="outlined" onClick={() => setViewMode("dashboard")}>
          Volver al Dashboard
        </Button>
      </Box>
    </>
  )

  // Renderizar los detalles de una propiedad
  const renderPropertyDetail = () => {
    if (!propertyToEdit) return null

    return (
      <>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" component="h1" fontWeight="bold">
            Detalles de la Propiedad
          </Typography>
          <Box>
            <Button variant="outlined" startIcon={<EditIcon />} sx={{ mr: 2 }} onClick={() => setViewMode("form")}>
              Editar
            </Button>
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
              Eliminar
            </Button>
          </Box>
        </Box>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  {propertyToEdit.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  {propertyTypeIcons[propertyToEdit.type]}
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {propertyTypeLabels[propertyToEdit.type]}
                  </Typography>
                  <Chip
                    label={propertyStateLabels[propertyToEdit.state]}
                    color={propertyStateColors[propertyToEdit.state]}
                    size="small"
                    sx={{ ml: 2 }}
                    icon={
                      propertyToEdit.state === "DRAFT" ? (
                        <DraftsIcon />
                      ) : propertyToEdit.state === "PUBLISHED" ? (
                        <PublicIcon />
                      ) : null
                    }
                  />
                </Box>
                <Typography variant="h5" color="primary.main" gutterBottom>
                  {formatCurrency(propertyToEdit.price, propertyToEdit.currency)}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {propertyToEdit.address}, {propertyToEdit.city}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  <Box sx={{ minWidth: 100 }}>
                    <Typography variant="body2" color="text.secondary">
                      Área
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {propertyToEdit.area} m²
                    </Typography>
                  </Box>
                  {propertyToEdit.bedrooms > 0 && (
                    <Box sx={{ minWidth: 100 }}>
                      <Typography variant="body2" color="text.secondary">
                        Dormitorios
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {propertyToEdit.bedrooms}
                      </Typography>
                    </Box>
                  )}
                  {propertyToEdit.bathrooms > 0 && (
                    <Box sx={{ minWidth: 100 }}>
                      <Typography variant="body2" color="text.secondary">
                        Baños
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {propertyToEdit.bathrooms}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-start" }}>
          <Button variant="outlined" onClick={handleBackToTable}>
            Volver al Listado
          </Button>
        </Box>
      </>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      {renderContent()}

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleViewProperty(mockProperties.find((p) => p.id === selectedProperty))}>
          Ver detalles
        </MenuItem>
        <MenuItem onClick={() => handleEditProperty(mockProperties.find((p) => p.id === selectedProperty))}>
          Editar
        </MenuItem>
        <MenuItem onClick={() => handleDeleteProperty(selectedProperty)} sx={{ color: "error.main" }}>
          Eliminar
        </MenuItem>
      </Menu>
    </Box>
  )
}
