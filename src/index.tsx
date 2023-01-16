import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	Outlet,
	Route,
	RouterProvider,
	Routes
} from "react-router-dom";

// Present in all tabs
import Titlebar from "./components/Titlebar/Titlebar";
import Dock from "./components/Dock/Dock";

// Tabs
import { Tabs } from "./Tabs";

import "./index.scss";

class App extends React.Component<
	Record<string, unknown>,
	{ activeTab: string; componentState: Record<string, unknown> }
> {
	constructor(props) {
		super(props);
		Object.assign(this, props);
		this.state = {
			activeTab: location.pathname.slice(1) || "about",
			componentState: {}
		};
	}

	getImage(tab: string) {
		return require(`./assets/bg/${tab}_bg.jpg`);
	}

	handleTabSelect(tab: string) {
		this.setState({ activeTab: tab });
	}

	componentDidMount(): void {
		for (const value of Object.keys(Tabs)) {
			const img = new Image();
			img.src = this.getImage(value);
		}
	}

	cacheValue(key: string, value: unknown) {
		this.setState({
			componentState: { ...this.state.componentState, [key]: value }
		});
	}

	render() {
		return (
			<>
				<Titlebar
					onTabSelect={this.handleTabSelect.bind(this)}
					activeTab={this.state.activeTab}
				/>
				<div
					className="background"
					style={{
						backgroundImage: `url(${this.getImage(this.state.activeTab)})`
					}}
				/>
				<div className="container">
					<Routes>
						{Object.entries(Tabs).map(([key, value]) => {
							return (
								<Route
									key={key}
									path={value.path}
									element={
										<value.component
											cache={this.state.componentState}
											callback={this.cacheValue.bind(this)}
										/>
									}
								/>
							);
						})}
					</Routes>
					<Outlet />
				</div>
				<Dock
					cache={this.state.componentState}
					callback={this.cacheValue.bind(this)}
				/>
			</>
		);
	}
}

export default App;

const router = createBrowserRouter([
	{
		path: "/*",
		element: <App />
	}
]);

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
