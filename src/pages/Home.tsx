import React, { useState } from "react";
import Schedule from "./Schedule";
interface Props {}

const Home: React.FunctionComponent<Props> = (props: Props) => {
	const [isShowWhatsNew, setIsShowWhatsNew] = useState(false);
	const [changeLog] = useState(
		[
			{
				versionNumber: "v1.1",
				changeList: [
					"now you can nervously waiting for the server to wake up",
					"MinSenSelRabKamJumSab",
					"see the order list thru the futureee, i mean last month and next month",
				],
			},
			{
				versionNumber: "v1.2",
				changeList: ["upgrade to tailwind v3.0", "use fancy english for day name", "change color pallete", "show/hide past date"],
			},
		].reverse()
	);
	return (
		<div className=''>
			<Schedule />
			<div className='flex flex-col '>
				<div className='mr-auto px-2 py-1 rounded-xl shadow-lg bg-peach cursor-pointer' onClick={() => setIsShowWhatsNew((prev) => !prev)}>
					Click to see what's new
				</div>
				{isShowWhatsNew && (
					<div className='mx-3 mt-2 text-xs'>
						{changeLog.map((e, i) => {
							return (
								<div key={i} className='mb-2 '>
									{e.versionNumber}
									<br />
									<ol className=''>
										{e.changeList.map((c, i) => (
											<li key={i + 1}>{`${i + 1}. ${c}`}</li>
										))}
									</ol>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};
export default Home;
