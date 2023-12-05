import styled from 'styled-components'

import { isStringContainsTrue } from '@/utils/isStringContainsTrue'

import { IPortalContainerProps, ISevenColsGridProps, IStyledEventProps } from './Calendar.interface'

export const Container = styled.section`
	width: 100%;
	height: 99vh;
`

export const CalendarHead = styled.header`
	display: flex;
	justify-content: center;
	width: 100%;
	padding: 20px;
	background-color: #3e5c76;
	color: #0d1321;

	& > section {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 45%;

		& > button {
			transition: all 0.4s ease-in-out;

			&:hover:first-child {
				transform: rotate(-360deg) scale(1.4);
			}

			&:hover:last-child {
				transform: rotate(360deg) scale(1.4);
			}
		}
	}
`

export const Day = styled.button`
	position: relative;
	padding: 10px;
	font-size: 1.125rem;
	font-weight: 500;
	border-right: 2px solid #1d2d44;

	&:last-child {
		border-right: none;
	}
`

export const StyledEvent = styled.span<IStyledEventProps>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	margin: 5px 0;
	border-radius: 5px;
	background-color: ${({ bgcolor }) => bgcolor || '#f1f1f1'};
	cursor: move;
`

export const SevenColsGrid = styled.div<ISevenColsGridProps>`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	width: 100%;
	background-color: #fffafa;

	${({ fullheight }) => fullheight && `height: calc(100% - 111px);`}
	${({ fullheight, is28days }) =>
		fullheight && `grid-template-rows: repeat(${isStringContainsTrue(is28days || '') ? 4 : 5}, 1fr);`}

  & > div {
		display: flex;
		flex-direction: column;
		height: 100%;
		border: 2px solid #1d2d44;
		border-left: none;
		border-bottom: none;

		&:nth-child(7n) {
			border-right: none;
		}

		${StyledEvent} {
			display: none;
		}
		${StyledEvent}:nth-child(-n + 3) {
			display: block;
		}

		& > span {
			border-radius: 8px;
			background: #f5f5f5;
			display: block;
			text-align: right;
			font-weight: 500;
			padding: 4px 12px;
			width: fit-content;
			margin-left: auto;
			margin-top: 3px;
			margin-right: 3px;
			margin-bottom: 12px;
		}

		span.active {
			border-radius: 8px;
			background: linear-gradient(to right, #1d2d44 10%, #3e5c76 50%);
			line-height: 1;
			font-weight: 400;
			color: #fffafa;
			width: fit-content;
			margin-left: auto;
			margin-top: 3px;
			margin-right: 3px;

			&:hover {
				animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
			}

			@keyframes ping {
				75%,
				100% {
					transform: scale(1.2);
					opacity: 0;
				}
			}
		}
	}
`

export const SeeMore = styled.p`
	font-size: 12px;
	padding: 0 5px;
	margin-bottom: 0;
	cursor: pointer;
`

export const PortalContainer = styled.section<IPortalContainerProps>`
	position: absolute;
	top: 50%;
	left: 50%;
	z-index: 2;
	transform: translate(-50%, -50%);
	width: 60%;
	height: 300px;
	padding: 20px;
	background-color: white;
	border-radius: 6px;
	box-shadow: 8px 8px 20px black;

	opacity: 0;
	visibility: hidden;
	transform: translate(-50%, -50%) scale(0.5);

	transition: all 0.2s ease-in-out;

	& > div {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		& > h2 {
			font-size: 1.5rem;
			font-weight: 500;
		}
	}

	${({ isshow }) =>
		isStringContainsTrue(isshow || '') &&
		`
			opacity: 1;
			visibility: visible;
			transform: translate(-50%, -50%) scale(1);
	`}
`
