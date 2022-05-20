import React from "react";
import FadeIn from "react-fade-in";
import "./Social.scss";
import manifest from "./manifest.json";

class Social extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="social__container">
				<p>My social links</p>
				<div className="button__container">
					<FadeIn>
						{manifest.accounts.map((value, index) => {
							return (
								<div key={index} className="button__wrapper" id={value.id}>
									<a
										title={value.name}
										href={value.link}
										target="_blank"
										rel="noopener noreferrer"
									>
										{value.name}
									</a>
								</div>
							);
						})}
					</FadeIn>
				</div>
			</div>
		);
	}
}
export default Social;
