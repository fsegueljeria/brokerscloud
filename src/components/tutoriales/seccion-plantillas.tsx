import { Typography, List, ListItem, ListItemText } from "@mui/material"
import { ManualImage } from "./manual-image"

export function SeccionPlantillas() {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Plantillas de Mensajes
      </Typography>

      <Typography variant="body1" paragraph>
        El módulo de Plantillas le permite crear y gestionar mensajes predefinidos para comunicarse eficientemente con
        clientes y prospectos.
      </Typography>

      <ManualImage
        src="/images/tutoriales/message-templates-example.png"
        alt="Plantillas de Mensajes"
        description="Interfaz de gestión de plantillas de mensajes con categorías y editor de contenido."
      />

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Tipos de plantillas
      </Typography>

      <Typography variant="body1" paragraph>
        El sistema incluye diferentes tipos de plantillas para diversos canales de comunicación:
      </Typography>

      <List>
        <ListItem>
          <ListItemText primary="Email" secondary="Mensajes formales para comunicaciones por correo electrónico" />
        </ListItem>
        <ListItem>
          <ListItemText primary="SMS" secondary="Mensajes cortos para comunicaciones por mensaje de texto" />
        </ListItem>
        <ListItem>
          <ListItemText primary="WhatsApp" secondary="Mensajes para comunicaciones por WhatsApp" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Redes sociales" secondary="Mensajes para comunicaciones por redes sociales" />
        </ListItem>
      </List>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Creación de plantillas
      </Typography>

      <Typography variant="body1" paragraph>
        Para crear una nueva plantilla de mensaje:
      </Typography>

      <List sx={{ ml: 2 }}>
        <ListItem>
          <ListItemText primary="1. Acceda al módulo de Plantillas desde el menú principal." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. Haga clic en el botón 'Nueva Plantilla'." />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. Seleccione el tipo de plantilla (Email, SMS, WhatsApp, etc.)." />
        </ListItem>
        <ListItem>
          <ListItemText primary="4. Asigne un nombre descriptivo a la plantilla." />
        </ListItem>
        <ListItem>
          <ListItemText primary="5. Seleccione la categoría a la que pertenece." />
        </ListItem>
        <ListItem>
          <ListItemText primary="6. Redacte el contenido del mensaje." />
        </ListItem>
        <ListItem>
          <ListItemText primary="7. Utilice variables dinámicas si es necesario (ej. {nombre_cliente}, {propiedad})." />
        </ListItem>
        <ListItem>
          <ListItemText primary="8. Haga clic en 'Guardar' para crear la plantilla." />
        </ListItem>
      </List>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Uso de plantillas
      </Typography>

      <Typography variant="body1" paragraph>
        Para utilizar una plantilla en una comunicación:
      </Typography>

      <List sx={{ ml: 2 }}>
        <ListItem>
          <ListItemText primary="1. Desde cualquier módulo que permita enviar mensajes (Leads, Oportunidades, etc.)." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. Haga clic en 'Usar plantilla'." />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. Seleccione la categoría y la plantilla deseada." />
        </ListItem>
        <ListItem>
          <ListItemText primary="4. El sistema cargará automáticamente el contenido de la plantilla." />
        </ListItem>
        <ListItem>
          <ListItemText primary="5. Las variables dinámicas se completarán automáticamente con la información del destinatario." />
        </ListItem>
        <ListItem>
          <ListItemText primary="6. Personalice el contenido si es necesario." />
        </ListItem>
        <ListItem>
          <ListItemText primary="7. Envíe el mensaje." />
        </ListItem>
      </List>
    </>
  )
}
