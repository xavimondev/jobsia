'use client'
import { PropsWithChildren } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

type TooltipProps = {
  text: string
  color?: string
  side?: 'left' | 'top' | 'right' | 'bottom'
}

export function Tooltip({ text, color, side, children }: PropsWithChildren<TooltipProps>) {
  const bgColor = `${color ? `bg-[${color}]` : 'bg-[#13111a]'}`
  const textColor = `${color ? `text-[${color}]` : 'text-[#13111a]'}`
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={100}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side={side ?? 'left'}
          className={`radix-side-top:animate-slide-down-fade 
          radix-side-right:animate-slide-left-fade 
          radix-side-bottom:animate-slide-up-fade 
          radix-side-left:animate-slide-right-fade 
          inline-flex  
          rounded-md 
          px-4 
          py-2.5 
          ${bgColor}`}
        >
          <TooltipPrimitive.Arrow className={`fill-current ${textColor}`} />
          <span className='block text-sm leading-none text-gray-100 max-w-sm'>{text}</span>
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
