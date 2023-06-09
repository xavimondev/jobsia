'use client'
import { PropsWithChildren, ReactNode, forwardRef } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

type DialogUiProps = {
  btnOpen: ReactNode
  title: string
  description?: string
  btnClose: ReactNode
}

export const DialogUi = forwardRef<HTMLDivElement, PropsWithChildren<DialogUiProps>>(
  function DialogUi({ btnOpen, title, description, btnClose, children, ...props }, forwardRef) {
    return (
      <Dialog.Root>
        <Dialog.Trigger asChild>{btnOpen}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0' />
          <Dialog.Content
            {...props}
            ref={forwardRef}
            className='data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[70vh] h-[50vw] w-[95vw] max-w-[850px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#1d1c2d] p-[25px] focus:outline-none overflow-scroll'
          >
            <Dialog.Title className='text-white m-0 text-lg font-medium'>{title}</Dialog.Title>
            {description && (
              <Dialog.Description className='text-gray-400 mt-[10px] mb-5 text-[15px] leading-normal'>
                {description}
              </Dialog.Description>
            )}
            {children}
            <Dialog.Close asChild>{btnClose}</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
  }
)
