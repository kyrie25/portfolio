import { SyntheticEvent, useEffect } from "react";
import "./Dock.scss";

import nowPlaying from "assets/now_playing.gif";
import { useLanyard } from "use-lanyard";
import { SPOTIFY_WEB_URL } from "@/utils/constants";

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
		const refresh = setInterval(() => {
			revalidate();
			return () => clearInterval(refresh);
		}, 5000);
	}, []);

	if (!data?.spotify) {
		return (
			<div className="dock">
				<p>Not listening to anything</p>
			</div>
		);
	}

	/**
	 * Function to align album image cover perfectly on the left edge of the viewport on hover.
	 *
	 * Since the image height is always gonna be larger than 50px, only width is needed.
	 */
	const getImageLocation = (image: SyntheticEvent<HTMLImageElement, Event>) => {
		const { x, width } = image.currentTarget.getBoundingClientRect();

		/** Image is scaled up by 5x, so we need to divide the width by 5 to get the original width.
		 * The scaled width is then subtracted from the original width to get the difference.
		 * Then we need to divide the original width by 2 to get the difference on only one side.
		 */
		const incrementedWidth = (width * 5 - width) / 2;

		/** Since this only needs to work on small screens, if the width is smaller than x, we can just set it to 0.
		 * idk why we need to divide by 5, but it works.
		 */
		const desiredX =
			x - incrementedWidth > 0 ? 0 : Math.abs(x - incrementedWidth) / 5;

		image.currentTarget.style.setProperty("--x", `${desiredX}px`);
	};

	const { spotify } = data;

	return (
		<footer className="dock">
			<img
				alt={spotify.album}
				src={spotify.album_art_url || nowPlaying}
				onLoad={getImageLocation}
			/>
			<p>
				Listening to:&nbsp;
				<a href={`${SPOTIFY_WEB_URL}/track/${spotify.track_id}`}>
					<span>{spotify.song}</span> by <span>{spotify.artist}</span>
				</a>
			</p>
		</footer>
	);
};

export default Dock;