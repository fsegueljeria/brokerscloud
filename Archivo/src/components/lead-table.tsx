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
import TransformIcon from "@mui/icons-material/Transform"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import FilterListIcon from "@mui/icons-material/FilterList"
import ClearIcon from "@mui/icons-material/Clear"

export function LeadTable({ leads, onViewMessages, onEdit, onDelete, onConvert, onCreate }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [sourceFilter, setSourceFilter] = useState("")
  const [propertyFilter, setPropertyFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Extraer valores únicos para los filtros
  const sources = useMemo(() => {
    const uniqueSources = [...new Set(leads.map((lead) => lead.source))]
    return uniqueSources.sort()
  }, [leads])

  const properties = useMemo(() => {
    const uniqueProperties = [...new Set(leads.map((lead) => lead.propertyTitle).filter(Boolean))]
    return uniqueProperties.sort()
  }, [leads])

  const statuses = useMemo(() => {
    const uniqueStatuses = [...new Set(leads.map((lead) => lead.status))]
    return uniqueStatuses.sort()
  }, [leads])

  // Aplicar filtros
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Filtro de búsqueda (nombre, email, teléfono)
      const searchMatch =
        searchTerm === "" ||
        (lead.name && lead.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lead.phone && lead.phone.toLowerCase().includes(searchTerm.toLowerCase()))

      // Filtro de fuente
      const sourceMatch = sourceFilter === "" || lead.source === sourceFilter

      // Filtro de propiedad
      const propertyMatch = propertyFilter === "" || lead.propertyTitle === propertyFilter

      // Filtro de estado
      const statusMatch = statusFilter === "" || lead.status === statusFilter

      return searchMatch && sourceMatch && propertyMatch && statusMatch
    })
  }, [leads, searchTerm, sourceFilter, propertyFilter, statusFilter])

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

  const handleSourceFilterChange = (event) => {
    setSourceFilter(event.target.value)
    setPage(0)
  }

  const handlePropertyFilterChange = (event) => {
    setPropertyFilter(event.target.value)
    setPage(0)
  }

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value)
    setPage(0)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSourceFilter("")
    setPropertyFilter("")
    setStatusFilter("")
    setPage(0)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Nuevo":
        return "info"
      case "Contactado":
        return "primary"
      case "Calificado":
        return "success"
      case "No calificado":
        return "error"
      case "Convertido":
        return "secondary"
      default:
        return "default"
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
              Nuevo Lead
            </Button>
          </Box>
        </Box>

        {showFilters && (
          <Grid container spacing={2} sx={{ mb: 3 }}>
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
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="property-filter-label">Propiedad</InputLabel>
                <Select
                  labelId="property-filter-label"
                  value={propertyFilter}
                  onChange={handlePropertyFilterChange}
                  label="Propiedad"
                >
                  <MenuItem value="">Todas</MenuItem>
                  {properties.map((property) => (
                    <MenuItem key={property} value={property}>
                      {property}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
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
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {(searchTerm || sourceFilter || propertyFilter || statusFilter) && (
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
          {filteredLeads.length === 0 ? (
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="body1" color="text.secondary">
                No se encontraron leads con los filtros aplicados
              </Typography>
            </Paper>
          ) : (
            filteredLeads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((lead) => (
              <Card key={lead.id} sx={{ mb: 2 }} onClick={() => onViewMessages(lead)}>
                <CardContent sx={{ pb: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Typography variant="h6" component="div">
                      {lead.name}
                    </Typography>
                    <Chip label={lead.status} color={getStatusColor(lead.status)} size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {lead.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {lead.phone}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {lead.source}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {lead.date}
                    </Typography>
                  </Box>
                  {lead.propertyTitle && (
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: "medium" }}>
                      Propiedad: {lead.propertyTitle}
                    </Typography>
                  )}
                </CardContent>
                <CardActions sx={{ pt: 0, justifyContent: "flex-end" }}>
                  <Tooltip title="Ver mensajes">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        onViewMessages(lead)
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
                        onEdit(lead)
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {lead.status !== "Convertido" && (
                    <Tooltip title="Convertir a oportunidad">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation()
                          onConvert(lead)
                        }}
                      >
                        <TransformIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Eliminar">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(lead.id)
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
          count={filteredLeads.length}
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

  // Vista de tabla para tablet y desktop (código original)
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
            Nuevo Lead
          </Button>
        </Box>
      </Box>

      {showFilters && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
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
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="property-filter-label">Propiedad</InputLabel>
              <Select
                labelId="property-filter-label"
                value={propertyFilter}
                onChange={handlePropertyFilterChange}
                label="Propiedad"
              >
                <MenuItem value="">Todas</MenuItem>
                {properties.map((property) => (
                  <MenuItem key={property} value={property}>
                    {property}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
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
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {(searchTerm || sourceFilter || propertyFilter || statusFilter) && (
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
        <Table sx={{ minWidth: 650 }} aria-label="tabla de leads">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Fuente</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Propiedad</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No se encontraron leads con los filtros aplicados
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((lead) => (
                <TableRow key={lead.id} hover onClick={() => onViewMessages(lead)} sx={{ cursor: "pointer" }}>
                  <TableCell component="th" scope="row">
                    {lead.name}
                  </TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>{lead.date}</TableCell>
                  <TableCell>{lead.propertyTitle || "—"}</TableCell>
                  <TableCell>
                    <Chip label={lead.status} color={getStatusColor(lead.status)} size="small" />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Tooltip title="Ver mensajes">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            onViewMessages(lead)
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
                            onEdit(lead)
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {lead.status !== "Convertido" && (
                        <Tooltip title="Convertir a oportunidad">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={(e) => {
                              e.stopPropagation()
                              onConvert(lead)
                            }}
                          >
                            <TransformIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Eliminar">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDelete(lead.id)
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
        count={filteredLeads.length}
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
