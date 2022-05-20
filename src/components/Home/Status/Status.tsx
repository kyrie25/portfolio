import React from "react";
import LocalClock from "../Clock/Clock";
import FadeIn from "react-fade-in";
import "./Status.scss";

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
						<a
							title="Discord"
							href="https://discord.com/users/368399721494216706"
						>
							<img
								alt="Lanyard"
								src="https://lanyard-profile-readme.vercel.app/api/368399721494216706"
							/>
						</a>
					</div>
				</div>
			</FadeIn>
		);
	}
}
export default Status;
