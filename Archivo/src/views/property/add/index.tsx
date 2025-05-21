'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepConnector from '@mui/material/StepConnector'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import type { PropertyType } from '@/types/apps/propertyTypes'

// Component Imports
import StepOneInfoProperty from './StepOneInfoProperty'
import StepTwoCharacteristics from './StepTwoCharacteristics'
import StepThreeUbicationImages from './StepThreeUbicationImages'
import StepReview from './StepReview'

// Styled Component Imports
import StepperWrapper from '@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'

import type { getDictionary } from '@/utils/getDictionary'

// Vars
const steps = [
  {
    title: 'Propiedad',
    subtitle: 'Selecciona el tipo'
  },
  {
    title: 'Características',
    subtitle: 'Define detalles clave'
  },
  {
    subtitle: 'Ingresa la ubicación y sube las imágenes',
    title: 'Ubicación e Imágenes'
  },
  {
    subtitle: 'Estado',
    title: 'Disponibilidad'
  }
]

// Styled Components
const ConnectorHeight = styled(StepConnector)(() => ({
  '& .MuiStepConnector-line': {
    minHeight: 20
  }
}))


const getStepContent = (
  step: number, 
  handleNext: () => void, 
  handlePrev: () => void,  
  formData: {
    tipoPropiedad: number
    tituloPropiedad: string
    descripcion: string
  }, 
  setFormData: (data: any) => void,
  dictionary: Awaited<ReturnType<typeof getDictionary>>
) => {
    const Tag = step === 0 ? StepOneInfoProperty : step === 1 ? StepTwoCharacteristics : step === 2 ? StepThreeUbicationImages : StepReview
    return <Tag activeStep={step} handleNext={handleNext} handlePrev={handlePrev} steps={steps} formData={formData} setFormData={setFormData} dictionary={dictionary}/>
}

const CreateDeal = () => {
  // States
  const [activeStep, setActiveStep] = useState(0)

  const initialFormData: PropertyType = {
    id: 0,
    code: '',
    name: '',
    description: '',
    type: 'CASA',
    price: 0,
    curCode: '',
    shared: false,
    numberOfBedrooms: 0,
    numberOfBathrooms: 0,
    yearBuilt: new Date().getFullYear(),
    m2Built: 0,
    m2SemiCovered: 0,
    area: 0,
    address: '',
    zip: '',
    city: '',
    x: 0,
    y: 0,
    state: 'BORRADOR',
    organization: null,
    owner: null
  }
  const [formData, setFormData] = useState<PropertyType>(initialFormData)
  

  const handleNext = async () => {
    try {
      let response
      console.log('formData', formData)
      if (!formData.id || formData.id === 0) {
        //response = await createProperty(formData)
      } else {
        //response = await updateProperty(formData.id, formData)
      }
  
      // if (response?.id) {
      //   setFormData(prev => ({ ...prev, id: response.id }))
      // }
  
      if (activeStep !== steps.length - 1) {
        setActiveStep(prev => prev + 1)
      } else {
        alert('¡Propiedad enviada con éxito!')
      }
    } catch (error) {
      console.error('Error al guardar propiedad:', error)
      alert('Hubo un error al guardar la propiedad. Intenta nuevamente.')
    }
  }

  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1)
    }
  }

  return (
    <Card className='flex flex-col md:flex-row'>
      <CardContent className='max-md:border-be md:border-ie md:min-is-[300px]'>
        <StepperWrapper className='bs-full'>
          <Stepper activeStep={activeStep} connector={<ConnectorHeight />} orientation='vertical'>
            {steps.map((step, index) => {
              return (
                <Step key={index} onClick={() => setActiveStep(index)}>
                  <StepLabel
                    slots={{
                      stepIcon: StepperCustomDot
                    }}
                    className='p-0'
                  >
                    <div className='step-label cursor-pointer'>
                      <Typography className='step-number' color='text.primary'>{`0${index + 1}`}</Typography>
                      <div>
                        <Typography className='step-title' color='text.primary'>
                          {step.title}
                        </Typography>
                        <Typography className='step-subtitle' color='text.primary'>
                          {step.subtitle}
                        </Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <CardContent className='flex-1'>{getStepContent(activeStep, handleNext, handlePrev, formData, setFormData)}</CardContent>
    </Card>
  )
}

export default CreateDeal
