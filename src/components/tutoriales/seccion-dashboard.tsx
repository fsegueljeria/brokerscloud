import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Grid,
  Card,
  CardContent,
} from "@mui/material"
import {
  ExpandMore as ExpandMoreIcon,
  House as HouseIcon,
  Person as PersonIcon,
  Event as EventIcon,
} from "@mui/icons-material"
import { ManualImage } from "./manual-image"

export function SeccionDashboard() {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Panel de Control
      </Typography>

      <Typography variant="body1" paragraph>
        El Panel de Control (Dashboard) es la página principal del CRM Inmobiliario y proporciona una visión general de
        todas las actividades y métricas clave de su negocio inmobiliario.
      </Typography>

      <ManualImage
        src="/images/tutoriales/dashboard-overview.png"
        alt="Panel de Control"
        description="Vista general del Panel de Control con métricas clave y gráficos de rendimiento."
      />

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Componentes principales
      </Typography>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
            Tarjetas de resumen
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" paragraph>
            En la parte superior del dashboard encontrará tarjetas de resumen que muestran métricas clave:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Propiedades activas" secondary="Número total de propiedades disponibles" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Leads nuevos" secondary="Leads captados en los últimos 30 días" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Oportunidades abiertas" secondary="Oportunidades de negocio en proceso" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Visitas programadas" secondary="Visitas programadas para los próximos 7 días" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Ofertas pendientes" secondary="Ofertas que requieren seguimiento" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
            Gráficos de rendimiento
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" paragraph>
            El dashboard incluye varios gráficos que visualizan el rendimiento de su negocio:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Propiedades por estado"
                secondary="Distribución de propiedades según su estado (disponible, reservada, vendida, etc.)"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Embudo de oportunidades"
                secondary="Visualización del flujo de oportunidades a través de las etapas de venta"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Tendencia de oportunidades"
                secondary="Evolución de oportunidades creadas y cerradas en el tiempo"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Oportunidades por etapa"
                secondary="Distribución de oportunidades según su etapa en el proceso de venta"
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Acciones rápidas
      </Typography>

      <Typography variant="body1" paragraph>
        El dashboard también proporciona acceso a acciones rápidas para tareas comunes:
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                <HouseIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Añadir propiedad
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Acceso rápido para registrar una nueva propiedad en el sistema
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                <PersonIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Registrar lead
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Formulario rápido para añadir un nuevo lead al sistema
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                <EventIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Programar visita
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Acceso directo para agendar una nueva visita a una propiedad
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
