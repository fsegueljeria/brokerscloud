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
      currency: data.currency || "CLP", // Cambiado de EUR a CLP
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
          name="currency"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.currency} variant="outlined">
              <InputLabel id="currency-label">Moneda</InputLabel>
              <Select {...field} labelId="currency-label" label="Moneda" value={field.value || "CLP"}>
                {currencyOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.currency && <FormHelperText>{errors.currency.message}</FormHelperText>}
            </FormControl>
          )}
        />
      </Grid>
    </Grid>
  )
}
