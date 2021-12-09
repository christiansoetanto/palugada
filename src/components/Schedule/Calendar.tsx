import React from "react";
import ICell from "../../interfaces/ICell";
import Cell from "./Cell";
interface Props {
	cells: ICell[];
	currentMonth: number;
	onClick: (date: Date) => void;
}

const Calendar: React.FunctionComponent<Props> = (props: Props) => {
	const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

	const { cells, currentMonth, onClick } = props;

	const dateClickHandler = (date: Date) => {
		onClick(date);
	};

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
			<div className='grid grid-cols-7 rounded-xl gap-0'>
				{cells.map((e, index) => {
					return <Cell date={e.date} currentMonth={currentMonth} key={index} onClick={dateClickHandler} />;
				})}
			</div>
		</div>
	);
};
export default Calendar;
