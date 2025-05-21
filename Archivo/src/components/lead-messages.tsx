"use client"

import { useState, useRef, useEffect } from "react"
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Paper,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  Chip,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import CloseIcon from "@mui/icons-material/Close"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import { grey, blue } from "@mui/material/colors"

// Mensajes de ejemplo más realistas en español
const exampleMessages = [
  {
    id: "msg-1",
    leadId: "lead-1",
    date: "2023-10-26T10:00:00.000Z",
    content:
      "Hola, vi el departamento en Av. Providencia 1250 y me interesa saber si sigue disponible. ¿Cuál es el valor exacto del arriendo mensual?",
    isFromLead: true,
  },
  {
    id: "msg-2",
    leadId: "lead-1",
    date: "2023-10-26T10:05:00.000Z",
    content:
      "¡Hola Juan! Gracias por tu interés en el departamento de Providencia 1250. Sí, sigue disponible. El valor del arriendo es de $450.000 mensuales, con gastos comunes de aproximadamente $60.000. ¿Te gustaría agendar una visita para conocerlo?",
    isFromLead: false,
  },
  {
    id: "msg-3",
    leadId: "lead-1",
    date: "2023-10-26T10:15:00.000Z",
    content:
      "Gracias por la información. Me interesa visitarlo. ¿Sería posible este jueves por la tarde, después de las 18:00?",
    isFromLead: true,
  },
  {
    id: "msg-4",
    leadId: "lead-1",
    date: "2023-10-26T10:20:00.000Z",
    content:
      "Perfecto Juan, podemos coordinar la visita para este jueves a las 18:30. El departamento cuenta con 2 dormitorios, 2 baños, estacionamiento y bodega. ¿Necesitas que te envíe la ubicación exacta o tienes alguna pregunta adicional sobre el inmueble?",
    isFromLead: false,
  },
  {
    id: "msg-5",
    leadId: "lead-1",
    date: "2023-10-26T10:30:00.000Z",
    content:
      "Sí, por favor envíame la ubicación exacta. También quisiera saber si aceptan mascotas en el edificio y cuáles son los requisitos para arrendar.",
    isFromLead: true,
  },
  {
    id: "msg-6",
    leadId: "lead-1",
    date: "2023-10-26T10:40:00.000Z",
    content:
      "Te comparto la ubicación: https://maps.app.goo.gl/ejemplo. Respecto a tus consultas: sí, el edificio acepta mascotas pequeñas (con un formulario adicional). Los requisitos son: contrato de trabajo vigente, últimas 3 liquidaciones de sueldo, certificado de antecedentes y un aval con las mismas condiciones. ¿Cumples con estos requisitos?",
    isFromLead: false,
  },
  {
    id: "msg-7",
    leadId: "lead-2",
    date: "2023-10-25T14:30:00.000Z",
    content:
      "Buenas tardes, estoy interesada en la casa publicada en El Llano de San Miguel. ¿Cuál es el precio de venta y qué superficie tiene el terreno?",
    isFromLead: true,
  },
  {
    id: "msg-8",
    leadId: "lead-2",
    date: "2023-10-25T14:35:00.000Z",
    content:
      "Hola Jane, gracias por contactarnos. La casa en El Llano de San Miguel tiene un valor de UF 5.200. El terreno es de 350 m² y la casa tiene 180 m² construidos. Cuenta con 4 dormitorios, 3 baños, patio trasero con quincho y 2 estacionamientos techados. ¿Te interesaría coordinar una visita para conocerla?",
    isFromLead: false,
  },
  {
    id: "msg-9",
    leadId: "lead-3",
    date: "2023-10-24T09:15:00.000Z",
    content:
      "Hola, necesito información sobre opciones de financiamiento para el departamento en Ñuñoa que vi ayer. ¿Trabajan con algún banco en particular o tienen convenios especiales?",
    isFromLead: true,
  },
  {
    id: "msg-10",
    leadId: "lead-3",
    date: "2023-10-24T09:20:00.000Z",
    content:
      "Buenos días Alice. Tenemos convenios con varios bancos que ofrecen tasas preferenciales para nuestros clientes. Principalmente trabajamos con Banco de Chile, Santander y BCI. Puedo coordinar una reunión con nuestro ejecutivo financiero para que te explique las opciones disponibles según tu situación particular. ¿Te parece bien?",
    isFromLead: false,
  },
  {
    id: "msg-11",
    leadId: "lead-4",
    date: "2023-10-23T16:45:00.000Z",
    content:
      "Estimados, revisé la propiedad en La Dehesa pero el precio está fuera de mi presupuesto. ¿Tienen otras opciones similares en el sector pero de menor valor?",
    isFromLead: true,
  },
  {
    id: "msg-12",
    leadId: "lead-4",
    date: "2023-10-23T16:50:00.000Z",
    content:
      "Entiendo Bob, gracias por tu sinceridad. Tenemos dos propiedades similares en el sector de La Dehesa con valores más accesibles: una en Los Trapenses de UF 8.500 y otra en Los Dominicos de UF 7.800. Ambas cuentan con características similares pero en condominios más pequeños. ¿Te gustaría recibir información detallada de estas alternativas?",
    isFromLead: false,
  },
  {
    id: "msg-13",
    leadId: "lead-5",
    date: "2023-10-22T11:00:00.000Z",
    content: "Hola, acabo de hacer una oferta por la casa en Las Condes. ¿Cuándo tendré una respuesta del propietario?",
    isFromLead: true,
  },
  {
    id: "msg-14",
    leadId: "lead-5",
    date: "2023-10-22T11:05:00.000Z",
    content:
      "Hola Charlie, ya presentamos tu oferta al propietario. Normalmente recibimos respuesta en un plazo de 24 a 48 horas. Te mantendré informado de cualquier novedad. El propietario está evaluando dos ofertas actualmente, pero la tuya es bastante competitiva. ¿Hay algún plazo máximo que necesites considerar para tu decisión?",
    isFromLead: false,
  },
]

export function LeadMessages({ isOpen, onClose, lead, messages = [], onSendMessage }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef(null)

  // Usar mensajes de ejemplo si no hay mensajes reales o si son pocos
  const displayMessages =
    messages && messages.length > 0 ? messages : lead ? exampleMessages.filter((msg) => msg.leadId === lead.id) : []

  // Scroll al final de los mensajes cuando se abre el diálogo o llegan nuevos mensajes
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [isOpen, displayMessages])

  const handleSendMessage = () => {
    if (newMessage.trim() && lead) {
      onSendMessage(lead.id, newMessage.trim())
      setNewMessage("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Formatear fecha para mostrar
  const formatMessageDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString("es-CL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!lead) return null

  // Nombre del lead o valor por defecto
  const leadName = lead.name || "Cliente"
  // Propiedad de interés o valor por defecto
  const propertyTitle = lead.propertyTitle || "Propiedad en consulta"

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth fullScreen={isMobile}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box>
          <Typography variant="h6" component="div" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
            Conversación con {leadName}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
            {lead.email || "Email no disponible"} • {lead.phone || "Teléfono no disponible"}
          </Typography>
        </Box>
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="cerrar">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent
        sx={{
          p: { xs: 1, sm: 2 },
          display: "flex",
          flexDirection: "column",
          height: isMobile ? "calc(100vh - 120px)" : "60vh",
        }}
      >
        {propertyTitle && (
          <Box sx={{ mb: 2 }}>
            <Chip
              label={`Propiedad: ${propertyTitle}`}
              color="primary"
              variant="outlined"
              size="small"
              sx={{ mb: 1 }}
            />
          </Box>
        )}

        <Box sx={{ flexGrow: 1, overflow: "auto", mb: 2 }}>
          {displayMessages.length === 0 ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <Typography variant="body2" color="text.secondary">
                No hay mensajes en esta conversación
              </Typography>
            </Box>
          ) : (
            displayMessages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: "flex",
                  justifyContent: message.isFromLead ? "flex-start" : "flex-end",
                  mb: 2,
                }}
              >
                {message.isFromLead && (
                  <Avatar
                    sx={{
                      bgcolor: grey[500],
                      mr: 1,
                      width: { xs: 32, sm: 40 },
                      height: { xs: 32, sm: 40 },
                    }}
                  >
                    {leadName.charAt(0)}
                  </Avatar>
                )}
                <Box sx={{ maxWidth: { xs: "75%", sm: "70%" } }}>
                  <Paper
                    elevation={1}
                    sx={{
                      p: { xs: 1.5, sm: 2 },
                      bgcolor: message.isFromLead ? grey[100] : blue[50],
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body1" sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                      {message.content}
                    </Typography>
                  </Paper>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      ml: 1,
                      fontSize: { xs: "0.65rem", sm: "0.75rem" },
                    }}
                  >
                    {formatMessageDate(message.date)}
                  </Typography>
                </Box>
                {!message.isFromLead && (
                  <Avatar
                    sx={{
                      bgcolor: blue[500],
                      ml: 1,
                      width: { xs: 32, sm: 40 },
                      height: { xs: 32, sm: 40 },
                    }}
                  >
                    A
                  </Avatar>
                )}
              </Box>
            ))
          )}
          <div ref={messagesEndRef} />
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions
        sx={{
          p: { xs: 1, sm: 2 },
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <IconButton color="primary" aria-label="adjuntar archivo" disabled size={isMobile ? "small" : "medium"}>
          <AttachFileIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>
        <TextField
          fullWidth
          multiline
          maxRows={isMobile ? 2 : 4}
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          variant="outlined"
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          size={isMobile ? "small" : "medium"}
          sx={{
            ml: 1,
            minWidth: isMobile ? 0 : undefined,
            px: isMobile ? 1 : undefined,
          }}
        >
          {isMobile ? "" : "Enviar"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
