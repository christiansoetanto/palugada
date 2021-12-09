import IOrderDetail from "./IOrderDetail";

export default interface IOrderHeader {
	userId?: number;
	title: string;
	orderHeaderId?: number;
	orderDetail?: IOrderDetail[];
}
