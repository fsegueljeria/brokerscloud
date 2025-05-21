"use client"

import { useState } from "react"

import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { Box, Card, CardContent, Container, Tab, Tabs, Typography } from "@mui/material"

import { ProspectTable } from "./prospect-table"
import { ProspectForm } from "./prospect-form"
import { ProspectSummary } from "./prospect-summary"
import type { Prospect, ProspectStatus } from "@/types/types"

// Datos de ejemplo para prospectos
const mockProspects: Prospect[] = [
  {
    id: 1,
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan.perez@gmail.com",
    phone: "9 8765 4321",
    status: "ACTIVE",
    type: "BUYER",
    source: "Portal Inmobiliario",
    budget: 150000000,
    budgetCurrency: "CLP",
    preferredContactMethod: "EMAIL",
    createdAt: "2023-01-15T10:30:00.000Z",
    updatedAt: "2023-01-15T10:30:00.000Z",
    tags: ["Urgente", "Primera vivienda"],
    propertyPreferences: {
      types: ["APARTMENT", "HOUSE"],
      minBedrooms: 2,
      maxBedrooms: 3,
      minBathrooms: 1,
      maxBathrooms: 2,
      minArea: 60,
      maxArea: 100,
      locations: ["Providencia", "Ñuñoa", "Las Condes"],
      features: ["Piscina", "Estacionamiento", "Terraza"],
    },
  },
  {
    id: 2,
    firstName: "María",
    lastName: "González",
    email: "maria.gonzalez@outlook.com",
    phone: "9 1234 5678",
    company: "Consultora ABC",
    position: "Gerente Comercial",
    status: "QUALIFIED",
    type: "INVESTOR",
    source: "Referido",
    budget: 5000,
    budgetCurrency: "UF",
    preferredContactMethod: "PHONE",
    createdAt: "2023-02-20T14:45:00.000Z",
    updatedAt: "2023-02-20T14:45:00.000Z",
    tags: ["Inversionista", "Múltiples propiedades"],
    propertyPreferences: {
      types: ["APARTMENT", "COMMERCIAL"],
      locations: ["Santiago Centro", "Providencia"],
      features: ["Seguridad 24h", "Ascensor"],
    },
  },
  {
    id: 3,
    firstName: "Pedro",
    lastName: "Soto",
    email: "pedro.soto@empresa.cl",
    phone: "9 5555 6666",
    status: "POTENTIAL",
    type: "SELLER",
    source: "Sitio web",
    createdAt: "2023-03-10T09:15:00.000Z",
    updatedAt: "2023-03-10T09:15:00.000Z",
    address: "Av. Providencia 1250, Providencia",
    city: "Santiago",
    province: "Región Metropolitana",
    country: "Chile",
    notes:
      "Interesado en vender su propiedad en los próximos 3 meses. Necesita asesoría para determinar el precio adecuado.",
  },
  {
    id: 4,
    firstName: "Carolina",
    lastName: "Muñoz",
    email: "carolina.munoz@hotmail.com",
    phone: "9 7777 8888",
    company: "Hospital Clínico",
    position: "Médico",
    status: "CONVERTED",
    type: "BUYER",
    source: "Instagram",
    budget: 200000,
    budgetCurrency: "USD",
    preferredContactMethod: "WHATSAPP",
    createdAt: "2023-04-05T16:30:00.000Z",
    updatedAt: "2023-04-05T16:30:00.000Z",
    tags: ["VIP", "Extranjero"],
    propertyPreferences: {
      types: ["HOUSE"],
      minBedrooms: 4,
      minBathrooms: 3,
      minArea: 200,
      locations: ["Lo Barnechea", "Vitacura", "Las Condes"],
      features: ["Piscina", "Jardín", "Seguridad 24h", "Vista"],
    },
  },
  {
    id: 5,
    firstName: "Roberto",
    lastName: "Álvarez",
    email: "roberto.alvarez@gmail.com",
    phone: "9 3333 2222",
    status: "INACTIVE",
    type: "TENANT",
    source: "Yapo.cl",
    createdAt: "2023-05-12T11:00:00.000Z",
    updatedAt: "2023-05-12T11:00:00.000Z",
    notes: "Buscaba arriendo pero decidió postergar la búsqueda por 6 meses.",
  },
]

export function ProspectDashboard() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [tabValue, setTabValue] = useState(0)
  const [prospects, setProspects] = useState<Prospect[]>(mockProspects)
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null)
  const [openProspectForm, setOpenProspectForm] = useState(false)
  const [openProspectSummary, setOpenProspectSummary] = useState(false)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleCreateProspect = () => {
    setSelectedProspect(null)
    setOpenProspectForm(true)
  }

  const handleEditProspect = (prospect: Prospect) => {
    setSelectedProspect(prospect)
    setOpenProspectForm(true)

    if (openProspectSummary) {
      setOpenProspectSummary(false)
    }
  }

  const handleViewProspect = (prospect: Prospect) => {
    setSelectedProspect(prospect)
    setOpenProspectSummary(true)
  }

  const handleDeleteProspect = (prospectId: number) => {
    setProspects(prospects.filter((prospect) => prospect.id !== prospectId))

    if (openProspectSummary) {
      setOpenProspectSummary(false)
    }
  }

  const handleProspectFormSubmit = (data: Partial<Prospect>) => {
    if (selectedProspect) {
      // Actualizar prospecto existente
      setProspects(
        prospects.map((prospect) =>
          prospect.id === selectedProspect.id
            ? { ...prospect, ...data, updatedAt: new Date().toISOString() }
            : prospect,
        ),
      )
    } else {
      // Crear nuevo prospecto
      const newProspect: Prospect = {
        id: Math.max(...prospects.map((p) => p.id)) + 1,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        secondaryPhone: data.secondaryPhone,
        address: data.address,
        city: data.city,
        province: data.province,
        country: data.country,
        postalCode: data.postalCode,
        company: data.company,
        position: data.position,
        status: (data.status as ProspectStatus) || "POTENTIAL",
        type: data.type || "BUYER",
        source: data.source,
        budget: data.budget,
        budgetCurrency: data.budgetCurrency || "CLP",
        preferredContactMethod: data.preferredContactMethod || "EMAIL",
        notes: data.notes,
        tags: data.tags || [],
        propertyPreferences: data.propertyPreferences || {
          types: [],
          locations: [],
          features: [],
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setProspects([newProspect, ...prospects])
    }

    setOpenProspectForm(false)
  }

  const getFilteredProspects = () => {
    switch (tabValue) {
      case 0: // Todos
        return prospects
      case 1: // Activos
        return prospects.filter((prospect) => prospect.status === "ACTIVE")
      case 2: // Potenciales
        return prospects.filter((prospect) => prospect.status === "POTENTIAL")
      case 3: // Calificados
        return prospects.filter((prospect) => prospect.status === "QUALIFIED")
      case 4: // Convertidos
        return prospects.filter((prospect) => prospect.status === "CONVERTED")
      case 5: // Inactivos
        return prospects.filter((prospect) => prospect.status === "INACTIVE" || prospect.status === "LOST")
      default:
        return prospects
    }
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ px: { xs: 1, sm: 2, md: 3 }, py: { xs: 2, md: 3 }, width: "100%" }}
    >
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            sx={{ fontSize: { xs: "1.75rem", md: "2.125rem" } }}
          >
            Gestión de Prospectos
          </Typography>
        </Box>

        <Card>
          <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="prospect tabs"
                sx={{
                  "& .MuiTab-root": {
                    textTransform: "none",
                    minWidth: "auto",
                    px: { xs: 1.5, sm: 3 },
                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                  },
                  "& .Mui-selected": {
                    fontWeight: "bold",
                  },
                }}
              >
                <Tab label="Todos" />
                <Tab label="Activos" />
                <Tab label="Potenciales" />
                <Tab label="Calificados" />
                <Tab label="Convertidos" />
                <Tab label="Inactivos" />
              </Tabs>
            </Box>

            <Box>
              <ProspectTable
                prospects={getFilteredProspects()}
                onView={handleViewProspect}
                onEdit={handleEditProspect}
                onDelete={handleDeleteProspect}
                onCreate={handleCreateProspect}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Formulario de Prospecto */}
        <ProspectForm
          isOpen={openProspectForm}
          onClose={() => setOpenProspectForm(false)}
          onSubmit={handleProspectFormSubmit}
          initialData={selectedProspect}
        />

        {/* Resumen de Prospecto */}
        {selectedProspect && (
          <ProspectSummary
            isOpen={openProspectSummary}
            onClose={() => setOpenProspectSummary(false)}
            prospect={selectedProspect}
            onBack={() => setOpenProspectSummary(false)}
            onEdit={handleEditProspect}
            onDelete={handleDeleteProspect}
          />
        )}
      </Box>
    </Container>
  )
}
