import IMenuItem from "./IMenuItem";

export default interface ISelectMenuData {
	selectedMenuId?: string;
	inputtedAmount?: number;
	domId?: string;
	selectMenuRef?: React.RefObject<HTMLSelectElement>;
	inputAmountRef?: React.RefObject<HTMLInputElement>;
}
