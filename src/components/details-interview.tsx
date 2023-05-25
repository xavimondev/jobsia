import { Interview } from '@/types'
import { useStore } from '@/store'
import AccordionUi, { AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

export function DetailsInterview() {
  const interview = useStore((state) => state.interview)
  return (
    <>
      <AccordionUi>
        {interview.map((interview, index) => (
          <DetailsItem key={interview.question} itemPos={index + 1} interview={interview} />
        ))}
      </AccordionUi>
    </>
  )
}

type DetailsItemProps = {
  interview: Interview
  itemPos: number
}

function DetailsItem({ interview, itemPos }: DetailsItemProps) {
  const { question, answer, score, feedback } = interview
  return (
    <AccordionItem value={`item-${itemPos}`}>
      <AccordionTrigger>
        <div className='flex items-center w-full justify-between mr-2 font-semibold'>
          <div className='max-w-4xl text-left'>
            <span>{question}</span>
          </div>
          <span className='rounded-full bg-purple-900 h-5 w-5 text-white text-sm'>{score}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <p className='text-blue-400 italic font-semibold mb-1'>Tu respuesta fue: {answer}</p>
        <p>{feedback}</p>
      </AccordionContent>
    </AccordionItem>
  )
}
