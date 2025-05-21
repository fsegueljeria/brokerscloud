    // React Imports
    import { useState } from 'react'

    // MUI Imports
    import Grid from '@mui/material/Grid2'
    import Typography from '@mui/material/Typography'
    import TextField from '@mui/material/TextField'
    import Button from '@mui/material/Button'

    import DirectionalIcon from '@components/DirectionalIcon'
    import EntityList from '@components/EntityList'
    import type { PropertyType } from '@/types/apps/propertyTypes'
    import type { getDictionary } from '@/utils/getDictionary'


    type Props = {
    activeStep: number
    handleNext: () => void
    handlePrev: () => void
    steps: { title: string; subtitle: string }[]
    formData: PropertyType
    setFormData: (data: any) => void
    dictionary: Awaited<ReturnType<typeof getDictionary>>
    }

    const dataEntityType = [
    { value: 'CASA', label: 'Casa', imageSrc: '/images/avatars/properties/casa.png' },
    { value: 'PARCELA', label: 'Parcela', imageSrc: '/images/avatars/properties/parcela.png' },
    { value: 'DEPARTAMENTO', label: 'Departamento', imageSrc: '/images/avatars/properties/departamento.png' },
    { value: 'TERRENO', label: 'Terreno', imageSrc: '/images/avatars/properties/terreno.png' }
    ]

    const StepOneInfoProperty = ({ activeStep, handleNext, handlePrev, steps, formData, setFormData, dictionary}: Props) => {
    const [selectedIndex, setSelectedIndex] = useState<string>('CASA')

    const handleListItemClick = (index: string) => {
      console.log(index)
      setSelectedIndex(index)
      setFormData(prev => ({ ...prev, type: index }))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target

      setFormData(prev => ({ ...prev, [name]: typeof prev[name] === 'number' ? +value : value }))
    }


    return (
      <Grid container spacing={5}>
        <Grid size={{ xs: 12 }}>
          <div className='flex mbs-5 border rounded'>
            <img
              alt='illustration'
              src='/images/banners/properties/banner-first-step-property.png'
              className='is-full max-is-full bs-auto'
            />
          </div>
        </Grid>

        <Grid size={{ xs: 12, sm: 12 }} className='flex flex-col gap-4'>
          <Typography className='text-secondary' variant='h4'>Tipo de Propiedad</Typography>
          <Typography>Elige el tipo de propiedad que deseas registrar para continuar.</Typography>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <EntityList
            items={dataEntityType}
            selectedIndex={formData.type}
            onSelect={handleListItemClick}/> 
        </Grid>
        
        <Grid size={{ xs: 12, lg: 6 }} className='flex flex-col gap-4 mbs-5 '>
          <Grid size={{ xs: 12, sm: 12 }}>
            <TextField 
            fullWidth 
            label='Título propiedad' 
            placeholder='Vivienda vista al mar'
            name='name'
            value={formData.name}
            onChange={handleChange}
              />
          </Grid>
          <Grid size={{ xs: 12, sm: 12 }}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              label='Descripción'
              placeholder='Descripción'
              name='description'
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <div className='flex items-center justify-between'>
            <Button
              variant='outlined'
              color='secondary'
              disabled={activeStep === 0}
              onClick={handlePrev}
              startIcon={<DirectionalIcon ltrIconClass='ri-arrow-left-line' rtlIconClass='ri-arrow-right-line' />}
            >
              Previous
            </Button>
            <Button
              variant='contained'
              color={activeStep === steps.length - 1 ? 'success' : 'primary'}
              onClick={handleNext}
              endIcon={
                activeStep === steps.length - 1 ? (
                  <i className='ri-check-line' />
                ) : (
                  <DirectionalIcon ltrIconClass='ri-arrow-right-line' rtlIconClass='ri-arrow-left-line' />
                )
              }
            >
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </Grid>
      </Grid>
    )
    }

    export default StepOneInfoProperty
