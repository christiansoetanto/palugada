import Cookies from "js-cookie";
import React, { ReactNode, useEffect, useState } from "react";
import IUser from "../interfaces/IUser";
import IUserLogin from "../interfaces/IUserLogin";

interface IContext {
	isLoggedIn: boolean;
	onLogOut: Function;
	onLogIn: Function;
	user: IUser | null;
	token: string | null;
}

const ctxObject: IContext = {
	isLoggedIn: false,
	onLogOut: () => {},
	onLogIn: () => {},
	user: null,
	token: "",
};
const AuthContext = React.createContext(ctxObject);

interface Props {
	children: ReactNode;
}
export const AuthContextProvider: React.FC<Props> = (props: Props) => {
	const [user, setUser] = useState<IUser | null>(null);
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const storedUserInformation = Cookies.get("user");
		const storedToken = Cookies.get("token");
		if (storedUserInformation && storedToken) {
			setUser(JSON.parse(storedUserInformation));
			setToken(storedToken);
		}
	}, []);

	const logInHandler = (params: IUserLogin) => {
		Cookies.set("user", JSON.stringify(params.user), { expires: 365 });
		Cookies.set("token", params.token, { expires: 365 });
		setUser(params.user);
		setToken(params.token);
	};

	const logOutHandler = () => {
		Cookies.remove("user");
		Cookies.remove("token");
		setUser(null);
		setToken(null);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: user != null,
				onLogOut: logOutHandler,
				onLogIn: logInHandler,
				user: user,
				token: token,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
