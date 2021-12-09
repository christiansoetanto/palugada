import React from "react";
import AddSVG from "../UI/SVG/AddSVG";
import InfoSVG from "../UI/SVG/InfoSVG";

interface Props {
	date: Date;
	currentMonth: number;
	onClick: (date: Date) => void;
}

const Cell: React.FunctionComponent<Props> = (props: Props) => {
	const { date, currentMonth, onClick } = props;

	const dateClickHandler = () => {
		onClick(date);
	};

	const isToday = +new Date().setHours(0, 0, 0, 0) === +new Date(date);
	const isSunday = date.getDay() === 0;
	const isCurrentMonth = date.getMonth() === currentMonth;
	return (
		<div className={`flex flex-col border border-gray-300	 `} style={{ minHeight: "6rem" }}>
			<div
				className={`text-sm  ${!isCurrentMonth && "text-gray-800"} text-center border-b-2 border-black border-transparent ${
					isSunday && "text-red-400"
				}  ${!isCurrentMonth && "bg-warmGray-400"}  ${isToday && "bg-green-300"}`}>
				{date.getDate()}
			</div>
			<div className={`bg-warmGray-100  h-full`} onClick={dateClickHandler}>
				a
			</div>
		</div>
	);
};
export default Cell;
