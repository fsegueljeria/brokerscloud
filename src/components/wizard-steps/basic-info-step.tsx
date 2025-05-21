"use client"

import { useEffect } from "react"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material"

import type { Property } from "@/types/types"

// Esquema de validación para este paso
const basicInfoSchema = z.object({
  code: z.string().min(1, { message: "El código es obligatorio" }),
  title: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  description: z.string().optional().nullable(),
  type: z.string({ required_error: "Selecciona un tipo de propiedad" }),
})

interface BasicInfoStepProps {
  data: Partial<Property>
  onUpdateData: (data: Partial<Property>) => void
}

export function BasicInfoStep({ data, onUpdateData }: BasicInfoStepProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      code: data.code || "",
      title: data.title || "",
      description: data.description || "",
      type: data.type || "APARTAMENTO",
    },
  })

  const onSubmit = (formData) => {
    onUpdateData(formData)
  }

  // Usar watch para detectar cambios en los campos
  const watchedFields = watch()

  // Efecto para actualizar los datos cuando cambian los valores
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSubmit(onSubmit)()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [watchedFields, handleSubmit])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Código"
              placeholder="Ej. APT-001"
              fullWidth
              error={!!errors.code}
              helperText={errors.code?.message}
              variant="outlined"
              value={field.value || ""}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombre"
              placeholder="Ej. Apartamento Centro"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              variant="outlined"
              value={field.value || ""}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Descripción"
              placeholder="Describe la propiedad..."
              fullWidth
              multiline
              rows={3}
              error={!!errors.description}
              helperText={errors.description?.message}
              variant="outlined"
              value={field.value || ""}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.type} variant="outlined">
              <InputLabel id="type-label">Tipo de Propiedad</InputLabel>
              <Select {...field} labelId="type-label" label="Tipo de Propiedad" value={field.value || "APARTMENT"}>
                <MenuItem value="APARTMENT">Apartamento</MenuItem>
                <MenuItem value="HOUSE">Casa</MenuItem>
                <MenuItem value="LAND">Terreno</MenuItem>
                <MenuItem value="COMMERCIAL">Local Comercial</MenuItem>
                <MenuItem value="OFFICE">Oficina</MenuItem>
                <MenuItem value="GARAGE">Garaje</MenuItem>
                <MenuItem value="STORAGE">Trastero</MenuItem>
                <MenuItem value="OTHER">Otro</MenuItem>
              </Select>
              {errors.type && <FormHelperText>{errors.type.message}</FormHelperText>}
            </FormControl>
          )}
        />
      </Grid>
    </Grid>
  )
}
