import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IPublicHoliday, TFullPublicHoliday } from '@/types/calendar'

import { addUuid } from '@/utils/addUuid'

export const holidaysApi = createApi({
	reducerPath: 'holidaysApi',
	baseQuery: fetchBaseQuery({ baseUrl: process.env.API_URL }),
	endpoints: builder => ({
		getPublicHolidays: builder.query<TFullPublicHoliday[], { year: number; countryCode: string }>({
			query: ({ year, countryCode }) => `PublicHolidays/${year}/${countryCode}`,
			transformResponse: (response: IPublicHoliday[]) => {
				const items = response.map(item => {
					return {
						...item,
						// date: new Date(item.date),
						color: '#FF0000',
						id: addUuid()
					}
				})

				return items
			}
		})
	})
})

export const { useGetPublicHolidaysQuery } = holidaysApi
