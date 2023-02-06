import React from "react";
import LocalClock from "../Clock/Clock";
import FadeIn from "utils/FadeIn";
import "./Status.scss";
import Lanyard from "@/components/Lanyard";

class Status extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<FadeIn>
				<div className="status__container">
					<div className="clock clock__container">
						<LocalClock></LocalClock>
					</div>
					<div className="status">
						<Lanyard />
					</div>
				</div>
			</FadeIn>
		);
	}
}
export default Status;
