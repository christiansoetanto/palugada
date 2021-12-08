import React, { useState, useEffect } from "react";

interface Props {
	date: Date;
}

const Cell: React.FunctionComponent<Props> = (props: Props) => {
	const dateClickHandler = () => {
		console.log("clock");
	};

	const { date } = props;
	return (
		<div
			className={`flex items-center  justify-center border border-gray-300 h-auto pb-8 ${
				+new Date().setHours(0, 0, 0, 0) === +new Date(date) && "bg-amber-100"
			}`}
			style={{ minHeight: "6rem" }}
			onClick={dateClickHandler}>
			<div className='items-center text-center text-sm'>{date.getDate()}</div>
		</div>
	);
};
export default Cell;
