import { ReportInterview } from '@/types'
import { SCORE_TO_ACCOMPLISH } from '@/utils/constants'

export const getIndicators = (report: ReportInterview[]) => {
  const indicators: Record<string, number> = {
    seleccionados: 0,
    noSeleccionados: 0,
    totalPostulante: report.length
  }

  report.forEach((interview) => {
    const isApproved = interview.totalscore === SCORE_TO_ACCOMPLISH
    if (isApproved) indicators['seleccionados']++
    else indicators['noSeleccionados']++
  })

  return indicators
}
