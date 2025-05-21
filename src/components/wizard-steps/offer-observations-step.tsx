"use client"
import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import type { Offer } from "@/types/types"

// Validation schema
const schema = z.object({
  observation: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface OfferObservationsStepProps {
  formData: Partial<Offer>
  onNext: (data: Partial<Offer>) => void
  onBack: () => void
}

export function OfferObservationsStep({ formData, onNext, onBack }: OfferObservationsStepProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      observation: formData.observation || "",
    },
  })

  const onSubmit = (data: FormValues) => {
    onNext(data)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography variant="subtitle1" gutterBottom>
        Añada observaciones o notas adicionales (opcional)
      </Typography>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Controller
            name="observation"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Observaciones"
                multiline
                rows={6}
                fullWidth
                error={!!errors.observation}
                helperText={errors.observation?.message}
                placeholder="Añade detalles adicionales sobre la oferta..."
              />
            )}
          />
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
