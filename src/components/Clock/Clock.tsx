import { useEffect, useState } from "react";
import Clock from "react-clock";
import "./Clock.scss";

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
