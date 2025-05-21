"use client"
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormHelperText,
  InputAdornment,
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { AttachMoney as MoneyIcon } from "@mui/icons-material"

import type { Offer } from "@/types/types"

const currencies = [
  { value: "CLP", label: "Peso Chileno (CLP)" },
  { value: "USD", label: "Dólar Estadounidense (USD)" },
  { value: "UF", label: "Unidad de Fomento (UF)" },
]

// Validation schema
const schema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  reference: z.string().min(1, "La referencia es obligatoria"),
  amount: z.coerce.number().positive("El monto debe ser positivo"),
  currency: z.string().min(1, "La moneda es obligatoria"),
  commission: z.coerce
    .number()
    .min(0, "La comisión no puede ser negativa")
    .max(100, "La comisión no puede superar el 100%"),
  amountCommission: z.coerce.number().min(0, "El monto de comisión no puede ser negativo"),
  currencyCommission: z.string().min(1, "La moneda de comisión es obligatoria"),
})

type FormValues = z.infer<typeof schema>

interface OfferBasicInfoStepProps {
  formData: Partial<Offer>
  onNext: (data: Partial<Offer>) => void
}

export function OfferBasicInfoStep({ formData, onNext }: OfferBasicInfoStepProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: formData.title || "",
      reference: formData.reference || `OF-${new Date().getTime().toString().slice(-6)}`,
      amount: formData.amount || 0,
      currency: formData.currency || "CLP",
      commission: formData.commission || 0,
      amountCommission: formData.amountCommission || 0,
      currencyCommission: formData.currencyCommission || "CLP",
    },
  })

  const onSubmit = (data: FormValues) => {
    onNext(data)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography variant="subtitle1" gutterBottom>
        Ingrese la información básica de la oferta
      </Typography>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Título"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="reference"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Referencia"
                fullWidth
                error={!!errors.reference}
                helperText={errors.reference?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Monto"
                type="number"
                fullWidth
                error={!!errors.amount}
                helperText={errors.amount?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MoneyIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.currency}>
                <InputLabel id="currency-label">Moneda</InputLabel>
                <Select {...field} labelId="currency-label" label="Moneda">
                  {currencies.map((currency) => (
                    <MenuItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.currency && <FormHelperText>{errors.currency.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="commission"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Comisión (%)"
                type="number"
                fullWidth
                error={!!errors.commission}
                helperText={errors.commission?.message}
                inputProps={{ min: 0, max: 100, step: 0.1 }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="amountCommission"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Monto de Comisión"
                type="number"
                fullWidth
                error={!!errors.amountCommission}
                helperText={errors.amountCommission?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MoneyIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="currencyCommission"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.currencyCommission}>
                <InputLabel id="currency-commission-label">Moneda de Comisión</InputLabel>
                <Select {...field} labelId="currency-commission-label" label="Moneda de Comisión">
                  {currencies.map((currency) => (
                    <MenuItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.currencyCommission && <FormHelperText>{errors.currencyCommission.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Siguiente
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
