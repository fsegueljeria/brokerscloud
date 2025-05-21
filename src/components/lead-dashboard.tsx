"use client"

import { useState } from "react"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { Box, Card, CardContent, Container, Tab, Tabs, Typography, Paper } from "@mui/material"
import { LeadTable } from "./lead-table"
import { LeadForm } from "./lead-form"
import { LeadMessages } from "./lead-messages"
import { LeadConvertForm } from "./lead-convert-form"
import { LeadAnalyticsDashboard } from "./lead-analytics-dashboard"
import { Lead, LeadMessage } from "@/types/types"

const mockLeads = [
  {
    id: "lead-1",
    name: "Juan Pérez",
    email: "juan.perez@gmail.com",
    phone: "9 8765 4321",
    company: "Constructora ABC",
    date: "2023-01-01",
    status: "Nuevo",
    lastMessage: "Hola, vi el departamento en Av. Providencia 1250 y me interesa saber si sigue disponible.",
    lastContactDate: "2023-10-26T10:00:00.000Z",
    propertyTitle: "Departamento en Providencia 1250",
    source: "Redes Sociales",
    createdAt: "2023-01-01T00:00:00.000Z",
  },
  {
    id: "lead-2",
    name: "María González",
    email: "maria.gonzalez@outlook.com",
    phone: "9 1234 5678",
    company: "Independiente",
    date: "2023-02-15",
    status: "Contactado",
    lastMessage: "Buenas tardes, estoy interesada en la casa publicada en El Llano de San Miguel.",
    lastContactDate: "2023-10-25T14:30:00.000Z",
    propertyTitle: "Casa en El Llano de San Miguel",
    source: "Portal Inmobiliario",
    createdAt: "2023-02-15T00:00:00.000Z",
  },
  {
    id: "lead-3",
    name: "Pedro Soto",
    email: "pedro.soto@empresa.cl",
    phone: "9 5555 6666",
    company: "Banco Estado",
    date: "2023-03-20",
    status: "Calificado",
    lastMessage: "Hola, necesito información sobre opciones de financiamiento para el departamento en Ñuñoa.",
    lastContactDate: "2023-10-24T09:15:00.000Z",
    propertyTitle: "Departamento en Ñuñoa",
    source: "Redes Sociales",
    createdAt: "2023-03-20T00:00:00.000Z",
  },
  {
    id: "lead-4",
    name: "Carolina Muñoz",
    email: "carolina.munoz@hotmail.com",
    phone: "9 7777 8888",
    company: "Clínica Santa María",
    date: "2023-04-10",
    status: "No calificado",
    lastMessage: "Estimados, revisé la propiedad en La Dehesa pero el precio está fuera de mi presupuesto.",
    lastContactDate: "2023-10-23T16:45:00.000Z",
    propertyTitle: "Casa en La Dehesa",
    source: "Portal Inmobiliario",
    createdAt: "2023-04-10T00:00:00.000Z",
  },
  {
    id: "lead-5",
    name: "Roberto Álvarez",
    email: "roberto.alvarez@gmail.com",
    phone: "9 3333 2222",
    company: "Falabella",
    date: "2023-05-01",
    status: "Convertido",
    lastMessage: "Hola, acabo de hacer una oferta por la casa en Las Condes.",
    lastContactDate: "2023-10-22T11:00:00.000Z",
    propertyTitle: "Casa en Las Condes",
    source: "Redes Sociales",
    createdAt: "2023-05-01T00:00:00.000Z",
  },
]

// Los mensajes de ejemplo ahora se manejan directamente en el componente LeadMessages

export function LeadDashboard() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [mainTabValue, setMainTabValue] = useState(0) // Nueva pestaña principal (Dashboard/Lista)
  const [leadTabValue, setLeadTabValue] = useState(0) // Pestaña de filtro de leads
  const [leads, setLeads] = useState<Lead[]>(mockLeads)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [openLeadForm, setOpenLeadForm] = useState(false)
  const [openMessagesDialog, setOpenMessagesDialog] = useState(false)
  const [openConvertDialog, setOpenConvertDialog] = useState(false)
  const [messages, setMessages] = useState<LeadMessage[]>([]) // Inicializamos con array vacío para usar los ejemplos del componente

  const handleMainTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setMainTabValue(newValue)
  }

  const handleLeadTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setLeadTabValue(newValue)
  }

  const handleCreateLead = () => {
    setSelectedLead(null)
    setOpenLeadForm(true)
  }

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead)
    setOpenLeadForm(true)
  }

  const handleViewMessages = (lead: Lead) => {
    setSelectedLead(lead)
    setOpenMessagesDialog(true)
  }

  const handleConvertLead = (lead: Lead) => {
    setSelectedLead(lead)
    setOpenConvertDialog(true)
  }

  const handleDeleteLead = (lead: Lead) => {
    setLeads((prevLeads) => prevLeads.filter((l) => l.id !== lead.id))
  }

  const handleLeadFormSubmit = (data: Lead) => {
    if (selectedLead) {
      setLeads((prevLeads) => prevLeads.map((lead) => (lead.id === data.id ? data : lead)))
    } else {
      setLeads((prevLeads) => [...prevLeads, { ...data, id: `lead-${Date.now()}` }])
    }
    setOpenLeadForm(false)
  }

  const handleSendMessage = (leadId: string, message: string) => {
    const newMessage: LeadMessage = {
      id: `msg-${Date.now()}`,
      leadId,
      date: new Date().toISOString(),
      content: message,
      isFromLead: false,
      propertyId: "1", // hardcoded for now
    }

    setMessages((prevMessages) => [...prevMessages, newMessage])

    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId ? { ...lead, lastMessage: message, lastContactDate: new Date().toISOString() } : lead,
      ),
    )
  }

  const handleConvertFormSubmit = (data: Lead) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => (lead.id === data.id ? { ...lead, status: "CONVERTED" } : lead)),
    )
    setOpenConvertDialog(false)
  }

  const getFilteredLeads = () => {
    switch (leadTabValue) {
      case 0: // Todos
        return leads
      case 1: // Nuevos
        return leads.filter((lead) => lead.status === "Nuevo")
      case 2: // Contactados
        return leads.filter((lead) => lead.status === "Contactado")
      case 3: // Calificados
        return leads.filter((lead) => lead.status === "Calificado")
      case 4: // No calificados
        return leads.filter((lead) => lead.status === "No calificado")
      case 5: // Convertidos
        return leads.filter((lead) => lead.status === "Convertido")
      default:
        return leads
    }
  }

  // Filtrar mensajes para el lead seleccionado
  const getLeadMessages = (leadId: string) => {
    return messages.filter((message) => message.leadId === leadId)
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
              Gestión de Leads
            </Typography>
          </Box>
          <Paper sx={{ width: "100%" }}>
          {/* Pestañas principales: Dashboard y Lista de Leads */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs
              value={mainTabValue}
              onChange={handleMainTabChange}
              aria-label="pestañas principales de leads"
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  minWidth: "auto",
                  px: { xs: 2, sm: 4 },
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                },
                "& .Mui-selected": {
                  fontWeight: "bold",
                },
              }}
            >
              <Tab label="Dashboard" />
              <Tab label="Lista de Leads" />
            </Tabs>
          </Box>

          {/* Contenido de las pestañas principales */}
          {mainTabValue === 0 ? (
            // Contenido del Dashboard
            <LeadAnalyticsDashboard />
          ) : (
            // Contenido de la Lista de Leads
            <Card>
              <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
                  <Tabs
                    value={leadTabValue}
                    onChange={handleLeadTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="pestañas de filtro de leads"
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
                    <Tab label="Nuevos" />
                    <Tab label="Contactados" />
                    <Tab label="Calificados" />
                    <Tab label="No calificados" />
                    <Tab label="Convertidos" />
                  </Tabs>
                </Box>

                <Box>
                  <LeadTable
                    leads={getFilteredLeads()}
                    onViewMessages={handleViewMessages}
                    onConvert={handleConvertLead}
                    onEdit={handleEditLead}
                    onDelete={handleDeleteLead}
                    onCreate={handleCreateLead}
                  />
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Formulario de Lead */}
          <LeadForm
            isOpen={openLeadForm}
            onClose={() => setOpenLeadForm(false)}
            onSubmit={handleLeadFormSubmit}
            initialData={selectedLead}
          />
        </Paper>
          {/* Diálogo de Mensajes */}
          <LeadMessages
            isOpen={openMessagesDialog}
            onClose={() => setOpenMessagesDialog(false)}
            lead={selectedLead!}
            messages={selectedLead ? getLeadMessages(selectedLead.id) : []}
            onSendMessage={handleSendMessage}
          />

          {/* Formulario de Conversión */}
          <LeadConvertForm
            isOpen={openConvertDialog}
            onClose={() => setOpenConvertDialog(false)}
            onSubmit={handleConvertFormSubmit}
            lead={selectedLead}
          />              
        </Box>
    </Container>
  )
}
