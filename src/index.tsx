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
			activeTab: location.pathname.slice(1) || Object.keys(Tabs)[0],
			componentState: {}
		};
	}

	handleTabSelect(tab: string) {
		this.setState({ activeTab: tab });
	}

	componentDidMount(): void {
		for (const value of Object.keys(Tabs)) {
			const img = new Image();
			img.src = `/assets/bg/${value}_bg.jpg`;
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
						backgroundImage: `url(/assets/bg/${this.state.activeTab}_bg.jpg)`
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
