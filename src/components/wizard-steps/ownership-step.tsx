"use client"

import { useEffect } from "react"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText, Typography, Box } from "@mui/material"

import type { Property } from "@/types/types"

// Datos de ejemplo para los selectores
const mockOrganizations = [
  { id: 1, name: "Inmobiliaria XYZ" },
  { id: 2, name: "Propiedades ABC" },
]

const mockOwners = [
  { id: 1, name: "Carlos Rodríguez", email: "carlos@example.com" },
  { id: 2, name: "Laura Sánchez", email: "laura@example.com" },
  { id: 3, name: "Miguel Torres", email: "miguel@example.com" },
  { id: 4, name: "Isabel Díaz", email: "isabel@example.com" },
  { id: 5, name: "Roberto Fernández", email: "roberto@example.com" },
  { id: 6, name: "Empresa Constructora S.L.", email: "info@constructora.com", type: "COMPANY" },
]

// Esquema de validación para este paso
const ownershipSchema = z.object({
  organization: z.string().nullable(),
  owner: z.string().nullable(),
})

interface OwnershipStepProps {
  data: Partial<Property>
  onUpdateData: (data: Partial<Property>) => void
}

export function OwnershipStep({ data, onUpdateData }: OwnershipStepProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(ownershipSchema),
    defaultValues: {
      organization: data.organization ? String(data.organization) : null,
      owner: data.owner ? String(data.owner) : null,
    },
  })

  const onSubmit = (formData) => {
    onUpdateData({
      organization: formData.organization ? Number(formData.organization) : null,
      owner: formData.owner ? Number(formData.owner) : null,
    })
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

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Controller
          name="organization"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.organization} variant="outlined">
              <InputLabel id="organization-label">Organización</InputLabel>
              <Select
                {...field}
                labelId="organization-label"
                label="Organización"
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value === "" ? null : e.target.value)}
              >
                <MenuItem value="">Sin organización</MenuItem>
                {mockOrganizations.map((org) => (
                  <MenuItem key={org.id} value={org.id.toString()}>
                    {org.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.organization && <FormHelperText>{errors.organization.message}</FormHelperText>}
            </FormControl>
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Controller
          name="owner"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.owner} variant="outlined">
              <InputLabel id="owner-label">Propietario</InputLabel>
              <Select
                {...field}
                labelId="owner-label"
                label="Propietario"
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value === "" ? null : e.target.value)}
              >
                <MenuItem value="">Sin propietario</MenuItem>
                {mockOwners.map((owner) => (
                  <MenuItem key={owner.id} value={owner.id.toString()}>
                    <Box>
                      <Typography variant="body2">{owner.name}</Typography>
                      {owner.email && (
                        <Typography variant="caption" color="text.secondary">
                          {owner.email}
                        </Typography>
                      )}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
              {errors.owner && <FormHelperText>{errors.owner.message}</FormHelperText>}
            </FormControl>
          )}
        />
      </Grid>
    </Grid>
  )
}
