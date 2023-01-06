import React from "react";
import ReactDOM from "react-dom/client";

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
			activeTab: "about",
			componentState: {}
		};
	}

	getImage(tab: string) {
		return `url(${require(`./assets/bg/${tab}_bg.jpg`)})`;
	}

	handleTabSelect(tab: string) {
		this.setState({ activeTab: tab });
	}

	componentDidMount(): void {
		for (const value of Object.keys(Tabs)) {
			const img = new Image();
			img.src = require(`./assets/bg/${value}_bg.jpg`);
		}
	}

	cacheValue(key: string, value: unknown) {
		this.setState({
			componentState: { ...this.state.componentState, [key]: value }
		});
	}

	render() {
		const ActiveTab = Tabs[this.state.activeTab].component;
		return (
			<>
				<Titlebar
					onTabSelect={this.handleTabSelect.bind(this)}
					activeTab={this.state.activeTab}
				/>
				<div
					className="background"
					style={{
						backgroundImage: this.getImage(this.state.activeTab)
					}}
				/>
				<div className="container">
					<ActiveTab
						callback={this.cacheValue.bind(this)}
						cache={this.state.componentState}
					/>
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

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
