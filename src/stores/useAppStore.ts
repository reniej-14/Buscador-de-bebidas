import { create } from 'zustand'
import { createRecipiesSlice, type RecipesSliceType } from './recipeSlice'
import type { FavoriteSliceType } from './favorite.Slice'
import { createFavoritesSlice } from './favorite.Slice'

export const useAppStore = create<RecipesSliceType & FavoriteSliceType>((...a) => ({
    ...createRecipiesSlice(...a),
    ...createFavoritesSlice(...a)
}))