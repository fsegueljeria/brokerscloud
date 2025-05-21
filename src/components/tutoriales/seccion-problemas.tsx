import { Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from "@mui/material"
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material"
import { ManualImage } from "./manual-image"

export function SeccionProblemas() {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Solución de Problemas
      </Typography>

      <Typography variant="body1" paragraph>
        Esta sección le ayudará a resolver los problemas más comunes que puede encontrar al utilizar el CRM
        Inmobiliario.
      </Typography>

      <ManualImage
        src="/images/tutoriales/troubleshooting.png"
        alt="Solución de Problemas"
        description="Interfaz de ayuda para la solución de problemas comunes en el CRM."
      />

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
            Problemas de acceso
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Problema:</strong> No puedo iniciar sesión en el sistema.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Solución:</strong>
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Verifique que está utilizando las credenciales correctas" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Compruebe que su conexión a internet funciona correctamente" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Borre la caché del navegador e intente nuevamente" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Si el problema persiste, contacte al administrador del sistema" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
            Problemas de rendimiento
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Problema:</strong> El sistema funciona lentamente.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Solución:</strong>
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Cierre otras aplicaciones o pestañas del navegador para liberar memoria" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Borre la caché del navegador" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Utilice un navegador actualizado (Chrome, Firefox o Edge en sus versiones más recientes)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Si utiliza el sistema desde un dispositivo móvil, considere cambiar a un ordenador para tareas complejas" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
            Problemas con la carga de imágenes
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Problema:</strong> No puedo cargar imágenes de propiedades.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Solución:</strong>
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Verifique que el formato de la imagen es compatible (JPG, PNG, GIF)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Compruebe que el tamaño del archivo no excede el límite (máximo 5MB por imagen)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Reduzca la resolución de la imagen si es necesario" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Intente cargar las imágenes de una en una en lugar de en lotes" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
            Problemas con los reportes
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Problema:</strong> Los reportes no muestran datos o muestran datos incorrectos.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Solución:</strong>
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Verifique que ha seleccionado el rango de fechas correcto" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Compruebe que tiene permisos para acceder a los datos solicitados" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Actualice la página para asegurarse de que está viendo los datos más recientes" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Si el problema persiste, contacte al administrador del sistema" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
