import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../contexts/auth-context";
import useFetchRequest from "../hooks/use-fetch-request";
import RequestConfig from "../interfaces/RequestConfig";
import Method from "../interfaces/Method";
import LoginData from "../interfaces/LoginData";
import UserLogin from "../interfaces/UserLogin";
interface Props {}

const Login: React.FunctionComponent<Props> = (props: Props) => {
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const ctx = useContext(AuthContext);
	const history = useHistory();
	const { error, fetchRequest } = useFetchRequest();

	const submitHandler = () => {
		const username: string = usernameRef?.current?.value ?? "";
		const password: string = passwordRef?.current?.value ?? "";

		const config: RequestConfig = {
			url: `user/login`,
			method: Method.POST,
			body: {
				username,
				password,
			} as LoginData,
		};
		const onLogin = async (data: UserLogin) => {
			await ctx.onLogIn(data);
			history.push("/");
		};

		fetchRequest(config, onLogin);
	};

	return (
		<div>
			<div id='form'>
				<div>
					<div>{error}</div>
				</div>
				<div>
					<input type='text' id='username' ref={usernameRef} />
					<label htmlFor='username'>Username</label>
				</div>
				<div>
					<input type='password' id='password' ref={passwordRef} />
					<label htmlFor='password'>Password</label>
				</div>
				<div>
					<button onClick={submitHandler}>Login</button>
				</div>
			</div>
		</div>
	);
};
export default Login;
