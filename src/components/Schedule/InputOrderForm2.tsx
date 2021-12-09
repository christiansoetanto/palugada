import React, { useEffect, useState } from "react";
import useFetchRequest from "../../hooks/use-fetch-request";
import IMenuItem from "../../interfaces/IMenuItem";
import IRequestConfig from "../../interfaces/IRequestConfig";
import OrderDetailItem from "../Schedule/OrderDetailItem";
import { v4 as uuidv4 } from "uuid";

interface Props {
	date: Date;
	menu: IMenuItem[];
}

const InputOrderForm2: React.FunctionComponent<Props> = (props: Props) => {
	const { date, menu } = props;

	const { fetchRequest, error, setError } = useFetchRequest();
	const [orderAmount, setOrderAmount] = useState<number>(1);
	interface IOrderDetailState {
		id: string;
		amount: number;
		menuId: number;
	}
	const [orderDetail, setOrderDetail] = useState<IOrderDetailState | null>(null);
	const [amount, _] = useState<number>(0);
	const [menuId, __] = useState<number>(0);

	const [orderDetails, setOrderDetails] = useState<IOrderDetailState[]>([
		{
			id: uuidv4(),
			amount,
			menuId,
		},
		{
			id: uuidv4(),
			amount,
			menuId,
		},
		{
			id: uuidv4(),
			amount,
			menuId,
		},
	]);

	useEffect(() => {
		const config: IRequestConfig = {
			url: `menu/user/{{userId}}`,
		};
		const onFetch: (data: IMenuItem[]) => void = (data) => {
			console.log(data);
		};
		// fetchRequest(config, onFetch);
	}, [fetchRequest]);

	const updateAmountHandler = (val: number, id: string) => {
		console.log(val, id);
		setOrderDetails((prev) => {
			return prev.map((e) => {
				return e.id === id ? { ...e, amount: val } : { ...e };
			});
		});
	};
	const updateMenuIdHandler = (val: number, id: string) => {
		console.log(val, id);
		setOrderDetails((prev) => {
			return prev.map((e) => {
				return e.id === id ? { ...e, menuId: val } : { ...e };
			});
		});
	};

	const submitHandler = () => {};

	return (
		<div>
			<form onSubmit={submitHandler} className='flex flex-col justify-center items-center'>
				<div className='w-full lg:w-1/4'>
					{date.toString()}
					{orderDetails.map((e) => {
						return <OrderDetailItem data={e} menu={menu} onUpdateAmount={updateAmountHandler} onUpdateMenuId={updateMenuIdHandler} />;
					})}
				</div>
			</form>
		</div>
	);
};
export default InputOrderForm2;
