import React from "react";
import ICell from "../../interfaces/ICell";
import OrderHeaderItem from "./OrderHeaderItem";

interface Props {
	data: ICell;
	currentMonth: number;
	onDateClick: (date: Date) => void;
}

const Cell: React.FunctionComponent<Props> = (props: Props) => {
	const { data, currentMonth, onDateClick } = props;

	const { date, orderList } = data;
	const dateClickHandler = () => {
		onDateClick(date);
	};

	const shortMonthName = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

	const isToday = +new Date().setHours(0, 0, 0, 0) === +new Date(date);
	const isSunday = date.getDay() === 0;
	const isCurrentMonth = date.getMonth() === currentMonth;
	return (
		<div className={`flex flex-col border border-gray-300	 `} style={{ minHeight: "6rem" }}>
			<div
				className={`text-sm  ${!isCurrentMonth && "text-gray-800"} text-center border-b-2 border-black border-transparent ${
					isSunday && "text-red-400"
				}  ${!isCurrentMonth && "bg-warmGray-400"}  ${isToday && "bg-green-300"}`}>
				{date.getDate()} {!isCurrentMonth && shortMonthName[date.getMonth()]}
			</div>
			<div className={`bg-warmGray-100  h-full`} onClick={dateClickHandler}>
				{orderList &&
					orderList.map((e) => {
						return <OrderHeaderItem key={e.orderHeaderId} data={e} />;
					})}
			</div>
		</div>
	);
};
export default Cell;
