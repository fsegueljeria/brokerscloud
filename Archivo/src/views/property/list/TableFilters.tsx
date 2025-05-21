'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'

type Props = {
  filters: Record<string, any>
  setFilters: (value: Record<string, any>) => void
  fetchData: () => void
}

const monedas = ['CLP', 'USD', 'UF']
const tipos = ['CASA', 'DEPARTAMENTO', 'TERRENO', 'PARCELA']
const names = ['DISPONIBLE', 'NODISPONIBLE', 'BORRADOR', 'RESERVADA', 'VENDIDA', 'ALQUILADA']

const TableFilters = ({ filters, setFilters, fetchData }: Props) => {
  const [selectedStates, setSelectedStates] = useState<string[]>(filters?.['state.in'] || [])

  const handleMultiChange = (field: string, value: string[]) => {
    setSelectedStates(value)

    const newFilters = {
      ...filters,
      [field]: value.length > 0 ? value : undefined
    }

    setFilters(newFilters)
  }

  const handleSelectChange = (field: string, value: string) => {
    const newFilters = {
      ...filters,
      [field]: value || undefined
    }
    setFilters(newFilters)
  }

  useEffect(() => {
    fetchData()
  }, [filters])

  return (
    <CardContent>
      <Typography variant='subtitle1' gutterBottom>
        Filtros
      </Typography>
      <Grid container spacing={6}>
        {/* Estado */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id='demo-multiple-chip-label'>Estado</InputLabel>
            <Select
              multiple
              label='Estado'
              labelId='state-multi-select-label'
              id='state-multi-select'
              value={selectedStates}
              onChange={e => handleMultiChange('state.in', e.target.value as string[])}
              renderValue={selected => (
                <div className='flex flex-wrap gap-1'>
                  {(selected as unknown as string[]).map(value => (
                    <Chip key={value} label={value} size='small' />
                  ))}
                </div>
              )}
            >
              {names.map(name => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Moneda */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id='curCode-select'>Moneda</InputLabel>
            <Select
              labelId='curCode-select'
              value={filters?.['curCode.equals'] || ''}
              label='Moneda'
              onChange={e => handleSelectChange('curCode.equals', e.target.value)}
            >
              <MenuItem value=''>Todas</MenuItem>
              {monedas.map(item => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Tipo */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id='type-select'>Tipo</InputLabel>
            <Select
              labelId='type-select'
              value={filters?.['type.equals'] || ''}
              label='Tipo'
              onChange={e => handleSelectChange('type.equals', e.target.value)}
            >
              <MenuItem value=''>Todos</MenuItem>
              {tipos.map(item => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
