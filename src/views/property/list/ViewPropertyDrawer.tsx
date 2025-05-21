// React Imports
import type { FC } from 'react';
import { useState, useEffect } from 'react'


// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'

import Skeleton from '@mui/material/Skeleton'

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

import { getAttachByProperty } from '@/app/server/property/propertyActions'
import SwiperControls from './SwiperControlsDrawer'

// Type Imports
import type { PropertyType } from '@/types/apps/propertyTypes'

type Props = {
  open: boolean
  handleClose: () => void
  selectedProperty: PropertyType | null
}

type FormValues = {
  title: string
  description: string
}


const ViewPropertyDrawer: FC<Props> = ({ open, handleClose, selectedProperty }) => {
  if (!selectedProperty) return null

  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchImages = async () => {
      if (!selectedProperty?.id) return
      setLoading(true)

      try {
        const res = await getAttachByProperty(selectedProperty?.id)

        if (res.length > 0){          
          const base64Images = res.map((img: any) => `data:${img.fileContentType};base64,${img.file}`)

          setImages(base64Images)
        }else{
          setImages(res)
        }
      } catch (error) {
        console.error('Error al cargar imágenes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [selectedProperty])
  

  // Handle Form Reset
  const handleReset = () => {
    handleClose()
  }

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: ''
    }
  })

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between p-5'>
        <Typography variant='h5'>Detalle de Propiedad</Typography>
        <IconButton size='small' onClick={handleClose}>
          <i className='ri-close-line text-2xl' />
        </IconButton>
      </div>
      <Divider />

      <div className='my-4 p-3 ps-5'>
      {loading ? (
        <div>
          <Skeleton variant="rectangular" height={120} />
          <Box sx={{ pt: 0.5 }}>
            <Skeleton />
          </Box>
        </div>
      ) : (
        images.length > 0 ? (
          <SwiperControls images={images}/>
        ) : (
          <Alert severity='warning'>No hay imágenes disponibles para esta propiedad</Alert>
        )
      )}        
      </div>

      <div className='p-3 ps-5'>
          <Controller
            control={control}
            name='nombre'
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Nombre'
                value={selectedProperty.name}
                disabled
              />
            )}
          />
      </div>

      <div className='p-3  ps-5'>
        <Controller
          name='tipo'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label='Tipo'
              value={selectedProperty.type}
              disabled
            />
          )}
        />
      </div>

      <div className='p-3 ps-5'>
          <Controller
            name='estado'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Estado'
                value={selectedProperty.state}
                disabled
              />
            )}
          />
      </div>

      <div className='flex flex-col p-3 ps-5'>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Controller
              name='estado'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Estado'
                  value={selectedProperty.curCode}
                  disabled
                />
              )}
            />
          </Grid>

          <Grid item xs={8}>
            <Controller
              name='estado'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Estado'
                  value={selectedProperty.price}
                  disabled
                />
              )}
            />
          </Grid>
        </Grid>
      </div>


      <div className='flex justify-between items-center gap-4 p-5'>
        <Button variant='contained' type='submit'>Visitar</Button>
        <Button variant='outlined' color='error' type='reset' onClick={handleReset}>Cerrar</Button>
      </div>

    </Drawer>
  )
}

export default ViewPropertyDrawer
