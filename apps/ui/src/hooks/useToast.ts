import { useState } from 'react'

export interface ToastProps {
  message?: string
  type?: 'positive' | 'negative' | 'warning'
  open?: boolean
}

const useToast = () => {
  const [toast, setToast] = useState<ToastProps>({ open: false })

  return {
    toast,
    setToast,
  }
}

export default useToast
