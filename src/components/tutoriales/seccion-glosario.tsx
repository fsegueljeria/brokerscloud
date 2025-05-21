import { Typography, Grid, Card, CardContent } from "@mui/material"

export function SeccionGlosario() {
  const terminos = [
    {
      termino: "CRM",
      definicion: "Customer Relationship Management (Gestión de Relaciones con Clientes).",
    },
    {
      termino: "Lead",
      definicion: "Contacto potencial que ha mostrado algún interés inicial en los servicios o propiedades.",
    },
    {
      termino: "Oportunidad",
      definicion: "Posibilidad concreta de negocio con un cliente potencial interesado en una propiedad específica.",
    },
    {
      termino: "Prospecto",
      definicion: "Cliente potencial calificado con alta probabilidad de realizar una transacción.",
    },
    {
      termino: "Kanban",
      definicion: "Sistema visual para gestionar el trabajo que permite ver el estado de los procesos en curso.",
    },
    {
      termino: "UF",
      definicion: "Unidad de Fomento, unidad de cuenta utilizada en Chile, reajustable de acuerdo con la inflación.",
    },
    {
      termino: "Portal Inmobiliario",
      definicion: "Sitio web especializado en la publicación de ofertas de propiedades.",
    },
    {
      termino: "Dashboard",
      definicion: "Panel de control que muestra indicadores clave del negocio.",
    },
    {
      termino: "Captación",
      definicion: "Proceso de incorporar una nueva propiedad a la cartera de la inmobiliaria.",
    },
    {
      termino: "Cierre",
      definicion: "Etapa final de una negociación inmobiliaria que culmina en una transacción exitosa.",
    },
    {
      termino: "Exclusividad",
      definicion: "Acuerdo por el cual un propietario otorga derechos exclusivos de venta a una agencia inmobiliaria.",
    },
    {
      termino: "Tasación",
      definicion: "Proceso de valoración de una propiedad para determinar su precio de mercado.",
    },
  ]

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Glosario de Términos
      </Typography>

      <Typography variant="body1" paragraph>
        Este glosario incluye los términos más utilizados en el CRM Inmobiliario y en el sector inmobiliario en general.
      </Typography>

      <Grid container spacing={3}>
        {terminos.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.termino}
                </Typography>
                <Typography variant="body2">{item.definicion}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
