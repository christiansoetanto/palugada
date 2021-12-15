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
	const [isShowPastDate, setIsShowPastDate] = useState(false);

	const orderDivRef = useRef<HTMLDivElement>(null);
	const [menu, setMenu] = useState<IMenuItem[]>([]);

	const { fetchRequest, error, isLoading } = useFetchRequest();

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
		setCurrentDate(null);
		const firstDate = new Date(currentYear, currentMonth, 0 - new Date(currentYear, currentMonth, 1).getDay() + 1);
		const lastDate = new Date(currentYear, currentMonth, 41 - new Date(currentYear, currentMonth, 1).getDay() + 1);
		const config: IRequestConfig = { url: `order/user/{{userId}}/get-range/${firstDate.toUTCString()}/${lastDate.toUTCString()}` };
		const onFetchOrderRange: (data: IOrderHeader[]) => void = (data) => {
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
		fetchRequest(config, onFetchOrderRange);
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

	const triggerPastDateHandler = () => {
		setIsShowPastDate((prev) => !prev);
	};

	return (
		<div className='flex flex-col'>
			{isLoading && <div className='text-4xl flex items-center justify-center text-center'>Waking up the server...</div>}
			{!isLoading && (
				<div>
					<MonthTitle currentMonth={currentMonth} currentYear={currentYear} decreaseMonth={decreaseMonth} increaseMonth={increaseMonth} />

					<div className='mb-5 flex flex-row gap-x-2'>
						<div
							onClick={triggerPastDateHandler}
							className={`${
								isShowPastDate ? "bg-peach" : "bg-dimGray"
							} h-8 w-14 p-1 cursor-pointer rounded-full overflow-hidden  flex flex-row  `}>
							<div
								className={`bg-white w-6 h-6 rounded-full overflow-hidden shadow-2xl ${
									isShowPastDate && "transform translate-x-6 "
								} ease-in-out duration-300`}></div>
						</div>
						<div className={`${isShowPastDate ? "text-copper" : "text-dimGray"} flex flex-col items-center text-center justify-center`}>
							{/* {isShowPastDate ? "Hide past date" : "Show past date"} */}
							Past date: {isShowPastDate ? "ON" : "OFF"}
						</div>
					</div>

					<Calendar cells={cells} isShowPastDate={isShowPastDate} currentMonth={currentMonth} onDateClick={dateClickHandler} />
					{currentDate && (
						<div className='my-10' ref={orderDivRef}>
							<div className='text-lg text-copper text-center'>{currentDate.toDateString()}</div>
							<div className='flex flex-col lg:flex-row lg:flex-wrap gap-x-5 justify-around'>
								<InputOrderForm date={currentDate} menu={menu} triggerRerender={triggerRerender} />
								<Order date={currentDate} triggerRerender={triggerRerender} />
							</div>
						</div>
					)}
					<ErrorMessage message={error} />
				</div>
			)}
		</div>
	);
};
export default Schedule;
