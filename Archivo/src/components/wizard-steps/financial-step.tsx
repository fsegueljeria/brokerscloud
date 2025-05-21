"use client"

import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  Switch,
  InputAdornment,
} from "@mui/material"
import { AttachMoney as MoneyIcon } from "@mui/icons-material"
import type { Property } from "@/types/types"

// Esquema de validación para este paso
const financialSchema = z.object({
  price: z.coerce.number().min(0, { message: "El precio debe ser un valor positivo" }),
  curCode: z.string({ required_error: "Selecciona una moneda" }),
  shared: z.boolean().default(false),
  state: z.string({ required_error: "Selecciona un estado" }),
})

interface FinancialStepProps {
  data: Partial<Property>
  onUpdateData: (data: Partial<Property>) => void
}

export function FinancialStep({ data, onUpdateData }: FinancialStepProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(financialSchema),
    defaultValues: {
      price: data.price || 0,
      curCode: data.curCode || "CLP", // Cambiado de EUR a CLP
      shared: data.shared || false,
      state: data.state || "AVAILABLE",
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

  const currencyOptions = [
    { value: "CLP", label: "CLP" },
    { value: "USD", label: "USD" },
    { value: "UF", label: "UF" },
  ]

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Precio"
              type="number"
              fullWidth
              inputProps={{ min: 0, step: 1000 }}
              error={!!errors.price}
              helperText={errors.price?.message}
              variant="outlined"
              value={field.value}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MoneyIcon color="action" />
                  </InputAdornment>
                ),
              }}
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
          name="curCode"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.curCode} variant="outlined">
              <InputLabel id="currency-label">Moneda</InputLabel>
              <Select {...field} labelId="currency-label" label="Moneda" value={field.value || "CLP"}>
                {currencyOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.curCode && <FormHelperText>{errors.curCode.message}</FormHelperText>}
            </FormControl>
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="shared"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} color="primary" />
              }
              label="Propiedad compartida"
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.state} variant="outlined">
              <InputLabel id="state-label">Estado</InputLabel>
              <Select {...field} labelId="state-label" label="Estado" value={field.value || "AVAILABLE"}>
                <MenuItem value="AVAILABLE">Disponible</MenuItem>
                <MenuItem value="RESERVED">Reservada</MenuItem>
                <MenuItem value="SOLD">Vendida</MenuItem>
                <MenuItem value="RENTED">Alquilada</MenuItem>
                <MenuItem value="UNAVAILABLE">No Disponible</MenuItem>
                <MenuItem value="UNDER_CONSTRUCTION">En Construcción</MenuItem>
              </Select>
              {errors.state && <FormHelperText>{errors.state.message}</FormHelperText>}
            </FormControl>
          )}
        />
      </Grid>
    </Grid>
  )
}
