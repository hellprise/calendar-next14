import { SVGProps } from 'react'

export type TypeIconVariant = 'chevron-left' | 'chevron-right' | 'trash' | 'close'

export interface IIconProps extends SVGProps<SVGSVGElement> {
	variant: TypeIconVariant
}
