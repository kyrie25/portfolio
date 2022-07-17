import React from "react";
import ReactDOM from "react-dom/client";

// Present in all tabs
import Titlebar from "./components/Titlebar/Titlebar";
import Dock from "./components/Dock/Dock";

// Home page components
import Status from "./components/Pages/Home/Status/Status";
import Social from "./components/Pages/Home/Social/Social";

// Music page components
import Playlist from "./components/Pages/Music/Playlist/Playlist";
import Streams from "./components/Pages/Music/Streams/Streams";

// About page component
import About from "./components/Pages/About/About";

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
	}

	handleTabSelect(tab: string) {
		this.setState({ activeTab: tab });
	}

	render() {
		const activeTabComponent = {
			home: {
				image: require("./assets/bg/bg.jpg"),
				components: (
					<>
						<Status />
						<Social />
					</>
				)
			},
			music: {
				image: require("./assets/bg/music_bg.jpg"),
				components: (
					<>
						<Playlist />
						<Streams />
					</>
				)
			},
			about: {
				image: require("./assets/bg/about_bg.jpg"),
				components: <About />
			}
		};

		return (
			<>
				<Titlebar onTabSelect={this.handleTabSelect.bind(this)} />
				<div
					className="background"
					style={{
						backgroundImage: `url(${
							activeTabComponent[this.state.activeTab].image
						}`,
						content: (() => {
							// Get every image property from all tabs
							const images: string[] = [];
							// Return a list of images
							for (const value of Object.values(activeTabComponent).map(
								value => value.image
							))
								images.push(`url(${value})`);

							return images.join(" ");
						})()
					}}
				/>
				<div className="container">
					{activeTabComponent[this.state.activeTab].components}
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
