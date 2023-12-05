import { FC } from 'react'

import { IIconProps } from './Icon.interface'

export const Icon: FC<IIconProps> = ({ variant, width, height, fill, stroke, ...props }) => {
	const defaultProps = {
		width: width || '20',
		height: height || '20',
		...props
	}

	switch (variant) {
		case 'chevron-left':
			return (
				<svg {...defaultProps} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
					<path
						fill={fill || 'none'}
						stroke={stroke || 'currentColor'}
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='48'
						d='M328 112L184 256l144 144'
					/>
				</svg>
			)

		case 'chevron-right':
			return (
				<svg {...defaultProps} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
					<path
						fill={fill || 'none'}
						stroke={stroke || 'currentColor'}
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='48'
						d='M184 112l144 144-144 144'
					/>
				</svg>
			)

		case 'trash':
			return (
				<svg {...defaultProps} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
					<path
						d='M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320'
						fill='none'
						stroke='currentColor'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='32'
					/>
					<path stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M80 112h352' />
					<path
						d='M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224'
						fill='none'
						stroke='currentColor'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='32'
					/>
				</svg>
			)

		case 'close':
			return (
				<svg {...defaultProps} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
					<path
						fill='none'
						stroke='currentColor'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='32'
						d='M368 368L144 144M368 144L144 368'
					/>
				</svg>
			)

		default:
			return <></>
	}
}
