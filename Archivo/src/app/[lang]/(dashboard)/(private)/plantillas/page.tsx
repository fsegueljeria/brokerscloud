import { MessageTemplates } from "@/components/message-templates"

export default function PlantillasPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Plantillas de Mensajes</h1>
      <MessageTemplates />
    </div>
  )
}
