import React from "react";
import Social from "./Social/Social";
import Status from "./Status/Status";

const Socials = React.memo(() => {
	return (
		<>
			<Status />
			<Social />
		</>
	);
});

export default Socials;
