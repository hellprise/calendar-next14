import { days } from '@/data/calendar'

export const getDaysInMonth = (date: Date) => {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

export const range = (end: number) => {
	const length = Math.abs((end - 1) / 1)

	const { result } = Array.from({ length: end }).reduce(
		({ result, current }) => ({
			result: [...result, current],
			current: current + 1
		}),
		{ result: [], current: 1 }
	)

	return result
}

export const sortDays = (date: Date) => {
	const dayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
	const sortedDays = [...days.slice(dayIndex), ...days.slice(0, dayIndex)]

	return sortedDays
}

export const datesAreOnSameDay = (first: Date, second: Date) =>
	first.getFullYear() === second.getFullYear() &&
	first.getMonth() === second.getMonth() &&
	first.getDate() === second.getDate()

export const getMonthAndYear = (date: Date) => {
	const d = date.toDateString().split(' ')

	return `${d[1]} ${d[3]}`
}

export const nextMonth = (date: Date, callback: (date: Date) => void) => {
	const mon = date.getMonth()
	if (mon < 11) {
		date.setMonth(mon + 1)
	} else {
		const newYear = date.getFullYear() + 1

		date.setMonth(0)
		date.setFullYear(newYear)
	}
	callback(new Date(date))
}

export const prevMonth = (date: Date, callback: (date: Date) => void) => {
	const mon = date.getMonth()

	if (mon > 0) {
		date.setMonth(mon - 1)
	} else {
		const newYear = date.getFullYear() - 1

		date.setMonth(11)
		date.setFullYear(newYear)
	}

	callback(new Date(date))
}

export const getRandomColor = () => {
	const letters = '0123456789ABCDEF'

	let color = '#'

	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}

	return color
}

export const getSortedDays = (date: Date) => {
	const daysInMonth = range(getDaysInMonth(date))

	const index = new Date(date.getFullYear(), date.getMonth(), 1).getDay()

	return [...Array(index === 0 ? 6 : index - 1), ...daysInMonth]
}

export const dateToString = (date: Date) => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()

	return `${year}-${month}-${day}`
}
