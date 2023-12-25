import React, { ReactNode, useState } from 'react'

import Button from 'share-ui/components/Button/Button'

import { ToastContext } from 'contexts'
import styled from 'styled-components'
import { ButtonPrimary } from 'components/Button/Button'
import Toast from 'share-ui/components/Toast/Toast'

export interface ToastProps {
  message?: string
  type?: 'positive' | 'negative' | 'warning'
  open?: boolean
  url?: string
  linkLabel?: string
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
        position={Toast.positions?.BOTTOM_RIGHT}
        autoHideDuration={toast.autoHideDuration || 5000}
        open={toast.open}
        // action={
        //   toast.url && (
        //     <ButtonPrimary onClick={() => window.open(toast.url, '_blank')}>
        //       See Transaction
        //     </ButtonPrimary>
        //   )
        // }
        link={toast.url}
        linkLabel={toast.linkLabel}
        onClose={() => setToast({ open: false })}
      />
    </ToastContext.Provider>
  )
}

export default ToastProvider
