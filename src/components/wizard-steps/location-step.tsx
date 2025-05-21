"use client"

import { useEffect } from "react"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Grid, TextField } from "@mui/material"

import type { Property } from "@/types/types"

// Esquema de validación para este paso
const locationSchema = z.object({
  address: z.string().min(1, { message: "La dirección es obligatoria" }),
  zip: z.string().optional().nullable(),
  city: z.string().min(1, { message: "La ciudad es obligatoria" }),
  x: z.coerce.number(),
  y: z.coerce.number(),
})

interface LocationStepProps {
  data: Partial<Property>
  onUpdateData: (data: Partial<Property>) => void
}

export function LocationStep({ data, onUpdateData }: LocationStepProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      address: data.address || "",
      zip: data.zip || "",
      city: data.city || "",
      x: data.x ?? 0,
      y: data.y ?? 0,
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
      <Grid item xs={12}>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dirección"
              placeholder="Ej. Calle Mayor 10"
              fullWidth
              error={!!errors.address}
              helperText={errors.address?.message}
              variant="outlined"
              value={field.value || ""}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ciudad"
              placeholder="Ej. Madrid"
              fullWidth
              error={!!errors.city}
              helperText={errors.city?.message}
              variant="outlined"
              value={field.value || ""}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Controller
          name="zip"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Código Postal"
              placeholder="Ej. 28001"
              fullWidth
              error={!!errors.zip}
              helperText={errors.zip?.message}
              variant="outlined"
              value={field.value || ""}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Controller
          name="x"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Latitud"
              type="number"
              fullWidth
              error={!!errors.x}
              helperText={errors.x?.message}
              variant="outlined"
              value={field.value}
              onChange={(e) => {
                const value = e.target.value === "" ? 0 : Number(e.target.value)

                field.onChange(value)
              }}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Controller
          name="y"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Longitud"
              type="number"
              fullWidth
              error={!!errors.y}
              helperText={errors.y?.message}
              variant="outlined"
              value={field.value}
              onChange={(e) => {
                const value = e.target.value === "" ? 0 : Number(e.target.value)

                field.onChange(value)
              }}
            />
          )}
        />
      </Grid>
    </Grid>
  )
}
