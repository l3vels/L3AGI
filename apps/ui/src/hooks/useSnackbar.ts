import { useSnackbar } from 'notistack'

export interface SnackbarProps {
  message: string
  variant: 'default' | 'error' | 'warning' | 'success' | 'info' | undefined
}

const useSnackbarAlert = () => {
  const { enqueueSnackbar } = useSnackbar()

  const setSnackbar = ({ message, variant }: SnackbarProps) => {
    enqueueSnackbar(message, { variant, autoHideDuration: 3000 })
  }
  return {
    setSnackbar,
  }
}

export default useSnackbarAlert
