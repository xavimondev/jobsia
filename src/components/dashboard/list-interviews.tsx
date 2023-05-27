'use client'
import { useEffect, useState } from 'react'
import {
  Card,
  Title,
  Badge,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react'
import { getReadableDate } from '@/utils/getReadableDate'
import { SCORE_TO_ACCOMPLISH } from '@/utils/constants'
import { EyeIc } from '../icons'
import { Tooltip } from '../ui/tooltip'

export function ListInterviews() {
  const [listInterview, setListInterview] = useState([])

  useEffect(() => {
    fetch(`/api/dashboard?offerid=da9543e55b4748a4092c2d408be901`)
      .then((res) => res.json())
      .then((data) => {
        if (data.interviews) {
          console.log(data.interviews)
          setListInterview(data.interviews)
        }
      })
  }, [])
  return (
    <Card className='mt-6 bg-transparent border border-gray-400 border-opacity-25 ring-0'>
      <Title className='text-white'>
        Resultados de entrevistas para el puesto Desarrollo de Software
      </Title>
      <Table className='mt-5'>
        <TableHead>
          <TableRow>
            <TableHeaderCell className='text-[#b4b8c1] text-base'>Candidato</TableHeaderCell>
            <TableHeaderCell className='text-[#b4b8c1] text-base'>Ciudad</TableHeaderCell>
            <TableHeaderCell className='text-[#b4b8c1] text-base'>Oferta Laboral</TableHeaderCell>
            <TableHeaderCell className='text-[#b4b8c1] text-base'>Compañia</TableHeaderCell>
            <TableHeaderCell className='text-[#b4b8c1] text-base'>Fecha Entrevista</TableHeaderCell>
            <TableHeaderCell className='text-[#b4b8c1] text-base'>Score</TableHeaderCell>
            <TableHeaderCell className='text-[#b4b8c1] text-base'>Acciones</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listInterview.map((item: any) => (
            <TableRow key={item.interviewid} className='text-blue-500'>
              <TableCell>
                <Text className='text-gray-300'>{item.candidate}</Text>
              </TableCell>
              <TableCell>
                <Text className='text-gray-300'>{item.city}</Text>
              </TableCell>
              <TableCell>
                <Text className='text-gray-300'>{item.jobposition}</Text>
              </TableCell>
              <TableCell>
                <Text className='text-gray-300'>{item.company}</Text>
              </TableCell>
              <TableCell>
                <Text className='text-gray-300'>{getReadableDate(item.interviewdate)}</Text>
              </TableCell>
              <TableCell>
                <Text>
                  <Badge
                    className='font-bold'
                    color={SCORE_TO_ACCOMPLISH === item.totalscore ? 'green' : 'red'}
                  >
                    {item.totalscore}
                  </Badge>
                </Text>
              </TableCell>
              <TableCell>
                <Tooltip text='Click para ver el detalle'>
                  <button>
                    <EyeIc className='h-5 w-5 text-white' />
                  </button>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
