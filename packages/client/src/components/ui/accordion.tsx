'use client'
import React, { HTMLProps, PropsWithChildren } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { AccordionContentProps, AccordionTriggerProps } from '@radix-ui/react-accordion'
import { ChevronDownIc } from '../icons'

const AccordionUi = ({ children }: PropsWithChildren) => (
  <Accordion.Root
    className='bg-white rounded-md shadow-[0_2px_10px] shadow-black/5 w-full'
    type='single'
    defaultValue='item-1'
    collapsible
  >
    {children}
  </Accordion.Root>
)

interface AccordionItemProps extends HTMLProps<HTMLDivElement> {
  value: string
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  function AccordionItem({ children, ...props }, forwardedRef) {
    return (
      <Accordion.Item
        className='bg-yellow-200 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]'
        {...props}
        ref={forwardedRef}
      >
        {children}
      </Accordion.Item>
    )
  }
)

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger({ children, ...props }, forwardedRef) {
    return (
      <Accordion.Header className='flex'>
        <Accordion.Trigger
          className='text-purple-900 hover:bg-yellow-300 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-blue px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none'
          {...props}
          ref={forwardedRef}
        >
          {children}
          <ChevronDownIc className='text-purple-900 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180 h-6 w-6' />
        </Accordion.Trigger>
      </Accordion.Header>
    )
  }
)

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  function AccordionContent({ children, ...props }, forwardedRef) {
    return (
      <Accordion.Content
        className='text-gray-600 bg-yellow-50 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-base'
        {...props}
        ref={forwardedRef}
      >
        <div className='py-[15px] px-5'>{children}</div>
      </Accordion.Content>
    )
  }
)

export default AccordionUi
