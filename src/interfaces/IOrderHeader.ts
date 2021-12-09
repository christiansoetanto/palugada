import IOrderDetail from "./IOrderDetail";

export default interface IOrderHeader {
	userId?: number;
	title: string;
	date: Date;
	orderHeaderId?: number;
	orderDetail?: IOrderDetail[];
}
