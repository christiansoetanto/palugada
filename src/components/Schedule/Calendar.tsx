import React, { useState, useEffect } from "react";
import { isNoSubstitutionTemplateLiteral } from "typescript";
import ICell from "../../interfaces/ICell";
import Cell from "./Cell";
interface Props {
	cells: ICell[];
	onClick: () => void;
	onDelete: () => void;
}

const Calendar: React.FunctionComponent<Props> = (props: Props) => {
	const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

	const { cells, onClick, onDelete } = props;
	return (
		<div className='flex flex-col gap-y-4'>
			<div className='grid grid-cols-7'>
				{daysOfWeek.map((e, i) => {
					return (
						<div key={i} className={`text-center text-sm font-bold text-gray-400 ${e === "SUN" && "text-red-400"}`}>
							{e}
						</div>
					);
				})}
			</div>
			<div className='grid grid-cols-7 rounded-xl grid-rows-6'>
				{cells.map((e, index) => {
					return (
						<div key={index} style={{ minHeight: "6rem" }} className='bg-warmGray-100 w-full h-full'>
							{"\u00A0"}
						</div>
					);
					// if (e.showDate) {
					// 	return (
					// 		<Cell
					// 			date={e.date}
					// 			key={index}
					// 			schedule={e.schedule}
					// 			onClick={dateClickHandler}
					// 			onDelete={deleteHandler}
					// 		/>
					// 	);
					// } else {
					// 	return <div key={index} className='bg-warmGray-100 w-full h-full'></div>;
					// }
				})}
			</div>
		</div>
	);
};
export default Calendar;
