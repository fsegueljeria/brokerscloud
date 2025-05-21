import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
} from "@mui/material"
import { Controller } from "react-hook-form"

// Datos de ejemplo para los selectores
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

export function OfferRelationsStep({ control, errors, isMobile, opportunityId = null, propertyId = null, leadId = null }) {
  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Relaciones de la Oferta
      </Typography>
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="organizationId"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.organizationId} variant="outlined" size={isMobile ? "small" : "medium"}>
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

        <Grid item xs={12} sm={6}>
          <Controller
            name="opportunityId"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.opportunityId} variant="outlined" size={isMobile ? "small" : "medium"}>
                <InputLabel id="opportunity-label">Oportunidad</InputLabel>
                <Select {...field} labelId="opportunity-label" label="Oportunidad" disabled={opportunityId !== null}>
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

        <Grid item xs={12} sm={6}>
          <Controller
            name="propertyId"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.propertyId} variant="outlined" size={isMobile ? "small" : "medium"}>
                <InputLabel id="property-label">Propiedad</InputLabel>
                <Select {...field} labelId="property-label" label="Propiedad" disabled={propertyId !== null}>
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

        <Grid item xs={12} sm={6}>
          <Controller
            name="customerLeadId"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.customerLeadId} variant="outlined" size={isMobile ? "small" : "medium"}>
                <InputLabel id="lead-label">Cliente</InputLabel>
                <Select {...field} labelId="lead-label" label="Cliente" disabled={leadId !== null}>
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
                {errors.customerLeadId && <FormHelperText>{errors.customerLeadId.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
