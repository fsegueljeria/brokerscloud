'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// Third-party Imports
import { signIn } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, minLength, string, email, pipe, nonEmpty } from 'valibot'
import classnames from 'classnames'
import type { SubmitHandler } from 'react-hook-form'
import type { InferInput } from 'valibot'

// Type Imports
import type { Mode } from '@core/types'
import type { Locale } from '@configs/i18n'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import Illustrations from '@components/Illustrations'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

type ErrorType = {
  message: string[]
}

type FormData = InferInput<typeof schema>

const schema = object({
    email: pipe(string(), minLength(1, 'This field is required'), email('Please enter a valid email address')),
    password: pipe(
    string(),
    nonEmpty('This field is required'),
    minLength(5, 'Password must be at least 5 characters long')
    )
})

const LoginV1 = ({ mode }: { mode: Mode }) => {

  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorState, setErrorState] = useState<ErrorType | null>(null)
  
    // Hooks
  const router = useRouter()
  const searchParams = useSearchParams()

  // const { lang: locale } = useParams()
  const { settings } = useSettings()

  const {
    control,
    handleSubmit,
    formState: { errors }
    } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
        email: 'admin@gmail.com',
        password: 'admin'
    }
    })

  // Vars
  const darkImg = '/images/pages/auth-v2-mask-dark.png'
  const lightImg = '/images/pages/auth-v2-mask-light.png'

  // Hooks
  const { lang: locale } = useParams()
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
    })

    if (res && res.ok && res.error === null) {
        // Vars
        const redirectURL = searchParams.get('redirectTo') ?? '/'

        router.replace(getLocalizedUrl(redirectURL, locale as Locale))
    } else {
        if (res?.error) {
        const error = JSON.parse(res.error)

        setErrorState(error)
        }
    }
  }

  
  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='p-6 sm:!p-12'>
          <Link href={getLocalizedUrl('/', locale as Locale)} className='flex justify-center items-center mbe-6'>
            <Logo />
          </Link>
          <div className='flex flex-col gap-5'>
            <div>
              <Typography variant='h4'>{`Bienvenido a Brokers Cloud!👋🏻`}</Typography>
              <Typography className='mbs-1'>Gestiona tu inmobiliaria con facilidad.</Typography>
            </div>
            <form 
              noValidate
              action={() => {}}
              autoComplete='off'
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-5'>

              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                <TextField
                    {...field}
                    fullWidth
                    autoFocus
                    type='email'
                    label='Email'
                    onChange={e => {
                    field.onChange(e.target.value)
                    errorState !== null && setErrorState(null)
                    }}
                    {...((errors.email || errorState !== null) && {
                    error: true,
                    helperText: errors?.email?.message || errorState?.message[0]
                    })}
                />
                )}
              />
              
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                <TextField
                    {...field}
                    fullWidth
                    label='Password'
                    id='login-password'
                    type={isPasswordShown ? 'text' : 'password'}
                    onChange={e => {
                    field.onChange(e.target.value)
                    errorState !== null && setErrorState(null)
                    }}
                    slotProps={{
                    input: {
                        endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton
                            size='small'
                            edge='end'
                            onClick={handleClickShowPassword}
                            onMouseDown={e => e.preventDefault()}
                            aria-label='toggle password visibility'
                            >
                            <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                            </IconButton>
                        </InputAdornment>
                        )
                    }
                    }}
                    {...(errors.password && { error: true, helperText: errors.password.message })}
                />
                )}
              />
              <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                <FormControlLabel control={<Checkbox />} label='Recuérdame' />
                <Typography
                  className='text-end'
                  color='primary.main'
                  component={Link}
                  href={getLocalizedUrl('/pages/auth/forgot-password-v1', locale as Locale)}
                >
                  ¿Olvidaste tu contraseña?
                </Typography>
              </div>
              <Button fullWidth variant='contained' type='submit'>
                Iniciar Sesión
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>¿Eres nuevo en la plataforma? </Typography>
                <Typography
                  component={Link}
                  href={getLocalizedUrl('/pages/auth/register-v1', locale as Locale)}
                  color='primary.main'
                >
                  Crear una cuenta
                </Typography>
              </div>
              <Divider className='gap-3'>or</Divider>
              <div className='flex justify-center items-center gap-2'>
                <IconButton size='small' className='text-facebook'>
                  <i className='ri-facebook-fill' />
                </IconButton>
                <IconButton size='small' className='text-twitter'>
                  <i className='ri-twitter-fill' />
                </IconButton>
                <IconButton size='small' className='text-github'>
                  <i className='ri-github-fill' />
                </IconButton>
                <IconButton size='small' className='text-googlePlus'>
                  <i className='ri-google-fill' />
                </IconButton>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
      <Illustrations maskImg={{ src: authBackground }} />
    </div>
  )
}

export default LoginV1
