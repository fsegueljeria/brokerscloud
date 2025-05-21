"use client"

import type React from "react"

import { useState } from "react"
import { Container, Typography, Box, Tabs, Tab, Paper, Button } from "@mui/material"
import {
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  House as HouseIcon,
  Person as PersonIcon,
  BusinessCenter as BusinessCenterIcon,
  Description as DescriptionIcon,
  Event as EventIcon,
  People as PeopleIcon,
  Message as MessageIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Book as BookIcon,
  ContactSupport as ContactSupportIcon,
  Login as LoginIcon,
  BugReport as BugReportIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
} from "@mui/icons-material"

import { TabPanel, a11yProps } from "@/components/tutoriales/tab-panel"
import { SeccionIntroduccion } from "@/components/tutoriales/seccion-introduccion"
import { SeccionPrimerosPasos } from "@/components/tutoriales/seccion-primeros-pasos"
import { SeccionDashboard } from "@/components/tutoriales/seccion-dashboard"
import { SeccionPropiedades } from "@/components/tutoriales/seccion-propiedades"
import { SeccionLeads } from "@/components/tutoriales/seccion-leads"
import { SeccionOportunidades } from "@/components/tutoriales/seccion-oportunidades"
import { SeccionOfertas } from "@/components/tutoriales/seccion-ofertas"
import { SeccionVisitas } from "@/components/tutoriales/seccion-visitas"
import { SeccionProspectos } from "@/components/tutoriales/seccion-prospectos"
import { SeccionPlantillas } from "@/components/tutoriales/seccion-plantillas"
import { SeccionProblemas } from "@/components/tutoriales/seccion-problemas"
import { SeccionFAQ } from "@/components/tutoriales/seccion-faq"
import { SeccionGlosario } from "@/components/tutoriales/seccion-glosario"
import { SeccionContacto } from "@/components/tutoriales/seccion-contacto"

export default function GuiaUsuarioPage() {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleNext = () => {
    setValue((prev) => Math.min(prev + 1, 13))
  }

  const handlePrev = () => {
    setValue((prev) => Math.max(prev - 1, 0))
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
          Guía de Usuario - CRM Inmobiliario
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
          Manual completo para el uso efectivo de la plataforma
        </Typography>
      </Paper>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="manual sections tabs"
        >
          <Tab label="Introducción" icon={<HomeIcon />} iconPosition="start" {...a11yProps(0)} />
          <Tab label="Primeros Pasos" icon={<LoginIcon />} iconPosition="start" {...a11yProps(1)} />
          <Tab label="Panel de Control" icon={<DashboardIcon />} iconPosition="start" {...a11yProps(2)} />
          <Tab label="Propiedades" icon={<HouseIcon />} iconPosition="start" {...a11yProps(3)} />
          <Tab label="Leads" icon={<PersonIcon />} iconPosition="start" {...a11yProps(4)} />
          <Tab label="Oportunidades" icon={<BusinessCenterIcon />} iconPosition="start" {...a11yProps(5)} />
          <Tab label="Ofertas" icon={<DescriptionIcon />} iconPosition="start" {...a11yProps(6)} />
          <Tab label="Visitas" icon={<EventIcon />} iconPosition="start" {...a11yProps(7)} />
          <Tab label="Prospectos" icon={<PeopleIcon />} iconPosition="start" {...a11yProps(8)} />
          <Tab label="Plantillas" icon={<MessageIcon />} iconPosition="start" {...a11yProps(9)} />
          <Tab label="Problemas" icon={<BugReportIcon />} iconPosition="start" {...a11yProps(10)} />
          <Tab label="FAQ" icon={<QuestionAnswerIcon />} iconPosition="start" {...a11yProps(11)} />
          <Tab label="Glosario" icon={<BookIcon />} iconPosition="start" {...a11yProps(12)} />
          <Tab label="Contacto" icon={<ContactSupportIcon />} iconPosition="start" {...a11yProps(13)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <SeccionIntroduccion />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <SeccionPrimerosPasos />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <SeccionDashboard />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <SeccionPropiedades />
      </TabPanel>

      <TabPanel value={value} index={4}>
        <SeccionLeads />
      </TabPanel>

      <TabPanel value={value} index={5}>
        <SeccionOportunidades />
      </TabPanel>

      <TabPanel value={value} index={6}>
        <SeccionOfertas />
      </TabPanel>

      <TabPanel value={value} index={7}>
        <SeccionVisitas />
      </TabPanel>

      <TabPanel value={value} index={8}>
        <SeccionProspectos />
      </TabPanel>

      <TabPanel value={value} index={9}>
        <SeccionPlantillas />
      </TabPanel>

      <TabPanel value={value} index={10}>
        <SeccionProblemas />
      </TabPanel>

      <TabPanel value={value} index={11}>
        <SeccionFAQ />
      </TabPanel>

      <TabPanel value={value} index={12}>
        <SeccionGlosario />
      </TabPanel>

      <TabPanel value={value} index={13}>
        <SeccionContacto />
      </TabPanel>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" startIcon={<NavigateBeforeIcon />} onClick={handlePrev} disabled={value === 0}>
          Sección anterior
        </Button>
        <Button variant="contained" endIcon={<NavigateNextIcon />} onClick={handleNext} disabled={value === 13}>
          Siguiente sección
        </Button>
      </Box>
    </Container>
  )
}
