import React from "react";
import Playlist from "./Playlist/Playlist";
import Streams from "./Streams/Streams";

const Music = React.memo(() => {
	return (
		<>
			<Playlist />
			<Streams />
		</>
	);
});

export default Music;
