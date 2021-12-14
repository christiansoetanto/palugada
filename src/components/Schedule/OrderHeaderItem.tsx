import React from "react";
import IOrderHeader from "../../interfaces/IOrderHeader";

interface Props {
	data: IOrderHeader;
}

const OrderHeaderItem: React.FunctionComponent<Props> = (props: Props) => {
	const { title } = props.data;

	return <div className='bg-peach rounded-lg  ml-2  mr-auto px-2 '>{title}</div>;
};
export default OrderHeaderItem;
