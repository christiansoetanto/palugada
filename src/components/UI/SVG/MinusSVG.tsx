import React from "react";

interface Props {
	onClick?: () => void;
}

const MinusSVG = (props: Props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			onClick={props.onClick}
			className='h-6 w-6 cursor-pointer'
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'>
			<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z' />
		</svg>
	);
};

export default MinusSVG;
