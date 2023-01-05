import React from "react";
import Playlist from "./Playlist/Playlist";
import Streams from "./Streams/Streams";

const Music = React.memo(
	(props: {
		cache: Record<string, unknown>;
		callback: (key: string, value: any) => void;
	}) => {
		return (
			<>
				<Playlist />
				<Streams callback={props.callback} cache={props.cache} />
			</>
		);
	}
);

export default Music;
