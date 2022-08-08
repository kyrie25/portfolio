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
	activeTabComponent: {
		[s: string]: { image: string; components: JSX.Element };
	};
	constructor(props) {
		super(props);
		Object.assign(this, props);
		this.state = {
			activeTab: "home"
		};

		this.activeTabComponent = {
			home: {
				image: `url(${require("./assets/bg/bg.jpg")})`,
				components: <About />
			},
			music: {
				image: `url(${require("./assets/bg/music_bg.jpg")})`,
				components: (
					<>
						<Playlist />
						<Streams />
					</>
				)
			},
			about: {
				image: `url(${require("./assets/bg/about_bg.jpg")})`,
				components: (
					<>
						<Status />
						<Social />
					</>
				)
			}
		};
	}

	handleTabSelect(tab: string) {
		this.setState({ activeTab: tab });
	}

	preloadImage() {
		return Object.values(this.activeTabComponent)
			.map(value => value.image)
			.join(" ");
	}

	render() {
		return (
			<>
				<Titlebar onTabSelect={this.handleTabSelect.bind(this)} />
				<div
					className="background"
					style={{
						backgroundImage:
							this.activeTabComponent[this.state.activeTab].image,
						content: this.preloadImage()
					}}
				/>
				<div className="container">
					{this.activeTabComponent[this.state.activeTab].components}
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
