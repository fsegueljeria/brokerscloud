"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { ArrowForward, Lightbulb, Code, ScreenshotMonitor, Assignment } from "@mui/icons-material"

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
      id={`step-tabpanel-${index}`}
      aria-labelledby={`step-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

export default function InteractiveProcessDiagram() {
  const [activeStep, setActiveStep] = useState(0)
  const [tabValue, setTabValue] = useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setTabValue(0) // Reset tab when moving to next step
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    setTabValue(0) // Reset tab when moving to previous step
  }

  const handleReset = () => {
    setActiveStep(0)
    setTabValue(0)
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const steps = [
    {
      label: "Recepción de consulta desde portal inmobiliario",
      description:
        "El proceso comienza cuando un cliente potencial realiza una consulta a través de un portal inmobiliario sobre una propiedad publicada.",
      screenshot: "/crm-lead-alert.png",
      example: {
        scenario:
          "Roberto Sánchez realiza una consulta a través del portal inmobiliario sobre un apartamento publicado en Providencia.",
        data: {
          name: "Roberto Sánchez",
          email: "roberto.sanchez@email.com",
          phone: "+56 9 8765 4321",
          message:
            "Estoy interesado en este apartamento. ¿Podría obtener más información y coordinar una visita? Gracias.",
          property: "Apartamento en Providencia, 2 dormitorios (ID: PROP-2023-0042)",
          source: "Portal Inmobiliario",
        },
      },
      systemActions: [
        "Acceder al Dashboard del CRM",
        "Observar la notificación de 'Nueva consulta desde Portal Inmobiliario'",
        "Hacer clic en la notificación para ver los detalles",
      ],
      tips: [
        "Responder a las consultas en menos de 2 horas aumenta significativamente las probabilidades de conversión",
        "Verificar si el contacto ya existe en la base de datos antes de crear un nuevo registro",
      ],
    },
    {
      label: "Creación del lead en el sistema",
      description:
        "La consulta se registra automáticamente en el CRM como un nuevo lead, capturando toda la información de contacto y el interés específico.",
      screenshot: "/filled-crm-lead-form.png",
      example: {
        scenario:
          "El agente inmobiliario Carolina Méndez registra a Roberto como un nuevo lead en el sistema, completando la información adicional necesaria.",
        data: {
          leadType: "Comprador",
          interest: "Residencial",
          budget: "UF 4.000 - UF 4.500",
          urgency: "Media",
          assignedTo: "Carolina Méndez",
        },
      },
      systemActions: [
        "En la pantalla de detalle de la consulta, hacer clic en 'Crear Lead'",
        "Completar los campos adicionales (tipo de cliente, interés, presupuesto, urgencia)",
        "Hacer clic en 'Guardar' para crear el lead",
      ],
      tips: [
        "Asignar inmediatamente el lead a un agente para evitar tiempos de espera en la respuesta inicial",
        "Categorizar correctamente el lead facilita el seguimiento posterior",
      ],
    },
    {
      label: "Primer contacto y calificación",
      description:
        "El agente inmobiliario realiza el primer contacto con el lead para confirmar su interés y evaluar su potencial como cliente.",
      screenshot: "/digital-crm-call-form.png",
      example: {
        scenario:
          "Carolina realiza una llamada a Roberto para confirmar su interés y obtener información adicional sobre sus necesidades y capacidad financiera.",
        data: {
          activityType: "Llamada telefónica",
          duration: "15 minutos",
          summary:
            "Roberto confirma interés en el apartamento. Trabaja como ingeniero, busca su primera vivienda. Tiene pre-aprobación bancaria por UF 4.500. Disponible para visitar la propiedad este fin de semana.",
          nextStep: "Programar visita para el sábado 05/03",
          leadQualification: "Alta (Cliente calificado con financiamiento aprobado)",
        },
      },
      systemActions: [
        "Acceder a la sección 'Leads' en el menú lateral",
        "Localizar a Roberto Sánchez en la lista de leads pendientes",
        "Hacer clic en 'Registrar Actividad'",
        "Seleccionar 'Llamada telefónica' como tipo de actividad",
        "Registrar la información de la llamada",
        "Hacer clic en 'Guardar Actividad'",
      ],
      tips: [
        "Preparar un guion de preguntas clave para calificar eficientemente al lead",
        "Registrar la información inmediatamente después de la llamada para no perder detalles importantes",
      ],
    },
    {
      label: "Conversión a oportunidad",
      description:
        "Una vez confirmado el interés genuino y la capacidad financiera, el lead se convierte en una oportunidad de venta.",
      screenshot: "/crm-lead-conversion-interface.png",
      example: {
        scenario:
          "Tras confirmar el interés genuino de Roberto y su capacidad financiera, Carolina convierte el lead en una oportunidad de venta.",
        data: {
          opportunityName: "Roberto Sánchez - Apartamento Providencia",
          property: "Apartamento en Providencia (ID: PROP-2023-0042)",
          estimatedValue: "UF 4.200",
          initialStage: "Interés confirmado",
          closingProbability: "60%",
          estimatedClosingDate: "31/03/2023",
        },
      },
      systemActions: [
        "En la ficha del lead, hacer clic en 'Convertir a Oportunidad'",
        "Completar el formulario de conversión con la información requerida",
        "Hacer clic en 'Crear Oportunidad'",
      ],
      tips: [
        "Al convertir un lead en oportunidad, el sistema mantiene todo el historial de comunicaciones y actividades previas",
        "Establecer una fecha estimada de cierre realista ayuda a planificar el seguimiento",
      ],
    },
    {
      label: "Programación y gestión de visitas",
      description: "Se coordinan visitas a la propiedad y se registran los resultados y comentarios del cliente.",
      screenshot: "/crm-property-schedule.png",
      example: {
        scenario:
          "Carolina programa una visita al apartamento para Roberto el sábado 05/03 a las 11:00 hrs. Después de la visita, registra los resultados y comentarios.",
        data: {
          visitDate: "05/03/2023",
          visitTime: "11:00",
          duration: "45 minutos",
          visitType: "Presencial",
          property: "Apartamento en Providencia",
          participants: "Roberto Sánchez, Carolina Méndez",
          notes: "Primera visita al inmueble. Preparar documentación y llaves",
          result: "Positivo",
          comments:
            "Roberto mostró gran interés en la propiedad. Le gustó la distribución y la luz natural. Mencionó que le gustaría traer a su familia para una segunda opinión. Solicitó información sobre posibilidades de negociación en el precio.",
          nextStep: "Programar segunda visita con familiares",
        },
      },
      systemActions: [
        "Acceder a la oportunidad de Roberto Sánchez",
        "Ir a la pestaña 'Visitas'",
        "Hacer clic en 'Programar Visita'",
        "Completar el formulario con fecha, hora y detalles",
        "Hacer clic en 'Guardar' para programar la visita",
        "Después de la visita, hacer clic en 'Registrar Resultado'",
        "Completar el formulario con el resultado y comentarios",
        "Hacer clic en 'Guardar'",
      ],
      tips: [
        "Confirmar la visita el día anterior para evitar cancelaciones de último momento",
        "Preparar toda la documentación relevante para entregarla durante la visita",
        "Registrar los comentarios del cliente inmediatamente después de la visita",
      ],
    },
    {
      label: "Gestión de ofertas y contraofertas",
      description: "Se gestionan las ofertas formales, contraofertas y negociaciones hasta llegar a un acuerdo.",
      screenshot: "/placeholder.svg?height=300&width=500&query=CRM offer management interface with form",
      example: {
        scenario:
          "Roberto presenta una oferta formal por el apartamento. El propietario responde con una contraoferta. Finalmente, Roberto acepta la contraoferta.",
        data: {
          initialOffer: {
            title: "Oferta inicial - Roberto Sánchez",
            reference: "OF-RS-001",
            amount: "UF 4.000",
            conditions: "Sujeto a aprobación de crédito hipotecario",
            offerDate: "12/03/2023",
            expirationDate: "15/03/2023",
          },
          counterOffer: {
            title: "Contraoferta del propietario",
            reference: "OF-RS-002",
            amount: "UF 4.150",
            conditions: "Incluye cortinas y lámparas",
            offerDate: "14/03/2023",
            expirationDate: "17/03/2023",
          },
          finalAgreement: {
            status: "Aceptada",
            amount: "UF 4.150",
            acceptanceDate: "16/03/2023",
          },
        },
      },
      systemActions: [
        "En la oportunidad de Roberto, ir a la pestaña 'Ofertas'",
        "Hacer clic en 'Nueva Oferta'",
        "Completar el asistente de creación de oferta",
        "Generar el PDF de la oferta",
        "Enviar la oferta al propietario",
        "Registrar la contraoferta del propietario",
        "Comunicar la contraoferta a Roberto",
        "Actualizar el estado de la oferta a 'Aceptada' cuando Roberto acepta",
      ],
      tips: [
        "Mantener un registro detallado de todas las ofertas y contraofertas para referencia futura",
        "Establecer plazos claros para la respuesta a las ofertas",
        "Comunicar rápidamente cualquier cambio en las condiciones",
      ],
    },
    {
      label: "Cierre de venta",
      description: "Se completa el proceso de escrituración y se registra la venta como cerrada exitosamente.",
      screenshot: "/placeholder.svg?height=300&width=500&query=CRM sale closing form with completed fields",
      example: {
        scenario:
          "Se completa el proceso de escrituración y entrega de llaves. La venta se registra como cerrada exitosamente.",
        data: {
          closingDate: "30/03/2023",
          location: "Notaría González",
          participants: "Roberto Sánchez (comprador), María López (vendedora), Carolina Méndez (agente)",
          documents: "Escritura de compraventa, comprobante de pago, acta de entrega",
          finalPrice: "UF 4.150",
          commission: "UF 83 (2% del valor de venta)",
        },
      },
      systemActions: [
        "Acceder a la oportunidad de Roberto Sánchez",
        "Registrar actividad 'Firma de escritura'",
        "Actualizar el estado de la oportunidad a 'Cerrada ganada'",
        "Actualizar el estado de la propiedad a 'Vendida'",
        "Registrar el precio final de venta",
      ],
      tips: [
        "Preparar una lista de verificación para asegurar que todos los documentos necesarios estén disponibles",
        "Coordinar con anticipación la fecha y hora de la firma con todas las partes",
        "Realizar un seguimiento post-venta para asegurar la satisfacción del cliente",
      ],
    },
    {
      label: "Seguimiento post-venta",
      description: "Se realiza un seguimiento para asegurar la satisfacción del cliente y fomentar recomendaciones.",
      screenshot: "/placeholder.svg?height=300&width=500&query=CRM post-sale follow up interface",
      example: {
        scenario:
          "Carolina realiza una llamada de seguimiento a Roberto para verificar su satisfacción con la compra y solicitar recomendaciones.",
        data: {
          followUpDate: "05/04/2023",
          activityType: "Llamada de cortesía post-venta",
          summary:
            "Roberto está muy satisfecho con su nueva vivienda. Agradece el servicio profesional y menciona que recomendará nuestra agencia a sus amigos y colegas.",
          nextAction: "Solicitar testimonio para marketing",
        },
      },
      systemActions: [
        "Configurar una tarea de seguimiento post-venta",
        "Registrar la llamada de seguimiento",
        "Solicitar al cliente una reseña o testimonio para marketing",
      ],
      tips: [
        "Realizar el seguimiento entre 1 y 2 semanas después de la entrega de la propiedad",
        "Ofrecer asistencia para cualquier problema que pueda surgir en los primeros días",
        "Aprovechar la oportunidad para solicitar referidos",
      ],
    },
  ]

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              <Typography variant="h6">{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body1" paragraph>
                {step.description}
              </Typography>

              <Paper elevation={0} sx={{ p: 0 }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="step details tabs">
                  <Tab label="Ejemplo" icon={<Assignment />} iconPosition="start" />
                  <Tab label="Acciones en el sistema" icon={<Code />} iconPosition="start" />
                  <Tab label="Visualización" icon={<ScreenshotMonitor />} iconPosition="start" />
                  <Tab label="Consejos" icon={<Lightbulb />} iconPosition="start" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Escenario
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {step.example.scenario}
                      </Typography>

                      <Typography variant="subtitle1" gutterBottom>
                        Datos del ejemplo
                      </Typography>
                      {step.example.data && typeof step.example.data === "object" ? (
                        Object.entries(step.example.data).map(([key, value]) => {
                          // Handle nested objects (like initialOffer, counterOffer, etc.)
                          if (value && typeof value === "object") {
                            return (
                              <Box key={key} sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" sx={{ textTransform: "capitalize" }}>
                                  {key.replace(/([A-Z])/g, " $1").trim()}:
                                </Typography>
                                <Card variant="outlined" sx={{ p: 1, mb: 1, bgcolor: "background.default" }}>
                                  {Object.entries(value).map(([subKey, subValue]) => (
                                    <Typography key={subKey} variant="body2" sx={{ mb: 0.5 }}>
                                      <strong>{subKey.replace(/([A-Z])/g, " $1").trim()}:</strong> {String(subValue)}
                                    </Typography>
                                  ))}
                                </Card>
                              </Box>
                            )
                          }
                          return (
                            <Typography key={key} variant="body2" sx={{ mb: 0.5 }}>
                              <strong>{key.replace(/([A-Z])/g, " $1").trim()}:</strong> {String(value)}
                            </Typography>
                          )
                        })
                      ) : (
                        <Typography variant="body2">No hay datos disponibles para este ejemplo.</Typography>
                      )}
                    </CardContent>
                  </Card>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Pasos en el sistema
                      </Typography>
                      <List>
                        {step.systemActions.map((action, i) => (
                          <ListItem key={i}>
                            <ListItemIcon>
                              <ArrowForward fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={action} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="300"
                      image={step.screenshot}
                      alt={`Captura de pantalla: ${step.label}`}
                    />
                    <CardContent>
                      <Typography variant="caption" color="text.secondary">
                        Vista de ejemplo: {step.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </TabPanel>

                <TabPanel value={tabValue} index={3}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Consejos prácticos
                      </Typography>
                      <List>
                        {step.tips.map((tip, i) => (
                          <ListItem key={i}>
                            <ListItemIcon>
                              <Lightbulb fontSize="small" color="warning" />
                            </ListItemIcon>
                            <ListItemText primary={tip} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </TabPanel>
              </Paper>

              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={index === steps.length - 1}
                  >
                    {index === steps.length - 1 ? "Finalizar" : "Siguiente"}
                  </Button>
                  <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Anterior
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            ¡Proceso completado!
          </Typography>
          <Typography paragraph>
            Ha completado el recorrido por el proceso completo de venta inmobiliaria, desde la captación inicial del
            lead hasta el cierre exitoso y seguimiento post-venta.
          </Typography>
          <Button onClick={handleReset} variant="outlined" sx={{ mt: 1, mr: 1 }}>
            Reiniciar el proceso
          </Button>
        </Paper>
      )}
    </Box>
  )
}
