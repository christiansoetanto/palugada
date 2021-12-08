export const moneyFormatter: (money: number | null) => string = (money: number | null) => {
	if (!money) return "";
	return money.toLocaleString("id-ID", {
		style: "currency",
		currency: "IDR",
	});
};
