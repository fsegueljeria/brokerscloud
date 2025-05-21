import { Box, Typography, Paper, Breadcrumbs } from "@mui/material"
import Link from "next/link"
import { Home as HomeIcon } from "@mui/icons-material"
import InteractiveProcessDiagram from "@/components/interactive-process-diagram"

export default function HappyPathPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Inicio
        </Link>
        <Link href="/tutoriales" style={{ textDecoration: "none", color: "inherit" }}>
          Tutoriales
        </Link>
        <Typography color="text.primary">Happy Path</Typography>
      </Breadcrumbs>

      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Happy Path - Del Portal Inmobiliario al Cierre de Venta
        </Typography>

        <Typography variant="body1" paragraph>
          Este tutorial interactivo muestra el flujo de trabajo ideal (Happy Path) para gestionar todo el proceso de
          venta inmobiliaria, desde la captación inicial del lead hasta el cierre exitoso de la operación.
        </Typography>

        <Typography variant="body1" paragraph>
          Explore cada paso del proceso utilizando el diagrama interactivo a continuación. Para cada etapa, encontrará
          ejemplos prácticos, capturas de pantalla, acciones específicas en el sistema y consejos útiles.
        </Typography>

        <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 1, mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
            <InfoIcon sx={{ mr: 1, fontSize: 20 }} color="primary" />
            Cómo utilizar este diagrama:
          </Typography>
          <Typography variant="body2">
            • Navegue por los pasos utilizando los botones "Anterior" y "Siguiente"
            <br />• Explore las pestañas para ver diferentes tipos de información para cada paso
            <br />• Haga clic en "Reiniciar el proceso" al final para volver al principio
          </Typography>
        </Box>
      </Paper>

      <InteractiveProcessDiagram />
    </Box>
  )
}

import { Info as InfoIcon } from "@mui/icons-material"
