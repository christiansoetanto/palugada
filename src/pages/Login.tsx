import React, { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../contexts/auth-context";
import useFetchRequest from "../hooks/use-fetch-request";
import ILoginData from "../interfaces/ILoginData";
import IMethod from "../interfaces/IMethod";
import IRequestConfig from "../interfaces/IRequestConfig";
import IUserLogin from "../interfaces/IUserLogin";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import ErrorMessage from "../components/UI/ErrorMessage";
interface Props {}

const Login: React.FunctionComponent<Props> = (props: Props) => {
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const ctx = useContext(AuthContext);
	const history = useHistory();
	const { fetchRequest, error, setError } = useFetchRequest();

	const submitHandler = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		const username: string = usernameRef.current!.value;
		const password: string = passwordRef.current!.value;
		if (!username) setError("Please insert username");
		else if (!password) setError("Please insert password");
		else {
			const config: IRequestConfig = {
				url: `user/login`,
				method: IMethod.POST,
				body: {
					username,
					password,
				} as ILoginData,
			};
			const onLogin = async (data: IUserLogin) => {
				await ctx.onLogIn(data);
				history.push("/");
			};

			fetchRequest(config, onLogin);
		}
	};

	return (
		<form onSubmit={submitHandler} className='flex flex-col  items-center justify-center absolute h-full w-full'>
			<div className='w-1/4'>
				<Input ref={usernameRef} text='Username' />
				<Input ref={passwordRef} type='password' text='Password' />
				<Button type='submit' text='Login' />
				<ErrorMessage message={error} />
			</div>
		</form>
	);
};
export default Login;
