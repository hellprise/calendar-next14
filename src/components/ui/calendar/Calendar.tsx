'use client'

import clsx from 'clsx'
import { DragEvent, FC, MouseEvent, useEffect, useRef, useState } from 'react'

import { useGetPublicHolidaysQuery } from '@/services/holidays/holidays.service'

import { useActions } from '@/hooks/useActions'
import { useEvents } from '@/hooks/useEvents'

import { days } from '@/data/calendar'

import { TFullPublicHoliday } from '@/types/calendar'

import { addUuid } from '@/utils/addUuid'
import {
	dateToString,
	datesAreOnSameDay,
	getMonthAndYear,
	getRandomColor,
	getSortedDays,
	nextMonth,
	prevMonth
} from '@/utils/calendar'

import { Icon } from '../icon/Icon'

import { CalendarHead, Container, Day, PortalContainer, SevenColsGrid, StyledEvent } from './Calendar.styled'

export function Calendar(): JSX.Element {
	const [currentDate, setCurrentDate] = useState(new Date())
	const [isShowPortal, setIsShowPortal] = useState(false)
	const [portalData, setPortalData] = useState<TFullPublicHoliday | null>(null)

	const { items } = useEvents()
	const { data, error, isLoading } = useGetPublicHolidaysQuery({ year: currentDate.getFullYear(), countryCode: 'UA' })

	const { addEvent: addNewEvent, updateEventDate, deleteEvent } = useActions()

	const dragDateRef = useRef<{ date: Date; target: EventTarget } | null>(null)
	const dragIndexRef = useRef<{ index: number; target: EventTarget } | null>(null)

	const addEvent = (date: Date, e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
		if ((e.target as HTMLElement).classList.contains('StyledEvent')) return

		const text = window.prompt('Enter event name')

		if (!text) return

		date.setHours(0)
		// date.setMinutes(0)
		date.setSeconds(0)
		date.setMilliseconds(0)

		addNewEvent([
			{
				date: dateToString(date),
				name: text,
				color: getRandomColor(),
				id: addUuid()
			}
		])
	}

	const drag = (index: number, e: DragEvent<HTMLElement>) => {
		dragIndexRef.current = { index, target: e.target }
	}

	const onDragEnter = (date: Date, e: DragEvent<HTMLElement>) => {
		e.preventDefault()

		dragDateRef.current = { date, target: (e.target as any).id }
	}

	const drop = (e: DragEvent<HTMLElement>) => {
		e.preventDefault()

		items.forEach((event, index) => {
			if (index === dragIndexRef?.current?.index) {
				
				updateEventDate({ event, date: dateToString(dragDateRef?.current?.date as unknown as Date) })
			}
		})
	}

	// const drop = (ev) => {
  //   ev.preventDefault();

  //   setEvents((prev) =>
  //     prev.map((ev, index) => {
  //       if (index === dragindexRef.current.index) {
  //         ev.date = dragDateRef.current.date;
  //       }
  //       return ev;
  //     })
  //   );
  // };

	const handleOnClickEvent = (event: TFullPublicHoliday) => {
		setIsShowPortal(true)
		setPortalData(event)
	}

	const handlePortalClose = () => setIsShowPortal(false)

	const handleTrashButtonClick = () => {
		deleteEvent(portalData?.id as string)

		handlePortalClose()
	}

	useEffect(() => {
		if (error) throw new Error(error as string)

		if (data) addNewEvent(data)
	}, [data, error])

	useEffect(() => {
		if (!isLoading && data) {
			addNewEvent(data)
		}
	}, [isLoading, data])

	return (
		<>
			<Container>
				<CalendarHead>
					<section>
						<button onClick={() => prevMonth(currentDate, setCurrentDate)}>
							<Icon variant='chevron-left' />
						</button>

						<h2>{getMonthAndYear(currentDate)}</h2>

						<button onClick={() => nextMonth(currentDate, setCurrentDate)}>
							<Icon variant='chevron-right' />
						</button>
					</section>
				</CalendarHead>

				<SevenColsGrid>
					{days.map((day, index) => (
						<Day className='nonDRAG' key={index}>
							{day}
						</Day>
					))}
				</SevenColsGrid>

				<SevenColsGrid fullheight={`${true}`} is28days={`${getSortedDays(currentDate).length === 28}`}>
					{getSortedDays(currentDate).map((day, index) => (
						<div
							id={`${currentDate.getFullYear()}/${currentDate.getMonth()}/${day ? day : 'empty'}`}
							onDragEnter={e => onDragEnter(new Date(currentDate.getFullYear(), currentDate.getMonth(), day), e)}
							onDragOver={e => e.preventDefault()}
							onDragEnd={drop}
							onClick={e => addEvent(new Date(currentDate.getFullYear(), currentDate.getMonth(), day), e)}
							key={index}
						>
							{day && (
								<span
									className={clsx('nonDRAG', {
										active: datesAreOnSameDay(
											new Date(),
											new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
										)
									})}
								>
									{day}
								</span>
							)}

							<EventWrapper
								items={items}
								day={day}
								currentDate={currentDate}
								drag={drag}
								handleOnClickEvent={handleOnClickEvent}
							/>
							{/* {items.map(
									(event, index) =>
										datesAreOnSameDay(
											new Date(event.date),
											new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
										) && (
											<StyledEvent
												onDragStart={e => drag(index, e)}
												onClick={() => handleOnClickEvent(event)}
												draggable
												className='StyledEvent'
												id={`${event.color} ${event.name}`}
												key={`${event.id}`}
												bgcolor={event?.color}
											>
												{event.fixed ? event.localName : event.name}
											</StyledEvent>
										)
								)}
							</EventWrapper> */}
						</div>
					))}
				</SevenColsGrid>
			</Container>

			<Portal
				handleDelete={handleTrashButtonClick}
				isShow={isShowPortal}
				handleClose={handlePortalClose}
				data={portalData}
			/>
		</>
	)
}

// const EventWrapper: FC<{ children: JSX.Element[] }> = ({ children }) => {
const EventWrapper: FC<{
	items: TFullPublicHoliday[]
	day: number
	currentDate: Date
	drag: (index: number, e: DragEvent<HTMLElement>) => void
	handleOnClickEvent: (event: TFullPublicHoliday) => void
}> = ({ currentDate, day, drag, handleOnClickEvent, items }) => {

	const itemsInCurrentDay = items.filter(event =>
		datesAreOnSameDay(new Date(event.date), new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
	)

	// const itemsInCurrentDay = items.filter(
	// 	event => event.date === dateToString(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
	// )

	return (
		<section>
			{items.map(
				(event, index) =>
					datesAreOnSameDay(new Date(event.date), new Date(currentDate.getFullYear(), currentDate.getMonth(), day)) && (
						<StyledEvent
							onDragStart={e => drag(index, e)}
							onClick={() => handleOnClickEvent(event)}
							draggable={!event.fixed}
							className='StyledEvent'
							id={`${event.color} ${event.name}`}
							key={`${event.id}`}
							bgcolor={event?.color}
						>
							{event.fixed ? event.localName : event.name}
						</StyledEvent>
					)
			)}
			{/* {itemsInCurrentDay.map((event, index) => (
				<StyledEvent
					onDragStart={e => drag(index, e)}
					onClick={() => handleOnClickEvent(event)}
					draggable={!event.fixed}
					className='StyledEvent'
					id={`${event.color} ${event.name}`}
					key={`${event.id}`}
					bgcolor={event?.color}
				>
					{event.fixed ? event.localName : event.name}
				</StyledEvent>
			))} */}
		</section>
	)
}

const Portal = ({
	handleDelete,
	handleClose,
	isShow,
	data
}: {
	handleDelete: () => void
	handleClose: () => void
	isShow: boolean
	data: TFullPublicHoliday | null
}) => {
	return (
		<PortalContainer isshow={`${isShow}`}>
			<div>
				<h2>{data?.fixed ? data.localName : data?.name}</h2>

				<p>{new Date(data?.date || '').toDateString()}</p>

				<button onClick={handleDelete}>
					<Icon variant='trash' />
				</button>

				<button onClick={handleClose}>
					<Icon variant='close' />
				</button>
			</div>
		</PortalContainer>
	)
}
