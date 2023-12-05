import { useTypedSelector } from './useTypedSelector'

export const useEvents = () => {
	const items = useTypedSelector(({ events }) => events.items)

	const deleteDuplicateEvents = () => {
		const eventsCopy = [...items]

		eventsCopy.forEach((event, index) => {
			eventsCopy.forEach((event2, index2) => {
				if (event.date === event2.date && index !== index2) {
					eventsCopy.splice(index2, 1)
				}
			})
		})

		return eventsCopy
	}

	return { items: deleteDuplicateEvents() }
}
