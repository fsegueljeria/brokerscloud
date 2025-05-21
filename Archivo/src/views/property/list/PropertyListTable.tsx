'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'
import type { PropertyType } from '@/types/apps/propertyTypes'
import Switch from '@mui/material/Switch'
import ViewPropertyDrawer from './ViewPropertyDrawer'

import { toast } from 'react-toastify'
// Third-party Imports
import classnames from 'classnames'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'
import DialogsAlert from '@/components/DialogsAlert' 
import { getProperties, deleteProperty } from '@/app/server/property/propertyActions'

// Type Imports
import type { ThemeColor } from '@core/types'
import type { Locale } from '@configs/i18n'

// Component Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'
import TableFilters from './TableFilters'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type PropertyTypeWithAction = PropertyType & {
  action?: string
}

type propertyStateType = {
  [key: string]: {
    title: string
    color: ThemeColor
  }
}

type PropertyTypeObj = {
  [key: string]: {
    icon: string
    color: ThemeColor
  }
}

// Vars
const propertyTypeObj: PropertyTypeObj = {
  CASA: { color: 'secondary', icon: 'ri-home-line' },
  DEPARTAMENTO: { color: 'success', icon: 'ri-home-9-line' },
  TERRENO: { color: 'primary', icon: 'ri-map-line' },
  PARCELA: { color: 'info', icon: 'ri-map-2-line' }
}

// Column Definitions
const columnHelper = createColumnHelper<PropertyTypeWithAction>()

// Types
type ServerPaginationResponse = {
  content: PropertyTypeWithAction[]
  totalElements: number
}

const productStatusObj: propertyStateType = {
  BORRADOR: { title: 'Borrador', color: 'warning' },
  DISPONIBLE: { title: 'Disponible', color: 'success' },
  NODISPONIBLE: { title: 'No Disponible', color: 'error' },
  RESERVADA: { title: 'Reservada', color: 'error' },
  VENDIDA: { title: 'Vendida', color: 'success' },
  ALQUILADA: { title: 'Alquilada', color: 'error' }
}



const PropertyListTable = ({ initialData }: { initialData: ServerPaginationResponse }) => {
  const [data, setData] = useState(initialData.content)
  const [totalRows, setTotalRows] = useState(initialData.totalElements)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [sort, setSort] = useState('id')
  const [filters, setFilters] = useState<Record<string, any>>({})
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [viewPropertyOpen, setViewPropertyOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<PropertyType | null>(null)
  const [sorting, setSorting] = useState<SortingState>([])
  const { lang: locale } = useParams()
  
  const fetchData = async () => {
    const result = await getProperties({ page, size, sort, filters })
    // const result = await getPropertiListData()
    setData(result.content)
    setTotalRows(result.totalElements)
  }

  useEffect(() => {
    fetchData()
  }, [page, size, sort])

  useEffect(() => {
    const sortParam = sorting[0] ? `${sorting[0].id},${sorting[0].desc ? 'desc' : 'asc'}` : 'id'
    setSort(sortParam)
  }, [sorting])


  const handleDelete = async () => {
    if (!selectedId) return

    try {
      const res = await deleteProperty(selectedId)
      if (res !== '') throw new Error('Error al eliminar la propiedad')

      toast.success('Propiedad eliminada exitosamente.')
      fetchData()
    } catch (error) {
      toast.error('Propiedad eliminada exitosamente.')
    } finally {
      setSelectedId(null)
      setOpenDialog(false)
    }
  }

  const handleOpenDialog = (id: number) => {
    setSelectedId(id)
    setOpenDialog(true)
  }

  // Definir columnas de la tabla
  const columns = useMemo<ColumnDef<PropertyType, any>[]>(
    () => [
      columnHelper.accessor('id', {
        header: '#',
        cell: ({ row }) => (
          <Typography
            component='a'
            href={getLocalizedUrl(`/apps/invoice/preview/${row.original.id}`, locale)}
            color='primary.main'
          >{`#${row.original.id}`}</Typography>
        )
      }),
      columnHelper.accessor('name', {
        header: 'Nombre',
        enableSorting: true,
        cell: ({ row }) => <Typography>{row.original.name}</Typography>
      }),
      columnHelper.accessor('type', {
        header: 'Tipo',
        cell: ({ row }) => 
          (
            <div className='flex items-center gap-4'>
            <CustomAvatar skin='light' color={propertyTypeObj[row.original.type].color} size={30}>
              <i className={classnames(propertyTypeObj[row.original.type].icon, 'text-lg')} />
            </CustomAvatar>
            <Typography color='text.primary'>{row.original.type}</Typography>
          </div>   
          )
      }),
      columnHelper.accessor('curCode', {
        header: 'Moneda',
        cell: ({ row }) => <Typography>{row.original.curCode}</Typography>
      }),
      columnHelper.accessor('price', {
        header: 'Precio',
        cell: ({ row }) => <Typography>{row.original.curCode !== 'UF' ? `$` : ''}{row.original.price}</Typography>
      }),
      columnHelper.accessor('state', {
        header: 'Estado',
        cell: ({ row }) => (
          <Chip
          label={productStatusObj[row.original.state].title}
          variant='tonal'
          color={productStatusObj[row.original.state].color}
          size='small'
        />
        )
      }),
      columnHelper.accessor('shared', {
        header: 'Compartida',
        cell: ({ row }) => <Switch defaultChecked={row.original.shared} />,
        enableSorting: false
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
             <IconButton onClick={() => { handleOpenDialog(row.original.id) }} >
               <i className='ri-delete-bin-7-line text-textSecondary' />
             </IconButton>
             <IconButton onClick={() => { 
              setSelectedProperty(row.original)
              setViewPropertyOpen(true)
              }}>
                <i className='ri-eye-line text-textSecondary' />
            </IconButton>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Download',
                  icon: 'ri-download-line',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                },
                {
                  text: 'Edit',
                  icon: 'ri-pencil-line',
                  href: getLocalizedUrl(`/apps/invoice/edit/${row.original.id}`, locale as Locale),
                  linkProps: {
                    className: 'flex items-center is-full plb-2 pli-4 gap-2 text-textSecondary'
                  }
                },
                {
                  text: 'Duplicate',
                  icon: 'ri-file-copy-line',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    [data]
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination: {
        pageIndex: page,
        pageSize: size
      }
    },
    onSortingChange: setSorting,
    manualSorting: true,
    manualPagination: true,
    pageCount: Math.ceil(totalRows / size)
  })

  return (
    <Card>
      <CardContent className='flex justify-between items-center'>
        <Typography variant="h6">Lista de Propiedades</Typography>
      </CardContent>
      <TableFilters filters={filters} setFilters={setFilters} fetchData={fetchData} />
      <Divider />
      <div className='flex justify-end p-5'>
          <Button
            variant='contained'
            component={Link}
            href={getLocalizedUrl('property/add', locale as Locale)}
            startIcon={<i className='ri-add-line' />}
            className='max-sm:is-full is-auto'
          >
            Crear Propiedad
          </Button>
      </div>

      <DialogsAlert
        title="Eliminar propiedad"
        message="¿Estás seguro de que deseas eliminar esta propiedad?"
        open={openDialog}
        onConfirm={handleDelete}
        onClose={() => setOpenDialog(false)}
      />
  
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    <div
                      className='flex items-center cursor-pointer select-none'
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <i className='ri-arrow-up-s-line text-xl' />,
                        desc: <i className='ri-arrow-down-s-line text-xl' />
                      }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className='text-center'>No hay datos disponibles</td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TablePagination
        component='div'
        count={totalRows}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={size}
        onRowsPerPageChange={e => {
          setSize(parseInt(e.target.value, 10))
          setPage(0)
        }}
        rowsPerPageOptions={[10, 25, 50]}
      />
      <ViewPropertyDrawer
        open={viewPropertyOpen}
        selectedProperty={selectedProperty}
        handleClose={() => setViewPropertyOpen(!viewPropertyOpen)}
      />
    </Card>
  )
}

export default PropertyListTable
