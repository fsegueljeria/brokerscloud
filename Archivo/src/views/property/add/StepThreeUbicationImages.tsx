// MUI Imports
import { useState } from 'react'

import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import EntitytImage from '@components/EntitytImage'
import type { getDictionary } from '@/utils/getDictionary'

type FormData = {
  fullName: string
  phone: string
  address: string
  zipCode: string
  landmark: string
  city: string
  country: string
  addressType: string
  number: string
  name: string
  expiry: string
  cvv: string
}

type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
  formData: {
    tipoPropiedad: number
    tituloPropiedad: string
    descripcion: string
  }
  setFormData: (data: any) => void
  dictionary: Awaited<ReturnType<typeof getDictionary>>
}

const StepDealUsage = ({ activeStep, handleNext, handlePrev, steps, dictionary }: Props) => {
  return (
    <Grid container spacing={5} className='pbs-5'>

      <Grid className='pbs-2' size={{ xs: 12, sm: 12 }}>
        <Typography variant='h3'>
          ¿Cuál es la ubicación exacta del inmueble?
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 12 }}>
        <Typography>
          La dirección se verá en tu publicación.
        </Typography>
      </Grid>
      
      <Grid size={{ xs: 12, sm: 12 }}>
        <TextField fullWidth label='Dirección' placeholder='Ingrese una dirección exacta' />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <FormControl fullWidth>
          <InputLabel id='select-payment-method'>Región</InputLabel>
          <Select labelId='select-payment-method' label='Region' defaultValue=''>
            <MenuItem value='any'>Any</MenuItem>
            <MenuItem value='credit-card'>Credit Card</MenuItem>
            <MenuItem value='net-banking'>Net Banking</MenuItem>
            <MenuItem value='wallet'>Wallet</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <FormControl fullWidth>
          <InputLabel id='select-payment-method'>Ciudad</InputLabel>
          <Select labelId='select-payment-method' label='Ciudad' defaultValue=''>
            <MenuItem value='any'>Any</MenuItem>
            <MenuItem value='credit-card'>Credit Card</MenuItem>
            <MenuItem value='net-banking'>Net Banking</MenuItem>
            <MenuItem value='wallet'>Wallet</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField fullWidth type='text' label='Código Postal' placeholder='Código Postal' />
      </Grid>

      <Grid size={{ xs: 12, sm: 12 }}>
        <Divider className='gap-3'></Divider>
      </Grid>

      <Grid size={{ xs: 12, sm: 12 }}>
        <EntitytImage title="Imágenes de la propiedad" />
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

export default StepDealUsage
