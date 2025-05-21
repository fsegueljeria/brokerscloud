"use client"

import type React from "react"
import { useState, useCallback } from "react"
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import type { PropertyImage } from "@/types/types"

interface ImageUploadSectionProps {
  images: PropertyImage[]
  onChange: (images: PropertyImage[]) => void
}

export const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({ images, onChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages: PropertyImage[] = Array.from(event.target.files).map((file, index) => {
        const imageUrl = URL.createObjectURL(file)
        return {
          id: `new-${Date.now()}-${index}`,
          url: imageUrl,
          file: file,
          isPrimary: images.length === 0 && index === 0, // First image is primary if no images exist
          order: images.length + index,
        }
      })

      onChange([...images, ...newImages])
    }
  }

  const handleDeleteImage = (id: string) => {
    const updatedImages = images.filter((img) => img.id !== id)

    // If we deleted the primary image, set a new one
    if (updatedImages.length > 0 && !updatedImages.some((img) => img.isPrimary)) {
      updatedImages[0].isPrimary = true
    }

    onChange(updatedImages)
  }

  const handleSetPrimary = (id: string) => {
    const updatedImages = images.map((img) => ({
      ...img,
      isPrimary: img.id === id,
    }))

    onChange(updatedImages)
  }

  const handlePreviewImage = (url: string) => {
    setPreviewImage(url)
    setPreviewOpen(true)
  }

  const handleClosePreview = () => {
    setPreviewOpen(false)
  }

  const onDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) return

      const items = Array.from(images)
      const [reorderedItem] = items.splice(result.source.index, 1)
      items.splice(result.destination.index, 0, reorderedItem)

      // Update order property
      const updatedItems = items.map((item, index) => ({
        ...item,
        order: index,
      }))

      onChange(updatedItems)
    },
    [images, onChange],
  )

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Imágenes de la propiedad
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Button variant="contained" component="label" startIcon={<CloudUploadIcon />} sx={{ mb: 2 }}>
          Subir imágenes
          <input type="file" hidden multiple accept="image/*" onChange={handleFileChange} />
        </Button>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          * Puedes arrastrar y soltar las imágenes para reordenarlas.
          <br />* Marca una imagen como principal para que aparezca primero en los portales.
        </Typography>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="images" direction="horizontal">
          {(provided) => (
            <Grid container spacing={2} ref={provided.innerRef} {...provided.droppableProps}>
              {images.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Paper
                        elevation={3}
                        sx={{
                          position: "relative",
                          border: image.isPrimary ? "2px solid #4caf50" : "none",
                          borderRadius: 1,
                        }}
                      >
                        <Card>
                          <CardMedia
                            component="img"
                            height="140"
                            image={image.url}
                            alt={`Imagen de propiedad ${index + 1}`}
                            sx={{ objectFit: "cover" }}
                          />
                          <CardActions disableSpacing>
                            <IconButton aria-label="ver imagen" onClick={() => handlePreviewImage(image.url)}>
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton
                              aria-label="establecer como principal"
                              onClick={() => handleSetPrimary(image.id)}
                              color={image.isPrimary ? "success" : "default"}
                            >
                              {image.isPrimary ? <StarIcon /> : <StarBorderIcon />}
                            </IconButton>
                            <IconButton
                              aria-label="eliminar imagen"
                              onClick={() => handleDeleteImage(image.id)}
                              sx={{ marginLeft: "auto" }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </CardActions>
                        </Card>
                        {image.isPrimary && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 5,
                              right: 5,
                              bgcolor: "success.main",
                              color: "white",
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              fontSize: "0.75rem",
                              fontWeight: "bold",
                            }}
                          >
                            Principal
                          </Box>
                        )}
                      </Paper>
                    </Grid>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>

      {images.length === 0 && (
        <Box
          sx={{
            p: 3,
            border: "2px dashed #ccc",
            borderRadius: 2,
            textAlign: "center",
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No hay imágenes cargadas. Sube algunas para mostrar tu propiedad.
          </Typography>
        </Box>
      )}

      <Dialog open={previewOpen} onClose={handleClosePreview} maxWidth="md" fullWidth>
        <DialogTitle>Vista previa de imagen</DialogTitle>
        <DialogContent>
          {previewImage && (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <img
                src={previewImage || "/placeholder.svg"}
                alt="Vista previa"
                style={{ maxWidth: "100%", maxHeight: "70vh" }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreview}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
