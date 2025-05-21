import { Typography, List, ListItem, ListItemText } from "@mui/material"
import { ManualImage } from "./manual-image"

export function SeccionOfertas() {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Gestión de Ofertas
      </Typography>

      <Typography variant="body1" paragraph>
        El módulo de Ofertas le permite gestionar propuestas formales presentadas a clientes o recibidas de ellos,
        facilitando el proceso de negociación y cierre de operaciones.
      </Typography>

      <ManualImage
        src="/images/tutoriales/offer-management.png"
        alt="Gestión de Ofertas"
        description="Interfaz principal de gestión de ofertas mostrando el listado y estado de cada oferta."
      />

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Creación de ofertas
      </Typography>

      <Typography variant="body1" paragraph>
        Para crear una nueva oferta en el sistema:
      </Typography>

      <List sx={{ ml: 2 }}>
        <ListItem>
          <ListItemText primary="1. Acceda al módulo de Ofertas desde el menú principal." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. Haga clic en el botón 'Nueva Oferta'." />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. Complete el asistente de creación con los siguientes pasos:" />
        </ListItem>
      </List>

      <List sx={{ ml: 4 }}>
        <ListItem>
          <ListItemText primary="• Información básica: título, referencia y descripción" />
        </ListItem>
        <ListItem>
          <ListItemText primary="• Detalles: monto, moneda, condiciones y fechas" />
        </ListItem>
        <ListItem>
          <ListItemText primary="• Relaciones: vinculación con propiedad, cliente y oportunidad" />
        </ListItem>
        <ListItem>
          <ListItemText primary="• Asignaciones: responsables internos" />
        </ListItem>
        <ListItem>
          <ListItemText primary="• Observaciones: notas adicionales" />
        </ListItem>
        <ListItem>
          <ListItemText primary="• Resumen: revisión final de la oferta" />
        </ListItem>
      </List>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Generación de documentos
      </Typography>

      <Typography variant="body1" paragraph>
        El sistema permite generar documentos profesionales a partir de las ofertas:
      </Typography>

      <List sx={{ ml: 2 }}>
        <ListItem>
          <ListItemText primary="1. Desde la ficha de la oferta, haga clic en 'Generar PDF'." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. Seleccione la plantilla de documento que desea utilizar." />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. Previsualice el documento generado." />
        </ListItem>
        <ListItem>
          <ListItemText primary="4. Realice ajustes si es necesario." />
        </ListItem>
        <ListItem>
          <ListItemText primary="5. Descargue el PDF o envíelo directamente por email al cliente." />
        </ListItem>
      </List>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Seguimiento de ofertas
      </Typography>

      <Typography variant="body1" paragraph>
        Para cada oferta, el sistema permite realizar un seguimiento detallado:
      </Typography>

      <List>
        <ListItem>
          <ListItemText
            primary="Historial de cambios"
            secondary="Registro cronológico de todas las modificaciones realizadas a la oferta"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Estados de la oferta"
            secondary="Borrador, Enviada, En negociación, Aceptada, Rechazada, Caducada"
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Comentarios y notas" secondary="Registro de observaciones sobre la oferta" />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Documentos asociados"
            secondary="Archivos relacionados con la oferta (contratos, anexos, etc.)"
          />
        </ListItem>
      </List>
    </>
  )
}
