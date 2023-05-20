'use client'
import { useState } from 'react'
import { SearchIc } from '@/components/icons'

type SearchFormProps = {
  enteredQuery: string
  onSubmit: (query: string) => void
}

export function SearchForm({ enteredQuery, onSubmit }: SearchFormProps) {
  const [searchValue, setSearchValue] = useState(enteredQuery)

  const handleSubmit = (formData: FormData) => {
    const searchValue = formData.get('search') as string
    const query = searchValue.trim()
    if (query.length === 0) return
    onSubmit(query)
  }

  return (
    <form className='flex flex-col gap-5 md:flex-row md:items-center w-full' action={handleSubmit}>
      <div className='relative w-full'>
        <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
          <SearchIc className='w-5 h-5 text-gray-500' />
        </div>
        <input
          type='search'
          name='search'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className='bg-[#232234] border-none text-white text-sm rounded-lg block w-full pl-10 p-2.5
            placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-400'
          autoCapitalize='false'
          autoComplete='off'
          autoCorrect='off'
          placeholder='Desarrollador en JavaScript con 5 años de experiencia...'
        />
      </div>
    </form>
  )
}
