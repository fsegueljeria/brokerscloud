// Datos simulados para agentes
const mockAgents  = {
  1: {
    id: 1,
    name: "Ana Rodríguez",
    email: "ana.rodriguez@inmobiliaria.com",
    phone: "+56 9 1234 5678",
    role: "AGENT",
    active: true,
    organizationId: 1,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-01-15T10:30:00Z",
  },
  2: {
    id: 2,
    name: "Carlos Mendoza",
    email: "carlos.mendoza@inmobiliaria.com",
    phone: "+56 9 8765 4321",
    role: "AGENT",
    active: true,
    organizationId: 1,
    createdAt: "2023-02-10T14:45:00Z",
    updatedAt: "2023-02-10T14:45:00Z",
  },
  3: {
    id: 3,
    name: "María González",
    email: "maria.gonzalez@inmobiliaria.com",
    phone: "+56 9 5555 6666",
    role: "AGENT",
    active: true,
    organizationId: 1,
    createdAt: "2023-03-05T09:15:00Z",
    updatedAt: "2023-03-05T09:15:00Z",
  },
  4: {
    id: 4,
    name: "Javier Pérez",
    email: "javier.perez@inmobiliaria.com",
    phone: "+56 9 7777 8888",
    role: "AGENT",
    active: true,
    organizationId: 1,
    createdAt: "2023-04-20T11:30:00Z",
    updatedAt: "2023-04-20T11:30:00Z",
  },
  5: {
    id: 5,
    name: "Valentina Torres",
    email: "valentina.torres@inmobiliaria.com",
    phone: "+56 9 9999 0000",
    role: "AGENT",
    active: false,
    organizationId: 1,
    createdAt: "2023-05-12T16:20:00Z",
    updatedAt: "2023-05-12T16:20:00Z",
  },
}

// Clase de servicio para gestionar agentes
class AgentService {
  // Obtener todos los agentes
  async getAgents() {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 300))
    return Object.values(mockAgents)
  }

  // Obtener un agente por su ID
  async getAgentById(id: number) {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockAgents[id] || null
  }

  // Obtener agentes activos
  async getActiveAgents() {
    // Simulamos una llamada asíncrona
    await new Promise((resolve) => setTimeout(resolve, 300))
    return Object.values(mockAgents).filter((agent) => agent.active)
  }
}

// Exportar una instancia del servicio
export const agentService = new AgentService()
