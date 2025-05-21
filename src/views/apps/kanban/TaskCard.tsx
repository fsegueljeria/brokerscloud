// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import LinearProgress from "@mui/material/LinearProgress"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"

// Material Icons
import PersonIcon from "@mui/icons-material/Person"
import HomeIcon from "@mui/icons-material/Home"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import PhoneIcon from "@mui/icons-material/Phone"
import EmailIcon from "@mui/icons-material/Email"

// Third-Party Imports
import classnames from 'classnames'

// Type Imports
import type { ColumnType, TaskType } from '@/types/apps/kanbanTypes'
import type { AppDispatch } from '@/redux-store'
import type { ThemeColor } from '@core/types'

// Slice Imports
import { getCurrentTask, deleteTask } from '@/redux-store/slices/kanban'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styles Imports
import styles from './styles.module.css'
import { formatCurrency } from "@/libs/utils"

type chipColorType = {
  color: ThemeColor
}

type TaskCardProps = {
  task: TaskType
  dispatch: AppDispatch
  column: ColumnType
  setColumns: (value: ColumnType[]) => void
  columns: ColumnType[]
  setDrawerOpen: (value: boolean) => void
  tasksList: (TaskType | undefined)[]
  setTasksList: (value: (TaskType | undefined)[]) => void
}

export const chipColor: { [key: string]: chipColorType } = {
  'Casa': { color: 'success' },
  'Departamento': { color: 'error' },
  'Oficina': { color: 'info' },
  'Comercial': { color: 'warning' },
  'Sede': { color: 'secondary' },
  'Desarrollo Urbano': { color: 'primary' }
}

const TaskCard = (props: TaskCardProps) => {
  // Props
  const { task, dispatch, column, setColumns, columns, setDrawerOpen, tasksList, setTasksList } = props

  // States
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  // Handle menu click
  const handleClick = (e: any) => {
    setMenuOpen(true)
    setAnchorEl(e.currentTarget)
  }

  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null)
    setMenuOpen(false)
  }

  // Handle Task Click
  const handleTaskClick = () => {
    setDrawerOpen(true)
    dispatch(getCurrentTask(task.id))
  }

  // Delete Task
  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id))
    setTasksList(tasksList.filter(taskItem => taskItem?.id !== task.id))

    const newTaskIds = column.taskIds.filter(taskId => taskId !== task.id)
    const newColumn = { ...column, taskIds: newTaskIds }
    const newColumns = columns.map(col => (col.id === column.id ? newColumn : col))

    setColumns(newColumns)
  }

  // Handle Delete
  const handleDelete = () => {
    handleClose()
    handleDeleteTask()
  }

  return (
    <>
      <Card
        className={classnames(
          'item-draggable is-[16.5rem] cursor-grab active:cursor-grabbing overflow-visible mbe-4',
          styles.card
        )}
        onClick={() => handleTaskClick()}
      >
        <CardContent className='flex flex-col gap-y-2 items-start relative overflow-hidden'>
          {task.badgeText && task.badgeText.length > 0 && (
            <div className='flex flex-wrap items-center justify-start gap-2 is-full max-is-[85%]'>
              {task.badgeText.map(
                (badge, index) =>
                  chipColor[badge]?.color && (
                    <Chip variant='tonal' key={index} label={badge} size='small' color={chipColor[badge].color} />
                  )
              )}
            </div>
          )}
          <div className='absolute block-start-4 inline-end-3' onClick={e => e.stopPropagation()}>
            <IconButton
              aria-label='more'
              size='small'
              className={classnames(styles.menu, {
                [styles.menuOpen]: menuOpen
              })}
              aria-controls='long-menu'
              aria-haspopup='true'
              onClick={handleClick}
            >
              <i className='ri-more-2-line text-xl' />
            </IconButton>
            <Menu
              id='long-menu'
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Ver Detalle</MenuItem>
              <MenuItem onClick={handleClose}>Editar</MenuItem>
              <MenuItem onClick={handleClose}>Programar Visita</MenuItem>
              <MenuItem onClick={handleClose}>Crear Oferta</MenuItem>
              <MenuItem
                onClick={() => {
                  handleDelete()
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </div>

          {task.image && <img src={task.image} alt='task Image' className='is-full rounded' />}
          <Typography color='text.primary' className='max-is-[85%] break-words'>
            {task.title}
          </Typography>
          
          <LinearProgress
          variant="determinate"
          value={task.opportunity?.probability}
          color={task.opportunity?.probability > 70 ? "success" : task.opportunity?.probability > 30 ? "primary" : "warning"}
          sx={{ height: 4, borderRadius: 1, mb: 2 }}
        />
          <Stack spacing={1}>
          {/* Cliente */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PersonIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
            <Tooltip title={task.opportunity?.prospect} arrow>
              <Typography variant="body2" noWrap color="text.secondary">
                {task.opportunity?.prospect || "Cliente no asignado"}
              </Typography>
            </Tooltip>
          </Box>

          {/* Monto y presupuesto */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AttachMoneyIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                {formatCurrency(task.opportunity?.amount, task.opportunity?.curCode)}
              </Typography>
            </Box>
            <Tooltip title={`Presupuesto: ${formatCurrency(task.opportunity?.budget, task.opportunity?.budgetCurrency)}`} arrow>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccountBalanceWalletIcon fontSize="small" sx={{ mr: 0.5, color: "text.secondary" }} />
                <Typography variant="caption" color="text.secondary">
                  {formatCurrency(task.opportunity?.budget, task.opportunity?.budgetCurrency)}
                </Typography>
              </Box>
            </Tooltip>
          </Box>

          {/* Propiedades */}
          {task.opportunity?.properties && task.opportunity?.properties.length > 0 && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <HomeIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
              <Tooltip title={task.opportunity?.properties.map((p) => p).join(", ")} arrow>
                <Typography variant="body2" noWrap color="text.secondary">
                  {task.opportunity.properties.length > 1
                    ? `${task.opportunity.properties[0]} +${task.opportunity.properties.length - 1}`
                    : task.opportunity.properties[0]}
                </Typography>
              </Tooltip>
            </Box>
          )}

          {(task.attachments !== undefined && task.attachments > 0) ||
          (task.comments !== undefined && task.comments > 0) ||
          (task.assigned !== undefined && task.assigned.length > 0) ? (
            <div className='flex justify-between items-center gap-4 is-full'>
              {(task.attachments !== undefined && task.attachments > 0) ||
              (task.comments !== undefined && task.comments > 0) ? (
                <div className='flex gap-4'>
                  {task.attachments !== undefined && task.attachments > 0 && (
                    <div className='flex items-center gap-1'>
                      <i className='ri-attachment-2 text-xl text-textSecondary' />
                      <Typography color='text.secondary'>{task.attachments}</Typography>
                    </div>
                  )}
                  {task.comments !== undefined && task.comments > 0 && (
                    <div className='flex items-center gap-1'>
                      <i className='ri-wechat-line text-xl text-textSecondary' />
                      <Typography color='text.secondary'>{task.comments}</Typography>
                    </div>
                  )}
                </div>
              ) : null}
              {task.assigned !== undefined && task.assigned.length > 0 && (
                <AvatarGroup max={4} className='pull-up'>
                  {task.assigned?.map((avatar, index) => (
                    <Tooltip title={avatar.name} key={index}>
                      <CustomAvatar
                        key={index}
                        src={avatar.src}
                        alt={avatar.name}
                        size={26}
                        className='cursor-pointer'
                      />
                    </Tooltip>
                  ))}
                </AvatarGroup>
              )}
            </div>
          ) : null}
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}

export default TaskCard
