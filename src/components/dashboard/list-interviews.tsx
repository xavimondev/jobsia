'use client'
import Image from 'next/image'
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
import { useStore } from '@/store'
import { getReadableDate } from '@/utils/getReadableDate'
import { SCORE_TO_ACCOMPLISH } from '@/utils/constants'
import { DialogInterviewDetails } from '@/components/dashboard/dialog-interview-details'

export function ListInterviews() {
  const interviewReport = useStore((state) => state.interviewReport)
  const isLoadingInterviewReport = useStore((state) => state.isLoadingInterviewReport)

  return (
    <Card className='mt-6 bg-[#1d1c2d] ring-0'>
      <Title className='text-white'>Lista de Entrevistas</Title>
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
          {isLoadingInterviewReport && (
            <TableRow>
              <TableCell>
                <Text className='text-gray-300'>Cargando entrevistas...</Text>
              </TableCell>
            </TableRow>
          )}
          {interviewReport.length === 0 && !isLoadingInterviewReport && (
            <TableRow>
              <TableCell>
                <Text className='text-gray-300'>
                  Selecciona el puesto de tu interés para ver resultados.
                </Text>
              </TableCell>
            </TableRow>
          )}
          {!isLoadingInterviewReport &&
            interviewReport.length > 0 &&
            interviewReport.map((item) => (
              <TableRow key={item.interviewid}>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Image
                      src={item.photo}
                      alt={item.candidate}
                      width={20}
                      height={20}
                      className='rounded-full w-5 h-5'
                    />
                    <Text className='text-gray-300'>{item.candidate}</Text>
                  </div>
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
                  <DialogInterviewDetails
                    candidate={item.candidate}
                    scoreTotal={item.totalscore}
                    interviewId={item.interviewid}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  )
}
