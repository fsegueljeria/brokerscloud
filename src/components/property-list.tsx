"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Typography,
  Tooltip,
} from "@mui/material"
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material"

import type { Property } from "@/types/types"
import { propertyService } from "@/libs/services/property-service"

interface PropertyListProps {
  onEditProperty: (property: Property) => void
  propertyType?: string
}

export function PropertyList({ onEditProperty, propertyType }: PropertyListProps) {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [properties, setProperties] = useState<Property[]>([])
  const [totalProperties, setTotalProperties] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)
      try {
        const response = await propertyService.getProperties({
          page: page + 1,
          limit: rowsPerPage,
          search: searchTerm,
          type: propertyType,
        })
        setProperties(response)
        setTotalProperties(response.length)
      } catch (error) {
        console.error("Error fetching properties:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [page, rowsPerPage, searchTerm, propertyType])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setPage(0)
  }

  const handleDeleteProperty = async (id: number) => {
    try {
      await propertyService.deleteProperty(id)
      setProperties(properties.filter((property) => property.id !== id.toString()))
    } catch (error) {
      console.error("Error deleting property:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DISPONIBLE":
        return "success"
      case "VENDIDO":
        return "error"
      case "RESERVADO":
        return "warning"
      default:
        return "default"
    }
  }

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === "UF") {
      return `${amount.toLocaleString("es-CL")} UF`
    }

    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: currency === "CLP" ? 0 : 2,
    }).format(amount)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por título, dirección o ciudad..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          size="small"
        />
      </Box>

      {loading ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Cargando propiedades...
          </Typography>
        </Box>
      ) : properties.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No se encontraron propiedades
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Intenta con otros términos de búsqueda o crea una nueva propiedad
          </Typography>
        </Box>
      ) : (
        <>
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
                {properties.map((property) => (
                  <TableRow key={property.id} hover>
                    <TableCell>{property.title}</TableCell>
                    <TableCell>{property.type}</TableCell>
                    <TableCell>
                      {property.city}, {property.province}
                    </TableCell>
                    <TableCell>{formatCurrency(property.price, property.currency)}</TableCell>
                    <TableCell>
                      <Chip
                        label={property.status}
                        color={getStatusColor(property.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Ver detalles">
                        <IconButton size="small" color="primary">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar">
                        <IconButton size="small" color="primary" onClick={() => onEditProperty(property)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {/*<Tooltip title="Eliminar">
                        <IconButton size="small" color="error" onClick={() => handleDeleteProperty(property.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>*/}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalProperties}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
        </>
      )}
    </Box>
  )
}
