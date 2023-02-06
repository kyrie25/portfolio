import React, { useEffect } from "react";
import "./Dock.scss";

import nowPlaying from "assets/now_playing.gif";
import { useLanyard } from "use-lanyard";

const Dock = () => {
	if (!import.meta.env.VITE_DISCORD_ID) {
		return (
			<div className="dock">
				<p>Discord ID not provided</p>
			</div>
		);
	}
	const { data, revalidate } = useLanyard(import.meta.env.VITE_DISCORD_ID);

	useEffect(() => {
		revalidate();
	}, []);

	if (!data?.spotify) {
		return (
			<div className="dock">
				<p>Not listening to anything</p>
			</div>
		);
	}

	const { spotify } = data;

	return (
		<footer className="dock">
			<img alt={spotify.album} src={spotify.album_art_url || nowPlaying} />
			<p>
				Listening to:&nbsp;
				<a href={`https://open.spotify.com/track/${spotify.track_id}`}>
					<span>{spotify.song}</span> by <span>{spotify.artist}</span>
				</a>
			</p>
		</footer>
	);
};

export default Dock;
