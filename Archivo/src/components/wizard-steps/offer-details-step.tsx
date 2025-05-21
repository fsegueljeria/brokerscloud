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
  Switch,
  FormControlLabel,
} from "@mui/material"
import { Controller } from "react-hook-form"
import { CalendarMonth as CalendarIcon, SwapHoriz as SwapIcon } from "@mui/icons-material"

export function OfferDetailsStep({ control, errors, isMobile }) {
  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Detalles de la Oferta
      </Typography>
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6}>
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
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon color="action" fontSize={isMobile ? "small" : "medium"} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="stage"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.stage} variant="outlined" size={isMobile ? "small" : "medium"}>
                <InputLabel id="stage-label">Etapa</InputLabel>
                <Select {...field} labelId="stage-label" label="Etapa">
                  <MenuItem value="DRAFT">Borrador</MenuItem>
                  <MenuItem value="SUBMITTED">Enviada</MenuItem>
                  <MenuItem value="COUNTER_OFFER">Contraoferta</MenuItem>
                  <MenuItem value="CONFIRM_FOR_EXCHANGE">Confirmar Por Canje</MenuItem>
                  <MenuItem value="PENDING_CLIENT_APPROVAL">Pendiente Visar Cliente</MenuItem>
                  <MenuItem value="PENDING_CAPTURER_APPROVAL">Pendiente Visar Captador</MenuItem>
                  <MenuItem value="PENDING_PLACER_APPROVAL">Pendiente Visar Colocador</MenuItem>
                  <MenuItem value="PENDING_OWNER_APPROVAL">Pendiente Visar Propietario</MenuItem>
                  <MenuItem value="ACCEPTED">Aceptada</MenuItem>
                  <MenuItem value="REJECTED">Rechazada</MenuItem>
                  <MenuItem value="EXPIRED">Expirada</MenuItem>
                  <MenuItem value="FINALIZED">Finalizada</MenuItem>
                  <MenuItem value="CANCELLED">Cancelada</MenuItem>
                </Select>
                {errors.stage && <FormHelperText>{errors.stage.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="swap"
            control={control}
            render={({ field }) => (
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
                  <SwapIcon color="action" fontSize={isMobile ? "small" : "medium"} />
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      color="primary"
                      size={isMobile ? "small" : "medium"}
                    />
                  }
                  label={field.value ? "Incluye canje" : "Sin canje"}
                />
              </Box>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="active"
            control={control}
            render={({ field }) => (
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
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      color="success"
                      size={isMobile ? "small" : "medium"}
                    />
                  }
                  label={field.value ? "Oferta activa" : "Oferta inactiva"}
                />
              </Box>
            )}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
