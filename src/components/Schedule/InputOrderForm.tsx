import React, { createRef, SyntheticEvent, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useFetchRequest from "../../hooks/use-fetch-request";
import IMenuItem from "../../interfaces/IMenuItem";
import IOrderDetail from "../../interfaces/IOrderDetail";
import IOrderHeader from "../../interfaces/IOrderHeader";
import IRequestConfig from "../../interfaces/IRequestConfig";
import ISelectMenuData from "../../interfaces/ISelectMenuData";
import { moneyFormatter } from "../Helper/helper";
import Button from "../UI/Button";
import ErrorMessage from "../UI/ErrorMessage";
import Input from "../UI/Input";
import AddSVG from "../UI/SVG/AddSVG";
import MinusSVG from "../UI/SVG/MinusSVG";
interface Props {
	date: Date;
	menu: IMenuItem[];
}

const InputOrderForm: React.FunctionComponent<Props> = (props: Props) => {
	const { date, menu } = props;
	const menuRef = useRef<HTMLSelectElement>(null);
	const titleRef = useRef<HTMLInputElement>(null);
	const orderIdRef = useRef<HTMLInputElement>(null);
	const errorMsgRef = useRef<HTMLDivElement>(null);
	const [menuAmount, setMenuAmount] = useState<number>(1);
	const [orderDetailRefs, setOrderDetailRefs] = useState<Refs[]>([
		{
			id: uuidv4(),
			inputAmountRef: createRef<HTMLInputElement>(),
			selectMenuRef: createRef<HTMLSelectElement>(),
		},
	]);
	const { fetchRequest, error, setError } = useFetchRequest();

	interface Refs {
		id: string;
		selectMenuRef: React.RefObject<HTMLSelectElement>;
		inputAmountRef: React.RefObject<HTMLInputElement>;
	}

	useEffect(() => {
		const config: IRequestConfig = {
			url: `menu/user/{{userId}}`,
		};
		const onFetch: (data: IMenuItem[]) => void = (data) => {
			console.log(data);
		};
		// fetchRequest(config, onFetch);
	}, [fetchRequest]);

	useEffect(() => {
		console.log(orderDetailRefs);
	}, [orderDetailRefs]);

	const submitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		console.log(orderDetailRefs);
		let isAnyError = false;
		let errorMsg = "";
		const title = titleRef.current!.value;
		if (!title) {
			isAnyError = true;
			errorMsg += "Please input title. \n";
		}
		const orderDetails: IOrderDetail[] = [];

		orderDetailRefs.forEach((e) => {
			const amount = e.inputAmountRef?.current?.value!;
			const menuId = e.selectMenuRef?.current?.value!;
			console.log(`Input amount: ${amount}. menu: ${menuId}`);
			if (amount && menuId) {
				console.log(amount, menuId);
				if (!amount) {
					isAnyError = true;
					errorMsg += "Please input amount.\n";
				}
				if (!menuId || menuId === "") {
					isAnyError = true;
					errorMsg += "Please select menu.\n";
				}
				orderDetails.push({
					amount: parseInt(amount),
					menuId: parseInt(menuId),
				});
			}
		});
		console.log(orderDetails);
		if (orderDetails.length === 0) {
			isAnyError = true;
			errorMsg += "Please input orderan.\n";
		}
		if (isAnyError) {
			errorMsgRef.current!.innerHTML = errorMsg;
		} else {
			errorMsgRef.current!.innerHTML = "";
			const orderHeader: IOrderHeader = {
				title: title,
				orderDetail: orderDetails,
			};
			console.log(orderHeader);
		}
	};

	const addMenuAmountHandler = () => {
		console.log("add");
		setOrderDetailRefs((prev) => {
			return [
				...prev,
				{
					id: uuidv4(),
					inputAmountRef: createRef<HTMLInputElement>(),
					selectMenuRef: createRef<HTMLSelectElement>(),
				},
			];
		});
	};
	const substractMenuAmountHandler = (id: string) => {
		console.log("substract");

		setOrderDetailRefs((prev) => {
			console.log(`initial: ${prev.length}`);
			return prev.filter((e) => e.id !== id);
		});
	};
	return (
		<div>
			<form onSubmit={submitHandler} className='flex flex-col justify-center items-center'>
				<div className='w-full lg:w-1/4'>
					{JSON.stringify(menu)}
					{date.toString()}
					<Input text='Title' ref={titleRef} />
					<div className='flex flex-col'>
						{orderDetailRefs.map((e, i) => {
							return (
								<div key={uuidv4()} className='flex fex-row gap-2'>
									<div>
										<label className='block mb-3'>
											<span className='text-gray-500 text-sm '>Menu</span>
											<select
												className='block w-full focus:outline-none bg-transparent border-2 rounded border-gray-300 text-sm md:text-base p-1'
												key={e.id}
												defaultValue={""}
												ref={e.selectMenuRef}>
												<option disabled={true} value={""}>
													Select menu
												</option>
												{menu.map((e) => {
													return (
														<option key={e.menuId} value={e.menuId}>
															{e.name} {moneyFormatter(e.price)}
														</option>
													);
												})}
											</select>
										</label>
									</div>
									<div>
										<label className='block mb-3'>
											<span className='text-gray-500 text-sm '>Amount</span>
											<input
												ref={e.inputAmountRef}
												type={"number"}
												min={0}
												max={2147483647}
												className='block w-full focus:outline-none bg-transparent border-2 rounded border-gray-300 text-sm md:text-base p-1'
											/>
										</label>
									</div>
									<div className='flex align-middle items-center justify-items-center'>
										{i === 0 && <div className='h-6 w-6'></div>}

										{i > 0 && (
											<MinusSVG
												onClick={() => {
													substractMenuAmountHandler(e.id);
												}}
											/>
										)}
									</div>
								</div>
							);
						})}
					</div>
					<div className='flex justify-items-end'>
						<div>
							<AddSVG onClick={addMenuAmountHandler} />
						</div>
					</div>
					<Input text='' ref={orderIdRef} type='hidden' />
					<Button type='submit' text='Submit' />
					<div className=' my-5 text-red-700' ref={errorMsgRef}></div>
					<ErrorMessage message={error} />
				</div>
			</form>
		</div>
	);
};
export default InputOrderForm;
