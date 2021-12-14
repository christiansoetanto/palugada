import IMenuItem from "./IMenuItem";
export default interface IOrderDetail {
	orderHeaderId?: number;
	orderDetailId?: number;
	domId: string;
	amount: number;
	menuId: number;
	menu?: IMenuItem;
}
