import { hexToRgb, Color, Solver } from "./colorFilter";
import { DISCORD_CDN } from "./constants";

export const formatTime = (timestamps?: { start: number; end?: number }) => {
	if (!timestamps) return;
	const { start, end } = timestamps;
	if (!start && !end) return;
	// End timestamps is prioritized over start timestamps and displayed accordingly.
	const startTime = new Date(end || start).getTime();
	const endTime = Date.now();
	let difference = end
		? (startTime - endTime) / 1000
		: (endTime - startTime) / 1000;
	if (difference < 0) return `00:00 ${end ? "left" : "elapsed"}`;

	// we only calculate them, but we don't display them.
	// this fixes a bug in the Discord API that does not send the correct timestamp to presence.
	const daysDifference = Math.floor(difference / 60 / 60 / 24);
	difference -= daysDifference * 60 * 60 * 24;

	const hoursDifference = Math.floor(difference / 60 / 60);
	difference -= hoursDifference * 60 * 60;

	const minutesDifference = Math.floor(difference / 60);
	difference -= minutesDifference * 60;

	const secondsDifference = Math.floor(difference);

	return `${
		hoursDifference >= 1 ? `${`0${hoursDifference}`.slice(-2)}:` : ""
	}${`0${minutesDifference}`.slice(-2)}:${`0${secondsDifference}`.slice(-2)} ${
		end ? "left" : "elapsed"
	}`;
};

export const getFlags = (flag: number): string[] => {
	const flags: string[] = [];

	// In the order they appear on profiles
	if (flag & 1) flags.push("Discord_Employee"); // 1 << 0
	if (flag & 262144) flags.push("Discord_Certified_Moderator"); // 1 << 18
	if (flag & 2) flags.push("Partnered_Server_Owner"); // 1 << 1
	if (flag & 4) flags.push("HypeSquad_Events"); // 1 << 2
	if (flag & 64) flags.push("House_Bravery"); // 1 << 6
	if (flag & 128) flags.push("House_Brilliance"); // 1 << 7
	if (flag & 256) flags.push("House_Balance"); // 1 << 8
	if (flag & 8) flags.push("Bug_Hunter_Level_1"); // 1 << 3
	if (flag & 16384) flags.push("Bug_Hunter_Level_2"); // 1 << 14
	if (flag & 4194304) flags.push("Active_Developer"); // 1 << 22
	if (flag & 131072) flags.push("Early_Verified_Bot_Developer"); // 1 << 17
	if (flag & 512) flags.push("Early_Supporter"); // 1 << 9

	return flags;
};

export const getColorFilter = (hex: string) => {
	const rgb = hexToRgb(hex);
	if (rgb?.length !== 3) return;

	const color = new Color(rgb[0], rgb[1], rgb[2]);
	const solver = new Solver(color);
	const result = solver.solve();
	return result.filter;
};

// Get the blended color value between two colors with 10 midpoints
export const getBlendedFilter = (
	color1: string,
	color2: string,
	theme: string
) => {
	const rgb1 = hexToRgb(color1);
	const rgb2 = hexToRgb(color2);
	const midpoint = theme === "dark" ? 3 : 8;
	if (rgb1?.length !== 3 || rgb2?.length !== 3) return;

	const calculateBlend = (a: number, b: number) => {
		const baseColor = a < b ? a : b;
		const difference = Math.abs(a - b);
		return baseColor + Math.floor(difference / 11) * midpoint;
	};

	const avgR = calculateBlend(rgb1[0], rgb2[0]);
	const avgG = calculateBlend(rgb1[1], rgb2[1]);
	const avgB = calculateBlend(rgb1[2], rgb2[2]);

	const color = new Color(avgR, avgG, avgB);
	const solver = new Solver(color);
	const result = solver.solve();
	return result.filter;
};

export const processDiscordImage = (
	imageHash: string | undefined,
	appID?: `${bigint}`
) => {
	return imageHash?.startsWith("mp:external/")
		? `https://media.discordapp.net/external/${imageHash.replace(
				"mp:external/",
				""
		  )}`
		: `${DISCORD_CDN}/app-assets/${appID}/${imageHash}.png`;
};

export const concatClassname = (
	baseClassname: string,
	conditionalClassname: string,
	condition: boolean
) => `${baseClassname} ${condition ? conditionalClassname : ""}`.trim();
