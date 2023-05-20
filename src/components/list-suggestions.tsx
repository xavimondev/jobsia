import { useRouter } from 'next/navigation'

const SUGGESTIONS = [
  'Desarrollador c# con ASP.NET con 2 años de experiencia y modalidad presencial',
  'Desarrollador Java con salario de 30.000 en Barcelona',
  'Programador a Java en Sevilla con contrato indefinido y modalidad teletrabajo',
  'Administrador de sistemas Linux en Madrid con contrato indefinido'
]

export function ListSuggestions() {
  const router = useRouter()
  return (
    <div className='mx-auto max-w-6xl mt-4'>
      <div className='flex gap-4 flex-wrap'>
        {SUGGESTIONS.map((suggestion) => (
          <Suggestion
            key={suggestion}
            onClick={() => {
              router.push(`/jobs?q=${encodeURIComponent(suggestion)}`)
            }}
          >
            {suggestion}
          </Suggestion>
        ))}
      </div>
    </div>
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

function Suggestion({ children, ...rest }: ButtonProps) {
  return (
    <button
      className='border border-white border-opacity-10 text-sm sm:text-base w-full sm:w-auto hover:border-opacity-30 shadow-md rounded-lg transition duration-200 ease-in-out group hover:-translate-y-1 z-10 bg-[#13111a] text-[#bac8de] hover:text-white p-2'
      {...rest}
    >
      {children}
    </button>
  )
}
