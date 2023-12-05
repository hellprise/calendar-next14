'use client'

import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import { store } from '@/store/store'

import StyledComponentsRegistry from '@/lib/registry'

export function Providers({ children }: PropsWithChildren<unknown>) {
	return (
		<Provider store={store}>
			<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
		</Provider>
	)
}
