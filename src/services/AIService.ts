import { streamText } from 'ai'
import { openrouter } from '../lib/ai'

export default {
    async generateRecipe(prompt: string) {
        const result = streamText({
            model: openrouter('meta-llama/llama-3.3-8b-instruct:free'),
            prompt,
            system: 'Eres un bartender que tiene 50 años de experiencia y le sirvió una beida a James Bond'
        })

        return result.textStream
    }
}