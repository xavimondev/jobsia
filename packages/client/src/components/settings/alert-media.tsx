type AlertMediaProps = {
  message: string
}

export function AlertMedia({ message }: AlertMediaProps) {
  return (
    <div className='p-3 border rounded-lg text-red-400 border-red-300 animate-fadeInUp animate-duration-500'>
      <div className='flex items-center justify-between'>
        <h4>{message}</h4>
      </div>
    </div>
  )
}
