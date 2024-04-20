import { useLanyardWS } from "use-lanyard";
import classNames from "classnames";
import "./Lanyard.scss";
import { Cat } from "./Cat";

export const processDiscordImage = (imageHash: string | undefined, appID?: string) => {
	return imageHash?.startsWith("mp:external/")
		? `https://media.discordapp.net/external/${imageHash.replace("mp:external/", "")}`
		: `https://cdn.discordapp.com/app-assets/${appID}/${imageHash}.png`;
};

export const Lanyard = ({ id }) => {
	const data = useLanyardWS(id);
	const activitiesTypes = (type: number) => {
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

	return (
		<>
			{data?.activities.length ? (
				<div className="lanyard">
					{data?.activities
						.filter((activity) => activity.type !== 4)
						.map((activity) => (
							<div key={activity.name} className="activity">
								<div className="activity-info">
									<div className="activity-image">
										{activity?.assets?.large_image && (
											<img
												src={processDiscordImage(activity.assets.large_image, activity.application_id)}
												className="activity-image-large"
												alt="activity"
												data-tooltip-id="tooltip"
												data-tooltip-content={activity.assets.large_text}
											/>
										)}
										{activity?.assets?.small_image && (
											<img
												src={processDiscordImage(activity.assets.small_image, activity.application_id)}
												className={classNames("activity-image-small", { "no-large": !activity.assets.large_image })}
												alt="activity"
												data-tooltip-id="tooltip"
												data-tooltip-content={activity.assets.small_text}
											/>
										)}
									</div>
									<div className="activity-info-text">
										<p className="activity-info-text-name">
											{activitiesTypes(activity.type)} <span>{activity?.name}</span>
										</p>
										{activity?.details && <p className="activity-info-text-details">{activity.details}</p>}
										{activity?.state && <p className="activity-info-text-state">{activity.state}</p>}
									</div>
								</div>
							</div>
						))}
				</div>
			) : (
				<Cat />
			)}
		</>
	);
};

const formatTime = (timestamps?: { start: number; end?: number }) => {
	if (!timestamps) return;
	const { start, end } = timestamps;
	if (!start && !end) return;
	// End timestamps is prioritized over start timestamps and displayed accordingly.
	const startTime = new Date(end || start).getTime();
	const endTime = Date.now();
	let difference = end ? (startTime - endTime) / 1000 : (endTime - startTime) / 1000;
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

	return `${hoursDifference >= 1 ? `${`0${hoursDifference}`.slice(-2)}:` : ""}${`0${minutesDifference}`.slice(-2)}:${`0${secondsDifference}`.slice(
		-2
	)} ${end ? "left" : "elapsed"}`;
};
