import React from "react";
import ChevronLeftSVG from "../UI/SVG/ChevronLeftSVG";
import ChevronRightSVG from "../UI/SVG/ChevronRightSVG";

interface Props {
	currentMonth: number;
	currentYear: number;
	decreaseMonth: () => void;
	increaseMonth: () => void;
}

const MonthTitle: React.FunctionComponent<Props> = (props: Props) => {
	const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	const { currentMonth, currentYear, decreaseMonth, increaseMonth } = props;
	return (
		<div className={`flex w-full text-3xl items-center mt-4 justify-between mb-8`}>
			<ChevronLeftSVG onClick={decreaseMonth} />
			<div>{`${monthName[currentMonth]} ${currentYear}`} </div>
			<ChevronRightSVG onClick={increaseMonth} />
		</div>
	);
};
export default MonthTitle;
