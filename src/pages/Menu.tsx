import React, { useEffect, useState } from "react";
import InputMenuForm from "../components/Menu/InputMenuForm";
import MenuTable from "../components/Menu/MenuTable";
import useFetchRequest from "../hooks/use-fetch-request";
import IMenuItem from "../interfaces/IMenuItem";
import IMethod from "../interfaces/IMethod";
import IRequestConfig from "../interfaces/IRequestConfig";
interface Props {}

const Menu: React.FunctionComponent<Props> = (props: Props) => {
	const [menuList, setMenuList] = useState<IMenuItem[]>([]);
	const [editMenuData, setEditMenuData] = useState<IMenuItem | null>(null);
	const { fetchRequest, error, setError } = useFetchRequest();
	useEffect(() => {
		const config: IRequestConfig = {
			url: `menu/user/{{userId}}`,
			method: IMethod.GET,
		};
		const onFetch = async (data: IMenuItem[]) => {
			console.log(data);
			setMenuList(data);
		};

		fetchRequest(config, onFetch);
	}, [fetchRequest]);

	const submitHandler = async (data: IMenuItem) => {
		const { name, price, menuId } = data;
		console.log(data);
		let config: IRequestConfig;
		let onSubmit: (data: IMenuItem) => void;
		if (menuId) {
			config = {
				url: `menu/${menuId}`,
				method: IMethod.PUT,
				body: {
					name,
					price,
				} as IMenuItem,
			};
			onSubmit = async (data: IMenuItem) => {
				console.log(data);
				setMenuList((prev) => {
					return prev.map((p) => (p.menuId === data.menuId ? { ...data } : { ...p }));
				});
			};
		} else {
			config = {
				url: `menu/{{userId}}`,
				method: IMethod.POST,
				body: {
					name,
					price,
				} as IMenuItem,
			};
			onSubmit = async (data: IMenuItem) => {
				console.log(data);
				setMenuList((prev) => {
					return [...prev, data];
				});
			};
		}
		console.log(config);
		fetchRequest(config, onSubmit);
	};

	const deleteHandler = (menuId: number) => {
		const config: IRequestConfig = {
			url: `menu/${menuId}`,
			method: IMethod.DELETE,
		};
		const onDelete = async () => {
			setMenuList((prev) => {
				return prev.filter((obj) => {
					return obj.menuId !== menuId;
				});
			});
		};

		fetchRequest(config, onDelete);
	};

	const editHandler = (data: IMenuItem) => {
		console.log("edieteing");
		console.log(data);
		setEditMenuData(data);
	};

	return (
		<div className='flex flex-col '>
			<InputMenuForm onSubmit={submitHandler} editMenuData={editMenuData} />
			<MenuTable data={menuList} onDelete={deleteHandler} onEdit={editHandler} />
			{JSON.stringify(menuList)}
		</div>
	);
};
export default Menu;
