import { configureStore } from '@reduxjs/toolkit'

import { holidaysApi } from '@/services/holidays/holidays.service'

import { eventsSlice } from './events/eventsSlice'

export const store = configureStore({
	reducer: {
		events: eventsSlice.reducer,
		[holidaysApi.reducerPath]: holidaysApi.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(holidaysApi.middleware)
})

export type TypeRootState = ReturnType<typeof store.getState>
export type TypeAppDispatch = typeof store.dispatch
