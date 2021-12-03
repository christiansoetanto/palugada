import Cookies from "js-cookie";
import React, { ReactNode, useEffect, useState } from "react";
const axios = require("axios").default;
interface User {
	username: string;
	userId: number;
}
interface Context {
	isLoggedIn: boolean;
	onLogOut: Function;
	onLogIn: Function;
	user: User | null;
	token: string | null;
}

interface LoginFormData {
	username: string;
	password: string;
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

	const logInHandler = (params: LoginFormData) => {
		if (true) {
			const user: User = {
				username: params.username + "||" + params.password,
				userId: 1,
			};
			const token = "asdasd";
			Cookies.set("user", JSON.stringify(user), { expires: 365 });
			Cookies.set("token", token, { expires: 365 });
			setUser(user);
			setToken(token);
		}
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
