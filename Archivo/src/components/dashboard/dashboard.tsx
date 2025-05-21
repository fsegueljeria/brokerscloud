"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  useTheme,
  useMediaQuery,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material"
import { MoreVert as MoreVertIcon } from "@mui/icons-material"
import { OpportunitiesByStageChart } from "./charts/opportunities-by-stage-chart"
import { PropertiesByStateChart } from "./charts/properties-by-state-chart"
import { TopOpportunitiesTable } from "./tables/top-opportunities-table"
import { PendingPropertiesTable } from "./tables/pending-properties-table"
import { PendingOffersTable } from "./tables/pending-offers-table"
import { SummaryCards } from "./summary-cards"
import { OpportunitiesFunnelChart } from "./charts/opportunities-funnel-chart"
import { OpportunitiesTrendChart } from "./charts/opportunities-trend-chart"

export function Dashboard() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  const [timeRange, setTimeRange] = useState("month")
  const [activeTab, setActiveTab] = useState(0)

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value)
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  // Componentes para la vista móvil en pestañas
  const mobileTabComponents = [
    // Pestaña 1: Resumen y gráficos principales
    <>
      {/* Tarjetas de resumen siempre visibles */}
      <SummaryCards timeRange={timeRange} />

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {/* Gráfico de oportunidades por etapa */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Oportunidades por Etapa"
              titleTypography={{ variant: "subtitle1" }}
              action={
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ height: 250, p: 1 }}>
              <OpportunitiesByStageChart timeRange={timeRange} />
            </CardContent>
          </Card>
        </Grid>

        {/* Gráfico de propiedades por estado */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Propiedades por Estado"
              titleTypography={{ variant: "subtitle1" }}
              action={
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ height: 250, p: 1 }}>
              <PropertiesByStateChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>,

    // Pestaña 2: Embudo y tendencias
    <>
      <Grid container spacing={2}>
        {/* Gráfico de embudo de oportunidades */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Embudo de Ventas"
              titleTypography={{ variant: "subtitle1" }}
              action={
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ height: 300, p: 1 }}>
              <OpportunitiesFunnelChart timeRange={timeRange} />
            </CardContent>
          </Card>
        </Grid>

        {/* Gráfico de tendencia de oportunidades */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Tendencia de Oportunidades"
              titleTypography={{ variant: "subtitle1" }}
              action={
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ height: 300, p: 1 }}>
              <OpportunitiesTrendChart timeRange={timeRange} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>,

    // Pestaña 3: Tablas
    <>
      <Grid container spacing={2}>
        {/* Top 5 oportunidades por ganar */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Top 5 Oportunidades por Ganar"
              titleTypography={{ variant: "subtitle1" }}
              action={
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ p: 0, maxHeight: 300, overflow: "auto" }}>
              <TopOpportunitiesTable />
            </CardContent>
          </Card>
        </Grid>

        {/* Propiedades pendientes de publicar */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Propiedades Pendientes de Publicar"
              titleTypography={{ variant: "subtitle1" }}
              action={
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ p: 0, maxHeight: 250, overflow: "auto" }}>
              <PendingPropertiesTable />
            </CardContent>
          </Card>
        </Grid>

        {/* Ofertas pendientes de finalizar */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Ofertas Pendientes de Finalizar"
              titleTypography={{ variant: "subtitle1" }}
              action={
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ p: 0, maxHeight: 250, overflow: "auto" }}>
              <PendingOffersTable />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>,
  ]

  return (
    <Container maxWidth={false} disableGutters sx={{ px: { xs: 1, sm: 2, md: 3 }, py: { xs: 2, md: 3 } }}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="h1"
          fontWeight="bold"
          sx={{ mb: { xs: 2, sm: 0 }, alignSelf: { xs: "flex-start", sm: "auto" } }}
        >
          Dashboard
        </Typography>

        <FormControl
          variant="outlined"
          size="small"
          sx={{
            minWidth: 120,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <InputLabel id="time-range-label">Periodo</InputLabel>
          <Select
            labelId="time-range-label"
            id="time-range"
            value={timeRange}
            onChange={handleTimeRangeChange}
            label="Periodo"
            fullWidth={isMobile}
          >
            <MenuItem value="week">Última semana</MenuItem>
            <MenuItem value="month">Último mes</MenuItem>
            <MenuItem value="quarter">Último trimestre</MenuItem>
            <MenuItem value="year">Último año</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {isMobile ? (
        <>
          {/* Vista móvil con pestañas */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
            <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" aria-label="dashboard tabs">
              <Tab label="Resumen" />
              <Tab label="Análisis" />
              <Tab label="Pendientes" />
            </Tabs>
          </Box>

          {mobileTabComponents[activeTab]}
        </>
      ) : (
        <>
          {/* Vista de escritorio */}
          {/* Tarjetas de resumen */}
          <SummaryCards timeRange={timeRange} />

          <Grid container spacing={isTablet ? 2 : 3} sx={{ mt: 1 }}>
            {/* Gráfico de oportunidades por etapa */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%" }}>
                <CardHeader title="Oportunidades por Etapa" />
                <Divider />
                <CardContent sx={{ height: isTablet ? 250 : 300 }}>
                  <OpportunitiesByStageChart timeRange={timeRange} />
                </CardContent>
              </Card>
            </Grid>

            {/* Gráfico de propiedades por estado */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%" }}>
                <CardHeader title="Propiedades por Estado" />
                <Divider />
                <CardContent sx={{ height: isTablet ? 250 : 300 }}>
                  <PropertiesByStateChart />
                </CardContent>
              </Card>
            </Grid>

            {/* Gráfico de embudo de oportunidades */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%" }}>
                <CardHeader title="Embudo de Ventas" />
                <Divider />
                <CardContent sx={{ height: isTablet ? 300 : 350 }}>
                  <OpportunitiesFunnelChart timeRange={timeRange} />
                </CardContent>
              </Card>
            </Grid>

            {/* Gráfico de tendencia de oportunidades */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%" }}>
                <CardHeader title="Tendencia de Oportunidades" />
                <Divider />
                <CardContent sx={{ height: isTablet ? 300 : 350 }}>
                  <OpportunitiesTrendChart timeRange={timeRange} />
                </CardContent>
              </Card>
            </Grid>

            {/* Top 5 oportunidades por ganar */}
            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <CardHeader title="Top 5 Oportunidades por Ganar" />
                <Divider />
                <CardContent sx={{ p: 0 }}>
                  <TopOpportunitiesTable />
                </CardContent>
              </Card>
            </Grid>

            {/* Propiedades pendientes de publicar */}
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={{ height: "100%" }}>
                <CardHeader title="Propiedades Pendientes de Publicar" />
                <Divider />
                <CardContent sx={{ p: 0 }}>
                  <PendingPropertiesTable />
                </CardContent>
              </Card>
            </Grid>

            {/* Ofertas pendientes de finalizar */}
            <Grid item xs={12} md={6} lg={6}>
              <Card sx={{ height: "100%" }}>
                <CardHeader title="Ofertas Pendientes de Finalizar" />
                <Divider />
                <CardContent sx={{ p: 0 }}>
                  <PendingOffersTable />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  )
}
