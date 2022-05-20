import React from "react";
import FadeIn from "react-fade-in";

import "../Music.scss";

class Playlist extends React.Component {
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
			</FadeIn>
		);
	}
}
export default Playlist;
