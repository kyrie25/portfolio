import { useLastFM } from "use-last-fm";
import "./Dock.scss";

const Dock = () => {
	// Replace parameters with your (chosen) LastFM username and API key
	const lastFM = useLastFM("kyrie25", "0ce7260f5b1e3045c195c4dc12c0af87");
	if (lastFM.status !== "playing") {
		return (
			<div className="dock">
				<p>Not listening to anything</p>
			</div>
		);
	}

	return (
		<div className="dock">
			<img
				alt="Now playing"
				src={lastFM.song.art || require("./icon/now_playing.gif")}
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
