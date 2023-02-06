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
	const { data } = useLanyard(import.meta.env.VITE_DISCORD_ID);
	const [state, setState] = React.useState(data?.spotify);

	useEffect(() => {
		const interval = setInterval(() => {
			fetch(
				`https://api.lanyard.rest/v1/users/${import.meta.env.VITE_DISCORD_ID}`
			).then(res => {
				res.json().then(({ data: user }) => {
					if (user?.spotify?.song !== state?.song) setState(user?.spotify);
				});
			});
			return () => clearInterval(interval);
			// Updates every 10 seconds
		}, 5000);
	}, []);

	if (!data?.spotify) {
		return (
			<div className="dock">
				<p>Not listening to anything</p>
			</div>
		);
	}

	const spotify = state || data?.spotify;

	return (
		<footer className="dock">
			<img alt={spotify?.album} src={spotify?.album_art_url || nowPlaying} />
			<p>
				Listening to:&nbsp;
				<a href={`https://open.spotify.com/track/${spotify?.track_id}`}>
					<span>{spotify?.song}</span> by <span>{spotify?.artist}</span>
				</a>
			</p>
		</footer>
	);
};

export default Dock;
