// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import Divider from '@mui/material/Divider'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import type { getDictionary } from '@/utils/getDictionary'

type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
  dictionary: Awaited<ReturnType<typeof getDictionary>>
}

const StepTwoCharacteristics = ({ activeStep, handleNext, handlePrev, steps, dictionary }: Props) => {

  return (
    <Grid container spacing={5} className='pbs-5 flex justify-center'>
      <Grid container size={{ xs: 6, sm: 6 }}>
        <Grid size={{ xs: 12, sm: 12 }}>
          <TextField 
            type='number' 
            fullWidth 
            label='Precio' 
            placeholder='10.000' 
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <i className='ri-money-dollar-circle-line' />
                  </InputAdornment>
                )
              }
            }}/>
        </Grid>
        <Grid size={{ xs: 12, sm: 12 }}>
          <FormControl fullWidth>
            <InputLabel id='select-cart-condition'>Moneda</InputLabel>
            <Select labelId='select-cart-condition' label='Moneda' defaultValue=''>
              <MenuItem value='clp'>
                <Typography noWrap>CLP</Typography>
              </MenuItem>
              <MenuItem value='uf'>
                <Typography noWrap>UF</Typography>
              </MenuItem>
              <MenuItem value='usd'>
                <Typography noWrap>USD</Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 12 }}>
          <Divider className='gap-3'></Divider>
        </Grid>

        <Grid size={{ xs: 6, sm: 6 }}>
          <TextField 
            type="number" 
            fullWidth 
            label='Nº Dormitorios' 
            placeholder='3'
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <i className='ri-hotel-bed-line' />
                  </InputAdornment>
                )
              }
            }} />
        </Grid>
        <Grid size={{ xs: 6, sm: 6 }}>
          <TextField 
            type="number" 
            fullWidth 
            label='Nº Baños' 
            placeholder='3' 
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <i className='ri-home-5-line' />
                  </InputAdornment>
                )
              }
            }}/>
        </Grid>
        
        <Grid size={{ xs: 6, sm: 6 }}>
          <TextField type="number" fullWidth label='Año Construcción' placeholder='2024' />
        </Grid>
        <Grid size={{ xs: 6, sm: 6 }}>
          <TextField type="number" fullWidth label='m² Construidos' placeholder='74' />
        </Grid>
        <Grid size={{ xs: 6, sm: 6 }}>
          <TextField type="number" fullWidth label='m² Semi Cubiertos' placeholder='74' />
        </Grid>
        <Grid size={{ xs: 6, sm: 6 }}>
          <TextField type="number" fullWidth label='m² Terreno Total' placeholder='156' />
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

export default StepTwoCharacteristics
