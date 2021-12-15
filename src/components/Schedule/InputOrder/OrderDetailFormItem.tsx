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
	const { domId, amount, menuId } = data;
	const updateAmount = (val: number) => {
		onUpdateAmount(val, domId);
	};
	const updateMenuId = (val: number) => {
		onUpdateMenuId(val, domId);
	};

	return (
		<div className='flex flex-row  justify-between gap-x-1'>
			<div>
				<label className='block mb-3'>
					<span className='text-dimGray text-sm '>Menu</span>
					<select
						className='block w-full focus:outline-none bg-transparent border-2 rounded border-peach text-sm md:text-base p-1'
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
					<span className='text-dimGray text-sm '>Amount</span>
					<input
						value={amount}
						onChange={(e) => updateAmount(parseInt(e.target.value))}
						type={"number"}
						min={0}
						max={2147483647}
						className='block w-full focus:outline-none bg-transparent border-2 rounded border-peach text-sm md:text-base p-1'
					/>
				</label>
			</div>
			<div className='flex flex-col translate-y-1  items-center justify-center'>
				<MinusSVG
					onClick={() => {
						onDelete(domId);
					}}
				/>
			</div>
		</div>
	);
};
export default OrderDetailFormItem;
