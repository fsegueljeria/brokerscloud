"use client"

import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography, FormHelperText } from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import type { Offer } from "@/types/types"

// Mock data
const mockAgents = [
  { id: 1, name: "Ana García" },
  { id: 2, name: "Pedro Martínez" },
  { id: 3, name: "Laura Fernández" },
]

const mockSupervisors = [
  { id: 4, name: "Carlos López" },
  { id: 5, name: "María Rodríguez" },
]

// Validation schema
const schema = z.object({
  assignAgentId: z.string().min(1, "El agente asignado es obligatorio"),
  assignSupervisorId: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface OfferAssignmentsStepProps {
  formData: Partial<Offer>
  onNext: (data: Partial<Offer>) => void
  onBack: () => void
}

export function OfferAssignmentsStep({ formData, onNext, onBack }: OfferAssignmentsStepProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      assignAgentId: formData.assignAgentId?.toString() || "",
      assignSupervisorId: formData.assignSupervisorId?.toString() || "",
    },
  })

  const onSubmit = (data: FormValues) => {
    onNext({
      assignAgentId: Number.parseInt(data.assignAgentId),
      assignSupervisorId: data.assignSupervisorId ? Number.parseInt(data.assignSupervisorId) : undefined,
    })
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography variant="subtitle1" gutterBottom>
        Asigne responsables a la oferta
      </Typography>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Controller
            name="assignAgentId"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.assignAgentId}>
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
        <Grid item xs={12} md={6}>
          <Controller
            name="assignSupervisorId"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.assignSupervisorId}>
                <InputLabel id="supervisor-label">Supervisor</InputLabel>
                <Select {...field} labelId="supervisor-label" label="Supervisor">
                  <MenuItem value="">
                    <em>Ninguno</em>
                  </MenuItem>
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
