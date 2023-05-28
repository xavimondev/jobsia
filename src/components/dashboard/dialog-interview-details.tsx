'use client'
import { forwardRef, useEffect, useState } from 'react'
import { Badge, Button } from '@tremor/react'
import * as Tabs from '@radix-ui/react-tabs'
import { INTERVIEW_TOTAL_QUESTIONS } from '@/utils/constants'
import { CloseIc, EyeIc } from '@/components/icons'
import { Tooltip } from '@/components/ui/tooltip'
import { DialogUi } from '@/components/ui/dialog'
import { TabsUi } from '@/components/ui/tabs'
import { RingLoader } from '@/components/loaders'

type DialogInterviewDetailsProps = {
  interviewId: string
  candidate: string
  scoreTotal: number
}
export function DialogInterviewDetails({ interviewId }: DialogInterviewDetailsProps) {
  return (
    <DialogUi
      btnOpen={<ButtonOpenDialog />}
      title='Detalle de la entrevista'
      description='En los detalles podrás visualizar los resultados de la entrevista.'
      btnClose={<ButtonCloseDialog />}
    >
      <ContentDialog interviewId={interviewId} />
    </DialogUi>
  )
}

type ContentDialogProps = {
  interviewId: string
}
function ContentDialog({ interviewId }: ContentDialogProps) {
  const [interviewDetails, setInterviewDetails] = useState<[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    if (interviewId) {
      fetch(`/api/interview-details?id=${interviewId}`)
        .then((res) => res.json())
        .then((resp) => {
          //console.log(resp.data)
          if (!resp.error) {
            const { interview_details } = resp.data
            setInterviewDetails(interview_details)
          }
        })
        .catch((err) => console.error(`Error: ${err}`))
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [])

  return (
    <div className='text-white w-full flex flex-col gap-4'>
      <TabsUi tabs={<ListTabs length={INTERVIEW_TOTAL_QUESTIONS} />}>
        {isLoading && <RingLoader msg='Cargando detalles de la entrevista' className='my-10' />}
        {interviewDetails && interviewDetails.length > 0 && (
          <>
            {interviewDetails.map((item: any, index) => (
              <Tabs.Content
                className='grow p-5 bg-transparent rounded-b-md outline-none'
                value={String(index)}
                key={item.id}
              >
                <div className='flex flex-col gap-2'>
                  <h2>
                    <Badge color='yellow'>{item.score}</Badge>
                  </h2>
                  <h3 className='text-yellow-400 font-medium'>{item.question}</h3>
                  <div className='mt-2 flex flex-col gap-2'>
                    <p>{item.answer}</p>
                    <p className='font-semibold text-blue-400'>Feedback: {item.feedback}</p>
                  </div>
                </div>
              </Tabs.Content>
            ))}
          </>
        )}
      </TabsUi>
    </div>
  )
}

type ListTabsProps = {
  length: number
}
function ListTabs({ length }: ListTabsProps) {
  return (
    <>
      {Array.from({ length }, (_, index) => index).map((item) => (
        <Tabs.Trigger
          className='bg-transparent px-5 h-[45px] flex-1 flex items-center justify-center leading-none text-gray-500 select-none first:rounded-tl-md last:rounded-tr-md hover:text-white data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:shadow-current data-[state=active]:focus:relative outline-none cursor-default'
          value={String(item)}
          key={`Question ${item}`}
        >
          {item + 1}
        </Tabs.Trigger>
      ))}
    </>
  )
}

const ButtonOpenDialog = forwardRef<HTMLButtonElement>(function ButtonOpenDialog(
  { ...props },
  forwardRef
) {
  return (
    <Tooltip text='Click para ver detalles de la entrevista'>
      <Button
        className='bg-transparent border border-gray-400 border-opacity-25 hover:bg-[#1d1b25]'
        {...props}
        ref={forwardRef}
      >
        <EyeIc className='h-5 w-5 text-white' />
      </Button>
    </Tooltip>
  )
})

const ButtonCloseDialog = forwardRef<HTMLButtonElement>(function ButtonCloseDialog(
  { ...props },
  forwardRef
) {
  return (
    <button
      className='hover:bg-[#28203f] absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full'
      aria-label='Close'
      {...props}
      ref={forwardRef}
    >
      <CloseIc className='h-4 w-4 text-gray-200' />
    </button>
  )
})
