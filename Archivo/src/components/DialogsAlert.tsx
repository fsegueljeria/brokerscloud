// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

type Props = {
  title: string
  message: string
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

const DialogsAlert = ({ title, message, open, onClose, onConfirm }: Props) => {
  // States
  // const [open, setOpen] = useState<boolean>(false)
  // const handleClickOpen = () => setOpen(true)
  // const handleClose = () => setOpen(false)

  return (
    <>
      {/* <Button variant='outlined' onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        closeAfterTransition={false}
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant='outlined' color='secondary'>
            Cancelar
          </Button>
          <Button onClick={onConfirm} variant='contained'>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogsAlert