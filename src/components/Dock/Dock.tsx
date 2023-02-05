import { useLastFM } from "use-last-fm";
import "./Dock.scss";

import nowPlaying from "assets/now_playing.gif";

const Dock = (props: {
	cache: Record<string, unknown>;
	callback: (key: string, value) => void;
}) => {
	if (
		!import.meta.env.VITE_LASTFM_USERNAME ||
		!import.meta.env.VITE_LASTFM_API_KEY
	) {
		return (
			<div className="dock">
				<p>Last.fm Username/API Key not provided</p>
			</div>
		);
	}
	const lastFM = useLastFM(
		import.meta.env.VITE_LASTFM_USERNAME,
		import.meta.env.VITE_LASTFM_API_KEY
	);
	if (lastFM.status !== "playing") {
		return (
			<div className="dock">
				<p>Not listening to anything</p>
			</div>
		);
	}

	if (lastFM.song.name !== props.cache.currentSong)
		props.callback("currentSong", lastFM.song.name);

	return (
		<footer className="dock">
			<img alt="Now playing" src={lastFM.song.art || nowPlaying} />
			<p>
				Listening to:&nbsp;
				<a href={lastFM.song.url}>
					<span>{lastFM.song.name}</span> by <span>{lastFM.song.artist}</span>
				</a>
			</p>
		</footer>
	);
};
export default Dock;
