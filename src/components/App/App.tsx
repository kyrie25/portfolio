import React from "react";

// Present in all tabs
import Titlebar from "../Titlebar/Titlebar";
import Dock from "../Dock/Dock";

// Home page components
import Status from "../Status/Status";
import Social from "../Social/Social";

// Music page component
import Music from "../Music/Music";

// About page component
import About from "../About/About";

import "./App.scss";

class App extends React.Component<
	Record<string, unknown>,
	{ activeTab: string }
> {
	constructor(props) {
		super(props);
		Object.assign(this, props);
		this.state = {
			activeTab: "home"
		};

		this.renderSelectedTab = this.renderSelectedTab.bind(this);
		this.dynamicBackground = this.dynamicBackground.bind(this);
		this.handleTabSelect = this.handleTabSelect.bind(this);
	}

	dynamicBackground() {
		switch (this.state.activeTab) {
			case "music":
				return "2";
			case "about":
				return "3";
			case "home":
			default:
				return "1";
		}
	}

	handleTabSelect(tab: string) {
		this.setState({ activeTab: tab });
	}

	renderSelectedTab() {
		switch (this.state.activeTab) {
			case "music": {
				return (
					<>
						<Music />
					</>
				);
			}
			case "about": {
				return (
					<>
						<About />
					</>
				);
			}
			case "home":
			default: {
				return (
					<>
						<Status />
						<Social />
					</>
				);
			}
		}
	}

	render() {
		return (
			<>
				<Titlebar onTabSelect={this.handleTabSelect} />
				<div className="background" id={this.dynamicBackground()} />
				<div className="container">
					<this.renderSelectedTab />
					<Dock />
				</div>
			</>
		);
	}
}

export default App;
