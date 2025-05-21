"use client"
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material"

import type { Offer } from "@/types/types"
import { formatCurrency } from "@/libs/utils"

// Mock data for display
const mockProperties = {
  "1": { name: "Apartamento en Providencia", address: "Calle Principal 123" },
  "2": { name: "Casa en Las Condes", address: "Avenida Central 456" },
  "3": { name: "Local Comercial en Santiago Centro", address: "Plaza Mayor 789" },
}

const mockProspects = {
  "1": { name: "Juan Pérez", email: "juan@example.com" },
  "2": { name: "María González", email: "maria@example.com" },
  "3": { name: "Carlos Rodríguez", email: "carlos@example.com" },
}

const mockAgents = {
  "1": { name: "Ana Martínez", role: "Agente" },
  "2": { name: "Roberto Sánchez", role: "Agente Senior" },
  "3": { name: "Claudia Vega", role: "Agente" },
}

const mockSupervisors = {
  "1": { name: "Felipe Torres", role: "Supervisor" },
  "2": { name: "Daniela Rojas", role: "Supervisora Senior" },
}

const mockOpportunities = {
  "1": { name: "Oportunidad Residencial", type: "Venta" },
  "2": { name: "Oportunidad Comercial", type: "Arriendo" },
}

const mockOrganizations = {
  "1": { name: "Inmobiliaria Santiago" },
  "2": { name: "Propiedades Chile" },
}

const offerStages = {
  draft: "Borrador",
  sent: "Enviada",
  negotiation: "En Negociación",
  accepted: "Aceptada",
  rejected: "Rechazada",
  expired: "Expirada",
}

interface OfferSummaryStepProps {
  formData: Partial<Offer>
  onSubmit: () => void
  onBack: () => void
}

export function OfferSummaryStep({ formData, onSubmit, onBack }: OfferSummaryStepProps) {
  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Resumen de la oferta
      </Typography>
      <Card variant="outlined" sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {formData.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Referencia: {formData.reference}
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Grid container spacing={3}>
            {/* Información financiera */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: "bold" }}>
                Información Financiera
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <List dense disablePadding>
                <ListItem>
                  <ListItemText
                    primary="Monto de la oferta"
                    secondary={formatCurrency(formData.amount || 0, formData.currency || "CLP")}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Comisión (%)" secondary={`${formData.commission || 0}%`} />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List dense disablePadding>
                <ListItem>
                  <ListItemText
                    primary="Monto de comisión"
                    secondary={formatCurrency(formData.amountCommission || 0, formData.currencyCommission || "CLP")}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="CANJE" secondary={formData.swap ? "Sí" : "No"} />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
            </Grid>

            {/* Estado y fechas */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: "bold" }}>
                Estado y Fechas
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <List dense disablePadding>
                <ListItem>
                  <ListItemText
                    primary="Estado de la oferta"
                    secondary={
                      <Chip
                        size="small"
                        label={offerStages[formData.stage as keyof typeof offerStages] || formData.stage}
                        color={
                          formData.stage === "accepted"
                            ? "success"
                            : formData.stage === "rejected"
                              ? "error"
                              : formData.stage === "negotiation"
                                ? "warning"
                                : "default"
                        }
                      />
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Estado de activación"
                    secondary={
                      <Chip
                        size="small"
                        label={formData.isActive || formData.active ? "Activa" : "Inactiva"}
                        color={formData.isActive || formData.active ? "success" : "default"}
                      />
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List dense disablePadding>
                <ListItem>
                  <ListItemText
                    primary="Fecha de expiración"
                    secondary={
                      formData.expirationDate
                        ? new Date(formData.expirationDate).toLocaleDateString()
                        : formData.validUntil
                          ? new Date(formData.validUntil).toLocaleDateString()
                          : "No especificada"
                    }
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
            </Grid>

            {/* Relaciones */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: "bold" }}>
                Relaciones
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <List dense disablePadding>
                <ListItem>
                  <ListItemText
                    primary="Propiedad"
                    secondary={
                      formData.propertyId && mockProperties[formData.propertyId as keyof typeof mockProperties]
                        ? mockProperties[formData.propertyId as keyof typeof mockProperties].name
                        : "No seleccionada"
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Cliente"
                    secondary={
                      formData.prospectId && mockProspects[formData.prospectId as keyof typeof mockProspects]
                        ? mockProspects[formData.prospectId as keyof typeof mockProspects].name
                        : "No seleccionado"
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List dense disablePadding>
                <ListItem>
                  <ListItemText
                    primary="Oportunidad"
                    secondary={
                      formData.opportunityId &&
                      mockOpportunities[formData.opportunityId as keyof typeof mockOpportunities]
                        ? mockOpportunities[formData.opportunityId as keyof typeof mockOpportunities].name
                        : "No seleccionada"
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Organización"
                    secondary={
                      formData.organizationId &&
                      mockOrganizations[formData.organizationId as keyof typeof mockOrganizations]
                        ? mockOrganizations[formData.organizationId as keyof typeof mockOrganizations].name
                        : "No seleccionada"
                    }
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
            </Grid>

            {/* Asignaciones */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: "bold" }}>
                Asignaciones
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <List dense disablePadding>
                <ListItem>
                  <ListItemText
                    primary="Agente asignado"
                    secondary={
                      formData.assignAgentId && mockAgents[formData.assignAgentId as keyof typeof mockAgents]
                        ? mockAgents[formData.assignAgentId as keyof typeof mockAgents].name
                        : "No asignado"
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List dense disablePadding>
                <ListItem>
                  <ListItemText
                    primary="Supervisor asignado"
                    secondary={
                      formData.assignSupervisorId &&
                      mockSupervisors[formData.assignSupervisorId as keyof typeof mockSupervisors]
                        ? mockSupervisors[formData.assignSupervisorId as keyof typeof mockSupervisors].name
                        : "No asignado"
                    }
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>

          {/* Observaciones */}
          {(formData.observations || formData.observation) && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: "bold" }}>
                Observaciones:
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                {formData.observations || formData.observation}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button variant="outlined" onClick={onBack}>
          Atrás
        </Button>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Guardar Oferta
        </Button>
      </Box>
    </Box>
  )
}
