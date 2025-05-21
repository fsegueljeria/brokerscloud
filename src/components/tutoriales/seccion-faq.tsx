import { Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material"

export function SeccionFAQ() {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Preguntas Frecuentes
      </Typography>

      <Typography variant="body1" paragraph>
        A continuación encontrará respuestas a las preguntas más frecuentes sobre el uso del CRM Inmobiliario.
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Generales
      </Typography>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>¿Cuáles son los requisitos mínimos para utilizar el CRM Inmobiliario?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Se recomienda utilizar un navegador actualizado (Chrome, Firefox o Edge) y una conexión a internet estable.
            El sistema es compatible con ordenadores, tablets y smartphones.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>¿Es posible acceder al sistema desde dispositivos móviles?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Sí, el CRM Inmobiliario cuenta con una interfaz adaptativa que se ajusta automáticamente a diferentes
            tamaños de pantalla, permitiendo su uso en smartphones y tablets.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>¿Cómo puedo cambiar mi contraseña?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Haga clic en su perfil en la esquina superior derecha, seleccione "Mi cuenta" y luego "Cambiar contraseña".
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Propiedades
      </Typography>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>¿Puedo importar un listado de propiedades desde Excel?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Sí, desde el módulo de Propiedades, haga clic en "Importar" y siga las instrucciones para cargar su archivo
            Excel con el formato requerido.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>¿Cómo puedo publicar una propiedad en portales inmobiliarios?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Al crear o editar una propiedad, vaya a la pestaña "Portales Inmobiliarios" y seleccione los portales donde
            desea publicarla. Asegúrese de completar toda la información requerida por cada portal.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: "bold" }}>
        Leads y oportunidades
      </Typography>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>¿Cuál es la diferencia entre un lead y una oportunidad?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Un lead es un contacto potencial que ha mostrado algún interés inicial. Una oportunidad se crea cuando un
            lead muestra interés concreto en una propiedad específica y existe una posibilidad real de negocio.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>¿Cómo convierto un lead en una oportunidad?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Desde el listado de leads, haga clic en el icono de conversión (flecha circular) junto al lead que desea
            convertir y complete el formulario de conversión.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
