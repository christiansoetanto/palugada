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
				<table className=' border-collapse bg-isabelline text-black'>
					<thead>
						<tr>
							<th className='border border-copper text-center bg-peach'>Name</th>
							<th className='border border-copper text-center bg-peach'>Price</th>
							<th className='border border-copper text-center bg-peach' colSpan={2}>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{menuList
							.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
							.map((e) => {
								return <MenuItem key={e.menuId} data={e} onDelete={onDelete} onEdit={onEdit} />;
							})}
					</tbody>
				</table>
			)}
		</div>
	);
};
export default MenuTable;
