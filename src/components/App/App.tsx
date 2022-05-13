import React from "react";
import Status from "../Status/Status";
import Titlebar from "../Titlebar/Titlebar";
import Social from "../Social/Social";
import Dock from "../Dock/Dock";

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<>
				<Titlebar />
				<div className="background" />
				<div className="container">
					<Status />
					<Social />
				</div>
				<Dock />
			</>
		);
	}
}

export default App;
