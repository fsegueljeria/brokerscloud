"use client"

import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  InputAdornment,
  Typography,
} from "@mui/material"
import { Controller } from "react-hook-form"
import { AttachMoney as MoneyIcon } from "@mui/icons-material"

export function OfferBasicInfoStep({ control, errors, isMobile }) {
  const currencyOptions = [
    { value: 'CLP', label: 'CLP' },
    { value: 'USD', label: 'USD' },
    { value: 'UF', label: 'UF' },
  ];

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Información Básica de la Oferta
      </Typography>
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Monto de la Oferta"
                type="number"
                fullWidth
                inputProps={{ min: 0, step: 1000 }}
                error={!!errors.amount}
                helperText={errors.amount?.message}
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MoneyIcon color="action" fontSize={isMobile ? "small" : "medium"} />
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
              <FormControl fullWidth error={!!errors.currency} variant="outlined" size={isMobile ? "small" : "medium"}>
                <InputLabel id="currency-label">Moneda</InputLabel>
                <Select {...field} labelId="currency-label" label="Moneda">
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

        <Grid item xs={12} sm={6}>
          <Controller
            name="commission"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Comisión (%)"
                type="number"
                fullWidth
                inputProps={{ min: 0, max: 100, step: 0.1 }}
                error={!!errors.commission}
                helperText={errors.commission?.message}
                variant="outlined"
                size={isMobile ? "small" : "medium"}
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
            name="amountCommission"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Monto de Comisión"
                type="number"
                fullWidth
                inputProps={{ min: 0, step: 100 }}
                error={!!errors.amountCommission}
                helperText={errors.amountCommission?.message}
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MoneyIcon color="action" fontSize={isMobile ? "small" : "medium"} />
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
            name="currencyCommission"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                error={!!errors.currencyCommission}
                variant="outlined"
                size={isMobile ? "small" : "medium"}
              >
                <InputLabel id="currency-commission-label">Moneda de Comisión</InputLabel>
                <Select {...field} labelId="currency-commission-label" label="Moneda de Comisión">
                  {currencyOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.currencyCommission && <FormHelperText>{errors.currencyCommission.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
