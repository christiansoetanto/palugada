import React, { useState, useEffect } from "react";
import MonthTitle from "../components/Schedule/MonthTitle";
import Calendar from "../components/Schedule/Calendar";
import ICell from "../interfaces/ICell";
import InputOrderForm from "../components/Schedule/InputOrderForm";
import InputOrderForm2 from "../components/Schedule/InputOrderForm2";
import IMenuItem from "../interfaces/IMenuItem";
import useFetchRequest from "../hooks/use-fetch-request";
import IRequestConfig from "../interfaces/IRequestConfig";

interface Props {}

const Schedule: React.FunctionComponent<Props> = (props: Props) => {
	const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
	const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
	const [currentDate, setCurrentDate] = useState<Date | null>(null);
	const [cells, setCells] = useState<ICell[]>([]);

	const [menu, setMenu] = useState<IMenuItem[]>([]);

	const { fetchRequest, error, setError } = useFetchRequest();

	useEffect(() => {
		const config: IRequestConfig = {
			url: `menu/user/{{userId}}`,
		};
		const onFetch: (data: IMenuItem[]) => void = (data) => {
			setMenu(data);
		};
		fetchRequest(config, onFetch);
	}, [fetchRequest]);
	useEffect(() => {
		const cells: ICell[] = new Array(42).fill(null).map((v, i) => {
			return {
				date: new Date(currentYear, currentMonth, i - new Date(currentYear, currentMonth, 1).getDay() + 1),
			};
		});

		setCells(cells);
	}, [currentMonth, currentYear]);

	const increaseMonth = () => {
		setCurrentMonth((prevMonth) => {
			if (prevMonth === 11) {
				prevMonth = -1;
				setCurrentYear((prevYear) => ++prevYear);
			}
			return ++prevMonth;
		});
	};
	const decreaseMonth = () => {
		setCurrentMonth((prevMonth) => {
			if (prevMonth === 0) {
				prevMonth = 12;
				setCurrentYear((prevYear) => --prevYear);
			}
			return --prevMonth;
		});
	};

	const dateClickHandler = (date: Date) => {
		setCurrentDate(date);
	};

	return (
		<div className='flex flex-col'>
			<MonthTitle currentMonth={currentMonth} currentYear={currentYear} decreaseMonth={decreaseMonth} increaseMonth={increaseMonth} />
			<Calendar cells={cells} currentMonth={currentMonth} onClick={dateClickHandler} />
			{/* {currentDate && <InputOrderForm date={currentDate} menu={menu} />} */}
			{currentDate && <InputOrderForm2 date={currentDate} menu={menu} />}
		</div>
	);
};
export default Schedule;
