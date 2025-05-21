"use client"

import { useState } from "react"
import { Box, Stepper, Step, StepLabel, Button, Paper, Typography, useTheme } from "@mui/material"
import { useMediaQuery } from "@/hooks/use-mobile"
import {
  Description as DescriptionIcon,
  AttachMoney as MoneyIcon,
  Home as HomeIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Language as LanguageIcon,
  PhotoLibrary as PhotoIcon,
} from "@mui/icons-material"
import { BasicInfoStep } from "./wizard-steps/basic-info-step"
import { FinancialStep } from "./wizard-steps/financial-step"
import { CharacteristicsStep } from "./wizard-steps/characteristics-step"
import { LocationStep } from "./wizard-steps/location-step"
import { OwnershipStep } from "./wizard-steps/ownership-step"
import { PortalsStep } from "./wizard-steps/portals-step"
import { ImagesStep } from "./wizard-steps/images-step"
import type { Property, TypePropertyType, PropertyState, Currency, PropertyImage } from "@/types/types"

const steps = [
  {
    label: "Información Básica",
    icon: <DescriptionIcon />,
  },
  {
    label: "Información Financiera",
    icon: <MoneyIcon />,
  },
  {
    label: "Características",
    icon: <HomeIcon />,
  },
  {
    label: "Ubicación",
    icon: <LocationIcon />,
  },
  {
    label: "Propiedad y Organización",
    icon: <PersonIcon />,
  },
  {
    label: "Imágenes",
    icon: <PhotoIcon />,
  },
  {
    label: "Portales Inmobiliarios",
    icon: <LanguageIcon />,
  },
]

interface PropertyWizardProps {
  onComplete: () => void
  initialPropertyType?: string
}

export function PropertyWizard({ onComplete, initialPropertyType }: PropertyWizardProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery("(max-width: 640px)")
  const [activeStep, setActiveStep] = useState(0)
  const [propertyData, setPropertyData] = useState<Partial<Property>>({
    code: "",
    name: "",
    description: "",
    type: initialPropertyType ? mapPropertyType(initialPropertyType) : ("APARTMENT" as TypePropertyType),
    price: 0,
    curCode: "EUR" as Currency,
    shared: false,
    numberOfBedrooms: 0,
    numberOfBathrooms: 0,
    yearBuilt: new Date().getFullYear(),
    m2Built: 0,
    m2SemiCovered: 0,
    area: 0,
    address: "",
    zip: "",
    city: "",
    x: 0,
    y: 0,
    state: "AVAILABLE" as PropertyState,
    organization: null,
    owner: null,
    portalPublications: [],
    images: [],
  })

  // Función para mapear el tipo de propiedad desde la URL a los tipos internos
  function mapPropertyType(urlType: string): TypePropertyType {
    const mapping = {
      apartamento: "APARTMENT",
      casa: "HOUSE",
      terreno: "LAND",
      local: "COMMERCIAL",
      oficina: "OFFICE",
      garaje: "GARAGE",
      trastero: "STORAGE",
    }
    return (mapping[urlType] || "APARTMENT") as TypePropertyType
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleUpdateData = (data: Partial<Property>) => {
    setPropertyData((prev) => ({ ...prev, ...data }))
  }

  const handleUpdateImages = (images: PropertyImage[]) => {
    setPropertyData((prev) => ({ ...prev, images }))
  }

  const handleFinish = () => {
    // Aquí iría la lógica para guardar la propiedad
    console.log("Propiedad a guardar:", propertyData)
    onComplete()
  }

  const handleCancel = () => {
    onComplete()
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <BasicInfoStep data={propertyData} onUpdateData={handleUpdateData} />
      case 1:
        return <FinancialStep data={propertyData} onUpdateData={handleUpdateData} />
      case 2:
        return <CharacteristicsStep data={propertyData} onUpdateData={handleUpdateData} />
      case 3:
        return <LocationStep data={propertyData} onUpdateData={handleUpdateData} />
      case 4:
        return <OwnershipStep data={propertyData} onUpdateData={handleUpdateData} />
      case 5:
        return <ImagesStep images={propertyData.images || []} onChange={handleUpdateImages} />
      case 6:
        return <PortalsStep data={propertyData} onUpdateData={handleUpdateData} />
      default:
        return null
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      {isMobile ? (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" component="h2" sx={{ flex: 1 }}>
            Paso {activeStep + 1} de {steps.length}: {steps[activeStep].label}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "primary.main",
              color: "white",
            }}
          >
            {steps[activeStep].icon}
          </Box>
        </Box>
      ) : (
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel StepIconProps={{ icon: step.icon }}>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}

      <Paper sx={{ p: { xs: 2, sm: 3 }, mt: isMobile ? 1 : 3, borderRadius: isMobile ? 1 : 2 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" component="h2">
            {steps[activeStep].label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {activeStep === 0 && "Ingresa la información básica de la propiedad"}
            {activeStep === 1 && "Establece el precio y detalles financieros"}
            {activeStep === 2 && "Define las características físicas de la propiedad"}
            {activeStep === 3 && "Especifica la ubicación exacta"}
            {activeStep === 4 && "Asigna propietario y organización"}
            {activeStep === 5 && "Sube y gestiona las imágenes de la propiedad"}
            {activeStep === 6 && "Selecciona los portales inmobiliarios donde publicar esta propiedad"}
          </Typography>
        </Box>

        {renderStepContent(activeStep)}

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            pt: 2,
            justifyContent: "space-between",
            gap: isMobile ? 1 : 0,
          }}
        >
          <Button
            color="inherit"
            onClick={handleCancel}
            sx={{
              mr: isMobile ? 0 : 1,
              mb: isMobile ? 1 : 0,
              width: isMobile ? "100%" : "auto",
            }}
          >
            Cancelar
          </Button>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              width: isMobile ? "100%" : "auto",
              gap: isMobile ? 1 : 0,
            }}
          >
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{
                mr: isMobile ? 0 : 1,
                mb: isMobile ? 1 : 0,
                width: isMobile ? "100%" : "auto",
              }}
            >
              Atrás
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleFinish}
                sx={{ width: isMobile ? "100%" : "auto" }}
              >
                Finalizar
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ width: isMobile ? "100%" : "auto" }}
              >
                Siguiente
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
