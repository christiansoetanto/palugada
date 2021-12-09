import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import useFetchRequest from "../../hooks/use-fetch-request";
import IMenuItem from "../../interfaces/IMenuItem";
import IRequestConfig from "../../interfaces/IRequestConfig";
import OrderDetailItem from "./OrderDetailItem";
import { v4 as uuidv4 } from "uuid";
import AddSVG from "../UI/SVG/AddSVG";
import IOrderDetail from "../../interfaces/IOrderDetail";
import Input from "../UI/Input";
import ErrorMessage from "../UI/ErrorMessage";
import Button from "../UI/Button";
import IOrderHeader from "../../interfaces/IOrderHeader";
import IMethod from "../../interfaces/IMethod";

interface Props {
	date: Date;
	menu: IMenuItem[];
	triggerRerender: () => void;
}

const InputOrderForm: React.FunctionComponent<Props> = (props: Props) => {
	const { date, menu, triggerRerender } = props;
	const { fetchRequest, error, setError } = useFetchRequest();
	const [amount, _] = useState<number>(0);
	const [menuId, __] = useState<number>(0);

	const titleRef = useRef<HTMLInputElement>(null);
	const [orderDetails, setOrderDetails] = useState<IOrderDetail[]>([
		{
			id: uuidv4(),
			amount,
			menuId,
		},
	]);


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

	const submitHandler = (e: SyntheticEvent) => {
		e.preventDefault();
		setError("");
		const title = titleRef.current!.value;
		if (!title) {
			setError("Please input title.");
			return;
		}
		const filteredOrderDetails = orderDetails.filter((e) => e.amount && e.menuId);
		setOrderDetails(filteredOrderDetails);
		if (filteredOrderDetails.length === 0) {
			setError("Please insert orderan.");
			return;
		}
		const orderHeader: IOrderHeader = {
			title,
			date: date,
			orderDetail: filteredOrderDetails,
		};
		const config: IRequestConfig = {
			url: `order/{{userId}}`,
			method: IMethod.POST,
			body: orderHeader,
		};
		const onSubmit: (data: any) => void = (data) => {
			console.log(data);
			triggerRerender();
		};
		fetchRequest(config, onSubmit);
	};

	const addItemHandler = () => {
		setOrderDetails((prev) => {
			return [...prev, { id: uuidv4(), amount, menuId }];
		});
	};
	const deleteItemHandler = (id: string) => {
		setOrderDetails((prev) => {
			return prev.filter((e) => e.id !== id);
		});
	};

	return (
		<div>
			<form onSubmit={submitHandler} className='flex flex-col justify-center items-center'>
				<div className='w-full lg:w-1/4 flex flex-col'>
					{date.toString()}
					<Input text='Title' ref={titleRef} />

					{orderDetails.map((e) => {
						return (
							<OrderDetailItem
								data={e}
								menu={menu}
								onUpdateAmount={updateAmountHandler}
								onUpdateMenuId={updateMenuIdHandler}
								onDelete={deleteItemHandler}
							/>
						);
					})}
					<div className='flex justify-items-end'>
						<div>
							<AddSVG onClick={addItemHandler} />
						</div>
					</div>
					<ErrorMessage message={error} />
					<Button type='submit' text='Submit' />
				</div>
			</form>
		</div>
	);
};
export default InputOrderForm;
