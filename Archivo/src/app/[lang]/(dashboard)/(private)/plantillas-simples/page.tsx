import { MessageTemplatesSimple } from "@/components/message-templates-simple"

export default function PlantillasSimplePage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Plantillas de Mensajes (Versión Simple)</h1>
      <p className="text-muted-foreground mb-6">
        Ejemplos de mensajes profesionales para diferentes situaciones con clientes y prospectos. Esta versión es más
        ligera y funciona en todos los navegadores.
      </p>
      <MessageTemplatesSimple />
    </div>
  )
}
