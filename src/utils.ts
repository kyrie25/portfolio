const DISCORD_CDN = "https://cdn.discordapp.com";

export const getTimeFormatString = (timestamp: number) => {
	if (timestamp < 0) return `00:00`;

	// we only calculate them, but we don't display them.
	// this fixes a bug in the Discord API that does not send the correct timestamp to presence.
	const daysDifference = Math.floor(timestamp / 60 / 60 / 24);
	timestamp -= daysDifference * 60 * 60 * 24;

	const hoursDifference = Math.floor(timestamp / 60 / 60);
	timestamp -= hoursDifference * 60 * 60;

	const minutesDifference = Math.floor(timestamp / 60);
	timestamp -= minutesDifference * 60;

	const secondsDifference = Math.floor(timestamp);

	return `${
		hoursDifference >= 1 ? `${`0${hoursDifference}`.slice(-2)}:` : ""
	}${`0${minutesDifference}`.slice(-2)}:${`0${secondsDifference}`.slice(-2)}`;
};

export const formatTime = (
	timestamps?: { start?: number; end?: number },
	noText = false
) => {
	if (!timestamps) return;
	const { start, end } = timestamps;
	if (!start && !end) return;
	// End timestamps is prioritized over start timestamps and displayed accordingly.
	const startTime = new Date((end || start)!).getTime();
	const endTime = Date.now();
	let difference = end
		? (startTime - endTime) / 1000
		: (endTime - startTime) / 1000;
	if (difference < 0) return `00:00 ${end ? "left" : "elapsed"}`;

	let str = getTimeFormatString(difference);

	if (!noText) str += end ? " left" : " elapsed";

	return str;
};

export const fetchUser = (id, callback, onError) =>
	fetch(`https://api.kyrie25.dev/discord/${id}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response;
		})
		.then((response) => response.json())
		.then((data) => ({
			user: data,
		}))
		.then(callback)
		.catch(onError);

export const fetchAPI = (id, callback, onError) =>
	fetch(`https://dcdn.dstn.to/profile/${id}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response;
		})
		.then((response) => response.json())
		.then(callback)
		.catch((err) => {
			fetchUser(id, callback, onError);
		});

export const fetchGitHubStats = (username, callback, onError) =>
	fetch(
		`https://readme-stats.kyrie25.dev/api/stats?username=${username}&include_all_commits=true&count_private=true`
	)
		.then((response) => response.json())
		.then(callback)
		.catch(onError);

export const check404 = (url) =>
	fetch(url, { method: "HEAD" })
		.then((response) => {
			if (response.status === 404) return false;
			return true;
		})
		.catch(() => false);

export const waitTwoFrames = (callback) =>
	requestAnimationFrame(() => requestAnimationFrame(callback));

export const processDiscordImage = (
	imageHash: string | undefined,
	appID?: string
) => {
	if (!imageHash) return "";

	return imageHash?.startsWith("mp:external/")
		? `https://media.discordapp.net/external/${imageHash.replace(
				"mp:external/",
				""
		  )}`
		: imageHash?.startsWith("mp:attachments/")
		? `https://media.discordapp.net/attachments/${imageHash.replace(
				"mp:attachments/",
				""
		  )}`
		: imageHash?.startsWith("spotify:")
		? imageHash.replace("spotify:", "https://i.scdn.co/image/")
		: `${DISCORD_CDN}/app-assets/${appID}/${imageHash}.png`;
};

export const ext = (hash: string | null) =>
	hash?.startsWith("a_") ? "gif" : "webp";

export const getActivityTypeString = (type: number) => {
	switch (type) {
		case 0:
			return "Playing";
		case 1:
			return "Streaming";
		case 2:
			return "Listening to";
		case 3:
			return "Watching";
		default:
			return;
	}
};

export function getDominantColor(imageObject: HTMLImageElement) {
	imageObject.crossOrigin = "Anonymous";

	const ctx = document.createElement("canvas").getContext("2d");
	if (!ctx) return null;
	//draw the image to one pixel and let the browser find the dominant color
	ctx.drawImage(imageObject, 0, 0, 1, 1);

	//get pixel color
	const i = ctx.getImageData(0, 0, 1, 1).data;

	return ((1 << 24) + (i[0] << 16) + (i[1] << 8) + i[2]).toString(16).slice(1);
}

// Get contrasting color (black or white) based on luminance
export function WCGACheckColor(color: string | number[]): boolean {
	return luma(color) >= 165;
}

// Calculate luminance using SMPTE C, Rec. 709 weightings
export function luma(color: string | number[]): number {
	const rgb = typeof color === "string" ? hexToRgb(color) : color;
	if (!rgb) return 0;
	return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

export function hexToRgb(hex: string) {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, (m: any, r: any, g: any, b: any) => {
		return r + r + g + g + b + b;
	});

	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? [
				parseInt(result[1], 16),
				parseInt(result[2], 16),
				parseInt(result[3], 16),
		  ]
		: null;
}
