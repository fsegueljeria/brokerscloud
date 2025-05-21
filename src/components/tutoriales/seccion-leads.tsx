import { Typography, List, ListItem, ListItemText } from "@mui/material"
import { ManualImage } from "./manual-image"

export function SeccionLeads() {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Gestión de Leads
      </Typography>

      <Typography variant="body1" paragraph>
        El módulo de Gestión de Leads le permite capturar y dar seguimiento a contactos potenciales interesados en sus
        propiedades.
      </Typography>

      <ManualImage
        src="/images/tutoriales/filled-crm-lead-form.png"
        alt="Formulario de Lead"
        description="Formulario de registro de un nuevo lead con los campos de información personal y de contacto."
      />

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Captura de leads
      </Typography>

      <Typography variant="body1" paragraph>
        El sistema permite capturar leads de diferentes fuentes:
      </Typography>

      <List>
        <ListItem>
          <ListItemText
            primary="Formulario web"
            secondary="Leads que completan el formulario de contacto en su sitio web"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Portales inmobiliarios"
            secondary="Contactos recibidos a través de portales como Yapo, Portalinmobiliario, etc."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Redes sociales"
            secondary="Consultas recibidas a través de Facebook, Instagram, etc."
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Llamadas telefónicas" secondary="Contactos que llaman directamente a la oficina" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Registro manual" secondary="Leads ingresados manualmente por los agentes" />
        </ListItem>
      </List>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Seguimiento de leads
      </Typography>

      <Typography variant="body1" paragraph>
        Una vez capturado un lead, el sistema facilita su seguimiento:
      </Typography>

      <List sx={{ ml: 2 }}>
        <ListItem>
          <ListItemText primary="1. Asignación automática o manual a un agente responsable." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. Notificaciones de nuevos leads y recordatorios de seguimiento." />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. Registro de todas las interacciones con el lead (llamadas, emails, mensajes)." />
        </ListItem>
        <ListItem>
          <ListItemText primary="4. Calificación del lead según su potencial e interés." />
        </ListItem>
      </List>

      <ManualImage
        src="/images/tutoriales/crm-lead-alert.png"
        alt="Alerta de nuevo lead"
        description="Notificación de un nuevo lead recibido en el sistema."
      />

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Conversión de lead a oportunidad
      </Typography>

      <Typography variant="body1" paragraph>
        Cuando un lead muestra interés concreto en una propiedad específica, puede convertirlo en una oportunidad:
      </Typography>

      <List sx={{ ml: 2 }}>
        <ListItem>
          <ListItemText primary="1. Desde la ficha del lead, haga clic en 'Convertir a oportunidad'." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. Seleccione la propiedad de interés." />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. Establezca la etapa inicial de la oportunidad." />
        </ListItem>
        <ListItem>
          <ListItemText primary="4. Añada información adicional relevante." />
        </ListItem>
        <ListItem>
          <ListItemText primary="5. Confirme la conversión." />
        </ListItem>
      </List>

      <ManualImage
        src="/images/tutoriales/crm-lead-conversion-interface.png"
        alt="Conversión de lead a oportunidad"
        description="Interfaz para convertir un lead en una oportunidad de negocio."
      />
    </>
  )
}
