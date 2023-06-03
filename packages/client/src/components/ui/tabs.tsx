import * as Tabs from '@radix-ui/react-tabs'
import { PropsWithChildren, ReactNode } from 'react'

type TabsUiProps = {
  tabs: ReactNode
}

export function TabsUi({ tabs, children }: PropsWithChildren<TabsUiProps>) {
  return (
    <Tabs.Root
      className='flex flex-col w-full border border-gray-400 border-opacity-25 rounded-lg'
      defaultValue='tab1'
    >
      <Tabs.List className='shrink-0 flex border-b ' aria-label='Manage your list'>
        {tabs}
      </Tabs.List>
      {children}
    </Tabs.Root>
  )
}
