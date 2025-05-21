import { Typography, List, ListItem, ListItemText } from "@mui/material"
import { ManualImage } from "./manual-image"

export function SeccionVisitas() {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Gestión de Visitas
      </Typography>

      <Typography variant="body1" paragraph>
        El módulo de Visitas le permite programar y dar seguimiento a las visitas a propiedades, facilitando la
        coordinación entre agentes, propietarios y clientes interesados.
      </Typography>

      <ManualImage
        src="/images/tutoriales/visit-calendar.png"
        alt="Calendario de Visitas"
        description="Vista de calendario que muestra las visitas programadas a diferentes propiedades."
      />

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Programación de visitas
      </Typography>

      <Typography variant="body1" paragraph>
        Para programar una nueva visita a una propiedad:
      </Typography>

      <List sx={{ ml: 2 }}>
        <ListItem>
          <ListItemText primary="1. Acceda al módulo de Visitas desde el menú principal." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. Haga clic en el botón 'Nueva Visita'." />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. Seleccione la propiedad a visitar." />
        </ListItem>
        <ListItem>
          <ListItemText primary="4. Seleccione el cliente o prospecto interesado." />
        </ListItem>
        <ListItem>
          <ListItemText primary="5. Establezca la fecha y hora de la visita." />
        </ListItem>
        <ListItem>
          <ListItemText primary="6. Asigne un agente responsable." />
        </ListItem>
        <ListItem>
          <ListItemText primary="7. Añada notas o instrucciones especiales si es necesario." />
        </ListItem>
        <ListItem>
          <ListItemText primary="8. Haga clic en 'Guardar' para confirmar la visita." />
        </ListItem>
      </List>

      <ManualImage
        src="/images/tutoriales/crm-property-schedule.png"
        alt="Formulario de programación de visita"
        description="Formulario para programar una nueva visita a una propiedad."
      />

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Seguimiento de resultados
      </Typography>

      <Typography variant="body1" paragraph>
        Después de realizada una visita, es importante registrar los resultados:
      </Typography>

      <List sx={{ ml: 2 }}>
        <ListItem>
          <ListItemText primary="1. Localice la visita en el calendario o en el listado." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. Haga clic en la visita para abrir sus detalles." />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. Actualice el estado de la visita (Realizada, Cancelada, Reprogramada)." />
        </ListItem>
        <ListItem>
          <ListItemText primary="4. Registre los comentarios del cliente sobre la propiedad." />
        </ListItem>
        <ListItem>
          <ListItemText primary="5. Indique el nivel de interés mostrado por el cliente." />
        </ListItem>
        <ListItem>
          <ListItemText primary="6. Establezca los próximos pasos a seguir." />
        </ListItem>
        <ListItem>
          <ListItemText primary="7. Haga clic en 'Guardar' para actualizar la información." />
        </ListItem>
      </List>
    </>
  )
}
