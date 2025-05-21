"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Switch,
  FormControlLabel,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { Edit as EditIcon, Check as CheckIcon, Close as CloseIcon, Star as StarIcon } from "@mui/icons-material"
import type { Property, PropertyPortalPublication, PublicationStatus } from "@/types/types"

// Datos de ejemplo para los portales inmobiliarios
const availablePortals = [
  {
    id: "portalinmobiliario",
    name: "Portal Inmobiliario",
    url: "https://www.portalinmobiliario.com",
    logo: "/images/portales/abstract-house-portal.png",
    description: "El portal inmobiliario más grande de Chile",
    active: true,
  },
  {
    id: "toctoc",
    name: "TocToc",
    url: "https://www.toctoc.com",
    logo: "/images/portales/abstract-door-knocking.png",
    description: "Especializado en propiedades nuevas y usadas",
    active: true,
  },
  {
    id: "yapo",
    name: "Yapo.cl",
    url: "https://www.yapo.cl",
    logo: "/images/portales/yapo-cl-logo-representation.png",
    description: "Clasificados generales con sección inmobiliaria",
    active: true,
  },
  {
    id: "mercadolibre",
    name: "Mercado Libre",
    url: "https://www.mercadolibre.cl",
    logo: "/images/portales/abstract-geometric-shapes.png",
    description: "Marketplace con sección de propiedades",
    active: true,
  },
  {
    id: "zoominmobiliario",
    name: "Zoom Inmobiliario",
    url: "https://www.zoominmobiliario.cl",
    logo: "/images/portales/abstract-real-estate-zoom.png",
    description: "Especializado en propiedades de lujo",
    active: true,
  },
]

interface PortalDialogProps {
  open: boolean
  onClose: () => void
  portal: any
  publication: PropertyPortalPublication | null
  onSave: (publication: PropertyPortalPublication) => void
}

function PortalDialog({ open, onClose, portal, publication, onSave }: PortalDialogProps) {
  const [formData, setFormData] = useState<PropertyPortalPublication>({
    portalId: portal?.id || "",
    status: "DRAFT",
    publicationDate: "",
    expirationDate: "",
    url: "",
    reference: "",
    featured: false,
    cost: 0,
    currency: "CLP",
  })

  useEffect(() => {
    if (publication) {
      setFormData(publication)
    } else if (portal) {
      setFormData({
        portalId: portal.id,
        status: "DRAFT",
        publicationDate: "",
        expirationDate: "",
        url: "",
        reference: "",
        featured: false,
        cost: 0,
        currency: "CLP",
      })
    }
  }, [publication, portal])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSave = () => {
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Configurar publicación en {portal?.name}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="status-label">Estado de publicación</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={formData.status}
                onChange={handleChange}
                label="Estado de publicación"
              >
                <MenuItem value="DRAFT">Borrador</MenuItem>
                <MenuItem value="PUBLISHED">Publicado</MenuItem>
                <MenuItem value="PAUSED">Pausado</MenuItem>
                <MenuItem value="EXPIRED">Expirado</MenuItem>
                <MenuItem value="REJECTED">Rechazado</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Fecha de publicación"
              type="date"
              name="publicationDate"
              value={formData.publicationDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Fecha de expiración"
              type="date"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="URL de la publicación"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://..."
              margin="normal"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Referencia externa"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              placeholder="ID o referencia en el portal"
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Costo de publicación"
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="currency-label">Moneda</InputLabel>
              <Select
                labelId="currency-label"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                label="Moneda"
              >
                <MenuItem value="CLP">CLP</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch checked={formData.featured || false} onChange={handleChange} name="featured" color="primary" />
              }
              label="Publicación destacada"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained" startIcon={<CheckIcon />}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

interface PortalsStepProps {
  data: Partial<Property>
  onUpdateData: (data: Partial<Property>) => void
}

export function PortalsStep({ data, onUpdateData }: PortalsStepProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedPortal, setSelectedPortal] = useState(null)
  const [selectedPublication, setSelectedPublication] = useState(null)

  const portalPublications = data.portalPublications || []

  const handleTogglePortal = (portalId) => {
    const existingIndex = portalPublications.findIndex((pub) => pub.portalId === portalId)

    if (existingIndex >= 0) {
      // Eliminar la publicación
      const updatedPublications = [...portalPublications]
      updatedPublications.splice(existingIndex, 1)
      onUpdateData({ portalPublications: updatedPublications })
    } else {
      // Añadir una nueva publicación
      const portal = availablePortals.find((p) => p.id === portalId)
      setSelectedPortal(portal)
      setSelectedPublication(null)
      setDialogOpen(true)
    }
  }

  const handleEditPortal = (portalId) => {
    const portal = availablePortals.find((p) => p.id === portalId)
    const publication = portalPublications.find((pub) => pub.portalId === portalId)
    setSelectedPortal(portal)
    setSelectedPublication(publication)
    setDialogOpen(true)
  }

  const handleSavePublication = (publication) => {
    const existingIndex = portalPublications.findIndex((pub) => pub.portalId === publication.portalId)

    let updatedPublications
    if (existingIndex >= 0) {
      updatedPublications = [...portalPublications]
      updatedPublications[existingIndex] = publication
    } else {
      updatedPublications = [...portalPublications, publication]
    }

    onUpdateData({ portalPublications: updatedPublications })
  }

  const getStatusChip = (status: PublicationStatus) => {
    const statusConfig = {
      DRAFT: { color: "default", label: "Borrador" },
      PUBLISHED: { color: "success", label: "Publicado" },
      PAUSED: { color: "warning", label: "Pausado" },
      EXPIRED: { color: "error", label: "Expirado" },
      REJECTED: { color: "error", label: "Rechazado" },
    }

    const config = statusConfig[status] || statusConfig.DRAFT

    return <Chip size="small" color={config.color} label={config.label} sx={{ mr: 1 }} />
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="body1" paragraph>
        Selecciona los portales inmobiliarios donde deseas publicar esta propiedad. Puedes configurar cada publicación
        individualmente.
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
        {availablePortals.map((portal) => {
          const publication = portalPublications.find((pub) => pub.portalId === portal.id)
          const isActive = !!publication

          return (
            <Grid item xs={12} sm={3} md={2} key={portal.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: isActive ? `1px solid ${theme.palette.primary.main}` : "1px solid transparent",
                  boxShadow: isActive ? 3 : 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: 4,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={portal.logo}
                  alt={portal.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    {portal.name}
                    {publication?.featured && (
                      <StarIcon fontSize="small" color="primary" sx={{ ml: 1, verticalAlign: "middle" }} />
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {portal.description}
                  </Typography>

                  {isActive && (
                    <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {getStatusChip(publication.status)}
                      {publication.cost > 0 && (
                        <Chip size="small" variant="outlined" label={`${publication.cost} ${publication.currency}`} />
                      )}
                    </Box>
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <FormControlLabel
                    control={
                      <Switch checked={isActive} onChange={() => handleTogglePortal(portal.id)} color="primary" />
                    }
                    label={isActive ? "Activado" : "Desactivado"}
                  />

                  {isActive && (
                    <Button size="small" startIcon={<EditIcon />} onClick={() => handleEditPortal(portal.id)}>
                      Configurar
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      {dialogOpen && selectedPortal && (
        <PortalDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          portal={selectedPortal}
          publication={selectedPublication}
          onSave={handleSavePublication}
        />
      )}
    </Box>
  )
}

function IconButton({ children, ...props }) {
  return (
    <Button size="small" {...props}>
      {children}
    </Button>
  )
}
