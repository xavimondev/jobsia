'use client'
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
  Text,
  Button
} from '@tremor/react'
import { useStore } from '@/store'
import { getReadableDate } from '@/utils/getReadableDate'
import { SCORE_TO_ACCOMPLISH } from '@/utils/constants'
import { EyeIc } from '@/components/icons'
import { Tooltip } from '@/components/ui/tooltip'

export function ListInterviews() {
  const interviewReport = useStore((state) => state.interviewReport)

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
          {!interviewReport && (
            <TableRow>
              <TableCell>
                <Text className='text-gray-300'>
                  Selecciona el puesto de tu interés para ver resultados
                </Text>
              </TableCell>
            </TableRow>
          )}
          {interviewReport &&
            interviewReport.length > 0 &&
            interviewReport.map((item) => (
              <TableRow key={item.interviewid}>
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
                  <Badge
                    className='font-bold'
                    color={SCORE_TO_ACCOMPLISH === item.totalscore ? 'green' : 'red'}
                  >
                    {item.totalscore}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Tooltip text='Click para ver el detalle'>
                    <Button className='bg-transparent border border-gray-400 border-opacity-25 hover:bg-[#1d1b25]'>
                      <EyeIc className='h-5 w-5 text-white' />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  )
}
