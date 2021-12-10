import IMenuItem from "./IMenuItem";
export default interface IOrderDetail {
	orderHeaderId?: number;
	id: string;
	amount: number;
	menuId: number;
	menu?: IMenuItem;
}
