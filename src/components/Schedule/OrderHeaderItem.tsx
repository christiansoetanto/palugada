import React from "react";
import IOrderHeader from "../../interfaces/IOrderHeader";

interface Props {
	data: IOrderHeader;
}

const OrderHeaderItem: React.FunctionComponent<Props> = (props: Props) => {
	const { title } = props.data;

	return <div className='bg-amber-300 rounded-lg pl-2 m-2 mb-3'>{title}</div>;
};
export default OrderHeaderItem;
