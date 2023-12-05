export interface IEvent {
	date: Date
	title: string
	color?: string
	id: number
}

export interface IPublicHoliday {
	// date: Date;
	date: string
	localName: string
	name: string
	countryCode: string
	fixed: boolean
	global: boolean
	counties?: any
	launchYear?: any
	types: string[]
}

// export type TFullPublicHoliday =  Partial<Omit<IPublicHoliday, "date">> & { color?: string, id: string, date: Date }
export type TFullPublicHoliday = Partial<Omit<IPublicHoliday, 'date'>> & { color?: string; id: string; date: string }
