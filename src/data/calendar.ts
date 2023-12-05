import { v4 as uuidv4 } from 'uuid'

import { dateToString } from '@/utils/calendar'

export const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const mockEvents = [
	{
		date: dateToString(new Date()),
		name: 'create a new event for this day',
		color: '#238783',
		id: uuidv4()
	}
]

// export const mockEvents = [
// 	{
// 		date: new Date(2023, 12, 10),
// 		title: 'appointment',
// 		color: '#238783',
// 		id: 1
// 	},
// 	{
// 		date: new Date(2023, 11, 15),
// 		title: 'car wash',
// 		color: '#708898',
// 		id: 2
// 	},
// 	{
// 		date: new Date(2023, 11, 22),
// 		title: 'doctors',
// 		color: '#047106',
// 		id: 3
// 	}
// ]
