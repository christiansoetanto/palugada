import React, { SyntheticEvent, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useFetchRequest from "../../../hooks/use-fetch-request";
import IMenuItem from "../../../interfaces/IMenuItem";
import IMethod from "../../../interfaces/IMethod";
import IOrderDetail from "../../../interfaces/IOrderDetail";
import IOrderHeader from "../../../interfaces/IOrderHeader";
import IRequestConfig from "../../../interfaces/IRequestConfig";
import Button from "../../UI/Button";
import ErrorMessage from "../../UI/ErrorMessage";
import Input from "../../UI/Input";
import AddSVG from "../../UI/SVG/AddSVG";
import OrderDetailFormItem from "./OrderDetailFormItem";

interface Props {
	date: Date;
	menu: IMenuItem[];
	triggerRerender: () => void;
}

const InputOrderForm: React.FunctionComponent<Props> = (props: Props) => {
	const { date, menu, triggerRerender } = props;
	const { fetchRequest, error, setError } = useFetchRequest();
	const [amount] = useState<number>(0);
	const [menuId] = useState<number>(0);

	const titleRef = useRef<HTMLInputElement>(null);
	const [orderDetails, setOrderDetails] = useState<IOrderDetail[]>([
		{
			domId: uuidv4(),
			amount,
			menuId,
		},
	]);

	const updateAmountHandler = (val: number, domId: string) => {
		setOrderDetails((prev) => {
			return prev.map((e) => {
				return e.domId === domId ? { ...e, amount: val } : { ...e };
			});
		});
	};
	const updateMenuIdHandler = (val: number, domId: string) => {
		setOrderDetails((prev) => {
			return prev.map((e) => {
				return e.domId === domId ? { ...e, menuId: val } : { ...e };
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
			triggerRerender();
		};
		fetchRequest(config, onSubmit);
	};

	const addItemHandler = () => {
		setOrderDetails((prev) => {
			return [...prev, { domId: uuidv4(), amount, menuId }];
		});
	};
	const deleteItemHandler = (domId: string) => {
		setOrderDetails((prev) => {
			return prev.filter((e) => e.domId !== domId);
		});
	};

	return (
		<div>
			<form onSubmit={submitHandler} className='flex flex-col justify-center items-center'>
				<div className='w-full  flex flex-col'>
					<Input text='Title' ref={titleRef} />

					{orderDetails.map((e) => {
						return (
							<OrderDetailFormItem
								key={e.domId}
								data={e}
								menu={menu}
								onUpdateAmount={updateAmountHandler}
								onUpdateMenuId={updateMenuIdHandler}
								onDelete={deleteItemHandler}
							/>
						);
					})}
					<div className='flex flex-row justify-center'>
						<AddSVG onClick={addItemHandler} />
					</div>
					<ErrorMessage message={error} />
					<Button type='submit' text='Submit' />
				</div>
			</form>
		</div>
	);
};
export default InputOrderForm;
