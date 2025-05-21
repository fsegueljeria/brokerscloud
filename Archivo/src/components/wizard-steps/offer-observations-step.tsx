import { Box, TextField, Typography } from "@mui/material"
import { Controller } from "react-hook-form"

export function OfferObservationsStep({ control, isMobile }) {
  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Observaciones
      </Typography>
      <Controller
        name="observation"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Observaciones"
            placeholder="Añade detalles adicionales sobre la oferta..."
            fullWidth
            multiline
            rows={isMobile ? 3 : 4}
            variant="outlined"
            size={isMobile ? "small" : "medium"}
          />
        )}
      />
    </Box>
  )
}
