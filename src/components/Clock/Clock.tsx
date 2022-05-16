import { useEffect, useState } from "react";
import Clock from "react-clock";
import "./Clock.scss";

function LocalClock() {
	const [value, setValue] = useState(
		// Local machine time + Local timezone offset + Chosen timezone offset (ms)
		new Date(
			Date.now() + new Date().getTimezoneOffset() * 60000 + 7 * 3600 * 1000
		)
	);

	useEffect(() => {
		const interval = setInterval(
			() =>
				setValue(
					new Date(
						Date.now() +
							new Date().getTimezoneOffset() * 60000 +
							7 * 3600 * 1000
					)
				),
			1000
		);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div>
			<p>Local time:</p>
			<Clock value={value} />
		</div>
	);
}
export default LocalClock;
