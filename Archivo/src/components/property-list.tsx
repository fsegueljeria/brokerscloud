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

// Datos de ejemplo
const mockProperties: Property[] = [
  {
    id: "1",
    title: "Apartamento moderno en el centro",
    type: "apartamento",
    status: "disponible",
    price: 250000000,
    currency: "CLP",
    address: "Calle Principal 123",
    city: "Santiago",
    province: "Santiago",
    zipCode: "8320000",
    country: "Chile",
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    description: "Hermoso apartamento reformado en el centro de la ciudad",
    features: ["Ascensor", "Balcón", "Calefacción"],
    images: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Casa adosada con jardín",
    type: "casa",
    status: "disponible",
    price: 8500,
    currency: "UF",
    address: "Avenida del Parque 45",
    city: "Viña del Mar",
    province: "Valparaíso",
    zipCode: "2520000",
    country: "Chile",
    bedrooms: 4,
    bathrooms: 2,
    area: 150,
    description: "Amplia casa adosada con jardín privado y garaje",
    features: ["Jardín", "Garaje", "Piscina comunitaria"],
    images: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Local comercial céntrico",
    type: "local",
    status: "disponible",
    price: 180000,
    currency: "USD",
    address: "Gran Avenida 78",
    city: "Santiago",
    province: "Santiago",
    zipCode: "8320000",
    country: "Chile",
    area: 120,
    description: "Local comercial a pie de calle en zona de alto tránsito peatonal",
    features: ["Escaparate", "Aire acondicionado", "Almacén"],
    images: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Terreno urbanizable",
    type: "terreno",
    status: "disponible",
    price: 3500,
    currency: "UF",
    address: "Camino del Monte s/n",
    city: "Concón",
    province: "Valparaíso",
    zipCode: "2510000",
    country: "Chile",
    area: 500,
    description: "Terreno urbanizable con vistas al mar",
    features: ["Vistas al mar", "Acceso asfaltado", "Servicios cerca"],
    images: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

interface PropertyListProps {
  onEditProperty: (property: Property) => void
  propertyType?: string
}

export function PropertyList({ onEditProperty, propertyType }: PropertyListProps) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [properties, setProperties] = useState<Property[]>([])

  useEffect(() => {
    // Filtrar propiedades por tipo si se proporciona
    let filteredProperties = [...mockProperties]

    if (propertyType) {
      filteredProperties = filteredProperties.filter((prop) => prop.type === propertyType)
    }

    // Aplicar búsqueda
    if (searchTerm) {
      filteredProperties = filteredProperties.filter(
        (property) =>
          property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.city.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setProperties(filteredProperties)
  }, [searchTerm, propertyType])

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

  const handleDeleteProperty = (id: string) => {
    // Aquí iría la lógica para eliminar la propiedad
    console.log("Eliminar propiedad:", id)
    setProperties(properties.filter((property) => property.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "disponible":
        return "success"
      case "vendido":
        return "error"
      case "reservado":
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

      {properties.length === 0 ? (
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
                {properties.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((property) => (
                  <TableRow key={property.id} hover>
                    <TableCell>{property.title}</TableCell>
                    <TableCell>{property.type.charAt(0).toUpperCase() + property.type.slice(1)}</TableCell>
                    <TableCell>
                      {property.city}, {property.province}
                    </TableCell>
                    <TableCell>{formatCurrency(property.price, property.currency)}</TableCell>
                    <TableCell>
                      <Chip
                        label={property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                        color={getStatusColor(property.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Ver detalles">
                        <IconButton size="small" color="info">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar">
                        <IconButton size="small" color="primary" onClick={() => onEditProperty(property)}>
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
                ))}
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
        </>
      )}
    </Box>
  )
}
