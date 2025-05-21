import { Typography, List, ListItem, ListItemText } from "@mui/material"
import { ManualImage } from "./manual-image"

export function SeccionPrimerosPasos() {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Primeros Pasos
      </Typography>

      <Typography variant="body1" paragraph>
        Esta sección le guiará a través de los pasos iniciales para comenzar a utilizar el CRM Inmobiliario, desde el
        acceso al sistema hasta la configuración inicial de su perfil.
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Acceso al sistema
      </Typography>

      <Typography variant="body1" paragraph>
        Para acceder al CRM Inmobiliario, siga estos pasos:
      </Typography>

      <List sx={{ ml: 2 }}>
        <ListItem>
          <ListItemText primary="1. Abra su navegador web e ingrese la URL proporcionada por su administrador." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. En la pantalla de inicio de sesión, ingrese su nombre de usuario y contraseña." />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. Haga clic en el botón 'Iniciar sesión'." />
        </ListItem>
      </List>

      <ManualImage
        src="/images/tutoriales/login-screen.png"
        alt="Pantalla de inicio de sesión"
        description="Pantalla de inicio de sesión del CRM Inmobiliario donde debe ingresar sus credenciales."
      />

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Configuración de perfil
      </Typography>

      <Typography variant="body1" paragraph>
        Una vez que haya accedido al sistema, es recomendable configurar su perfil de usuario:
      </Typography>

      <List sx={{ ml: 2 }}>
        <ListItem>
          <ListItemText primary="1. Haga clic en su nombre de usuario en la esquina superior derecha." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. Seleccione 'Mi perfil' en el menú desplegable." />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. Complete o actualice su información personal, incluyendo nombre, correo electrónico, teléfono y foto de perfil." />
        </ListItem>
        <ListItem>
          <ListItemText primary="4. Configure sus preferencias de notificaciones." />
        </ListItem>
        <ListItem>
          <ListItemText primary="5. Haga clic en 'Guardar cambios'." />
        </ListItem>
      </List>

      <ManualImage
        src="/images/tutoriales/user-profile.png"
        alt="Configuración de perfil de usuario"
        description="Pantalla de configuración de perfil donde puede actualizar su información personal y preferencias."
      />
    </>
  )
}
