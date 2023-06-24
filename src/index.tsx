import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	Outlet,
	Route,
	RouterProvider,
	Routes,
	Navigate
} from "react-router-dom";
import { Tooltip } from "react-tooltip";

// Present in all tabs
import Titlebar from "./components/Titlebar";
import Dock from "./components/Dock";

// Tabs
import { Links, Tabs } from "./Tabs";

import "./index.scss";
import "react-tooltip/dist/react-tooltip.css";

class App extends React.Component<
	Record<string, unknown>,
	{ activeTab: string; componentState: Record<string, unknown> }
> {
	constructor(props) {
		super(props);
		Object.assign(this, props);
		this.state = {
			activeTab: location.pathname.slice(1) || Object.keys(Tabs)[0],
			componentState: {}
		};
	}

	handleTabSelect(tab: string) {
		this.setState({ activeTab: tab });
	}

	componentDidMount(): void {
		if (Tabs[this.state.activeTab] === undefined)
			this.setState({ activeTab: Object.keys(Tabs)[0] });
	}

	componentDidUpdate(): void {
		document.title = Tabs[this.state.activeTab]?.title ?? "Kyrie's site";
	}

	cacheValue(key: string, value: unknown) {
		this.setState({
			componentState: { ...this.state.componentState, [key]: value }
		});
	}

	render() {
		if (Tabs[this.state.activeTab] === undefined)
			return <Navigate to="/" replace />;

		return (
			<>
				<Tooltip
					id="tooltip"
					style={{
						zIndex: 9999999
					}}
				/>
				<Titlebar
					onTabSelect={this.handleTabSelect.bind(this)}
					activeTab={this.state.activeTab}
				/>
				<div className="background" />
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
				<Dock />
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
