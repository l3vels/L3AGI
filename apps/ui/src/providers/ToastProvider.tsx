import React, { ReactNode, useState } from 'react'
import Toast from '@l3-lib/ui-core/dist/Toast'
import Button from '@l3-lib/ui-core/dist/Button'

import { ToastContext } from 'contexts'
import styled from 'styled-components'

export interface ToastProps {
  message?: string
  type?: 'positive' | 'negative' | 'warning'
  open?: boolean
  url?: string
  autoHideDuration?: number
}

type ToastProviderProps = {
  children: ReactNode
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<ToastProps>({ open: false })

  const contextValue = {
    toast,
    setToast,
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toast
        label={toast.message}
        type={toast.type}
        autoHideDuration={toast.autoHideDuration || 5000}
        open={toast.open}
        action={
          toast.url && (
            <Button onClick={() => window.open(toast.url, '_blank')}>See Transaction</Button>
          )
        }
        onClose={() => setToast({ open: false })}
      />
    </ToastContext.Provider>
  )
}

export default ToastProvider
