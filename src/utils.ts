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

export const fetchAPI = (id, callback, onError) =>
	fetch(`https://api.kyrie25.me/discord/${id}`)
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
		: imageHash?.startsWith("spotify:")
		? imageHash.replace("spotify:", "https://i.scdn.co/image/")
		: `${DISCORD_CDN}/app-assets/${appID}/${imageHash}.png`;
};

export const ext = (hash: string | null) =>
	hash?.startsWith("a_") ? "gif" : "webp";

export const activitiesTypes = (type: number) => {
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

// Check against white text
export function WCGACheckColor(color: string) {
	const r = parseInt(color.substr(0, 2), 16);
	const g = parseInt(color.substr(2, 2), 16);
	const b = parseInt(color.substr(4, 2), 16);
	const brightness = (r * 299 + g * 587 + b * 114) / 1000;
	return brightness > 125;
}
