export const formatString = (text: string) => {
  return text
    .replace(/\n/g, '')
    .replace(/[+\>*''_·?!•]/g, '') // remove + > * '' _ · ? ! •
    .replace(/(\s+)/g, ' ') // remove multiple spaces and leave only one
    .trim()
}
