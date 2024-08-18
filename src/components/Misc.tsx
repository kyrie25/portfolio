import * as React from "react";
import { waitTwoFrames } from "../utils";

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
	const formatter = new Intl.DateTimeFormat([], {
		timeZone: "Asia/Ho_Chi_Minh",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		month: "long",
		day: "numeric",
	});

	const [time, setTime] = React.useState(formatter.format(new Date()));

	React.useEffect(() => {
		const interval = setInterval(() => setTime(formatter.format(new Date())), 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<span>
			{"It is currently "} <code>{time}</code> {" for me."}
		</span>
	);
};
