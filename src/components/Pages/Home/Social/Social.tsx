import React from "react";
import FadeIn from "../../../../utils/FadeIn/FadeIn";
import "./Social.scss";
import manifest from "./manifest.json";

class Social extends React.Component {
	constructor(props) {
		super(props);
	}

	toggleHover(
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		color: string
	) {
		if (event.type === "mouseenter") event.currentTarget.style.color = color;
		else if (event.type === "mouseleave")
			event.currentTarget.style.color = "white";
	}

	render() {
		return (
			<div className="social__container">
				<p>My social links</p>
				<div className="button__container">
					<FadeIn>
						{manifest.accounts.map((value, index) => {
							return (
								<div
									key={index}
									className="button__wrapper"
									id={value.id}
									style={{
										borderColor: value.color,
										backgroundColor: value.color
									}}
									onMouseEnter={e => this.toggleHover(e, value.color)}
									onMouseLeave={e => this.toggleHover(e, value.color)}
								>
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
