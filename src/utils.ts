const DISCORD_CDN = "https://cdn.discordapp.com";

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

export const fetchAPI = (id, callback, onError) =>
	fetch(`https://api.kyrie25.me/discord/${id}`)
		.then((response) => response.json())
		.then(callback)
		.catch(onError);

export const waitTwoFrames = (callback) =>
	requestAnimationFrame(() => requestAnimationFrame(callback));

export const processDiscordImage = (
	imageHash: string | undefined,
	appID?: string
) => {
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
