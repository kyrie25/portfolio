import React from "react";
import FadeIn from "react-fade-in";
import "./Music.scss";

class Music extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<FadeIn>
				<div className="playlist__container">
					<p>Spotify playlist</p>
					<div className="iframe__container">
						<iframe
							src="https://open.spotify.com/embed/playlist/5OoKLO2wXOqPL8qg2jrLt1?utm_source=generator"
							allowFullScreen={true}
							allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						></iframe>
					</div>
				</div>
				<div className="vid__container">
					<p>Current obsession</p>
					<div className="iframe__container">
						<iframe
							src="https://www.youtube.com/embed/P_CSdxSGfaA"
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						></iframe>
					</div>
				</div>
			</FadeIn>
		);
	}
}
export default Music;
