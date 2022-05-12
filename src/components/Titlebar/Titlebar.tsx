import React from "react";
import "./Titlebar.scss";

class Titlebar extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="titlebar">
				<div className="process">kyrie25@github.io:~</div>
			</div>
		);
	}
}
export default Titlebar;
