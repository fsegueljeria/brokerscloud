"use client"

import { useState } from "react"

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


import { OfferList } from "@/components/offer-list"
import { OfferForm } from "./offer-form"
import type { Offer } from "@/types/types"

interface OpportunityOffersProps {
  opportunityId: number
  readOnly?: boolean
}

export function OpportunityOffers({ opportunityId, readOnly = false }: OpportunityOffersProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleCreateOffer = () => {
    setSelectedOffer(undefined)
    setIsFormOpen(true)
  }

  const handleEditOffer = (offer: Offer) => {
    setSelectedOffer(offer)
    setIsFormOpen(true)
  }

  const handleDeleteOffer = (offer: Offer) => {
    setSelectedOffer(offer)
    setIsDeleteDialogOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setSelectedOffer(undefined)
  }

  const handleFormSubmit = () => {
    // Aquí iría la lógica para guardar la oferta
    setIsFormOpen(false)
    setSelectedOffer(undefined)
  }

  const confirmDeleteOffer = () => {
    // Aquí iría la lógica para eliminar la oferta
    setIsDeleteDialogOpen(false)
    setSelectedOffer(undefined)
  }

  return (
    <Box>
      {!readOnly && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateOffer}
            size={isMobile ? "small" : "medium"}
          >
            Nueva Oferta
          </Button>
        </Box>
      )}

      <OfferList
        opportunityId={opportunityId}
        // onSelectOffer={readOnly ? undefined : handleEditOffer}
        actionButtons={
          !readOnly
            ? (offer) => (
                <Box sx={{ display: "flex" }}>
                  <IconButton size="small" color="primary" component="a" href={`/ofertas/${offer.id}`} target="_blank" rel="noopener noreferrer">
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="primary" onClick={() => handleEditOffer(offer)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  {/* <IconButton size="small" color="error" onClick={() => handleDeleteOffer(offer)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton> */}
                </Box>
              )
            : undefined
        }
      />

      {/* Diálogo para crear/editar oferta */}
      <Dialog
        open={isFormOpen}
        onClose={handleFormClose}
        fullScreen={isMobile}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: "1200px",
          },
        }}
      >
        <DialogTitle>{selectedOffer ? "Editar Oferta" : "Nueva Oferta"}</DialogTitle>
        <DialogContent dividers>
          <OfferForm
            offer={selectedOffer}
            opportunityId={opportunityId}
            onComplete={handleFormSubmit}
            onDelete={() => {
              handleFormClose()
              setIsDeleteDialogOpen(true)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={handleFormSubmit}>
            {selectedOffer ? "Actualizar" : "Crear"} Oferta
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas eliminar esta oferta? Esta acción no se puede deshacer.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={confirmDeleteOffer}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Mensaje si no hay ofertas */}
      {!opportunityId && (
        <Paper sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary">
            Selecciona una oportunidad para ver sus ofertas asociadas.
          </Typography>
        </Paper>
      )}
    </Box>
  )
}
