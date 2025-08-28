import type { StateCreator } from "zustand"
import AIService from "../services/AIService"


export type AISlice = {
    recipe: string
    isGerating: boolean
    generateRecipe: (prompt: string) => Promise<void>
}

export const createAISlice : StateCreator<AISlice> = (set) => ({
    recipe: '',
    isGerating: false,
    generateRecipe: async (prompt) => {
        set({recipe: '', isGerating: true})
        const data = await AIService.generateRecipe(prompt)

        for await (const textPart of data) {
            
            set((state => ({
                recipe: state.recipe + textPart
            })))
        }
        set({isGerating: false})
    }
})