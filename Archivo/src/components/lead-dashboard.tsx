"use client"

import { useState } from "react"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { Box, Card, CardContent, Container, Tab, Tabs, Typography } from "@mui/material"
import { LeadTable } from "./lead-table"
import { LeadForm } from "./lead-form"
import { LeadMessages } from "./lead-messages"
import { LeadConvertForm } from "./lead-convert-form"

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
  },
]

// Los mensajes de ejemplo ahora se manejan directamente en el componente LeadMessages

export function LeadDashboard() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [tabValue, setTabValue] = useState(0)
  const [leads, setLeads] = useState(mockLeads)
  const [selectedLead, setSelectedLead] = useState(null)
  const [openLeadForm, setOpenLeadForm] = useState(false)
  const [openMessagesDialog, setOpenMessagesDialog] = useState(false)
  const [openConvertDialog, setOpenConvertDialog] = useState(false)
  const [messages, setMessages] = useState([]) // Inicializamos con array vacío para usar los ejemplos del componente

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleCreateLead = () => {
    setSelectedLead(null)
    setOpenLeadForm(true)
  }

  const handleEditLead = (lead) => {
    setSelectedLead(lead)
    setOpenLeadForm(true)
  }

  const handleViewMessages = (lead) => {
    setSelectedLead(lead)
    setOpenMessagesDialog(true)
  }

  const handleConvertLead = (lead) => {
    setSelectedLead(lead)
    setOpenConvertDialog(true)
  }

  const handleDeleteLead = (leadId) => {
    setLeads(leads.filter((lead) => lead.id !== leadId))
  }

  const handleLeadFormSubmit = (data) => {
    if (selectedLead) {
      // Actualizar lead existente
      setLeads(leads.map((lead) => (lead.id === selectedLead.id ? { ...lead, ...data } : lead)))
    } else {
      // Crear nuevo lead
      const newLead = {
        id: `lead-${Date.now()}`,
        createdAt: new Date().toISOString(),
        date: new Date().toISOString().split("T")[0],
        status: "Nuevo",
        ...data,
      }
      setLeads([newLead, ...leads])
    }
    setOpenLeadForm(false)
  }

  const handleSendMessage = (leadId, message) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      leadId,
      date: new Date().toISOString(),
      content: message,
      isFromLead: false,
    }

    // Añadir el nuevo mensaje a la lista de mensajes
    setMessages([...messages, newMessage])

    // Actualizar el último mensaje del lead
    setLeads(
      leads.map((lead) =>
        lead.id === leadId ? { ...lead, lastMessage: message, lastContactDate: new Date().toISOString() } : lead,
      ),
    )
  }

  const handleConvertFormSubmit = (leadId, data) => {
    // Aquí se crearía la oportunidad y se actualizaría el estado del lead
    console.log("Lead convertido a oportunidad:", leadId, data)

    // Actualizar el estado del lead a "Convertido"
    setLeads(leads.map((lead) => (lead.id === leadId ? { ...lead, status: "Convertido" } : lead)))

    setOpenConvertDialog(false)
  }

  const getFilteredLeads = () => {
    switch (tabValue) {
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
  const getLeadMessages = (leadId) => {
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

        <Card>
          <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="lead tabs"
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

        {/* Formulario de Lead */}
        <LeadForm
          isOpen={openLeadForm}
          onClose={() => setOpenLeadForm(false)}
          onSubmit={handleLeadFormSubmit}
          initialData={selectedLead}
        />

        {/* Diálogo de Mensajes */}
        <LeadMessages
          isOpen={openMessagesDialog}
          onClose={() => setOpenMessagesDialog(false)}
          lead={selectedLead}
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
