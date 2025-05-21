"use client"

import React, { useState } from "react"
import { PDFViewer } from "@react-pdf/renderer"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Theme } from "@mui/material"
import { Close as CloseIcon, PictureAsPdf } from "@mui/icons-material"
import type { Offer } from "@/types/types"
import { OfferPDFGenerator } from "./offer-pdf-generator"

interface OfferPDFPreviewProps {
  offer: Offer
  open?: boolean
  onClose?: () => void
}

export function OfferPDFPreview({ offer, open: externalOpen, onClose }: OfferPDFPreviewProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = externalOpen !== undefined ? externalOpen : internalOpen

  const handleOpen = () => {
    setInternalOpen(true)
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
    setInternalOpen(false)
  }

  // Importamos dinámicamente el componente PDF para evitar errores de SSR
  const OfferPDF = React.lazy(() => import("./offer-pdf-generator").then(module => ({ default: module.default })))

  return (
    <>
      {!externalOpen && (
        <Button startIcon={<PictureAsPdf />} variant="outlined" color="primary" onClick={handleOpen}>
          Vista Previa PDF
        </Button>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          Vista Previa de PDF - {offer.title}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme: Theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <React.Suspense fallback={<div>Cargando vista previa...</div>}>
            <PDFViewer width="100%" height="600px" style={{ border: "none" }}>
              <OfferPDF offer={offer} />
            </PDFViewer>
          </React.Suspense>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
          <OfferPDFGenerator
            offer={offer}
            buttonLabel="Descargar PDF"
            buttonVariant="contained"
            buttonColor="primary"
          />
        </DialogActions>
      </Dialog>
    </>
  )
}
