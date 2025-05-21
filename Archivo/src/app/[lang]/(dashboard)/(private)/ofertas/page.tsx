"use client"
import { useState } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import { Box, Container, Typography, Button, Paper, Tabs, Tab, ToggleButtonGroup, ToggleButton } from "@mui/material"
import { Add as AddIcon, ViewList as ViewListIcon, ViewModule as ViewModuleIcon } from "@mui/icons-material"
import { OfferList } from "@/components/offer-list"
import { OfferForm } from "@/components/offer-form"
import { OfferWizard } from "@/components/offer-wizard"
import type { Offer } from "@/types/types"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`offer-tabpanel-${index}`}
      aria-labelledby={`offer-tab-${index}`}
      style={{ width: "100%" }}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3, width: "100%" }}>{children}</Box>}
    </div>
  )
}

export default function OffersPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(0)
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null)
  const [createMode, setCreateMode] = useState<"form" | "wizard">("form")

  const handleSelectOffer = (offer: Offer) => {
    router.push(`/ofertas/${offer.id}`)
  }

  const handleCreateNew = () => {
    setEditingOffer(null)
    setActiveTab(1)
  }

  const handleFormComplete = () => {
    setActiveTab(0)
    setEditingOffer(null)
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleCreateModeChange = (event: React.MouseEvent<HTMLElement>, newMode: "form" | "wizard") => {
    if (newMode !== null) {
      setCreateMode(newMode)
    }
  }

  return (
    <main>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Ofertas
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateNew}>
          Nueva Oferta
        </Button>
      </Box>

      <Paper sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="ofertas tabs"
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                minHeight: { xs: "48px", sm: "64px" },
                py: { xs: 1, sm: 2 },
              },
            }}
          >
            <Tab label="Lista de Ofertas" />
            <Tab label={editingOffer ? "Editar Oferta" : "Nueva Oferta"} />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <OfferList onSelectOffer={handleSelectOffer} />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          {/* Selector de modo de creación */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <ToggleButtonGroup
              value={createMode}
              exclusive
              onChange={handleCreateModeChange}
              aria-label="modo de creación de oferta"
              color="primary"
            >
              <ToggleButton value="form" aria-label="formulario completo">
                <ViewListIcon sx={{ mr: 1 }} />
                Formulario Completo
              </ToggleButton>
              <ToggleButton value="wizard" aria-label="asistente paso a paso">
                <ViewModuleIcon sx={{ mr: 1 }} />
                Asistente Paso a Paso
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {createMode === "form" ? (
            <OfferForm offer={editingOffer} onComplete={handleFormComplete} onDelete={handleFormComplete} />
          ) : (
            <OfferWizard offer={editingOffer} onComplete={handleFormComplete} onCancel={handleFormComplete} />
          )}
        </TabPanel>
      </Paper>
    </main>
  )
}
