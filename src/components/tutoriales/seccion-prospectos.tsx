import { Typography, List, ListItem, ListItemText } from "@mui/material"
import { ManualImage } from "./manual-image"

export function SeccionProspectos() {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Gestión de Prospectos
      </Typography>

      <Typography variant="body1" paragraph>
        El módulo de Prospectos le permite gestionar clientes potenciales calificados que han mostrado un interés
        concreto en adquirir o vender una propiedad.
      </Typography>

      <ManualImage
        src="/images/tutoriales/prospect-management.png"
        alt="Gestión de Prospectos"
        description="Interfaz principal de gestión de prospectos mostrando el listado y detalles de cada prospecto."
      />

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Diferencia entre Lead y Prospecto
      </Typography>

      <Typography variant="body1" paragraph>
        En el CRM Inmobiliario, distinguimos entre:
      </Typography>

      <List>
        <ListItem>
          <ListItemText
            primary="Lead"
            secondary="Contacto inicial que ha mostrado algún interés general en servicios inmobiliarios"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Prospecto"
            secondary="Cliente potencial calificado con interés específico y capacidad verificada para realizar una transacción"
          />
        </ListItem>
      </List>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Calificación de prospectos
      </Typography>

      <Typography variant="body1" paragraph>
        El sistema permite calificar a los prospectos según diferentes criterios:
      </Typography>

      <List>
        <ListItem>
          <ListItemText
            primary="Capacidad financiera"
            secondary="Evaluación de la capacidad económica para realizar la operación"
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Nivel de interés" secondary="Grado de motivación para concretar la operación" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Urgencia" secondary="Plazo en el que necesita concretar la operación" />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Autoridad de decisión"
            secondary="Capacidad para tomar la decisión final sin consultar a terceros"
          />
        </ListItem>
      </List>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Gestión de preferencias
      </Typography>

      <Typography variant="body1" paragraph>
        Para cada prospecto, puede registrar sus preferencias inmobiliarias:
      </Typography>

      <List sx={{ ml: 2 }}>
        <ListItem>
          <ListItemText primary="1. Acceda a la ficha del prospecto." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. Vaya a la pestaña 'Preferencias'." />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. Registre información detallada sobre:" />
        </ListItem>
      </List>

      <List sx={{ ml: 4 }}>
        <ListItem>
          <ListItemText primary="• Tipo de propiedad deseada" />
        </ListItem>
        <ListItem>
          <ListItemText primary="• Ubicaciones preferidas" />
        </ListItem>
        <ListItem>
          <ListItemText primary="• Rango de precios" />
        </ListItem>
        <ListItem>
          <ListItemText primary="• Características imprescindibles" />
        </ListItem>
        <ListItem>
          <ListItemText primary="• Características deseables" />
        </ListItem>
      </List>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Matching automático
      </Typography>

      <Typography variant="body1" paragraph>
        El sistema puede sugerir automáticamente propiedades que coinciden con las preferencias del prospecto:
      </Typography>

      <List sx={{ ml: 2 }}>
        <ListItem>
          <ListItemText primary="1. Desde la ficha del prospecto, haga clic en 'Sugerir propiedades'." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. El sistema mostrará un listado de propiedades ordenadas por nivel de coincidencia." />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. Seleccione las propiedades que desea presentar al prospecto." />
        </ListItem>
        <ListItem>
          <ListItemText primary="4. Envíe la selección por email o programe una presentación." />
        </ListItem>
      </List>
    </>
  )
}
