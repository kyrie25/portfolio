import React from "react";
import "./Titlebar.scss";

class Titlebar extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="titlebar">
				<div
					className="space"
					onClick={() =>
						(window.location.href = "https://github.com/kyrie25/portfolio")
					}
				>
					<img title="GitHub logo" src={require("./img/github.png")}></img>
					Source code
				</div>
				<div className="process">kyrie25@github.io:~</div>
			</div>
		);
	}
}
export default Titlebar;
