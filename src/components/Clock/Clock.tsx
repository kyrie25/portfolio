import { useEffect, useState } from "react";
import Clock from "react-clock";
import "./Clock.scss";

declare module "react-clock" {
	interface ClockProps {
		/**
		 * Locale that should be used by the clock. Can be any IETF language tag.
		 * @link https://en.wikipedia.org/wiki/IETF_language_tag
		 * @default "User's browser settings"
		 */
		locale?: string;
	}
}

function LocalClock() {
	const [value, setValue] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => setValue(new Date()), 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div>
			<p>Local time:</p>
			<Clock value={value} locale={"vi-VN"} />
		</div>
	);
}
export default LocalClock;
