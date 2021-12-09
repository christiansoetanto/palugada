import React, { useState, useEffect, useRef } from "react";
import IMenuItem from "../../interfaces/IMenuItem";
import Button from "../UI/Button";
import ErrorMessage from "../UI/ErrorMessage";
import Input from "../UI/Input";

interface Props {
	onSubmit: (data: IMenuItem) => void;
	editMenuData: IMenuItem | null;
}

const InputMenuForm: React.FunctionComponent<Props> = (props: Props) => {
	const nameRef = useRef<HTMLInputElement>(null);
	const priceRef = useRef<HTMLInputElement>(null);
	const menuIdRef = useRef<HTMLInputElement>(null);
	const [error, setError] = useState<string>("");
	const { onSubmit, editMenuData } = props;

	useEffect(() => {
		if (editMenuData) {
			nameRef.current!.value = editMenuData.name;
			priceRef.current!.value = editMenuData.price.toString();
			menuIdRef.current!.value = editMenuData.menuId!.toString();
		}
	}, [editMenuData]);

	const submitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const name: string = nameRef.current!.value;
		const price: number = parseInt(priceRef.current!.value);
		const menuId: number = parseInt(menuIdRef.current!.value);
		if (!name) setError("Please insert name");
		else if (!price) setError("Please insert price");
		else {
			nameRef.current!.value = "";
			nameRef.current!.focus();
			priceRef.current!.value = "";
			menuIdRef.current!.value = "";
			onSubmit({ name, price, menuId });
		}
	};

	return (
		<div>
			<form onSubmit={submitHandler} className='flex flex-col justify-center items-center'>
				<div className='w-full lg:w-1/4'>
					<Input text='Name' ref={nameRef} />
					<Input text='Price' ref={priceRef} type='number' min={0} max={2000000} />
					<Input text='' ref={menuIdRef} type='hidden' />
					<Button type='submit' text='Submit' />
					<ErrorMessage message={error} />
				</div>
			</form>
		</div>
	);
};
export default InputMenuForm;
