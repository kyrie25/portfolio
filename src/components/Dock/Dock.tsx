import { useCallback } from "react";
import { useLastFM } from "use-last-fm";
import "./Dock.scss";

const Dock = (props: { callback: (key: string, value: any) => void }) => {
	if (
		!process.env.REACT_APP_LASTFM_USERNAME ||
		!process.env.REACT_APP_LASTFM_API_KEY
	) {
		return (
			<div className="dock">
				<p>Last.fm Username/API Key not provided</p>
			</div>
		);
	}
	const lastFM = useLastFM(
		process.env.REACT_APP_LASTFM_USERNAME,
		process.env.REACT_APP_LASTFM_API_KEY
	);
	if (lastFM.status !== "playing") {
		return (
			<div className="dock">
				<p>Not listening to anything</p>
			</div>
		);
	}

	useCallback(() => props.callback("currentSong", lastFM.song.name), []);

	return (
		<div className="dock">
			<img
				alt="Now playing"
				src={lastFM.song.art || require("../../assets/now_playing.gif")}
			/>
			<p>
				Listening to:&nbsp;
				<a href={lastFM.song.url}>
					<span>{lastFM.song.name}</span> by <span>{lastFM.song.artist}</span>
				</a>
			</p>
		</div>
	);
};
export default Dock;
