import React from "react";
import IMenuItem from "../../interfaces/IMenuItem";
import { moneyFormatter } from "../Helper/helper";
import DeleteSVG from "../UI/SVG/DeleteSVG";
import EditSVG from "../UI/SVG/EditSVG";
interface Props {
	data: IMenuItem;
	onDelete: (menuId: number) => void;
	onEdit: (data: IMenuItem) => void;
}

const MenuItem: React.FunctionComponent<Props> = (props: Props) => {
	const { menuId, name, price } = props.data;
	const { onDelete, onEdit } = props;
	const deleteHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		onDelete(menuId!);
	};

	const editHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		onEdit(props.data);
	};

	return (
		<tr className=''>
			<td className='border border-peach  text-center'>{name}</td>
			<td className='border border-peach  text-center'>{moneyFormatter(price)}</td>
			<td className='border border-peach '>
				<div className='flex  items-center justify-center '>
					<DeleteSVG onClick={deleteHandler} />
				</div>
			</td>
			<td className='border border-peach'>
				<div className='flex  items-center justify-center '>
					<EditSVG onClick={editHandler} />
				</div>
			</td>
		</tr>
	);
};
export default MenuItem;
