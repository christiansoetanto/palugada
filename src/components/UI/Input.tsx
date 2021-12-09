import React from "react";

interface Props {
	text: string;
	type?: string;
	min?: number;
	max?: number;
}

const Input = React.forwardRef((props: Props, ref: React.ForwardedRef<HTMLInputElement>) => (
	<label className='block mb-3'>
		<span className='text-gray-500 text-sm '>{props.text}</span>
		{props.type === "number" && (
			<input
				type={props.type}
				min={props.min ?? 0}
				max={props.max ?? 2147483647}
				className='block w-full focus:outline-none bg-transparent border-2 rounded border-gray-300 text-sm md:text-base p-1'
				ref={ref}
			/>
		)}
		{props.type !== "number" && (
			<input
				type={props.type}
				className='block w-full focus:outline-none bg-transparent border-2 rounded border-gray-300 text-sm md:text-base p-1'
				ref={ref}
			/>
		)}
	</label>
));
export default Input;
