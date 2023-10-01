import Lanyard from "@/components/Lanyard";
import React from "react";
import FadeIn from "@/components/FadeIn";
import "./About.scss";
import manifest from "./manifest.json";

const About = React.memo(
	(props: {
		cache: Record<string, unknown>;
		callback: (key: string, value) => void;
	}) => {
		return (
			<FadeIn>
				<div className="about__container">
					<p>
						Hi! 👋 I am{" "}
						<a
							title="GitHub"
							href="https://github.com/kyrie25"
							target="_blank"
							rel="noopener noreferrer"
						>
							kyrie25
						</a>
						.
					</p>
					<p>
						K23 fit
						<a href="https://hcmus.edu.vn/">@hcmus</a>. Fresher fullstack
						developer{" "}
						<a href="https://www.designveloper.com/">@Designveloper</a>.
					</p>
					<p>
						Stuff on this website will most likely be outdated by the time
						you're reading this, but feel free to look around.
					</p>
					<p>My tech stack (and many more, I'm too lazy to update):</p>
					<div className="icons__wrapper">
						{manifest.languages.map((value, index) => {
							return (
								<a
									href={value.url}
									key={index}
									id={value.name}
									target="_blank"
									rel="noopener noreferrer"
									data-tooltip-id="tooltip"
									data-tooltip-content={value.name}
								>
									<img title={value.name} src={value.image}></img>
								</a>
							);
						})}
					</div>
					<p>Projects I'm working on/have had experience in:</p>
					<div className="icons__wrapper">
						{manifest.projects.map((value, index) => {
							return (
								<a
									href={value.url}
									key={index}
									id={value.name}
									target="_blank"
									rel="noopener noreferrer"
									data-tooltip-id="tooltip"
									data-tooltip-content={value.name}
								>
									<img
										title={value.name}
										src={value.image}
										alt={value.name}
									></img>
								</a>
							);
						})}
					</div>
					<Lanyard cache={props.cache} setCache={props.callback} />
				</div>
			</FadeIn>
		);
	}
);
export default About;
