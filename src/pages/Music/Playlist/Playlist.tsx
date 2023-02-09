import React from "react";
import FadeIn from "@/components/FadeIn";
import { SPOTIFY_WEB_URL } from "@/utils/constants";

import "../Music.scss";

class Playlist extends React.PureComponent {
	render() {
		return (
			<FadeIn>
				<div className="playlist__container">
					<p>Spotify playlist</p>
					<div className="iframe__container">
						<iframe
							src={`${SPOTIFY_WEB_URL}/embed/playlist/5OoKLO2wXOqPL8qg2jrLt1?utm_source=generator`}
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
