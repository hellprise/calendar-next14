import { IEvent } from '@/types/calendar'

export interface ICalendarProps {
	startingDate: Date
	eventsArr: IEvent[]
	onDragEvents: (updatedEvents: IEvent[]) => void
}

export interface IStyledEventProps {
	readonly bgcolor?: string
}

export interface ISevenColsGridProps {
	readonly fullheight?: string
	readonly is28days?: string
}

export interface IPortalContainerProps {
	readonly isshow?: string
}
