import * as React from "react";
import { waitTwoFrames } from "../utils";
import { FaClock, FaCalendarAlt } from "react-icons/fa";

export const Anchor = ({ href, children, ...props }) => (
	<a href={href} target="_blank" rel="noreferrer" {...props}>
		{children}
	</a>
);

export const Image = ({ onLoad = () => {}, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
	<img onLoad={() => waitTwoFrames(onLoad)} onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => e.currentTarget.remove()} {...props} />
);

export const LoadingIcon = () => {
	return (
		<svg width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
			<circle cx="50" cy="50" r="0" fill="none" stroke="currentColor" strokeWidth="2">
				<animate
					attributeName="r"
					repeatCount="indefinite"
					dur="1s"
					values="0;40"
					keyTimes="0;1"
					keySplines="0 0.2 0.8 1"
					calcMode="spline"
					begin="0s"
				/>
				<animate
					attributeName="opacity"
					repeatCount="indefinite"
					dur="1s"
					values="1;0"
					keyTimes="0;1"
					keySplines="0.2 0 0.8 1"
					calcMode="spline"
					begin="0s"
				/>
			</circle>
			<circle cx="50" cy="50" r="0" fill="none" stroke="currentColor" strokeWidth="2">
				<animate
					attributeName="r"
					repeatCount="indefinite"
					dur="1s"
					values="0;40"
					keyTimes="0;1"
					keySplines="0 0.2 0.8 1"
					calcMode="spline"
					begin="-0.5s"
				/>
				<animate
					attributeName="opacity"
					repeatCount="indefinite"
					dur="1s"
					values="1;0"
					keyTimes="0;1"
					keySplines="0.2 0 0.8 1"
					calcMode="spline"
					begin="-0.5s"
				/>
			</circle>
		</svg>
	);
};

export const Cat = () => {
	const cats = [
		"=^._.^=",
		"(=｀ェ´=)",
		"(=^ ◡ ^=)",
		"/ᐠ｡ꞈ｡ᐟ\\",
		"/ᐠ.ꞈ.ᐟ\\",
		"✧/ᐠ-ꞈ-ᐟ\\",
		"(ﾐචᆽචﾐ)",
		"(=චᆽච=)",
		"(=ㅇᆽㅇ=)",
		"(=ㅇ༝ㅇ=)",
		"₍⸍⸌̣ʷ̣̫⸍̣⸌₎",
		"=＾ᵒ⋏ᵒ＾=",
		"( ⓛ ﻌ ⓛ *)",
		"(=ↀωↀ=)",
		"(=^･ω･^=)",
		"(=^･ｪ･^=)",
		"ㅇㅅㅇ",
	];

	const [cat, setCat] = React.useState<number>(Math.floor(Math.random() * cats.length));

	return (
		<span
			className="cat"
			onMouseEnter={() => setCat(Math.floor(Math.random() * cats.length))}
			// Compatibility with mobile devices
			// onClick={() => setCat(Math.floor(Math.random() * cats.length))}
		>
			{cats[cat]}
		</span>
	);
};

export const Clock = () => {
	const dateFormatter = new Intl.DateTimeFormat([], {
		timeZone: "Asia/Ho_Chi_Minh",
		weekday: "short",
		month: "short",
		day: "numeric",
	});

	const timeFormatter = new Intl.DateTimeFormat([], {
		timeZone: "Asia/Ho_Chi_Minh",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: true,
	});

	const [date, setDate] = React.useState(dateFormatter.format(new Date()));
	const [time, setTime] = React.useState(timeFormatter.format(new Date()));
	const [percentOfDay, setPercentOfDay] = React.useState<number>(0);

	React.useEffect(() => {
		const interval = setInterval(() => {
			setDate(dateFormatter.format(new Date()));
			setTime(timeFormatter.format(new Date()));

			const now = new Date();
			const start = new Date(now);
			start.setHours(0, 0, 0, 0);
			const end = new Date(now);
			end.setHours(23, 59, 59, 999);
			const percent = (now.getTime() - start.getTime()) / (end.getTime() - start.getTime());
			setPercentOfDay(percent);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<span className="clock-header">Local Time:</span>
			<div className="clock">
				<div className="date-widget">
					<FaCalendarAlt style={{ paddingRight: "0.5rem" }} />
					{date}
				</div>
				<div className="time-widget">
					<FaClock style={{ paddingRight: "0.5rem" }} />
					{time}
					<div className="time-widget-filler" style={{ transform: `scaleX(${percentOfDay})` }} />
				</div>
			</div>
		</>
	);
};
