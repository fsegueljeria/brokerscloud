"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Mail, MessageSquare, Calendar, Bell, UserCheck, Home, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"

interface MessageTemplate {
  id: string
  title: string
  body: string
  channel: "email" | "sms" | "whatsapp" | "all"
  tags: string[]
}

export function MessageTemplates() {
  const { toast } = useToast()
  const { isMobile } = useMobile()
  const [activeTab, setActiveTab] = useState("contacto-inicial")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copiado al portapapeles",
      description: "El mensaje ha sido copiado correctamente",
    })
  }

  const messageTemplates: Record<string, MessageTemplate[]> = {
    "contacto-inicial": [
      {
        id: "primer-contacto-lead",
        title: "Respuesta a solicitud de información",
        body: "Hola [Nombre],\n\nGracias por tu interés en la propiedad [Título de Propiedad]. Mi nombre es [Nombre del Agente] y seré tu asesor inmobiliario personal.\n\nMe gustaría conocer más sobre lo que estás buscando para poder ayudarte mejor. ¿Tienes alguna preferencia específica en cuanto a ubicación, tamaño o presupuesto?\n\nEstoy disponible para resolver cualquier duda que tengas sobre esta propiedad o mostrarte otras opciones similares que podrían interesarte.\n\nPuedes contactarme directamente a este número o agendar una llamada en el horario que te resulte más conveniente.\n\nSaludos cordiales,\n[Nombre del Agente]\n[Teléfono]\n[Correo electrónico]",
        channel: "all",
        tags: ["nuevo lead", "información", "presentación"],
      },
      {
        id: "bienvenida-portal",
        title: "Bienvenida desde portal inmobiliario",
        body: "Hola [Nombre],\n\nHe recibido tu consulta desde Portal Inmobiliario sobre la propiedad [Título/Dirección].\n\nSoy [Nombre del Agente] de [Nombre de la Inmobiliaria] y estaré encantado/a de brindarte toda la información que necesites sobre esta propiedad.\n\n¿Te gustaría coordinar una visita para conocerla personalmente? Tengo disponibilidad esta semana y podemos adaptarnos a tu horario.\n\nQuedo atento a tus comentarios.\n\nSaludos cordiales,\n[Nombre del Agente]",
        channel: "email",
        tags: ["portal inmobiliario", "bienvenida", "visita"],
      },
      {
        id: "contacto-whatsapp",
        title: "Primer contacto por WhatsApp",
        body: "Hola [Nombre], soy [Nombre del Agente] de [Inmobiliaria]. Recibí tu consulta sobre la propiedad en [Dirección/Zona]. Esta propiedad cuenta con [características destacadas]. ¿Te gustaría recibir más información o coordinar una visita? Estoy a tu disposición para resolver cualquier duda. 🏠✨",
        channel: "whatsapp",
        tags: ["whatsapp", "breve", "informal"],
      },
      {
        id: "respuesta-rapida-sms",
        title: "Respuesta rápida por SMS",
        body: "Hola [Nombre], gracias por tu interés en la propiedad de [Dirección]. Soy [Nombre], tu asesor inmobiliario. ¿Podemos hablar hoy para darte más detalles? Llámame al [Teléfono] o responde este mensaje para coordinar. [Nombre de la Inmobiliaria]",
        channel: "sms",
        tags: ["sms", "corto", "acción rápida"],
      },
    ],
    seguimiento: [
      {
        id: "seguimiento-post-visita",
        title: "Seguimiento después de visita",
        body: "Estimado/a [Nombre],\n\nEspero que estés bien. Quería agradecerte por tu visita a la propiedad en [Dirección] el pasado [Día de la visita].\n\nMe gustaría saber tus impresiones sobre la propiedad y si tienes alguna pregunta adicional que haya surgido después de la visita.\n\nSi estás interesado/a, podemos conversar sobre los siguientes pasos o, si esta propiedad no cumplió completamente con tus expectativas, puedo mostrarte otras opciones que podrían ajustarse mejor a lo que buscas.\n\nQuedo atento a tus comentarios.\n\nSaludos cordiales,\n[Nombre del Agente]\n[Teléfono]",
        channel: "email",
        tags: ["post-visita", "feedback", "siguiente paso"],
      },
      {
        id: "seguimiento-sin-respuesta",
        title: "Seguimiento sin respuesta previa",
        body: "Hola [Nombre],\n\nEspero que te encuentres bien. Hace unos días te envié información sobre la propiedad en [Dirección/Zona] que consultaste, y quería saber si tuviste oportunidad de revisarla.\n\nSigo a tu disposición para resolver cualquier duda que tengas o para mostrarte la propiedad si estás interesado/a.\n\nTambién quería comentarte que tenemos algunas propiedades nuevas que podrían interesarte, basadas en tu búsqueda inicial.\n\n¿Te gustaría que te envíe esta información adicional?\n\nSaludos cordiales,\n[Nombre del Agente]",
        channel: "all",
        tags: ["recordatorio", "sin respuesta", "nuevas opciones"],
      },
      {
        id: "seguimiento-whatsapp",
        title: "Seguimiento breve por WhatsApp",
        body: "Hola [Nombre], soy [Nombre del Agente] de [Inmobiliaria]. ¿Qué tal todo? Quería saber si has tenido tiempo de revisar la información que te envié sobre la propiedad en [Dirección]. Estoy disponible para resolver cualquier duda o mostrarte más opciones si lo prefieres. ¡Que tengas un excelente día! 👋",
        channel: "whatsapp",
        tags: ["whatsapp", "informal", "breve"],
      },
      {
        id: "seguimiento-interes",
        title: "Seguimiento a cliente interesado",
        body: "Estimado/a [Nombre],\n\nEspero que estés bien. Quería hacer un seguimiento sobre tu interés en la propiedad [Dirección/Referencia] que vimos la semana pasada.\n\nComo comentamos, esta propiedad tiene bastante demanda y quería asegurarme de que tengas toda la información necesaria para tomar una decisión.\n\nSi estás considerando hacer una oferta, estaré encantado/a de asesorarte sobre el proceso y ayudarte a preparar una propuesta competitiva.\n\n¿Te gustaría que agendemos una llamada para discutir los detalles?\n\nQuedo atento a tus comentarios.\n\nSaludos cordiales,\n[Nombre del Agente]",
        channel: "email",
        tags: ["cliente interesado", "oferta", "asesoramiento"],
      },
    ],
    citas: [
      {
        id: "confirmacion-visita",
        title: "Confirmación de visita",
        body: "Estimado/a [Nombre],\n\nConfirmo nuestra visita a la propiedad ubicada en [Dirección completa] para el día [Fecha] a las [Hora].\n\nNos encontraremos directamente en la propiedad. Te comparto la ubicación exacta: [Link de Google Maps]\n\nAlgunos detalles prácticos:\n- La visita durará aproximadamente 30-45 minutos\n- Hay estacionamiento disponible en [detalles de estacionamiento]\n- Te recomiendo llegar 5 minutos antes para comenzar puntualmente\n\nSi necesitas reagendar o tienes alguna pregunta antes de la visita, no dudes en contactarme.\n\n¡Nos vemos pronto!\n\nSaludos cordiales,\n[Nombre del Agente]\n[Teléfono móvil para contacto directo]",
        channel: "email",
        tags: ["confirmación", "visita", "detalles prácticos"],
      },
      {
        id: "recordatorio-visita",
        title: "Recordatorio de visita (día anterior)",
        body: "Hola [Nombre],\n\nEspero que estés bien. Te escribo para recordarte nuestra visita programada para mañana [Fecha] a las [Hora] en la propiedad ubicada en [Dirección].\n\nEl pronóstico del tiempo indica [información del clima si es relevante], así que te recomiendo [sugerencia según el clima].\n\nPor favor, confírmame si mantenemos la cita según lo acordado o si necesitas hacer algún cambio.\n\n¡Nos vemos mañana!\n\nSaludos cordiales,\n[Nombre del Agente]\n[Teléfono]",
        channel: "all",
        tags: ["recordatorio", "visita", "confirmación"],
      },
      {
        id: "recordatorio-whatsapp",
        title: "Recordatorio por WhatsApp (mismo día)",
        body: "Hola [Nombre], te recuerdo nuestra visita de hoy a las [Hora] en [Dirección]. Estaré esperándote en la entrada principal. Si necesitas indicaciones o tienes algún contratiempo, escríbeme o llámame al [Teléfono]. ¡Hasta pronto! 🏠⏰",
        channel: "whatsapp",
        tags: ["recordatorio", "mismo día", "whatsapp"],
      },
      {
        id: "reagendamiento",
        title: "Propuesta de reagendamiento",
        body: "Estimado/a [Nombre],\n\nEntiendo que no podrás asistir a nuestra visita programada para [Fecha y hora original]. No hay problema, podemos reagendarla para un momento más conveniente.\n\nTe propongo las siguientes alternativas:\n- [Fecha y hora opción 1]\n- [Fecha y hora opción 2]\n- [Fecha y hora opción 3]\n\nPor favor, indícame cuál de estas opciones te funciona mejor o sugiéreme otro horario que se adapte a tu agenda.\n\nQuedo atento a tu respuesta.\n\nSaludos cordiales,\n[Nombre del Agente]",
        channel: "all",
        tags: ["reagendamiento", "opciones", "flexibilidad"],
      },
    ],
    actualizaciones: [
      {
        id: "actualizacion-precio",
        title: "Actualización de precio",
        body: "Estimado/a [Nombre],\n\nEspero que este mensaje te encuentre bien. Te escribo porque ha habido una actualización importante en la propiedad de [Dirección] que visitaste recientemente.\n\nEl propietario ha decidido ajustar el precio de venta de $[Precio anterior] a $[Precio nuevo], lo que representa una reducción del [X]%.\n\nDado el interés que mostraste en esta propiedad, quería informarte de inmediato sobre esta oportunidad, ya que ahora podría ajustarse mejor a tu presupuesto.\n\nSi te interesa retomar la conversación sobre esta propiedad con las nuevas condiciones, estaré encantado/a de atenderte y resolver cualquier duda adicional.\n\nQuedo atento a tus comentarios.\n\nSaludos cordiales,\n[Nombre del Agente]",
        channel: "email",
        tags: ["actualización", "precio", "oportunidad"],
      },
      {
        id: "nueva-propiedad",
        title: "Nueva propiedad según intereses",
        body: "Hola [Nombre],\n\nEspero que estés bien. Te escribo porque acaba de ingresar a nuestro portafolio una propiedad que coincide con los criterios que me comentaste en nuestra última conversación.\n\nSe trata de un/a [tipo de propiedad] de [X] m² en [Zona/Barrio], con [N°] dormitorios y [N°] baños, a un precio de $[Precio].\n\nAlgunas características destacadas:\n- [Característica destacada 1]\n- [Característica destacada 2]\n- [Característica destacada 3]\n\nAdjunto encontrarás algunas fotos preliminares. Esta propiedad aún no está publicada en nuestro sitio web, por lo que tienes la oportunidad de visitarla antes que otros interesados.\n\n¿Te gustaría agendar una visita para conocerla?\n\nSaludos cordiales,\n[Nombre del Agente]",
        channel: "email",
        tags: ["nueva propiedad", "exclusividad", "visita"],
      },
      {
        id: "actualizacion-estado",
        title: "Actualización de estado de propiedad",
        body: "Estimado/a [Nombre],\n\nTe escribo para informarte que la propiedad ubicada en [Dirección] que visitamos el [Fecha de visita] ha cambiado su estado a [Nuevo estado: Reservada/Con oferta/etc.].\n\nEsto significa que [explicación breve de lo que implica este estado].\n\nSi aún estás interesado/a en esta propiedad, te recomendaría [acción recomendada según el caso: actuar rápido/hacer una oferta competitiva/etc.].\n\nAlternativamente, si prefieres explorar otras opciones similares, tengo algunas propiedades que podrían interesarte.\n\nQuedo atento a tus comentarios para asesorarte de la mejor manera posible.\n\nSaludos cordiales,\n[Nombre del Agente]",
        channel: "all",
        tags: ["actualización", "estado", "urgencia"],
      },
      {
        id: "actualizacion-whatsapp",
        title: "Actualización rápida por WhatsApp",
        body: "Hola [Nombre], tengo novedades sobre la propiedad en [Dirección/Zona] que te interesó: [breve descripción de la actualización: bajó de precio/se agregaron nuevas fotos/etc.]. ¿Te gustaría que te envíe los detalles actualizados? Estoy disponible si quieres conversar sobre esto. 🏠📊",
        channel: "whatsapp",
        tags: ["actualización", "whatsapp", "breve"],
      },
    ],
    cierre: [
      {
        id: "oferta-aceptada",
        title: "Confirmación de oferta aceptada",
        body: "Estimado/a [Nombre],\n\n¡Tengo excelentes noticias! Tu oferta por la propiedad ubicada en [Dirección] ha sido ACEPTADA por el propietario.\n\nFelicitaciones por este importante paso. Ahora comenzaremos con el proceso de [siguiente paso: firma de promesa/escrituración/etc.].\n\nLos próximos pasos serán:\n\n1. [Descripción del primer paso]\n2. [Descripción del segundo paso]\n3. [Descripción del tercer paso]\n\nNecesitaremos que prepares la siguiente documentación:\n- [Documento 1]\n- [Documento 2]\n- [Documento 3]\n\nPropongo que agendemos una reunión para el [fecha y hora sugerida] para revisar todos los detalles y resolver cualquier duda que tengas sobre el proceso.\n\n¡Nuevamente felicitaciones por tu nueva propiedad!\n\nSaludos cordiales,\n[Nombre del Agente]",
        channel: "email",
        tags: ["oferta aceptada", "felicitación", "próximos pasos"],
      },
      {
        id: "contraoferta",
        title: "Comunicación de contraoferta",
        body: "Estimado/a [Nombre],\n\nEspero que estés bien. Te escribo respecto a la oferta que presentaste por la propiedad en [Dirección].\n\nEl propietario ha revisado tu propuesta y, aunque está interesado, ha presentado una contraoferta con las siguientes condiciones:\n\n- Precio: $[Monto contraoferta]\n- [Otra condición modificada]\n- [Otra condición modificada]\n\nEl resto de las condiciones se mantienen según lo propuesto por ti.\n\nEl propietario está abierto a cerrar el trato con estas modificaciones y espera tu respuesta hasta el [Fecha límite].\n\nPor favor, hazme saber tu decisión o si te gustaría que conversemos sobre estrategias de negociación.\n\nQuedo atento a tus comentarios.\n\nSaludos cordiales,\n[Nombre del Agente]",
        channel: "email",
        tags: ["contraoferta", "negociación", "decisión"],
      },
      {
        id: "agradecimiento-proceso",
        title: "Agradecimiento por proceso completado",
        body: "Estimado/a [Nombre],\n\n¡Felicitaciones por la adquisición de tu nueva propiedad! Ha sido un placer acompañarte durante todo este proceso.\n\nQuiero agradecerte sinceramente por la confianza depositada en mí y en [Nombre de la Inmobiliaria] para una decisión tan importante en tu vida.\n\nComo comentamos, seguiré disponible para cualquier consulta que puedas tener sobre tu nueva propiedad o para asistirte en cualquier necesidad relacionada con ella en el futuro.\n\nTambién quería mencionarte que gran parte de mi trabajo se basa en recomendaciones, por lo que si conoces a alguien que esté buscando comprar, vender o arrendar una propiedad, te agradecería mucho tu referencia.\n\nTe deseo mucha felicidad en tu nuevo hogar.\n\nSaludos cordiales,\n[Nombre del Agente]\n[Teléfono]\n[Correo electrónico]",
        channel: "email",
        tags: ["agradecimiento", "cierre", "referidos"],
      },
      {
        id: "cierre-whatsapp",
        title: "Confirmación de cierre por WhatsApp",
        body: "¡Excelentes noticias, [Nombre]! 🎉 La oferta ha sido aceptada y estamos listos para avanzar con el proceso de [escrituración/firma de promesa]. Te enviaré por correo todos los detalles de los próximos pasos. ¡Felicitaciones por tu nueva propiedad! 🏠🔑",
        channel: "whatsapp",
        tags: ["cierre", "celebración", "whatsapp"],
      },
    ],
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <MessageSquare className="h-4 w-4" />
      case "whatsapp":
        return <MessageSquare className="h-4 w-4 text-green-500" />
      default:
        return <Mail className="h-4 w-4" />
    }
  }

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "contacto-inicial":
        return <UserCheck className="h-4 w-4 mr-2" />
      case "seguimiento":
        return <Bell className="h-4 w-4 mr-2" />
      case "citas":
        return <Calendar className="h-4 w-4 mr-2" />
      case "actualizaciones":
        return <Home className="h-4 w-4 mr-2" />
      case "cierre":
        return <CheckCircle2 className="h-4 w-4 mr-2" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-6">
      <Tabs defaultValue="contacto-inicial" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 overflow-x-auto flex w-full justify-start sm:justify-center">
          <TabsTrigger value="contacto-inicial">
            {!isMobile && getTabIcon("contacto-inicial")}
            {isMobile ? "Inicial" : "Contacto Inicial"}
          </TabsTrigger>
          <TabsTrigger value="seguimiento">
            {!isMobile && getTabIcon("seguimiento")}
            Seguimiento
          </TabsTrigger>
          <TabsTrigger value="citas">
            {!isMobile && getTabIcon("citas")}
            Citas
          </TabsTrigger>
          <TabsTrigger value="actualizaciones">
            {!isMobile && getTabIcon("actualizaciones")}
            {isMobile ? "Updates" : "Actualizaciones"}
          </TabsTrigger>
          <TabsTrigger value="cierre">
            {!isMobile && getTabIcon("cierre")}
            Cierre
          </TabsTrigger>
        </TabsList>

        {Object.entries(messageTemplates).map(([category, templates]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <Card key={template.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getChannelIcon(template.channel)}
                        <span className="capitalize">{template.channel === "all" ? "Todos" : template.channel}</span>
                      </Badge>
                    </div>
                    <CardDescription>
                      {template.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="mr-1 mb-1">
                          {tag}
                        </Badge>
                      ))}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-3 rounded-md text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
                      {template.body}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => copyToClipboard(template.body)}
                    >
                      <Copy className="h-4 w-4 mr-2" /> Copiar mensaje
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
