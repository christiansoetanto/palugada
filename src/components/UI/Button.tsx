import React from "react";

interface Props {
	text: string;
	type?: "button" | "submit" | "reset" | undefined;
	onClick?: () => void;
}

const Button = (props: Props) => {
	const { text, type = "button", onClick } = props;
	return (
		<div className='text-center items-center w-full'>
			<button type={type} onClick={onClick} className='border-2 rounded border-opacity-20 border-red-600 bg-amber-100 px-3 py-1 '>
				{text}
			</button>
		</div>
	);
};
export default Button;
