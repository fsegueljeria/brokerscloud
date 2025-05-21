import { Typography, Box, Divider } from "@mui/material"
import { ContactSupport as ContactSupportIcon } from "@mui/icons-material"

export function SeccionContacto() {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Información de Contacto
      </Typography>

      <Typography variant="body1" paragraph>
        Para obtener soporte técnico o resolver dudas sobre el funcionamiento del CRM Inmobiliario:
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ContactSupportIcon color="primary" />
          <Typography>
            <strong>Email de soporte:</strong> soporte@crminmobiliario.com
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ContactSupportIcon color="primary" />
          <Typography>
            <strong>Teléfono:</strong> +56 2 2123 4567
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ContactSupportIcon color="primary" />
          <Typography>
            <strong>Horario de atención:</strong> Lunes a viernes de 9:00 a 18:00 hrs.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ContactSupportIcon color="primary" />
          <Typography>
            <strong>Chat en vivo:</strong> Disponible desde el sistema haciendo clic en el icono de chat en la esquina
            inferior derecha.
          </Typography>
        </Box>
      </Box>

      <Typography paragraph sx={{ mt: 3 }}>
        Para sugerencias o reportes de errores, puede utilizar el formulario de feedback disponible en el sistema (Menú
        &gt; Ayuda &gt; Enviar feedback).
      </Typography>

      <Divider sx={{ my: 4 }} />

      <Typography variant="body2" color="text.secondary" align="center">
        © 2023 CRM Inmobiliario - Todos los derechos reservados
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
        Versión del manual: 1.0
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        Última actualización: Noviembre 2023
      </Typography>
    </>
  )
}
