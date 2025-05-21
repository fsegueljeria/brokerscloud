import { Box, Typography, Grid, Card, CardContent, CardActionArea } from "@mui/material"
import { Book as BookIcon, Route as RouteIcon } from "@mui/icons-material"
import Link from "next/link"

export default function TutorialesPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tutoriales del CRM Inmobiliario
      </Typography>

      <Typography variant="body1" paragraph>
        Bienvenido a la sección de tutoriales. Aquí encontrará recursos útiles para aprender a utilizar todas las
        funcionalidades del CRM Inmobiliario de manera eficiente.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardActionArea component={Link} href="/tutoriales/guia-usuario">
              <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4 }}>
                <BookIcon sx={{ fontSize: 60, mb: 2, color: "primary.main" }} />
                <Typography variant="h5" component="h2" gutterBottom align="center">
                  Guía de Usuario
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Manual completo con instrucciones detalladas sobre todas las funcionalidades del sistema.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardActionArea component={Link} href="/tutoriales/happy-path">
              <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4 }}>
                <RouteIcon sx={{ fontSize: 60, mb: 2, color: "primary.main" }} />
                <Typography variant="h5" component="h2" gutterBottom align="center">
                  Happy Path
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Flujo de trabajo ideal desde la captación de un lead hasta el cierre exitoso de una venta.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
