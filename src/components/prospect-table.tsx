"use client"

import { useState, useMemo } from "react"

import {
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardActions,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import VisibilityIcon from "@mui/icons-material/Visibility"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import FilterListIcon from "@mui/icons-material/FilterList"
import ClearIcon from "@mui/icons-material/Clear"

import type { Prospect, ProspectStatus, ProspectType } from "@/types/types"

interface ProspectTableProps {
  prospects: Prospect[]
  onView: (prospect: Prospect) => void
  onEdit: (prospect: Prospect) => void
  onDelete: (id: number) => void
  onCreate: () => void
}

export function ProspectTable({ prospects, onView, onEdit, onDelete, onCreate }: ProspectTableProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [typeFilter, setTypeFilter] = useState<string>("")
  const [sourceFilter, setSourceFilter] = useState<string>("")
  const [showFilters, setShowFilters] = useState(false)

  // Extraer valores únicos para los filtros
  const statuses = useMemo(() => {
    const uniqueStatuses = [...new Set(prospects.map((prospect) => prospect.status))]

    
return uniqueStatuses.sort()
  }, [prospects])

  const types = useMemo(() => {
    const uniqueTypes = [...new Set(prospects.map((prospect) => prospect.type))]

    
return uniqueTypes.sort()
  }, [prospects])

  const sources = useMemo(() => {
    const uniqueSources = [...new Set(prospects.map((prospect) => prospect.source).filter(Boolean))]

    
return uniqueSources.sort()
  }, [prospects])

  // Aplicar filtros
  const filteredProspects = useMemo(() => {
    return prospects.filter((prospect) => {
      // Filtro de búsqueda (nombre, email, teléfono)
      const fullName = `${prospect.firstName} ${prospect.lastName}`.toLowerCase()

      const searchMatch =
        searchTerm === "" ||
        fullName.includes(searchTerm.toLowerCase()) ||
        (prospect.email && prospect.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (prospect.phone && prospect.phone.toLowerCase().includes(searchTerm.toLowerCase()))

      // Filtro de estado
      const statusMatch = statusFilter === "" || prospect.status === statusFilter

      // Filtro de tipo
      const typeMatch = typeFilter === "" || prospect.type === typeFilter

      // Filtro de fuente
      const sourceMatch = sourceFilter === "" || prospect.source === sourceFilter

      return searchMatch && statusMatch && typeMatch && sourceMatch
    })
  }, [prospects, searchTerm, statusFilter, typeFilter, sourceFilter])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setPage(0) // Resetear a la primera página cuando se busca
  }

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value)
    setPage(0)
  }

  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value)
    setPage(0)
  }

  const handleSourceFilterChange = (event) => {
    setSourceFilter(event.target.value)
    setPage(0)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("")
    setTypeFilter("")
    setSourceFilter("")
    setPage(0)
  }

  const getStatusColor = (status: ProspectStatus) => {
    switch (status) {
      case "ACTIVE":
        return "success"
      case "INACTIVE":
        return "default"
      case "POTENTIAL":
        return "info"
      case "QUALIFIED":
        return "primary"
      case "CONVERTED":
        return "secondary"
      case "LOST":
        return "error"
      default:
        return "default"
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

  // Renderizado condicional para dispositivos móviles
  if (isMobile) {
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <TextField
            placeholder="Buscar..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: "100%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchTerm("")}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: "flex", gap: 1, width: "100%", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => setShowFilters(!showFilters)}
              color={showFilters ? "primary" : "inherit"}
              size="small"
              sx={{ flexGrow: 1 }}
            >
              Filtros
            </Button>
            <Button variant="contained" startIcon={<AddIcon />} onClick={onCreate} size="small" sx={{ flexGrow: 1 }}>
              Nuevo Prospecto
            </Button>
          </Box>
        </Box>

        {showFilters && (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="status-filter-label">Estado</InputLabel>
                <Select
                  labelId="status-filter-label"
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  label="Estado"
                >
                  <MenuItem value="">Todos</MenuItem>
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {getStatusLabel(status as ProspectStatus)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="type-filter-label">Tipo</InputLabel>
                <Select labelId="type-filter-label" value={typeFilter} onChange={handleTypeFilterChange} label="Tipo">
                  <MenuItem value="">Todos</MenuItem>
                  {types.map((type) => (
                    <MenuItem key={type} value={type}>
                      {getTypeLabel(type as ProspectType)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="source-filter-label">Fuente</InputLabel>
                <Select
                  labelId="source-filter-label"
                  value={sourceFilter}
                  onChange={handleSourceFilterChange}
                  label="Fuente"
                >
                  <MenuItem value="">Todas</MenuItem>
                  {sources.map((source) => (
                    <MenuItem key={source} value={source}>
                      {source}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {(searchTerm || statusFilter || typeFilter || sourceFilter) && (
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button variant="text" startIcon={<ClearIcon />} onClick={clearFilters} size="small">
                    Limpiar filtros
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        )}

        {/* Vista de tarjetas para móvil */}
        <Box sx={{ mb: 2 }}>
          {filteredProspects.length === 0 ? (
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="body1" color="text.secondary">
                No se encontraron prospectos con los filtros aplicados
              </Typography>
            </Paper>
          ) : (
            filteredProspects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((prospect) => (
              <Card key={prospect.id} sx={{ mb: 2 }} onClick={() => onView(prospect)}>
                <CardContent sx={{ pb: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Typography variant="h6" component="div">
                      {prospect.firstName} {prospect.lastName}
                    </Typography>
                    <Chip
                      label={getStatusLabel(prospect.status)}
                      color={getStatusColor(prospect.status)}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {prospect.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {prospect.phone || "Sin teléfono"}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {getTypeLabel(prospect.type)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {prospect.source || "Sin fuente"}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ pt: 0, justifyContent: "flex-end" }}>
                  <Tooltip title="Ver detalles">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        onView(prospect)
                      }}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        onEdit(prospect)
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(prospect.id)
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            ))
          )}
        </Box>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredProspects.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      </Box>
    )
  }

  // Vista de tabla para tablet y desktop
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexWrap: isTablet ? "wrap" : "nowrap",
          gap: isTablet ? 1 : 0,
        }}
      >
        <TextField
          placeholder="Buscar por nombre, email o teléfono"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: isTablet ? "100%" : "300px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchTerm("")}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box
          sx={{
            display: "flex",
            gap: 1,
            width: isTablet ? "100%" : "auto",
            justifyContent: isTablet ? "space-between" : "flex-end",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setShowFilters(!showFilters)}
            color={showFilters ? "primary" : "inherit"}
          >
            Filtros
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={onCreate}>
            Nuevo Prospecto
          </Button>
        </Box>
      </Box>

      {showFilters && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="status-filter-label">Estado</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                onChange={handleStatusFilterChange}
                label="Estado"
              >
                <MenuItem value="">Todos</MenuItem>
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {getStatusLabel(status as ProspectStatus)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="type-filter-label">Tipo</InputLabel>
              <Select labelId="type-filter-label" value={typeFilter} onChange={handleTypeFilterChange} label="Tipo">
                <MenuItem value="">Todos</MenuItem>
                {types.map((type) => (
                  <MenuItem key={type} value={type}>
                    {getTypeLabel(type as ProspectType)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="source-filter-label">Fuente</InputLabel>
              <Select
                labelId="source-filter-label"
                value={sourceFilter}
                onChange={handleSourceFilterChange}
                label="Fuente"
              >
                <MenuItem value="">Todas</MenuItem>
                {sources.map((source) => (
                  <MenuItem key={source} value={source}>
                    {source}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {(searchTerm || statusFilter || typeFilter || sourceFilter) && (
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="text" startIcon={<ClearIcon />} onClick={clearFilters}>
                  Limpiar filtros
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tabla de prospectos">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Fuente</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProspects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No se encontraron prospectos con los filtros aplicados
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredProspects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((prospect) => (
                <TableRow key={prospect.id} hover onClick={() => onView(prospect)} sx={{ cursor: "pointer" }}>
                  <TableCell component="th" scope="row">
                    {prospect.firstName} {prospect.lastName}
                  </TableCell>
                  <TableCell>{prospect.email}</TableCell>
                  <TableCell>{prospect.phone || "—"}</TableCell>
                  <TableCell>{getTypeLabel(prospect.type)}</TableCell>
                  <TableCell>{prospect.source || "—"}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusLabel(prospect.status)}
                      color={getStatusColor(prospect.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Tooltip title="Ver detalles">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            onView(prospect)
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            onEdit(prospect)
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDelete(prospect.id)
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={filteredProspects.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />
    </Box>
  )
}
