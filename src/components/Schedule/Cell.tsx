import React from "react";
import ICell from "../../interfaces/ICell";
import OrderHeaderItem from "./OrderHeaderItem";

interface Props {
	data: ICell;
	currentMonth: number;
	onDateClick: (date: Date) => void;
	isShowPastDate: boolean;
}

const Cell: React.FunctionComponent<Props> = (props: Props) => {
	const { data, currentMonth, onDateClick, isShowPastDate } = props;
	const { date, orderList } = data;

	const dateClickHandler = () => {
		onDateClick(date);
	};

	const shortMonthName = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	const isToday = +new Date().setHours(0, 0, 0, 0) === +new Date(date);
	const isSunday = date.getDay() === 0;
	const isCurrentMonth = date.getMonth() === currentMonth;
	const isPastDate = +new Date().setHours(0, 0, 0, 0) > +new Date(date);

	const bgColor = !isCurrentMonth ? "bg-gray-400" : isToday ? "bg-peach" : "bg-isabelline bg-opacity-70";
	const textColor = !isCurrentMonth ? "text-richBlack" : isSunday ? "text-red-400" : "text-copper";

	return (
		<div className={`flex flex-col border   border-gray-300  ${isPastDate && !isShowPastDate && "hidden"}`}>
			<div className={`text-sm text-center border-b-[1px] border-copper border-opacity-30  ${textColor}  ${bgColor}`}>
				{dayName[date.getDay()]}, {date.getDate()} {!isCurrentMonth && shortMonthName[date.getMonth()]}
			</div>
			<div className={`bg-isabelline bg-opacity-80 min-h-2rem lg:min-h-6rem h-full cursor-pointer flex flex-col gap-y-2 py-2`} onClick={dateClickHandler}>
				{(!orderList || orderList.length === 0) && <div className='text-sm px-3 my-2'>No order</div>}
				{orderList &&
					orderList.map((e) => {
						return <OrderHeaderItem key={e.orderHeaderId} data={e} />;
					})}
			</div>
		</div>
	);
};
export default Cell;
