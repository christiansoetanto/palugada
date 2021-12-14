import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../contexts/auth-context";
import "./Layout.css";

interface Props {}

const NavBar: React.FunctionComponent<Props> = (props: Props) => {
	const ctx = useContext(AuthContext);

	const history = useHistory();

	const logoutHandler = () => {
		ctx.onLogOut();
		history.push("/");
	};

	const handleNavLinkOnClick = () => {
		const menuToggle: any = document.getElementById("menu-toggle");
		menuToggle.checked = false;
	};

	return (
		<header className='md:px-16 h-16 md:h-24 px-6 bg-white flex flex-wrap items-center py-4 sticky top-0 shadow-sm z-50'>
			<div className='flex flex-1 lg:flex-none items-center mr-6 pb-2'>
				<NavLink to='/' className='font-bold text-2xl'>
					<div className='flex items-center justify-center flex-1 '>Home</div>
				</NavLink>
			</div>

			<label htmlFor='menu-toggle' className='pointer-cursor lg:hidden block'>
				<svg className='fill-current text-gray-900' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
					<title>menu</title>
					<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'></path>
				</svg>
			</label>
			<input className='hidden' type='checkbox' id='menu-toggle' />

			<div
				className='hidden lg:flex lg:flex-1 lg:flex-row lg:items-center lg:justify-between lg:w-auto lg:relative absolute top-16 md:top-24 lg:top-0 w-full left-0 px-4 pb-4 lg:p-0 bg-white shadow-md lg:shadow-none'
				id='menu'>
				<nav className='flex'>
					<div className='lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0 w-full md:w-auto'>
						<NavLink
							className='md:pr-4 pl-4 py-3 px-0 block border-b-2 w-full md:w-auto hover:border-amber-300 text-sm md:text-base'
							to='/home'
							activeClassName='border-amber-300'
							onClick={handleNavLinkOnClick}
							style={{ borderColor: "transparent" }}>
							Home
						</NavLink>

						<NavLink
							className='md:pr-4 pl-4 py-3 px-0 block border-b-2 w-full md:w-auto hover:border-amber-300 text-sm md:text-base'
							to='/menu'
							activeClassName='border-amber-300'
							onClick={handleNavLinkOnClick}
							style={{ borderColor: "transparent" }}>
							Menu
						</NavLink>
					</div>
				</nav>
				<nav className='flex'>
					<div className='md:flex md:space-x-3 items-center justify-between text-base text-gray-700 pt-4 lg:pt-0'>
						<NavLink
							className='md:pr-4 pl-4 py-3 px-0 block border-b-2 hover:border-red-400 text-sm md:text-base'
							to='/'
							onClick={logoutHandler}
							style={{ borderColor: "transparent" }}>
							Log Out
						</NavLink>
					</div>
				</nav>
			</div>
		</header>
	);
};
export default NavBar;
