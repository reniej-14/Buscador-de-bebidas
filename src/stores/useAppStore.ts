import { create } from 'zustand'
import { createRecipiesSlice, type RecipesSliceType } from './recipeSlice'
import type { FavoriteSliceType } from './favorite.Slice'
import { createFavoritesSlice } from './favorite.Slice'
import { createNotificationSlice, type NotificationSliceType } from './notificationSlice'
import { createAISlice, type AISlice } from './aiSlice'

export const useAppStore = create<RecipesSliceType & FavoriteSliceType & NotificationSliceType & AISlice>((...a) => ({
    ...createRecipiesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
    ...createAISlice(...a)
}))