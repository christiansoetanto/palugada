import React, { useEffect, useState } from "react";
import useFetchRequest from "../../../hooks/use-fetch-request";
import IMethod from "../../../interfaces/IMethod";
import IOrderHeader from "../../../interfaces/IOrderHeader";
import IRequestConfig from "../../../interfaces/IRequestConfig";
import { moneyFormatter } from "../../Helper/helper";
import ErrorMessage from "../../UI/ErrorMessage";
import DeleteSVG from "../../UI/SVG/DeleteSVG";

interface Props {
	date: Date;
	triggerRerender: () => void;
}

const Order: React.FunctionComponent<Props> = (props: Props) => {
	const { date, triggerRerender } = props;

	const [orders, setOrders] = useState<IOrderHeader[]>([]);
	const { fetchRequest, error } = useFetchRequest();
	useEffect(() => {
		const config: IRequestConfig = {
			url: `order/user/{{userId}}/${date.toUTCString()}`,
		};
		const onFetchOrder: (data: IOrderHeader[]) => void = (data) => {
			setOrders(data);
		};
		fetchRequest(config, onFetchOrder);
	}, [date, fetchRequest]);

	const deleteOrderHandler = (orderHeaderId: number) => {
		const conf = window.confirm("Are you sure want to delete?");
		if (conf) {
			const config: IRequestConfig = {
				url: `order/{{userId}}/${orderHeaderId}`,
				method: IMethod.DELETE,
			};
			const onDeleteOrder: (data: any) => void = (data) => {
				triggerRerender();
			};
			fetchRequest(config, onDeleteOrder);
		}
	};

	return (
		<div className='flex flex-col justify-center items-center mt-5 flex-wrap'>
			{orders && (
				<div>
					Order list: <br />
				</div>
			)}
			<div className='flex flex-col lg:flex-row lg:flex-wrap  lg:gap-x-3 gap-y-1'>
				{orders &&
					orders.map((e) => {
						const totalPrice = e
							.orderDetail!.map((e) => {
								return e.amount * e.menu!.price;
							})
							.reduce((previousValue, currentValue) => {
								return previousValue + currentValue;
							});
						return (
							<div key={e.orderHeaderId} className='flex flex-col bg-warmGray-200 rounded-2xl  justify-center px-5 py-3'>
								<div className='text-xl text-red-600'>{e.title}</div>

								<div className='text-l text-green-700'>{moneyFormatter(totalPrice)}</div>
								<div className='text-m'>List menu: </div>
								<ol className='list-disc'>
									{e.orderDetail &&
										e.orderDetail.map((od) => {
											return (
												<li key={od.id} className='flex flex-row gap-x-1 justify-between bg-amber-400  my-1 p-1 px-2 rounded-xl'>
													<div>{od.menu!.name} </div>
													<div>{od.amount} pc(s)</div>
												</li>
											);
										})}
								</ol>
								<div className='flex justify-center items-center'>
									<DeleteSVG onClick={() => deleteOrderHandler(e.orderHeaderId!)} />
								</div>
							</div>
						);
					})}
			</div>
			<ErrorMessage message={error} />
		</div>
	);
};
export default Order;
