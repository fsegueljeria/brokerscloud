import { Box, Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText, Typography } from "@mui/material"
import { Controller } from "react-hook-form"

const mockAgents = [
  { id: 1, name: "Ana García" },
  { id: 2, name: "Pedro Martínez" },
  { id: 3, name: "Laura Fernández" },
]

const mockSupervisors = [
  { id: 4, name: "Carlos López" },
  { id: 5, name: "María Rodríguez" },
]

export function OfferAssignmentsStep({ control, errors, isMobile }) {
  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Asignaciones
      </Typography>
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="assignAgentId"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                error={!!errors.assignAgentId}
                variant="outlined"
                size={isMobile ? "small" : "medium"}
              >
                <InputLabel id="agent-label">Agente Asignado</InputLabel>
                <Select {...field} labelId="agent-label" label="Agente Asignado">
                  {mockAgents.map((agent) => (
                    <MenuItem key={agent.id} value={agent.id.toString()}>
                      {agent.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.assignAgentId && <FormHelperText>{errors.assignAgentId.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="assignSupervisorId"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                error={!!errors.assignSupervisorId}
                variant="outlined"
                size={isMobile ? "small" : "medium"}
              >
                <InputLabel id="supervisor-label">Supervisor</InputLabel>
                <Select {...field} labelId="supervisor-label" label="Supervisor">
                  <MenuItem value="">Sin supervisor</MenuItem>
                  {mockSupervisors.map((supervisor) => (
                    <MenuItem key={supervisor.id} value={supervisor.id.toString()}>
                      {supervisor.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.assignSupervisorId && <FormHelperText>{errors.assignSupervisorId.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
