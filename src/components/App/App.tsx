import React from "react";
import Status from "../Status/Status";
import Titlebar from "../Titlebar/Titlebar";
import Social from "../Social/Social";
import FadeIn from "react-fade-in";

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<>
				<Titlebar></Titlebar>
				<div className="background"></div>
				<FadeIn>
					<div className="container">
						<Status></Status>
						<Social></Social>
					</div>
				</FadeIn>
			</>
		);
	}
}

export default App;
