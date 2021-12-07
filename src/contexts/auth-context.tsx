import Cookies from "js-cookie";
import React, { ReactNode, useEffect, useState } from "react";
import UserLogin from "../interfaces/UserLogin";
import User from "../interfaces/User";

interface Context {
	isLoggedIn: boolean;
	onLogOut: Function;
	onLogIn: Function;
	user: User | null;
	token: string | null;
}

const ctxObject: Context = {
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
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const storedUserInformation = Cookies.get("user");
		const storedToken = Cookies.get("token");
		if (storedUserInformation && storedToken) {
			setUser(JSON.parse(storedUserInformation));
			setToken(storedToken);
		}
	}, []);

	const logInHandler = (params: UserLogin) => {
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
