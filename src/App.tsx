import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Layout from "./layouts/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
interface Props {}

const App: React.FunctionComponent<Props> = (props: Props) => {
	return (
		<Layout>
			<Switch>
				<Route path='/' exact render={() => <Redirect to='/home' />} />

				<Route path='/home' exact>
					<Home />
				</Route>

				<Route path='/login' exact>
					<Login />
				</Route>
			</Switch>
		</Layout>
	);
};
export default App;
