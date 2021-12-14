import React from "react";
import ICell from "../../interfaces/ICell";
import Cell from "./Cell";
interface Props {
	cells: ICell[];
	currentMonth: number;
	onDateClick: (date: Date) => void;
	isShowPastDate: boolean;
}

const Calendar: React.FunctionComponent<Props> = (props: Props) => {
	const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

	const { cells, currentMonth, onDateClick, isShowPastDate } = props;

	const dateClickHandler = (date: Date) => {
		onDateClick(date);
	};

	return (
		<div className='flex flex-col gap-y-4 '>
			<div className=' hidden lg:grid grid-cols-7'>
				{daysOfWeek.map((e, i) => {
					return (
						<div key={i} className={`text-center text-sm font-bold text-gray-400 ${e === "SUN" && "text-red-400"}`}>
							{e}
						</div>
					);
				})}
			</div>
			<div className='grid grid-cols-2 lg:grid-cols-7 rounded-xl gap-0'>
				{cells.map((e, index) => {
					return <Cell data={e} isShowPastDate={isShowPastDate} currentMonth={currentMonth} key={index} onDateClick={dateClickHandler} />;
				})}
			</div>
		</div>
	);
};
export default Calendar;
