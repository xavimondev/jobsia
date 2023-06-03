import { SCORE_TO_ACCOMPLISH } from '../constants'

export const getIndicators = (report: any) => {
  const indicators = {
    seleccionados: 0,
    noSeleccionados: 0,
    postulantes: report.length
  }

  report.forEach((interview: any) => {
    const isApproved = interview.totalscore >= SCORE_TO_ACCOMPLISH
    if (isApproved) indicators['seleccionados']++
    else indicators['noSeleccionados']++
  })

  return indicators
}
