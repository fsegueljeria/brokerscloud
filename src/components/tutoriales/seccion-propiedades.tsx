import { Typography, List, ListItem, ListItemText } from "@mui/material"
import { ManualImage } from "./manual-image"

export function SeccionPropiedades() {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Gestión de Propiedades
      </Typography>

      <Typography variant="body1" paragraph>
        El módulo de Gestión de Propiedades le permite administrar eficientemente su cartera inmobiliaria, desde el
        registro de nuevas propiedades hasta el seguimiento de su estado y características.
      </Typography>

      <ManualImage
        src="/images/tutoriales/property-management.png"
        alt="Gestión de Propiedades"
        description="Interfaz principal de gestión de propiedades mostrando el listado y filtros disponibles."
      />

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Listado de propiedades
      </Typography>

      <Typography variant="body1" paragraph>
        El listado de propiedades muestra todas las propiedades registradas en el sistema con información clave:
      </Typography>

      <List>
        <ListItem>
          <ListItemText primary="Código de referencia" secondary="Identificador único de la propiedad" />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Tipo de propiedad"
            secondary="Categoría de la propiedad (apartamento, casa, local, terreno, etc.)"
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Ubicación" secondary="Dirección y zona de la propiedad" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Precio" secondary="Valor de venta o alquiler de la propiedad" />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Estado"
            secondary="Situación actual de la propiedad (disponible, reservada, vendida, etc.)"
          />
        </ListItem>
      </List>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Añadir una nueva propiedad
      </Typography>

      <Typography variant="body1" paragraph>
        Para registrar una nueva propiedad en el sistema:
      </Typography>

      <List sx={{ ml: 2 }}>
        <ListItem>
          <ListItemText primary="1. Haga clic en el botón 'Añadir propiedad' en la parte superior del listado." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. Complete el formulario de registro de propiedad, que está organizado en pasos:" />
        </ListItem>
      </List>

      <List sx={{ ml: 4 }}>
        <ListItem>
          <ListItemText primary="• Información básica: tipo de propiedad, operación (venta/alquiler), precio, superficie, etc." />
        </ListItem>
        <ListItem>
          <ListItemText primary="• Características: número de habitaciones, baños, amenidades, etc." />
        </ListItem>
        <ListItem>
          <ListItemText primary="• Ubicación: dirección completa, coordenadas, referencias, etc." />
        </ListItem>
        <ListItem>
          <ListItemText primary="• Propiedad: datos del propietario, condiciones de venta, exclusividad, etc." />
        </ListItem>
        <ListItem>
          <ListItemText primary="• Imágenes: carga y gestión de fotografías de la propiedad" />
        </ListItem>
      </List>

      <ManualImage
        src="/images/tutoriales/property-form.png"
        alt="Formulario de Propiedad"
        description="Formulario de registro de una nueva propiedad con sus diferentes secciones."
      />
    </>
  )
}
