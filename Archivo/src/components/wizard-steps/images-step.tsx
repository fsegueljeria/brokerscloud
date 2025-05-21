"use client"

import type React from "react"

import { useState, useCallback } from "react"
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Dialog,
  DialogContent,
  TextField,
  FormControlLabel,
  Switch,
  Tooltip,
} from "@mui/material"
import {
  AddPhotoAlternate as AddPhotoIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
} from "@mui/icons-material"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import type { PropertyImage } from "@/types/types"

interface ImagesStepProps {
  images: PropertyImage[]
  onChange: (images: PropertyImage[]) => void
}

interface DraggableImageCardProps {
  image: PropertyImage
  index: number
  moveImage: (dragIndex: number, hoverIndex: number) => void
  onDelete: (id: string) => void
  onSetPrimary: (id: string) => void
  onEdit: (id: string) => void
  onMoveUp: (index: number) => void
  onMoveDown: (index: number, total: number) => void
}

const DraggableImageCard = ({
  image,
  index,
  moveImage,
  onDelete,
  onSetPrimary,
  onEdit,
  onMoveUp,
  onMoveDown,
}: DraggableImageCardProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: "IMAGE",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveImage(item.index, index)
        item.index = index
      }
    },
  })

  return (
    <Card
      ref={(node) => drag(drop(node))}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: image.isPrimary ? "2px solid #4caf50" : "1px solid #e0e0e0",
      }}
    >
      {image.isPrimary && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "success.main",
            color: "white",
            borderRadius: "50%",
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <StarIcon fontSize="small" />
        </Box>
      )}
      <CardMedia
        component="img"
        height="160"
        image={image.url}
        alt={`Property image ${index + 1}`}
        sx={{ objectFit: "cover" }}
      />
      <Box sx={{ p: 1, bgcolor: "#f5f5f5" }}>
        <Typography variant="caption" color="text.secondary" noWrap>
          {image.caption || `Imagen ${index + 1}`}
        </Typography>
      </Box>
      <CardActions sx={{ mt: "auto", justifyContent: "space-between", p: 1 }}>
        <Box>
          <Tooltip title="Mover arriba">
            <span>
              <IconButton size="small" onClick={() => onMoveUp(index)} disabled={index === 0} color="inherit">
                <ArrowUpIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Mover abajo">
            <span>
              <IconButton
                size="small"
                onClick={() => onMoveDown(index, image.order)}
                disabled={index === image.order - 1}
                color="inherit"
              >
                <ArrowDownIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Editar imagen">
            <IconButton size="small" onClick={() => onEdit(image.id)} color="primary">
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={image.isPrimary ? "Imagen principal" : "Establecer como principal"}>
            <IconButton
              size="small"
              onClick={() => onSetPrimary(image.id)}
              color={image.isPrimary ? "success" : "default"}
              disabled={image.isPrimary}
            >
              {image.isPrimary ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar imagen">
            <IconButton size="small" onClick={() => onDelete(image.id)} color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  )
}

export function ImagesStep({ images, onChange }: ImagesStepProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState<PropertyImage | null>(null)
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const newImages: PropertyImage[] = []
    const fileArray = Array.from(files)

    fileArray.forEach((file) => {
      const imageUrl = URL.createObjectURL(file)
      newImages.push({
        id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        url: imageUrl,
        isPrimary: images.length === 0 && newImages.length === 0, // First image is primary by default
        order: images.length + newImages.length + 1,
        caption: file.name,
      })
    })

    onChange([...images, ...newImages])
  }

  const moveImage = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const draggedImage = images[dragIndex]
      const updatedImages = [...images]
      updatedImages.splice(dragIndex, 1)
      updatedImages.splice(hoverIndex, 0, draggedImage)

      // Update order
      const reorderedImages = updatedImages.map((img, idx) => ({
        ...img,
        order: idx + 1,
      }))

      onChange(reorderedImages)
    },
    [images, onChange],
  )

  const handleDeleteImage = (id: string) => {
    const updatedImages = images
      .filter((img) => img.id !== id)
      .map((img, idx) => ({
        ...img,
        order: idx + 1,
      }))
    onChange(updatedImages)
  }

  const handleSetPrimary = (id: string) => {
    const updatedImages = images.map((img) => ({
      ...img,
      isPrimary: img.id === id,
    }))
    onChange(updatedImages)
  }

  const handleEditImage = (id: string) => {
    const image = images.find((img) => img.id === id)
    if (image) {
      setCurrentImage(image)
      setEditDialogOpen(true)
    }
  }

  const handleSaveEdit = () => {
    if (!currentImage) return

    const updatedImages = images.map((img) => (img.id === currentImage.id ? currentImage : img))
    onChange(updatedImages)
    setEditDialogOpen(false)
    setCurrentImage(null)
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    moveImage(index, index - 1)
  }

  const handleMoveDown = (index: number, total: number) => {
    if (index === images.length - 1) return
    moveImage(index, index + 1)
  }

  const handlePreviewImage = (url: string) => {
    setPreviewImage(url)
    setPreviewDialogOpen(true)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Imágenes de la propiedad
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Sube imágenes de alta calidad para mostrar tu propiedad. La primera imagen será la principal en los listados.
        Puedes arrastrar las imágenes para reordenarlas.
      </Typography>

      <Button variant="outlined" component="label" startIcon={<AddPhotoIcon />} sx={{ mb: 3 }}>
        Añadir imágenes
        <input type="file" hidden multiple accept="image/*" onChange={handleFileChange} />
      </Button>

      <DndProvider backend={HTML5Backend}>
        <Grid container spacing={2}>
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
              <DraggableImageCard
                image={image}
                index={index}
                moveImage={moveImage}
                onDelete={handleDeleteImage}
                onSetPrimary={handleSetPrimary}
                onEdit={handleEditImage}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
              />
            </Grid>
          ))}
        </Grid>
      </DndProvider>

      {images.length === 0 && (
        <Box
          sx={{
            border: "2px dashed #ccc",
            borderRadius: 1,
            p: 4,
            textAlign: "center",
            bgcolor: "#f9f9f9",
            mt: 2,
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No hay imágenes cargadas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Haz clic en "Añadir imágenes" para subir fotos de la propiedad
          </Typography>
        </Box>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
          <Typography variant="h6">Editar imagen</Typography>
          <IconButton edge="end" color="inherit" onClick={() => setEditDialogOpen(false)} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          {currentImage && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <img
                  src={currentImage.url || "/placeholder.svg"}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }}
                />
              </Box>
              <TextField
                label="Título/Descripción"
                fullWidth
                value={currentImage.caption || ""}
                onChange={(e) => setCurrentImage({ ...currentImage, caption: e.target.value })}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={currentImage.isPrimary}
                    onChange={(e) => setCurrentImage({ ...currentImage, isPrimary: e.target.checked })}
                    color="primary"
                  />
                }
                label="Imagen principal"
              />
            </Box>
          )}
        </DialogContent>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <Button onClick={() => setEditDialogOpen(false)} color="inherit">
            Cancelar
          </Button>
          <Button onClick={handleSaveEdit} color="primary" startIcon={<SaveIcon />}>
            Guardar
          </Button>
        </Box>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onClose={() => setPreviewDialogOpen(false)} maxWidth="lg" fullWidth>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => setPreviewDialogOpen(false)}
          aria-label="close"
          sx={{ position: "absolute", right: 8, top: 8, color: "white", bgcolor: "rgba(0,0,0,0.5)" }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0 }}>
          {previewImage && (
            <img
              src={previewImage || "/placeholder.svg"}
              alt="Preview"
              style={{ width: "100%", height: "auto", maxHeight: "80vh", objectFit: "contain" }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  )
}
