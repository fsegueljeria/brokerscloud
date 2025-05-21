import { useState, useEffect, FC } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert'
import SwiperControls from './SwiperControls'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import type { getDictionary } from '@/utils/getDictionary'

import CustomAvatar from '@core/components/mui/Avatar'


type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
  dictionary: Awaited<ReturnType<typeof getDictionary>>
}

const images = [
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA' +
  'AAAFCAYAAACNbyblAAAAHElEQVQI12P4' +
  '//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA' +
  'AAAFCAYAAACNbyblAAAAHElEQVQI12P4' +
  '//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
]


const StepReview = ({ activeStep, handleNext, handlePrev, steps, dictionary }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <Grid container spacing={6} className='pbs-5'>
      <Grid size={{ xs: 12, lg: 4, xl: 4 }}>
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

        <table className='p-5'>
          <tbody>
            <tr>
              <td className='plb-1'>
                <Typography className='font-medium'>Deal Type</Typography>
              </td>
              <td className='plb-1'>
                <Typography>Percentage</Typography>
              </td>
            </tr>
            <tr>
              <td className='font-medium plb-1'>
                <Typography className='font-medium'>Amount</Typography>
              </td>
              <td className='plb-1'>
                <Typography>25% </Typography>
              </td>
            </tr>
            <tr>
              <td className='font-medium plb-1'>
                <Typography className='font-medium'>Deal Code</Typography>
              </td>
              <td className='plb-1'>
                <Chip variant='tonal' label='25PEROFF' color='warning' />
              </td>
            </tr>
            <tr>
              <td className='font-medium plb-1'>
                <Typography className='font-medium'>Deal Title</Typography>
              </td>
              <td className='plb-1'>
                <Typography>Black friday sale, 25% OFF </Typography>
              </td>
            </tr>
            <tr>
              <td className='font-medium plb-1'>
                <Typography className='font-medium'>Deal Duration</Typography>
              </td>
              <td className='plb-1'>
                <Typography>2021-07-14 to 2021-07-30 </Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </Grid>
      <Grid size={{ xs: 12, lg: 8 }} className='flex flex-col gap-4'>
        <Card>
          <CardContent className='flex flex-wrap items-center justify-between gap-4 pbe-6'>
            <div>
              <Typography variant='h5'>UI/UX Basic Fundamentals</Typography>
              <Typography>
                Prof. <span className='font-medium text-textPrimary'>Devonne Wallbridge</span>
              </Typography>
            </div>
            <div className='flex items-center gap-4'>
              <Chip label='UI/UX' variant='tonal' size='small' color='error' />
              <i className='ri-share-forward-line cursor-pointer' />
              <i className='ri-bookmark-line cursor-pointer' />
            </div>
          </CardContent>
          <CardContent>
            <div className='border rounded'>
              <div className='mli-2 mbs-2 overflow-hidden rounded'>
                fotos
              </div>
              <div className='flex flex-col gap-6 p-5'>
                <div className='flex flex-col gap-4'>
                  <Typography variant='h5'>About this course</Typography>
                  <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus perspiciatis aliquam, iure quis quasi perferendis saepe fugit magnam facilis laboriosam nam modi ipsum necessitatibus quibusdam quas vero delectus tempora voluptatum.</Typography>
                </div>
                <Divider />
                <div className='flex flex-col gap-4'>
                  <Typography variant='h5'>By the numbers</Typography>
                  <div className='flex flex-wrap gap-x-12 gap-y-2'>
                    <List role='list' component='div' className='flex flex-col gap-2 plb-0'>
                      <ListItem role='listitem' className='flex items-center gap-2 p-0'>
                        <i className='ri-check-line text-xl text-textSecondary' />
                        <Typography>Skill level: All Level</Typography>
                      </ListItem>
                      <ListItem role='listitem' className='flex items-center gap-2 p-0'>
                        <i className='ri-group-line text-xl text-textSecondary' />
                        <Typography>Students: 38,815</Typography>
                      </ListItem>
                      <ListItem role='listitem' className='flex items-center gap-2 p-0'>
                        <i className='ri-global-line text-xl text-textSecondary' />
                        <Typography>Languages: English</Typography>
                      </ListItem>
                      <ListItem role='listitem' className='flex items-center gap-2 p-0'>
                        <i className='ri-pages-line text-xl text-textSecondary' />
                        <Typography>Captions: Yes</Typography>
                      </ListItem>
                    </List>
                    <List role='list' component='div' className='flex flex-col gap-2 plb-0'>
                      <ListItem role='listitem' className='flex items-center gap-2 p-0'>
                        <i className='ri-video-upload-line text-xl text-textSecondary' />
                        <Typography>Lectures: 19</Typography>
                      </ListItem>
                      <ListItem role='listitem' className='flex items-center gap-2 p-0'>
                        <i className='ri-time-line text-xl text-textSecondary' />
                        <Typography>Video: 1.5 total hours</Typography>
                      </ListItem>
                    </List>
                  </div>
                </div>
                <Divider />
                <div className='flex flex-col gap-4'>
                  <Typography variant='h5'>Description</Typography>
                  <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa minus, fugit voluptates modi natus voluptas laudantium sint, ea repudiandae ab cumque quae adipisci suscipit tempora quisquam dolorum aut amet iure?</Typography>
                  <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa minus, fugit voluptates modi natus voluptas laudantium sint, ea repudiandae ab cumque quae adipisci suscipit tempora quisquam dolorum aut amet iure?</Typography>
                  <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa minus, fugit voluptates modi natus voluptas laudantium sint, ea repudiandae ab cumque quae adipisci suscipit tempora quisquam dolorum aut amet iure?</Typography>
                </div>
                <Divider />
                <div className='flex flex-col gap-4'>
                  <Typography variant='h5'>Instructor</Typography>
                  <div className='flex items-center gap-4'>
                    <CustomAvatar skin='light-static' color='error' src="/images/avatars/1.png" size={38} />
                    <div className='flex flex-col gap-1'>
                      <Typography className='font-medium' color='text.primary'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde minus recusandae rerum sapiente aspernatur? Cupiditate nisi consequatur unde totam nesciunt commodi ea suscipit quia alias, sequi sapiente, dolorum, doloremque rem.
                      </Typography>
                      <Typography variant='body2'>Lorem ipsum dolor sit</Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        

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

export default StepReview
