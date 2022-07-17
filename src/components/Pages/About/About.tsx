import React from "react";
import FadeIn from "../../../utils/FadeIn/FadeIn";
import "./About.scss";
import manifest from "./manifest.json";

class About extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<FadeIn>
				<div className="about__container">
					<p>
						Made from scratch by{" "}
						<a
							title="GitHub"
							href="https://github.com/kyrie25"
							target="_blank"
							rel="noopener noreferrer"
						>
							kyrie25
						</a>{" "}
						with 🔥 and 💕
					</p>
					<p>Languages/frameworks used:</p>
					<div className="icons__wrapper">
						{manifest.languages.map((value, index) => {
							return (
								<a
									href={value.url}
									key={index}
									id={value.name}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img title={value.name} src={value.image}></img>
								</a>
							);
						})}
					</div>
					<p>Projects I'm working on:</p>
					<div className="icons__wrapper">
						{manifest.projects.map((value, index) => {
							return (
								<a
									href={value.url}
									key={index}
									id={value.name}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img title={value.name} src={value.image}></img>
								</a>
							);
						})}
					</div>
					<p>
						This project serves more as a template/concept than an actual
						portfolio, more features will come later!
					</p>
					<p>Feel free to clone this project and make it yours.</p>
					<p>
						DM me on <a href="https://twitter.com/_kyrie_25">Twitter</a>/
						<a href="https://discord.com/users/368399721494216706">Discord</a>{" "}
						if you need to contact.
					</p>
				</div>
			</FadeIn>
		);
	}
}
export default About;
