import * as React from "react";

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
