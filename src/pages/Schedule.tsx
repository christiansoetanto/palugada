import React, { useEffect, useRef, useState } from "react";
import Calendar from "../components/Schedule/Calendar";
import InputOrderForm from "../components/Schedule/InputOrder/InputOrderForm";
import MonthTitle from "../components/Schedule/MonthTitle";
import Order from "../components/Schedule/OrderDetail/Order";
import ErrorMessage from "../components/UI/ErrorMessage";
import useFetchRequest from "../hooks/use-fetch-request";
import ICell from "../interfaces/ICell";
import IMenuItem from "../interfaces/IMenuItem";
import IOrderHeader from "../interfaces/IOrderHeader";
import IRequestConfig from "../interfaces/IRequestConfig";

interface Props {}

const Schedule: React.FunctionComponent<Props> = (props: Props) => {
	const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
	const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
	const [currentDate, setCurrentDate] = useState<Date | null>(null);
	const [cells, setCells] = useState<ICell[]>([]);
	const [forceRerender, setForceRerender] = useState(true);

	const orderDivRef = useRef<HTMLDivElement>(null);
	const [menu, setMenu] = useState<IMenuItem[]>([]);

	const { fetchRequest, error } = useFetchRequest();

	useEffect(() => {
		const config: IRequestConfig = {
			url: `menu/user/{{userId}}`,
		};
		const onFetchMenu: (data: IMenuItem[]) => void = (data) => {
			setMenu(data);
		};
		fetchRequest(config, onFetchMenu);
	}, [fetchRequest]);
	useEffect(() => {
		const config: IRequestConfig = {
			url: `order/user/{{userId}}/${currentMonth}/${currentYear}`,
		};
		const onFetchOrder: (data: IOrderHeader[]) => void = (data) => {
			const cells: ICell[] = new Array(42).fill(null).map((v, i) => {
				const date = new Date(currentYear, currentMonth, i - new Date(currentYear, currentMonth, 1).getDay() + 1);
				return {
					date,
					orderList: data.filter((e) => {
						return +new Date(e.date) === +date;
					}),
				};
			});

			setCells(cells);
		};
		setCurrentDate(null);
		fetchRequest(config, onFetchOrder);
	}, [currentMonth, currentYear, fetchRequest, forceRerender]);

	useEffect(() => {
		orderDivRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [currentDate]);

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

	const triggerRerender = () => {
		setCurrentDate(null);
		setForceRerender((prev) => !prev);
	};

	return (
		<div className='flex flex-col'>
			<MonthTitle currentMonth={currentMonth} currentYear={currentYear} decreaseMonth={decreaseMonth} increaseMonth={increaseMonth} />
			<Calendar cells={cells} currentMonth={currentMonth} onDateClick={dateClickHandler} />
			{currentDate && (
				<div className='my-10' ref={orderDivRef}>
					<div className='text-lg text-blue-700 text-center'>{currentDate.toDateString()}</div>
					<div className='flex flex-col lg:flex-row lg:flex-wrap gap-x-5 justify-around'>
						<InputOrderForm date={currentDate} menu={menu} triggerRerender={triggerRerender} />
						<Order date={currentDate} triggerRerender={triggerRerender} />
					</div>
				</div>
			)}
			<ErrorMessage message={error} />
		</div>
	);
};
export default Schedule;
