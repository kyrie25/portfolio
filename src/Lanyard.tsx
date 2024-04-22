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
			{data?.activities.filter((activity) => activity.type !== 4).length ? (
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