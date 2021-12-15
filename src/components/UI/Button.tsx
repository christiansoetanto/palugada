import React from "react";

interface Props {
	text: string;
	type?: "button" | "submit" | "reset" | undefined;
	onClick?: () => void;
	className?: string;
}

const Button = (props: Props) => {
	const { text, type = "button", onClick, className = "" } = props;
	return (
		<div className='text-center items-center w-full'>
			<button type={type} onClick={onClick} className={`border-2 rounded border-opacity-20 border-copper bg-peach bg-opacity-70 px-3 py-1 ${className}`}>
				{text}
			</button>
		</div>
	);
};
export default Button;
