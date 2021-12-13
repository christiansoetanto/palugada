import React, { useState } from "react";
import Schedule from "./Schedule";
interface Props {}

const Home: React.FunctionComponent<Props> = (props: Props) => {
	const [isShowWhatsNew, setIsShowWhatsNew] = useState(false);
	return (
		<div className=''>
			<Schedule />
			<div className='flex flex-col '>
				<div className='mr-auto px-2 py-1 rounded-xl shadow-lg bg-green-300' onClick={() => setIsShowWhatsNew((prev) => !prev)}>
					Click to see what's new
				</div>
				{isShowWhatsNew && (
					<div className='mx-3 mt-2 text-xs'>
						<div className='mb-2 '>
							v1.1
							<br />
							<ol className=''>
								<li>1. Now you can nervously waiting for the server to wake up</li>
								<li>2. MinSenSelRabKamJumSab</li>
								<li>3. See the order list thru the futureee, i mean last month and next month</li>
							</ol>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default Home;
