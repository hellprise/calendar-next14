import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { mockEvents } from '@/data/calendar'

import { TFullPublicHoliday } from '@/types/calendar'

import { dateToString } from '@/utils/calendar'

import { IEventsInitialState } from './events.types'

const initialState: IEventsInitialState = {
	items: mockEvents
}

export const eventsSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {
		addEvent: (state, { payload }: PayloadAction<TFullPublicHoliday[]>) => {
			state.items = [...state.items, ...payload]
		},
		updateEventDate: (state, { payload }: PayloadAction<{ event: TFullPublicHoliday; date: Date }>) => {
			const { event, date } = payload

			const updatedEvent = state.items.find(e => e.id === event.id)

			if (updatedEvent) {
				updatedEvent.date = dateToString(date)
			}

			state.items = [...state.items]
		},
		deleteEvent: (state, { payload }: PayloadAction<string>) => {
			state.items = state.items.filter(event => event.id !== payload)
		}
	}
})
