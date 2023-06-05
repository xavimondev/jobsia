import { formatString } from '@/utils/formatString'

export const getResumeOffer = (
  salaryDescription: string,
  experienceMin: string,
  study: string,
  contractType: string,
  requirementMin: string
) => {
  const requirements = `${
    salaryDescription === 'Salario no disponible'
      ? ''
      : `Con un salario de ${salaryDescription.replace('-', 'a')}.`
  }${
    experienceMin === 'No Requerida'
      ? 'No se requiere experiencia'
      : `Se requiere experiencia de ${experienceMin.toLowerCase()}`
  } y ${
    study === 'Sin estudios' ? 'no se requiere estudios' : `con estudios de ${study}`
  }.El contrato es ${contractType.toLowerCase()}.${
    requirementMin === ''
      ? 'No se especifican los requerimientos mínimos para esta oferta laboral'
      : `El trabajo tiene los siguientes requerimientos:${requirementMin
          .replace(/\n/g, '')
          .replace(/-/g, '')
          .replace('·', '')}`
  }`

  return formatString(requirements)
}
