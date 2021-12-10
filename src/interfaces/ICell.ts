import IOrderHeader from "./IOrderHeader";

export default interface ICell {
	date: Date;
	orderList?: IOrderHeader[];
}
