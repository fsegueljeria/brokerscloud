"use client"
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography, FormHelperText } from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import type { Offer } from "@/types/types"

// Mock data
const mockProperties = [
  { id: 1, name: "Apartamento Centro", address: "Calle Mayor 10" },
  { id: 2, name: "Villa Playa", address: "Paseo Marítimo 25" },
  { id: 3, name: "Local Centro", address: "Gran Vía 45" },
  { id: 4, name: "Piso Universidad", address: "Calle Universidad 8" },
  { id: 5, name: "Chalet Sierra", address: "Camino Montaña 12" },
]

const mockOpportunities = [
  { id: 1, name: "Apartamento Centro" },
  { id: 2, name: "Casa Playa" },
  { id: 3, name: "Local Comercial" },
  { id: 4, name: "Piso Estudiantes" },
  { id: 5, name: "Chalet Montaña" },
]

const mockLeads = [
  { id: 1, name: "Carlos Rodríguez", email: "carlos@example.com" },
  { id: 2, name: "Laura Sánchez", email: "laura@example.com" },
  { id: 3, name: "Miguel Torres", email: "miguel@example.com" },
  { id: 4, name: "Isabel Díaz", email: "isabel@example.com" },
  { id: 5, name: "Roberto Fernández", email: "roberto@example.com" },
]

const mockOrganizations = [
  { id: 1, name: "Inmobiliaria XYZ" },
  { id: 2, name: "Propiedades ABC" },
]

// Validation schema
const schema = z.object({
  organizationId: z.string().min(1, "La organización es obligatoria"),
  opportunityId: z.string().min(1, "La oportunidad es obligatoria"),
  propertyId: z.string().min(1, "La propiedad es obligatoria"),
  prospectId: z.string().min(1, "El cliente es obligatorio"),
})

type FormValues = z.infer<typeof schema>

interface OfferRelationsStepProps {
  formData: Partial<Offer>
  onNext: (data: Partial<Offer>) => void
  onBack: () => void
}

export function OfferRelationsStep({ formData, onNext, onBack }: OfferRelationsStepProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      organizationId: formData.organizationId?.toString() || "",
      opportunityId: formData.opportunityId?.toString() || "",
      propertyId: formData.propertyId?.toString() || "",
      prospectId: formData.prospectId?.toString() || "",
    },
  })

  const onSubmit = (data: FormValues) => {
    onNext({
      organizationId: Number.parseInt(data.organizationId),
      opportunityId: Number.parseInt(data.opportunityId),
      propertyId: Number.parseInt(data.propertyId),
      prospectId: Number.parseInt(data.prospectId),
    })
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography variant="subtitle1" gutterBottom>
        Seleccione las relaciones de la oferta
      </Typography>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Controller
            name="organizationId"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.organizationId}>
                <InputLabel id="organization-label">Organización</InputLabel>
                <Select {...field} labelId="organization-label" label="Organización">
                  {mockOrganizations.map((org) => (
                    <MenuItem key={org.id} value={org.id.toString()}>
                      {org.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.organizationId && <FormHelperText>{errors.organizationId.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="opportunityId"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.opportunityId}>
                <InputLabel id="opportunity-label">Oportunidad</InputLabel>
                <Select {...field} labelId="opportunity-label" label="Oportunidad">
                  {mockOpportunities.map((opportunity) => (
                    <MenuItem key={opportunity.id} value={opportunity.id.toString()}>
                      {opportunity.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.opportunityId && <FormHelperText>{errors.opportunityId.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="propertyId"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.propertyId}>
                <InputLabel id="property-label">Propiedad</InputLabel>
                <Select {...field} labelId="property-label" label="Propiedad">
                  {mockProperties.map((property) => (
                    <MenuItem key={property.id} value={property.id.toString()}>
                      <Box>
                        <Typography variant="body2">{property.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {property.address}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
                {errors.propertyId && <FormHelperText>{errors.propertyId.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="prospectId"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.prospectId}>
                <InputLabel id="prospect-label">Cliente</InputLabel>
                <Select {...field} labelId="prospect-label" label="Cliente">
                  {mockLeads.map((lead) => (
                    <MenuItem key={lead.id} value={lead.id.toString()}>
                      <Box>
                        <Typography variant="body2">{lead.name}</Typography>
                        {lead.email && (
                          <Typography variant="caption" color="text.secondary">
                            {lead.email}
                          </Typography>
                        )}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
                {errors.prospectId && <FormHelperText>{errors.prospectId.message}</FormHelperText>}
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
