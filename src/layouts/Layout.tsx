import React, { useContext } from "react";
import AuthContext from "../contexts/auth-context";
import Login from "../pages/Login";
import NavBar from "./NavBar";

interface Props {
	children: React.ReactNode;
}

const Layout: React.FunctionComponent<Props> = (props: Props) => {
	const ctx = useContext(AuthContext);

	return (
		<div>
			{ctx.isLoggedIn && ctx.user && (
				<div className=''>
					<NavBar />
					<main className='p-2 mx-10 md:mx-36'>{props.children}</main>
				</div>
			)}

			{!ctx.isLoggedIn && <Login />}
		</div>
	);
};
export default Layout;
