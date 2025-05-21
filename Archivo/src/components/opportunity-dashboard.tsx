"use client"

import type React from "react"

import { useState } from "react"
import { Box, Tabs, Tab, Typography, Button, Paper, Container, useTheme, useMediaQuery } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { OpportunityTable } from "./opportunity-table"
import { OpportunityForm } from "./opportunity-form"
import { OpportunitySummary } from "./opportunity-summary"

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
      id={`opportunity-tabpanel-${index}`}
      aria-labelledby={`opportunity-tab-${index}`}
      style={{ width: "100%" }}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3, width: "100%" }}>{children}</Box>}
    </div>
  )
}

export function OpportunityDashboard() {
  const [activeTab, setActiveTab] = useState(0)
  const [editingOpportunity, setEditingOpportunity] = useState(null)
  const [viewingOpportunity, setViewingOpportunity] = useState(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  const handleCreateNew = () => {
    setEditingOpportunity(null)
    setActiveTab(1)
  }

  const handleEditOpportunity = (opportunity) => {
    setEditingOpportunity(opportunity)
    setActiveTab(1)
  }

  const handleViewOpportunity = (opportunity) => {
    setViewingOpportunity(opportunity)
    setActiveTab(2)
  }

  const handleBackToList = () => {
    setActiveTab(0)
    setViewingOpportunity(null)
  }

  const handleFormComplete = () => {
    setActiveTab(0)
    setEditingOpportunity(null)
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ px: { xs: 1, sm: 2, md: 3 }, py: { xs: 2, md: 3 }, width: "100%" }}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography variant="h4" component="h1" fontWeight="bold" sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}>
            Gestión de Oportunidades
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={handleCreateNew}
            size={isMobile ? "medium" : "large"}
          >
            Nueva Oportunidad
          </Button>
        </Box>

        <Paper sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="oportunidades tabs"
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons={isMobile ? "auto" : false}
            >
              <Tab label="Lista de Oportunidades" />
              <Tab label={editingOpportunity ? "Editar Oportunidad" : "Nueva Oportunidad"} />
              <Tab label="Detalles de Oportunidad" />
            </Tabs>
          </Box>
          <TabPanel value={activeTab} index={0}>
            <OpportunityTable onEditOpportunity={handleEditOpportunity} onViewOpportunity={handleViewOpportunity} />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <OpportunityForm opportunity={editingOpportunity} onComplete={handleFormComplete} />
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            <OpportunitySummary
              opportunity={viewingOpportunity}
              onBack={handleBackToList}
              onEdit={handleEditOpportunity}
            />
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  )
}
