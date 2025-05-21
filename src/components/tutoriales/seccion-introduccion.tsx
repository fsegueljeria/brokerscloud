import { Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import {
  Dashboard as DashboardIcon,
  House as HouseIcon,
  Person as PersonIcon,
  BusinessCenter as BusinessCenterIcon,
  Event as EventIcon,
} from "@mui/icons-material"

export function SeccionIntroduccion() {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Introducción al CRM Inmobiliario
      </Typography>

      <Typography variant="body1" paragraph>
        Bienvenido al CRM Inmobiliario, una plataforma diseñada específicamente para optimizar la gestión de
        propiedades, clientes y oportunidades de negocio en el sector inmobiliario. Este manual le guiará a través de
        todas las funcionalidades disponibles en el sistema.
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        ¿Qué es el CRM Inmobiliario?
      </Typography>

      <Typography variant="body1" paragraph>
        El CRM Inmobiliario es una solución integral que permite a agentes inmobiliarios, corredores y empresas del
        sector gestionar eficientemente su cartera de propiedades, seguimiento de clientes potenciales (leads),
        oportunidades de negocio, ofertas, visitas y prospectos, todo desde una única plataforma centralizada.
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Beneficios principales
      </Typography>

      <List>
        <ListItem>
          <ListItemIcon>
            <DashboardIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Visión centralizada"
            secondary="Acceso a toda la información relevante desde un único panel de control"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <HouseIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Gestión de propiedades"
            secondary="Organización eficiente de su cartera de propiedades con información detallada"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PersonIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Seguimiento de leads"
            secondary="Captura y seguimiento de leads para maximizar las conversiones"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <BusinessCenterIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Gestión de oportunidades"
            secondary="Seguimiento del ciclo de ventas desde el primer contacto hasta el cierre"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EventIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Programación de visitas" secondary="Organización eficiente de visitas a propiedades" />
        </ListItem>
      </List>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Cómo usar este manual
      </Typography>

      <Typography variant="body1" paragraph>
        Este manual está organizado en secciones temáticas que puede navegar utilizando las pestañas superiores. Cada
        sección contiene instrucciones detalladas, capturas de pantalla y consejos para aprovechar al máximo cada
        funcionalidad del sistema.
      </Typography>

      <Typography variant="body1" paragraph>
        Recomendamos comenzar con la sección "Primeros Pasos" si es nuevo en el sistema, o dirigirse directamente a la
        sección específica que necesite consultar si ya está familiarizado con la plataforma.
      </Typography>
    </>
  )
}
