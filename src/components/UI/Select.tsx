import React from "react";
import ISelectOption from "../../interfaces/ISelectOption";

interface Props {
	text: string;
	options: ISelectOption[];
}
const Select = React.forwardRef((props: Props, ref: React.ForwardedRef<HTMLSelectElement>) => (
	<label className='block mb-3'>
		<span className='text-dimGray text-sm '>{props.text}</span>
		<select className='block w-full focus:outline-none bg-transparent border-2 rounded border-peach text-sm md:text-base p-1' ref={ref}>
			<option disabled={true}>Please select {props.text}</option>

			{props.options.map((e) => {
				return <option value={e.value}>{e.text}</option>;
			})}
		</select>
	</label>
));
export default Select;
