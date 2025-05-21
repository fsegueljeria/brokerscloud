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
  FormControlLabel,
  Switch,
  InputAdornment,
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CalendarMonth as CalendarIcon, SwapHoriz as SwapIcon } from "@mui/icons-material"

import type { Offer } from "@/types/types"

const offerStages = [
  { value: "BORRADOR", label: "Borrador" },
  { value: "ENVIADA", label: "Enviada" },
  { value: "NEGOCIACION", label: "Negociación" },
  { value: "CONTRAOFERTA", label: "Contraoferta" },
  { value: "CONFIRMACION_POR_EXCHANGE", label: "Confirmar Por Canje" },
  { value: "PENDIENTE_APROBACION_CLIENTE", label: "Pendiente Visar Cliente" },
  { value: "PENDIENTE_APROBACION_CAPTADOR", label: "Pendiente Visar Captador" },
  { value: "PENDIENTE_APROBACION_COLOCADOR", label: "Pendiente Visar Colocador" },
  { value: "PENDIENTE_APROBACION_PROPIETARIO", label: "Pendiente Visar Propietario" },
  { value: "ACEPTADO", label: "Aceptada" },
  { value: "RECHAZADO", label: "Rechazada" },
  { value: "EXPIRADO", label: "Expirada" },
  { value: "FINALIZADO", label: "Finalizada" },
  { value: "CANCELADO", label: "Cancelada" },
]

// Validation schema
const schema = z.object({
  expirationDate: z.string().min(1, "La fecha de expiración es obligatoria"),
  stage: z.string().min(1, "El estado es obligatorio"),
  swap: z.boolean().default(false),
  active: z.boolean().default(true),
})

type FormValues = z.infer<typeof schema>

interface OfferDetailsStepProps {
  formData: Partial<Offer>
  onNext: (data: Partial<Offer>) => void
  onBack: () => void
}

export function OfferDetailsStep({ formData, onNext, onBack }: OfferDetailsStepProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      expirationDate: formData.expirationDate || "",
      stage: formData.stage || "BORRADOR",
      swap: formData.swap !== undefined ? formData.swap : false,
      active: formData.active !== undefined ? formData.active : true,
    },
  })

  const onSubmit = (data: FormValues) => {
    onNext(data)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography variant="subtitle1" gutterBottom>
        Ingrese los detalles de la oferta
      </Typography>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>      
          <Controller
            name="expirationDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Fecha de Expiración"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.expirationDate}
                helperText={errors.expirationDate?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="stage"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.stage}>
                <InputLabel id="stage-label">Estado</InputLabel>
                <Select {...field} labelId="stage-label" label="Estado">
                  {offerStages.map((stage) => (
                    <MenuItem key={stage.value} value={stage.value}>
                      {stage.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.stage && <FormHelperText>{errors.stage.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <SwapIcon color="action" />
            </Box>
            <Controller
              name="swap"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} color="primary" />
                  }
                  label={field.value ? "Incluye canje" : "Sin canje"}
                />
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Controller
              name="active"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} color="success" />
                  }
                  label={field.value ? "Oferta activa" : "Oferta inactiva"}
                />
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="outlined" onClick={onBack}>
              Atrás
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Siguiente
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
