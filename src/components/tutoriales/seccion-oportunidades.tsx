import { Typography, List, ListItem, ListItemText } from "@mui/material"
import { ManualImage } from "./manual-image"

export function SeccionOportunidades() {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Gestión de Oportunidades
      </Typography>

      <Typography variant="body1" paragraph>
        El módulo de Oportunidades le permite dar seguimiento a negociaciones en curso con clientes potenciales
        interesados en propiedades específicas.
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Tablero Kanban de oportunidades
      </Typography>

      <Typography variant="body1" paragraph>
        El sistema presenta las oportunidades en un tablero Kanban que permite visualizar fácilmente su progreso a
        través de las diferentes etapas del proceso de venta:
      </Typography>

      <List>
        <ListItem>
          <ListItemText
            primary="Contacto inicial"
            secondary="Primera interacción con el cliente interesado en una propiedad"
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Calificación" secondary="Evaluación del interés y capacidad del cliente" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Visita programada" secondary="Cliente ha agendado una visita a la propiedad" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Visita realizada" secondary="Cliente ha visitado la propiedad" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Negociación" secondary="Discusión de condiciones y precio" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Oferta presentada" secondary="Se ha formalizado una oferta" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Cierre" secondary="Negociación finalizada con éxito" />
        </ListItem>
      </List>

      <ManualImage
        src="/images/tutoriales/opportunity-kanban.png"
        alt="Tablero Kanban de oportunidades"
        description="Visualización de oportunidades organizadas por etapas en el proceso de venta."
      />

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Gestión de actividades
      </Typography>

      <Typography variant="body1" paragraph>
        Para cada oportunidad, puede registrar y programar diferentes tipos de actividades:
      </Typography>

      <List>
        <ListItem>
          <ListItemText
            primary="Llamadas de seguimiento"
            secondary="Registro de llamadas realizadas y programación de próximos contactos"
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Visitas a propiedades" secondary="Programación y registro de visitas a inmuebles" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Reuniones" secondary="Agendamiento de reuniones presenciales o virtuales" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Envío de documentación" secondary="Registro de documentos enviados al cliente" />
        </ListItem>
      </List>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Análisis de probabilidad
      </Typography>

      <Typography variant="body1" paragraph>
        El sistema calcula automáticamente la probabilidad de cierre de cada oportunidad basándose en factores como:
      </Typography>

      <List>
        <ListItem>
          <ListItemText
            primary="Etapa actual en el proceso"
            secondary="Las etapas más avanzadas tienen mayor probabilidad"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Nivel de interacción"
            secondary="Frecuencia y calidad de las interacciones con el cliente"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Tiempo en la etapa actual"
            secondary="Oportunidades que avanzan rápidamente tienen mayor probabilidad"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Historial del cliente"
            secondary="Comportamiento previo del cliente en otras oportunidades"
          />
        </ListItem>
      </List>
    </>
  )
}
