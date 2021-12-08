import React, { useState, useEffect } from "react";
import MonthTitle from "../components/Schedule/MonthTitle";
import Calendar from "../components/Schedule/Calendar";
import ICell from "../interfaces/ICell";

interface Props {}

const Schedule: React.FunctionComponent<Props> = (props: Props) => {
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [cells, setCells] = useState<ICell[]>([]);
	useEffect(() => {
		var a: ICell[] = [];
		for (let index = 0; index < 30; index++) {
			a.push({ date: new Date() });
		}
		setCells(a);
	}, []);
	const increaseMonth = () => {
		setCurrentMonth((prevMonth) => {
			if (prevMonth == 11) {
				prevMonth = -1;
				setCurrentYear((prevYear) => ++prevYear);
			}
			return ++prevMonth;
		});
	};
	const decreaseMonth = () => {
		setCurrentMonth((prevMonth) => {
			if (prevMonth == 0) {
				prevMonth = 12;
				setCurrentYear((prevYear) => --prevYear);
			}
			return --prevMonth;
		});
	};

	const dateClickHandler = () => {};

	const deleteHandler = () => {};

	return (
		<div className='flex flex-col'>
			<MonthTitle currentMonth={currentMonth} currentYear={currentYear} decreaseMonth={decreaseMonth} increaseMonth={increaseMonth} />
			<Calendar cells={cells} onClick={dateClickHandler} onDelete={deleteHandler} />
		</div>
	);
};
export default Schedule;
