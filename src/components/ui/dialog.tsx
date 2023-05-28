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
            className='data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[95vw] max-w-[850px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#1d1b25] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'
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
