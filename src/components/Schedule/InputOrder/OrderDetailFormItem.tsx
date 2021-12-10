import React from "react";
import IMenuItem from "../../../interfaces/IMenuItem";
import IOrderDetail from "../../../interfaces/IOrderDetail";
import MinusSVG from "../../UI/SVG/MinusSVG";
interface Props {
	data: IOrderDetail;
	menu: IMenuItem[];
	onUpdateAmount: (val: number, id: string) => void;
	onUpdateMenuId: (val: number, id: string) => void;
	onDelete: (id: string) => void;
}

const OrderDetailFormItem: React.FunctionComponent<Props> = (props: Props) => {
	const { data, menu, onUpdateAmount, onUpdateMenuId, onDelete } = props;
	const { id, amount, menuId } = data;
	const updateAmount = (val: number) => {
		onUpdateAmount(val, id);
	};
	const updateMenuId = (val: number) => {
		onUpdateMenuId(val, id);
	};

	return (
		<div className='flex flex-row  justify-between'>
			<div>
				<label className='block mb-3'>
					<span className='text-gray-500 text-sm '>Menu</span>
					<select
						className='block w-full focus:outline-none bg-transparent border-2 rounded border-gray-300 text-sm md:text-base p-1'
						value={menuId}
						onChange={(e) => updateMenuId(parseInt(e.target.value))}>
						<option disabled={true} value={0}>
							Select menu
						</option>
						{menu.map((e) => {
							return (
								<option key={e.menuId} value={e.menuId}>
									{e.name}
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
						value={amount}
						onChange={(e) => updateAmount(parseInt(e.target.value))}
						type={"number"}
						min={0}
						max={2147483647}
						className='block w-full focus:outline-none bg-transparent border-2 rounded border-gray-300 text-sm md:text-base p-1'
					/>
				</label>
			</div>
			<div className='flex align-middle items-center justify-items-center'>
				<MinusSVG
					onClick={() => {
						onDelete(id);
					}}
				/>
			</div>
		</div>
	);
};
export default OrderDetailFormItem;
