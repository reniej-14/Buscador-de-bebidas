import { create } from 'zustand'
import { createRecipiesSlice, type RecipesSliceType } from './recipeSlice'
import type { FavoriteSliceType } from './favorite.Slice'
import { createFavoritesSlice } from './favorite.Slice'
import { createNotificationSlice, type NotificationSliceType } from './notificationSlice'

export const useAppStore = create<RecipesSliceType & FavoriteSliceType & NotificationSliceType>((...a) => ({
    ...createRecipiesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a)
}))