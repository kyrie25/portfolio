import React from "react";
import ReactDOM from "react-dom/client";

// Present in all tabs
import Titlebar from "./components/Titlebar/Titlebar";
import Dock from "./components/Dock/Dock";

// Tabs
import Home from "./components/Pages/Home";
import Music from "./components/Pages/Music";
import About from "./components/Pages/About";

import "./index.scss";

class App extends React.Component<
	Record<string, unknown>,
	{ activeTab: string }
> {
	activeTabComponent: {
		[s: string]: JSX.Element;
	};
	constructor(props) {
		super(props);
		Object.assign(this, props);
		this.state = {
			activeTab: "about"
		};

		this.activeTabComponent = {
			about: <About />,
			music: <Music />,
			home: <Home />
		};
	}

	getImage(tab: string) {
		return `url(${require(`./assets/bg/${tab}_bg.jpg`)})`;
	}

	handleTabSelect(tab: string) {
		this.setState({ activeTab: tab });
	}

	preloadImage() {
		return Object.keys(this.activeTabComponent)
			.map(value => this.getImage(value))
			.join(" ");
	}

	render() {
		return (
			<>
				<Titlebar
					onTabSelect={this.handleTabSelect.bind(this)}
					activeTab={this.state.activeTab}
					tabs={Object.keys(this.activeTabComponent)}
				/>
				<div
					className="background"
					style={{
						backgroundImage: this.getImage(this.state.activeTab),
						content: this.preloadImage()
					}}
				/>
				<div className="container">
					{this.activeTabComponent[this.state.activeTab]}
				</div>
				<Dock />
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
