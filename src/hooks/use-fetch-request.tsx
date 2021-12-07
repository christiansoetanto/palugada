import { request } from "https";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { Interface } from "readline";
import AuthContext from "../contexts/auth-context";
import RequestConfig from "../interfaces/RequestConfig";

const useFetchRequest = () => {
	const ctx = useContext(AuthContext);
	const [error, setError] = useState<string | null>(null);

	const fetchRequest = useCallback(async (requestConfig: RequestConfig, applyData: (data: any) => void) => {
		setError(null);
		try {
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
			await applyData(data);
		} catch (err: any) {
			let errorMessage = "Something went wrong!";
			if (err instanceof Error) errorMessage = err.message;
			setError(errorMessage);
		}
	}, []);

	return {
		error,
		fetchRequest,
	};
};
export default useFetchRequest;
