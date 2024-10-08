import React, { useEffect } from "react";
import { useLanyardWS } from "use-lanyard";
import classNames from "classnames";

import { fetchAPI, ext, waitTwoFrames, processDiscordImage, formatTime, activitiesTypes, check404 } from "../utils";
import { Anchor, Cat, Clock, Image } from "./Misc";

import "../styles/Lanyard.scss";

const ActivityImages = ({ activity }) => {
	const [appIcon, setAppIcon] = React.useState<string | null>(null);

	useEffect(() => {
		const { assets, application_id } = activity;
		if (!assets?.large_image && !assets?.small_image && application_id) {
			fetchAPI(
				application_id,
				async (data) => {
					if (!data.avatar) return;

					(await check404(`https://cdn.discordapp.com/app-icons/${application_id}/${data.avatar}.${ext(data.avatar)}?size=256`))
						? setAppIcon(`https://cdn.discordapp.com/app-icons/${application_id}/${data.avatar}.${ext(data.avatar)}?size=256`)
						: setAppIcon(`https://cdn.discordapp.com/avatars/${application_id}/${data.avatar}.${ext(data.avatar)}?size=256`);
				},
				() => setAppIcon("appIcon")
			);
		} else {
			setAppIcon("appIcon");
		}
	}, []);

	return (
		<>
			{(activity.assets?.large_image || appIcon) && (
				<Image
					src={processDiscordImage(activity.assets?.large_image, activity.application_id) || appIcon}
					className="activity-image-large"
					alt="activity"
					data-tooltip-id="tooltip"
					data-tooltip-content={activity.assets?.large_text}
					onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
						e.currentTarget.setAttribute("src", "https://lanyard.kyrie25.me/assets/unknown.png");
					}}
					onLoad={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
						(e.target as HTMLImageElement)?.classList.toggle("unknown", (e.target as HTMLImageElement).src.endsWith("unknown.png"));
					}}
				/>
			)}
			{activity?.assets?.small_image && (
				<Image
					src={processDiscordImage(activity.assets.small_image, activity.application_id)}
					className={classNames("activity-image-small", { "no-large": !activity.assets.large_image })}
					alt="activity"
					data-tooltip-id="tooltip"
					data-tooltip-content={activity.assets.small_text}
				/>
			)}
			{activity?.emoji &&
				(activity.emoji.id ? (
					<Image
						src={`https://cdn.discordapp.com/emojis/${activity.emoji.id}.${ext(activity.emoji.animated ? "gif" : "png")}`}
						className="activity-image-large"
						alt="emoji"
						data-tooltip-id="tooltip"
						data-tooltip-content={activity.emoji.name}
					/>
				) : (
					<span
						className="activity-image-emoji"
						role="img"
						aria-label={activity.emoji.name}
						data-tooltip-id="tooltip"
						data-tooltip-content={activity.emoji.name}
					>
						{activity.emoji.name}
					</span>
				))}
		</>
	);
};

const Activity = ({ activity }) => {
	const [, forceRender] = React.useReducer((s) => s + 1, 0);

	useEffect(() => {
		if (activity.timestamps) {
			const interval = setInterval(() => forceRender(), 1000);
			return () => clearInterval(interval);
		}
	}, [activity.timestamps]);

	return (
		<div key={activity.name} className="activity">
			<div className="activity-info">
				<div className="activity-image">
					<ActivityImages activity={activity} />
				</div>
				<div className="activity-info-text">
					<p className="activity-info-text-name">
						{activitiesTypes(activity.type)}
						<span>{activity?.name}</span>
					</p>
					{activity?.details &&
						(activity.sync_id ? (
							<Anchor className="activity-info-text-details" href={`https://open.spotify.com/track/${activity.sync_id}`}>
								{activity.details}
							</Anchor>
						) : activity.type === 2 ? (
							<Anchor
								className="activity-info-text-details"
								href={`https://www.youtube.com/results?search_query=${encodeURIComponent(activity.details + " " + activity.state)}`.trim()}
							>
								{activity.details}
							</Anchor>
						) : (
							<p className="activity-info-text-details">{activity.details}</p>
						))}
					{activity?.state && (
						<p className="activity-info-text-state">
							{activity.state}
							{activity.party?.size && ` (${activity.party.size[0]} of ${activity.party.size[1]})`}
						</p>
					)}
					{activity?.timestamps?.end && activity?.timestamps?.start ? (
						<div className="activity-info-progress">
							<span className="activity-info-text-timestamp">
								{/* Elapsed time should not exceed the total time */}
								{formatTime(
									{
										start:
											Date.now() - activity.timestamps.start < activity.timestamps.end - activity.timestamps.start
												? activity.timestamps.start
												: undefined,
										end:
											Date.now() - activity.timestamps.start < activity.timestamps.end - activity.timestamps.start
												? undefined
												: Date.now() + (activity.timestamps.end - activity.timestamps.start),
									},
									true
								)}
							</span>
							<div className="activity-info-progress-bar">
								<div className="activity-info-progress-bar-container">
									<div
										className="activity-info-progress-bar-fill"
										style={{
											width: `${
												((Date.now() - new Date(activity.timestamps.start).getTime()) /
													(new Date(activity.timestamps.end).getTime() - new Date(activity.timestamps.start).getTime())) *
												100
											}%`,
										}}
									/>
								</div>
							</div>
							<span className="activity-info-text-timestamp">
								{/* Total time */}
								{formatTime({ end: Date.now() + (activity.timestamps.end - activity.timestamps.start) }, true)}
							</span>
						</div>
					) : (
						(activity?.timestamps?.end || activity?.timestamps?.start) && (
							<p className="activity-info-text-timestamp">{formatTime(activity.timestamps)}</p>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export const Lanyard = ({ id, loaded }: { id: `${bigint}`; loaded: (loaded: boolean) => void }) => {
	const data = useLanyardWS(id);
	const [centered, setCentered] = React.useState(false);
	const lanyard = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (data) {
			waitTwoFrames(() => loaded(true));
		}
	}, [data]);

	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			const { width } = entries[0].contentRect;
			setCentered(Math.floor(width / 300) <= 1);
		});

		if (lanyard.current?.parentElement) resizeObserver.observe(lanyard.current.parentElement);
		return () => resizeObserver.disconnect();
	}, [data]);

	return (
		<>
			<div className="header">
				<Cat />
				<Clock />
			</div>
			{!!data?.activities?.filter((activity) => ![4, 6].includes(activity.type)).length ? (
				<div className={classNames("lanyard", { centered })} ref={lanyard}>
					{data.activities
						.filter((activity) => ![4, 6].includes(activity.type))
						.map((activity) => (
							<Activity activity={activity} key={activity.id} />
						))}
				</div>
			) : (
				<h3 className="placeholder-text">I'm not doing anything right now...</h3>
			)}
		</>
	);
};
