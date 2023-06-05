import { Configuration, OpenAIApi } from 'openai'

const openIAKey = process.env.OPEN_IA_KEY as string
const configuration = new Configuration({
  apiKey: openIAKey
})
export const openai = new OpenAIApi(configuration)
