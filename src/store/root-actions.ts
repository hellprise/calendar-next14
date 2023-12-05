import { eventsSlice } from './events/eventsSlice'

export const rootActions = {
	...eventsSlice.actions
}
