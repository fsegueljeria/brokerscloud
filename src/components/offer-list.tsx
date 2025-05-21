"use client"

import type React from "react"

import { useState, useEffect } from "react"

import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Collapse,
  Button,
} from "@mui/material"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Search, FilterList, Clear, Visibility as VisibilityIcon, Edit as EditIcon } from "@mui/icons-material"
import { useRouter } from "next/navigation"

import type { Offer } from "@/types/types"
import { formatCurrency } from "@/libs/utils"
import { offerService, mockProperties, mockProspects, mockAgents, offerStageColors } from "@/libs/services/offer-service"

interface OfferListProps {
  opportunityId?: number
  onSelectOffer?: (offer: Offer) => void
  actionButtons?: (offer: Offer) => React.ReactNode
}

// Actualizar la función OfferList para incluir los filtros
export function OfferList({ opportunityId, onSelectOffer, actionButtons }: OfferListProps) {
  const theme = useTheme()
  const router = useRouter()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [offers, setOffers] = useState<Offer[]>([])
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)

  // Estados para los filtros
  const [searchText, setSearchText] = useState("")
  const [stageFilter, setStageFilter] = useState<string>("")
  const [propertyFilter, setPropertyFilter] = useState<number | "">("")
  const [prospectFilter, setProspectFilter] = useState<number | "">("")
  const [showFilters, setShowFilters] = useState(false)

  // Obtener listas únicas para los filtros
  const stageOptions = Object.keys(offerStageColors)

  const propertyOptions = Object.entries(mockProperties).map(([id, property]) => ({
    id: Number.parseInt(id),
    name: `${property.code} ${property.title}`,
  }))

  const prospectOptions = Object.entries(mockProspects).map(([id, prospect]) => ({
    id: Number.parseInt(id),
    name: `${prospect.firstName} ${prospect.lastName}`,
  }))

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true)

        const fetchedOffers = opportunityId
          ? await offerService.getOffersByOpportunityId(opportunityId)
          : await offerService.getOffers()

        setOffers(fetchedOffers)
        setFilteredOffers(fetchedOffers)
      } catch (error) {
        console.error("Error fetching offers:", error)
        setOffers([])
        setFilteredOffers([])
      } finally {
        setLoading(false)
      }
    }

    fetchOffers()
  }, [opportunityId])

  // Efecto para aplicar filtros cuando cambian
  useEffect(() => {
    applyFilters()
  }, [searchText, stageFilter, propertyFilter, prospectFilter, offers])

  // Función para aplicar todos los filtros
  const applyFilters = () => {
    let result = [...offers]

    // Filtro de texto libre (busca en título, referencia y observaciones)
    if (searchText) {
      const searchLower = searchText.toLowerCase()

      result = result.filter(
        (offer) =>
          offer.title.toLowerCase().includes(searchLower) ||
          offer.reference.toLowerCase().includes(searchLower) ||
          offer.observation?.toLowerCase().includes(searchLower),
      )
    }

    // Filtro por estado
    if (stageFilter) {
      result = result.filter((offer) => offer.stage === stageFilter)
    }

    // Filtro por propiedad
    if (propertyFilter !== "") {
      result = result.filter((offer) => offer.propertyId === propertyFilter)
    }

    // Filtro por prospecto
    if (prospectFilter !== "") {
      result = result.filter((offer) => offer.prospectId === prospectFilter)
    }

    setFilteredOffers(result)
  }

  // Función para limpiar todos los filtros
  const clearFilters = () => {
    setSearchText("")
    setStageFilter("")
    setPropertyFilter("")
    setProspectFilter("")
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy", { locale: es })
  }

  const getStageChip = (stage: string) => {
    const stageInfo = offerStageColors[stage as keyof typeof offerStageColors] || {
      label: stage,
      color: "#424242",
      bg: "#f5f5f5",
    }

    return (
      <Chip
        label={stageInfo.label}
        style={{
          backgroundColor: stageInfo.bg,
          color: stageInfo.color,
          fontWeight: "bold",
        }}
        size={isMobile ? "small" : "medium"}
      />
    )
  }

  const handleRowClick = (offer: Offer) => {
    if (onSelectOffer) {
      onSelectOffer(offer)
    }
  }

  const handleEditOffer = (e: React.MouseEvent, offer: Offer) => {
    e.stopPropagation()
    router.push(`/ofertas/${offer.id}`)
  }

  // Componente de filtros
  const FiltersComponent = () => (
    <Box sx={{ mb: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Buscar"
              variant="outlined"
              size="small"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: searchText ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchText("")}>
                      <Clear fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Estado</InputLabel>
              <Select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                input={<OutlinedInput label="Estado" />}
                
              >
                <MenuItem value="">Todos</MenuItem>
                {stageOptions.map((stage) => (
                  <MenuItem key={stage} value={stage}>
                    {offerStageColors[stage as keyof typeof offerStageColors]?.label || stage}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Propiedad</InputLabel>
              <Select
                value={propertyFilter}
                onChange={(e) => setPropertyFilter(e.target.value as number | "")}
                input={<OutlinedInput label="Propiedad" />}
              >
                <MenuItem value="">Todas</MenuItem>
                {propertyOptions.map((property) => (
                  <MenuItem key={property.id} value={property.id}>
                    {property.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Cliente</InputLabel>
              <Select
                value={prospectFilter}
                onChange={(e) => setProspectFilter(e.target.value as number | "")}
                input={<OutlinedInput label="Cliente" />}
              >
                <MenuItem value="">Todos</MenuItem>
                {prospectOptions.map((prospect) => (
                  <MenuItem key={prospect.id} value={prospect.id}>
                    {prospect.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button variant="outlined" size="small" onClick={clearFilters} startIcon={<Clear />} sx={{ mr: 1 }}>
              Limpiar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  // Botón para mostrar/ocultar filtros
  const FilterToggle = () => (
    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mb: 2 }}>
      <Button variant="outlined" size="small" startIcon={<FilterList />} onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
      </Button>
    </Box>
  )

  return (
    <Box>
      <FilterToggle />

      <Collapse in={showFilters}>
        <FiltersComponent />
      </Collapse>

      {filteredOffers.length === 0 ? (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary">
            No se encontraron ofertas con los filtros aplicados.
          </Typography>
        </Box>
      ) : isMobile ? (
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {filteredOffers.map((offer) => (
              <Grid item xs={12} key={offer.id}>
                <Card
                  sx={{
                    cursor: onSelectOffer ? "pointer" : "default",
                    "&:hover": onSelectOffer ? { boxShadow: 3 } : {},
                  }}
                  onClick={() => handleRowClick(offer)}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {formatCurrency(offer.amount, offer.currency)}
                      </Typography>
                      {getStageChip(offer.stage)}
                    </Box>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {mockProperties[offer.propertyId as keyof typeof mockProperties]?.title ||
                        "Propiedad no disponible"}
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                      <Typography variant="body2">
                        Cliente:{" "}
                        {mockProspects[offer.prospectId as keyof typeof mockProspects]?.firstName ||
                          "Cliente no disponible"}
                      </Typography>
                      <Typography variant="body2">Exp: {formatDate(offer.expirationDate)}</Typography>
                    </Box>

                    {offer.swap && (
                      <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                        Incluye Canje
                      </Typography>
                    )}

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, gap: 1 }}>
                      <IconButton size="small" color="info" onClick={(e) => {
                        e.stopPropagation()
                        handleRowClick(offer)
                      }}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="primary" onClick={(e) => handleEditOffer(e, offer)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      {actionButtons && actionButtons(offer)}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Propiedad</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell>Comisión</TableCell>
                <TableCell>Fecha Exp.</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Canje</TableCell>
                <TableCell>Agente</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOffers.map((offer) => (
                <TableRow
                  key={offer.id}
                  hover={!!onSelectOffer}
                  onClick={() => handleRowClick(offer)}
                  sx={{ cursor: onSelectOffer ? "pointer" : "default" }}
                >
                  <TableCell>
                    {mockProperties[offer.propertyId as keyof typeof mockProperties]?.title || "Propiedad no disponible"}
                  </TableCell>
                  <TableCell>
                    {`${mockProspects[offer.prospectId as keyof typeof mockProspects]?.firstName || ""} ${
                      mockProspects[offer.prospectId as keyof typeof mockProspects]?.lastName || "Cliente no disponible"
                    }`}
                  </TableCell>
                  <TableCell>{formatCurrency(offer.amount, offer.currency)}</TableCell>
                  <TableCell>{formatCurrency(offer.amountCommission, offer.currencyCommission)}</TableCell>
                  <TableCell>{formatDate(offer.expirationDate)}</TableCell>
                  <TableCell>{getStageChip(offer.stage)}</TableCell>
                  <TableCell>{offer.swap ? "Sí" : "No"}</TableCell>
                  <TableCell>
                    {`${mockAgents[offer.assignAgentId as keyof typeof mockAgents]?.firstName || ""} ${
                      mockAgents[offer.assignAgentId as keyof typeof mockAgents]?.lastName || "Agente no disponible"
                    }`}
                  </TableCell>
                  {actionButtons && <TableCell align="right">{actionButtons(offer)}</TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
