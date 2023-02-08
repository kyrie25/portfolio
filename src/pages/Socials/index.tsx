import React from "react";
import Social from "./Social/Social";
import Status from "./Status/Status";

const Socials = React.memo(
	(props: {
		cache: Record<string, unknown>;
		callback: (key: string, value) => void;
	}) => {
		return (
			<>
				<Status cache={props.cache} callback={props.callback} />
				<Social />
			</>
		);
	}
);

export default Socials;
