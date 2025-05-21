"use client"

import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Grid, TextField, InputAdornment } from "@mui/material"
import type { Property } from "@/types/types"

// Esquema de validación para este paso
const characteristicsSchema = z.object({
  numberOfBedrooms: z.coerce.number().min(0),
  numberOfBathrooms: z.coerce.number().min(0),
  yearBuilt: z.coerce
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 5),
  m2Built: z.coerce.number().min(0),
  m2SemiCovered: z.coerce.number().min(0),
  area: z.coerce.number().min(0),
})

interface CharacteristicsStepProps {
  data: Partial<Property>
  onUpdateData: (data: Partial<Property>) => void
}

export function CharacteristicsStep({ data, onUpdateData }: CharacteristicsStepProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(characteristicsSchema),
    defaultValues: {
      numberOfBedrooms: data.numberOfBedrooms ?? 0,
      numberOfBathrooms: data.numberOfBathrooms ?? 0,
      yearBuilt: data.yearBuilt ?? new Date().getFullYear(),
      m2Built: data.m2Built ?? 0,
      m2SemiCovered: data.m2SemiCovered ?? 0,
      area: data.area ?? 0,
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
      <Grid item xs={12} sm={6} md={4}>
        <Controller
          name="numberOfBedrooms"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Dormitorios"
              type="number"
              fullWidth
              inputProps={{ min: 0 }}
              error={!!errors.numberOfBedrooms}
              helperText={errors.numberOfBedrooms?.message}
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

      <Grid item xs={12} sm={6} md={4}>
        <Controller
          name="numberOfBathrooms"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Baños"
              type="number"
              fullWidth
              inputProps={{ min: 0 }}
              error={!!errors.numberOfBathrooms}
              helperText={errors.numberOfBathrooms?.message}
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

      <Grid item xs={12} sm={6} md={4}>
        <Controller
          name="yearBuilt"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Año de construcción"
              type="number"
              fullWidth
              inputProps={{ min: 1900, max: new Date().getFullYear() + 5 }}
              error={!!errors.yearBuilt}
              helperText={errors.yearBuilt?.message}
              variant="outlined"
              value={field.value}
              onChange={(e) => {
                const value = e.target.value === "" ? new Date().getFullYear() : Number(e.target.value)
                field.onChange(value)
              }}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Controller
          name="m2Built"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Metros cuadrados construidos"
              type="number"
              fullWidth
              inputProps={{ min: 0 }}
              error={!!errors.m2Built}
              helperText={errors.m2Built?.message}
              variant="outlined"
              value={field.value}
              InputProps={{
                endAdornment: <InputAdornment position="end">m²</InputAdornment>,
              }}
              onChange={(e) => {
                const value = e.target.value === "" ? 0 : Number(e.target.value)
                field.onChange(value)
              }}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Controller
          name="m2SemiCovered"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Metros cuadrados semicubiertos"
              type="number"
              fullWidth
              inputProps={{ min: 0 }}
              error={!!errors.m2SemiCovered}
              helperText={errors.m2SemiCovered?.message}
              variant="outlined"
              value={field.value}
              InputProps={{
                endAdornment: <InputAdornment position="end">m²</InputAdornment>,
              }}
              onChange={(e) => {
                const value = e.target.value === "" ? 0 : Number(e.target.value)
                field.onChange(value)
              }}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Controller
          name="area"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Área total"
              type="number"
              fullWidth
              inputProps={{ min: 0 }}
              error={!!errors.area}
              helperText={errors.area?.message}
              variant="outlined"
              value={field.value}
              InputProps={{
                endAdornment: <InputAdornment position="end">m²</InputAdornment>,
              }}
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
