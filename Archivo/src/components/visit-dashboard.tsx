"use client"

import type React from "react"

import { useState } from "react"
import { Box, Tabs, Tab, Typography, Button, Paper, Container, useTheme, useMediaQuery } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import ListAltIcon from "@mui/icons-material/ListAlt"
import { VisitCalendar } from "./visit-calendar"
import { VisitForm } from "./visit-form"
import { VisitList } from "./visit-list"

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
      id={`visit-tabpanel-${index}`}
      aria-labelledby={`visit-tab-${index}`}
      style={{ width: "100%" }}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3, width: "100%" }}>{children}</Box>}
    </div>
  )
}

export function VisitDashboard() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [activeTab, setActiveTab] = useState(0)
  const [editingVisit, setEditingVisit] = useState(null)
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar")

  const handleCreateNew = () => {
    setEditingVisit(null)
    setActiveTab(1)
  }

  const handleEditVisit = (visit) => {
    setEditingVisit(visit)
    setActiveTab(1)
  }

  const handleFormComplete = () => {
    setActiveTab(0)
    setEditingVisit(null)
  }

  const handleDeleteVisit = (visitId) => {
    console.log(`Eliminar visita ${visitId}`)
    // Aquí iría la lógica para eliminar la visita
    handleFormComplete()
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode)
    }
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
          <Typography variant="h4" component="h1" fontWeight="bold" sx={{ fontSize: { xs: "1.5rem", md: "2.125rem" } }}>
            Gestión de Visitas
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={handleCreateNew}
            size={isMobile ? "medium" : "large"}
          >
            Nueva Visita
          </Button>
        </Box>

        <Paper sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="visitas tabs"
              variant="fullWidth"
              sx={{
                "& .MuiTab-root": {
                  minHeight: { xs: "48px", sm: "64px" },
                  py: { xs: 1, sm: 2 },
                },
              }}
            >
              <Tab label="Visitas" />
              <Tab label={editingVisit ? "Editar Visita" : "Nueva Visita"} />
            </Tabs>
          </Box>
          <TabPanel value={activeTab} index={0}>
            <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
              <Tabs
                value={viewMode}
                onChange={handleViewModeChange}
                aria-label="vista de visitas"
                sx={{
                  "& .MuiTab-root": {
                    minHeight: { xs: "40px", sm: "48px" },
                    py: { xs: 0.5, sm: 1 },
                  },
                }}
              >
                <Tab
                  icon={<CalendarMonthIcon />}
                  label={!isMobile && "Calendario"}
                  value="calendar"
                  iconPosition="start"
                />
                <Tab icon={<ListAltIcon />} label={!isMobile && "Lista"} value="list" iconPosition="start" />
              </Tabs>
            </Box>

            {viewMode === "calendar" ? (
              <VisitCalendar onCreateVisit={handleCreateNew} onEditVisit={handleEditVisit} />
            ) : (
              <VisitList onCreateVisit={handleCreateNew} onEditVisit={handleEditVisit} />
            )}
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <VisitForm visit={editingVisit} onComplete={handleFormComplete} onDelete={handleDeleteVisit} />
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  )
}
