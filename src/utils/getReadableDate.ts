const OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

export const getReadableDate = (stringDate: string) => {
  const date = new Date(stringDate)
  return date.toLocaleDateString('es-ES', OPTIONS)
}
