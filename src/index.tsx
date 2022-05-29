import React from "react";
import ReactDOM from "react-dom/client";

// Present in all tabs
import Titlebar from "./Titlebar/Titlebar";
import Dock from "./Dock/Dock";

// Home page components
import Status from "./Pages/Home/Status/Status";
import Social from "./Pages/Home/Social/Social";

// Music page components
import Playlist from "./Pages/Music/Playlist/Playlist";
import Streams from "./Pages/Music/Streams/Streams";

// About page component
import About from "./Pages/About/About";

import "./index.scss";

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
						<Playlist />
						<Streams />
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

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
