"use client"

import { useState } from "react"
import { Copy } from "lucide-react"

interface MessageTemplate {
  id: string
  title: string
  body: string
  category: string
}

export function MessageTemplatesSimple() {
  const [selectedCategory, setSelectedCategory] = useState("contacto-inicial")
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const messageTemplates: MessageTemplate[] = [
    // Contacto Inicial
    {
      id: "primer-contacto-lead",
      title: "Respuesta a solicitud de información",
      body: "Hola [Nombre],\n\nGracias por tu interés en la propiedad [Título de Propiedad]. Mi nombre es [Nombre del Agente] y seré tu asesor inmobiliario personal.\n\nMe gustaría conocer más sobre lo que estás buscando para poder ayudarte mejor. ¿Tienes alguna preferencia específica en cuanto a ubicación, tamaño o presupuesto?\n\nEstoy disponible para resolver cualquier duda que tengas sobre esta propiedad o mostrarte otras opciones similares que podrían interesarte.\n\nPuedes contactarme directamente a este número o agendar una llamada en el horario que te resulte más conveniente.\n\nSaludos cordiales,\n[Nombre del Agente]\n[Teléfono]\n[Correo electrónico]",
      category: "contacto-inicial",
    },
    {
      id: "bienvenida-portal",
      title: "Bienvenida desde portal inmobiliario",
      body: "Hola [Nombre],\n\nHe recibido tu consulta desde Portal Inmobiliario sobre la propiedad [Título/Dirección].\n\nSoy [Nombre del Agente] de [Nombre de la Inmobiliaria] y estaré encantado/a de brindarte toda la información que necesites sobre esta propiedad.\n\n¿Te gustaría coordinar una visita para conocerla personalmente? Tengo disponibilidad esta semana y podemos adaptarnos a tu horario.\n\nQuedo atento a tus comentarios.\n\nSaludos cordiales,\n[Nombre del Agente]",
      category: "contacto-inicial",
    },
    {
      id: "contacto-whatsapp",
      title: "Primer contacto por WhatsApp",
      body: "Hola [Nombre], soy [Nombre del Agente] de [Inmobiliaria]. Recibí tu consulta sobre la propiedad en [Dirección/Zona]. Esta propiedad cuenta con [características destacadas]. ¿Te gustaría recibir más información o coordinar una visita? Estoy a tu disposición para resolver cualquier duda. 🏠✨",
      category: "contacto-inicial",
    },

    // Seguimiento
    {
      id: "seguimiento-post-visita",
      title: "Seguimiento después de visita",
      body: "Estimado/a [Nombre],\n\nEspero que estés bien. Quería agradecerte por tu visita a la propiedad en [Dirección] el pasado [Día de la visita].\n\nMe gustaría saber tus impresiones sobre la propiedad y si tienes alguna pregunta adicional que haya surgido después de la visita.\n\nSi estás interesado/a, podemos conversar sobre los siguientes pasos o, si esta propiedad no cumplió completamente con tus expectativas, puedo mostrarte otras opciones que podrían ajustarse mejor a lo que buscas.\n\nQuedo atento a tus comentarios.\n\nSaludos cordiales,\n[Nombre del Agente]\n[Teléfono]",
      category: "seguimiento",
    },
    {
      id: "seguimiento-sin-respuesta",
      title: "Seguimiento sin respuesta previa",
      body: "Hola [Nombre],\n\nEspero que te encuentres bien. Hace unos días te envié información sobre la propiedad en [Dirección/Zona] que consultaste, y quería saber si tuviste oportunidad de revisarla.\n\nSigo a tu disposición para resolver cualquier duda que tengas o para mostrarte la propiedad si estás interesado/a.\n\nTambién quería comentarte que tenemos algunas propiedades nuevas que podrían interesarte, basadas en tu búsqueda inicial.\n\n¿Te gustaría que te envíe esta información adicional?\n\nSaludos cordiales,\n[Nombre del Agente]",
      category: "seguimiento",
    },

    // Citas
    {
      id: "confirmacion-visita",
      title: "Confirmación de visita",
      body: "Estimado/a [Nombre],\n\nConfirmo nuestra visita a la propiedad ubicada en [Dirección completa] para el día [Fecha] a las [Hora].\n\nNos encontraremos directamente en la propiedad. Te comparto la ubicación exacta: [Link de Google Maps]\n\nAlgunos detalles prácticos:\n- La visita durará aproximadamente 30-45 minutos\n- Hay estacionamiento disponible en [detalles de estacionamiento]\n- Te recomiendo llegar 5 minutos antes para comenzar puntualmente\n\nSi necesitas reagendar o tienes alguna pregunta antes de la visita, no dudes en contactarme.\n\n¡Nos vemos pronto!\n\nSaludos cordiales,\n[Nombre del Agente]\n[Teléfono móvil para contacto directo]",
      category: "citas",
    },
    {
      id: "recordatorio-visita",
      title: "Recordatorio de visita (día anterior)",
      body: "Hola [Nombre],\n\nEspero que estés bien. Te escribo para recordarte nuestra visita programada para mañana [Fecha] a las [Hora] en la propiedad ubicada en [Dirección].\n\nEl pronóstico del tiempo indica [información del clima si es relevante], así que te recomiendo [sugerencia según el clima].\n\nPor favor, confírmame si mantenemos la cita según lo acordado o si necesitas hacer algún cambio.\n\n¡Nos vemos mañana!\n\nSaludos cordiales,\n[Nombre del Agente]\n[Teléfono]",
      category: "citas",
    },

    // Actualizaciones
    {
      id: "actualizacion-precio",
      title: "Actualización de precio",
      body: "Estimado/a [Nombre],\n\nEspero que este mensaje te encuentre bien. Te escribo porque ha habido una actualización importante en la propiedad de [Dirección] que visitaste recientemente.\n\nEl propietario ha decidido ajustar el precio de venta de $[Precio anterior] a $[Precio nuevo], lo que representa una reducción del [X]%.\n\nDado el interés que mostraste en esta propiedad, quería informarte de inmediato sobre esta oportunidad, ya que ahora podría ajustarse mejor a tu presupuesto.\n\nSi te interesa retomar la conversación sobre esta propiedad con las nuevas condiciones, estaré encantado/a de atenderte y resolver cualquier duda adicional.\n\nQuedo atento a tus comentarios.\n\nSaludos cordiales,\n[Nombre del Agente]",
      category: "actualizaciones",
    },
    {
      id: "nueva-propiedad",
      title: "Nueva propiedad según intereses",
      body: "Hola [Nombre],\n\nEspero que estés bien. Te escribo porque acaba de ingresar a nuestro portafolio una propiedad que coincide con los criterios que me comentaste en nuestra última conversación.\n\nSe trata de un/a [tipo de propiedad] de [X] m² en [Zona/Barrio], con [N°] dormitorios y [N°] baños, a un precio de $[Precio].\n\nAlgunas características destacadas:\n- [Característica destacada 1]\n- [Característica destacada 2]\n- [Característica destacada 3]\n\nAdjunto encontrarás algunas fotos preliminares. Esta propiedad aún no está publicada en nuestro sitio web, por lo que tienes la oportunidad de visitarla antes que otros interesados.\n\n¿Te gustaría agendar una visita para conocerla?\n\nSaludos cordiales,\n[Nombre del Agente]",
      category: "actualizaciones",
    },

    // Cierre
    {
      id: "oferta-aceptada",
      title: "Confirmación de oferta aceptada",
      body: "Estimado/a [Nombre],\n\n¡Tengo excelentes noticias! Tu oferta por la propiedad ubicada en [Dirección] ha sido ACEPTADA por el propietario.\n\nFelicitaciones por este importante paso. Ahora comenzaremos con el proceso de [siguiente paso: firma de promesa/escrituración/etc.].\n\nLos próximos pasos serán:\n\n1. [Descripción del primer paso]\n2. [Descripción del segundo paso]\n3. [Descripción del tercer paso]\n\nNecesitaremos que prepares la siguiente documentación:\n- [Documento 1]\n- [Documento 2]\n- [Documento 3]\n\nPropongo que agendemos una reunión para el [fecha y hora sugerida] para revisar todos los detalles y resolver cualquier duda que tengas sobre el proceso.\n\n¡Nuevamente felicitaciones por tu nueva propiedad!\n\nSaludos cordiales,\n[Nombre del Agente]",
      category: "cierre",
    },
    {
      id: "agradecimiento-proceso",
      title: "Agradecimiento por proceso completado",
      body: "Estimado/a [Nombre],\n\n¡Felicitaciones por la adquisición de tu nueva propiedad! Ha sido un placer acompañarte durante todo este proceso.\n\nQuiero agradecerte sinceramente por la confianza depositada en mí y en [Nombre de la Inmobiliaria] para una decisión tan importante en tu vida.\n\nComo comentamos, seguiré disponible para cualquier consulta que puedas tener sobre tu nueva propiedad o para asistirte en cualquier necesidad relacionada con ella en el futuro.\n\nTambién quería mencionarte que gran parte de mi trabajo se basa en recomendaciones, por lo que si conoces a alguien que esté buscando comprar, vender o arrendar una propiedad, te agradecería mucho tu referencia.\n\nTe deseo mucha felicidad en tu nuevo hogar.\n\nSaludos cordiales,\n[Nombre del Agente]\n[Teléfono]\n[Correo electrónico]",
      category: "cierre",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex overflow-x-auto pb-2 mb-4 gap-2">
        <button
          onClick={() => setSelectedCategory("contacto-inicial")}
          className={`px-4 py-2 whitespace-nowrap rounded-md ${
            selectedCategory === "contacto-inicial"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          Contacto Inicial
        </button>
        <button
          onClick={() => setSelectedCategory("seguimiento")}
          className={`px-4 py-2 whitespace-nowrap rounded-md ${
            selectedCategory === "seguimiento"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          Seguimiento
        </button>
        <button
          onClick={() => setSelectedCategory("citas")}
          className={`px-4 py-2 whitespace-nowrap rounded-md ${
            selectedCategory === "citas"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          Citas
        </button>
        <button
          onClick={() => setSelectedCategory("actualizaciones")}
          className={`px-4 py-2 whitespace-nowrap rounded-md ${
            selectedCategory === "actualizaciones"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          Actualizaciones
        </button>
        <button
          onClick={() => setSelectedCategory("cierre")}
          className={`px-4 py-2 whitespace-nowrap rounded-md ${
            selectedCategory === "cierre"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          Cierre
        </button>
      </div>

      <div className="space-y-6">
        {messageTemplates
          .filter((template) => template.category === selectedCategory)
          .map((template) => (
            <div key={template.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-lg">{template.title}</h3>
                <button
                  onClick={() => copyToClipboard(template.body, template.id)}
                  className="flex items-center text-sm text-primary hover:text-primary/80"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  {copied === template.id ? "¡Copiado!" : "Copiar"}
                </button>
              </div>
              <div className="bg-muted p-3 rounded-md text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
                {template.body}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
