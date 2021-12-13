import { useCallback, useContext, useState } from "react";
import AuthContext from "../contexts/auth-context";
import IRequestConfig from "../interfaces/IRequestConfig";

const useFetchRequest = () => {
	const ctx = useContext(AuthContext);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchRequest = useCallback(
		async (requestConfig: IRequestConfig, applyData: (data: any) => void) => {
			setError(null);
			setIsLoading(true);
			try {
				if (requestConfig.url.includes("{{userId}}")) requestConfig.url = requestConfig.url.replace("{{userId}}", ctx.user!.userId.toString());

				const url = process.env.REACT_APP_API_BASEURL + requestConfig.url;
				const body = requestConfig.body ? JSON.stringify(requestConfig.body) : null;
				let headers = requestConfig.headers ?? {};
				if (!headers["Content-Type"]) {
					headers["Content-Type"] = "application/json";
				}
				headers["Authorization"] = "Bearer " + ctx.token;
				headers["Access-Control-Allow-Origin"] = "*";
				headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept	";
				const response = await fetch(url, {
					method: requestConfig.method ? requestConfig.method : "GET",
					headers: headers,
					body: body,
				});
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				const data = await response.json();
				applyData(data);
				setIsLoading(false);
			} catch (err: any) {
				let errorMessage = "Something went wrong!";
				if (err instanceof Error) errorMessage = err.message;
				setError(errorMessage);
				setIsLoading(false);
			}
		},
		[ctx.token, ctx.user]
	);

	return {
		fetchRequest,
		isLoading,
		error,
		setError,
	};
};
export default useFetchRequest;
