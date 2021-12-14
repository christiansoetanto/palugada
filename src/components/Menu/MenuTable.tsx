import React from "react";
import IMenuItem from "../../interfaces/IMenuItem";
import MenuItem from "./MenuItem";

interface Props {
	data: IMenuItem[];
	onDelete: (menuId: number) => void;
	onEdit: (data: IMenuItem) => void;
}

const MenuTable: React.FunctionComponent<Props> = (props: Props) => {
	const { data: menuList, onDelete, onEdit } = props;
	return (
		<div className='flex flex-col'>
			{menuList.length === 0 && <div>No menu available</div>}
			{menuList.length > 0 && (
				<table className='border-collapse border border-emerald-800'>
					<thead>
						<tr>
							<th className='border border-emerald-600 text-center bg-emerald-200'>Name</th>
							<th className='border border-emerald-600  text-center bg-emerald-200'>Price</th>
							<th className='border border-emerald-600  text-center bg-emerald-200'>Item Sold</th>
							<th className='border border-emerald-600  text-center bg-emerald-200' colSpan={2}>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{menuList.map((e) => {
							return <MenuItem key={e.menuId} data={e} onDelete={onDelete} onEdit={onEdit} />;
						})}
					</tbody>
				</table>
			)}
		</div>
	);
};
export default MenuTable;
