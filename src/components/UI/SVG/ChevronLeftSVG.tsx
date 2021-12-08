import React, { useState, useEffect } from "react";

interface Props {
	onClick?: () => void;
}

const ChevronLeftSVG: React.FunctionComponent<Props> = (props: Props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className={`h-6 w-6 cursor-pointer`}
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			onClick={props.onClick}>
			<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
		</svg>
	);
};
export default ChevronLeftSVG;
