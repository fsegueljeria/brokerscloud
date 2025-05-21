"use client"

import { useState } from "react"
import { Box, Card, CardContent, Step, StepLabel, Stepper, Typography, styled } from "@mui/material"
import { 
  Description as DescriptionIcon,
  Info as InfoIcon,
  Link as LinkIcon,
  Person as PersonIcon,
  Comment as CommentIcon,
  CheckCircle as CheckCircleIcon
} from "@mui/icons-material"
import { OfferBasicInfoStep } from "./wizard-steps/offer-basic-info-step"
import { OfferDetailsStep } from "./wizard-steps/offer-details-step"
import { OfferRelationsStep } from "./wizard-steps/offer-relations-step"
import { OfferAssignmentsStep } from "./wizard-steps/offer-assignments-step"
import { OfferObservationsStep } from "./wizard-steps/offer-observations-step"
import { OfferSummaryStep } from "./wizard-steps/offer-summary-step"
import type { Offer } from "@/types/types"

// Estilos personalizados para los iconos
const StyledStepIcon = styled('div')<{ active?: boolean; completed?: boolean }>(({ theme, active, completed }) => ({
  color: active || completed ? theme.palette.primary.main : theme.palette.grey[400],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': {
    fontSize: '2rem',
    transition: theme.transitions.create(['color', 'transform'], {
      duration: theme.transitions.duration.shorter,
    }),
    ...(active && {
      transform: 'scale(1.2)',
    }),
  },
}));

interface OfferWizardProps {
  offer?: Offer | undefined
  onSuccess?: () => void
}

export function OfferWizard({ offer, onSuccess }: OfferWizardProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState<Partial<Offer>>(
    offer || {
      title: "",
      reference: `OF-${new Date().getTime().toString().slice(-6)}`,
      amount: 0,
      currency: "CLP",
      commission: 0,
      amountCommission: 0,
      currencyCommission: "CLP",
      expirationDate: "",
      observation: "",
      stage: "DRAFT",
      swap: false,
      active: true,
      organizationId: 0,
      opportunityId: 0,
      propertyId: 0,
      prospectId: 0,
      assignAgentId: 0,
      assignSupervisorId: undefined,
    },
  )

  const steps = [
    { label: "Información Básica", icon: <DescriptionIcon /> },
    { label: "Detalles", icon: <InfoIcon /> },
    { label: "Relaciones", icon: <LinkIcon /> },
    { label: "Asignaciones", icon: <PersonIcon /> },
    { label: "Observaciones", icon: <CommentIcon /> },
    { label: "Resumen", icon: <CheckCircleIcon /> }
  ]

  const handleNext = (data: Partial<Offer>) => {
    setFormData({ ...formData, ...data })
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    // Here you would typically save the data to your backend
    if (onSuccess) {
      onSuccess()
    }
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <OfferBasicInfoStep formData={formData} onNext={handleNext} />
      case 1:
        return <OfferDetailsStep formData={formData} onNext={handleNext} onBack={handleBack} />
      case 2:
        return <OfferRelationsStep formData={formData} onNext={handleNext} onBack={handleBack} />
      case 3:
        return <OfferAssignmentsStep formData={formData} onNext={handleNext} onBack={handleBack} />
      case 4:
        return <OfferObservationsStep formData={formData} onNext={handleNext} onBack={handleBack} />
      case 5:
        return <OfferSummaryStep formData={formData} onSubmit={handleSubmit} onBack={handleBack} />
      default:
        return "Unknown step"
    }
  }

  const CustomStepIcon = ({ active, completed, icon }: { active?: boolean; completed?: boolean; icon: React.ReactNode }) => (
    <StyledStepIcon active={active} completed={completed}>
      {icon}
    </StyledStepIcon>
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {offer ? "Editar Oferta" : "Nueva Oferta"}
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((step, index) => (
            <Step key={step.label} completed={index < activeStep}>
              <StepLabel 
                StepIconComponent={(props) => (
                  <CustomStepIcon 
                    {...props} 
                    icon={step.icon}
                  />
                )}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box>{getStepContent(activeStep)}</Box>
      </CardContent>
    </Card>
  )
}
