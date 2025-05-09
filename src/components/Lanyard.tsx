import React, { useEffect } from "react";
import { Activity as ActivityType, useLanyardWS } from "use-lanyard";
import classNames from "classnames";
import * as Icons from "react-icons/si";
import { FaGamepad, FaTwitch, FaMusic, FaVideo } from "react-icons/fa6";

import { fetchAPI, ext, waitTwoFrames, processDiscordImage, formatTime, getActivityTypeString, check404 } from "../utils";
import { Anchor, Img } from "./Misc";

import "../styles/Lanyard.scss";

function getActivityIcon(activity: ActivityType, compact = false) {
	const iconList = Object.keys(Icons);
	const icon =
		typeof activity === "string"
			? activity
			: iconList.find(
					(icon) =>
						icon.replace("Si", "").toLowerCase() ===
						activity.name
							.replaceAll(" ", "")
							.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
							.toLowerCase()
			  );

	if (icon) {
		return Icons[icon]({
			size: 12,
			style: {
				marginRight: -2,
				paddingLeft: compact ? 0 : 8,
				top: 2,
				position: "relative",
			},
		});
	}

	return "";
}

function getActivityTypeIcon(type: number) {
	switch (type) {
		case 0:
			return <FaGamepad />;
		case 1:
			return <FaTwitch />;
		case 2:
			return <FaMusic />;
		case 3:
			return <FaVideo />;
		case 4:
		default:
			return null;
	}
}

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
				<Img
					src={processDiscordImage(activity.assets?.large_image, activity.application_id) || appIcon || ""}
					className="activity-image-large"
					alt="activity"
					data-tooltip-id="tooltip"
					data-tooltip-content={activity.assets?.large_text}
					onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
						e.currentTarget.setAttribute("src", "https://lanyard.kyrie25.dev/assets/unknown.png");
					}}
					onLoad={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
						(e.target as HTMLImageElement)?.classList.toggle("unknown", (e.target as HTMLImageElement).src.endsWith("unknown.png"));
					}}
				/>
			)}
			{activity?.assets?.small_image && (
				<Img
					src={processDiscordImage(activity.assets.small_image, activity.application_id)}
					className={classNames("activity-image-small", { "no-large": !activity.assets.large_image })}
					alt="activity"
					data-tooltip-id="tooltip"
					data-tooltip-content={activity.assets.small_text}
				/>
			)}
			{activity?.emoji &&
				(activity.emoji.id ? (
					<Img
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

const Activity = ({ activity, compact = false }) => {
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
						{compact ? (
							getActivityIcon(activity, compact) || getActivityTypeIcon(activity.type)
						) : (
							<>
								{getActivityTypeString(activity.type)}
								{getActivityIcon(activity, compact)}
							</>
						)}
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
							</span>{" "}
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

export const Lanyard = ({
	id,
	loaded,
	setKV,
}: {
	id: `${bigint}`;
	loaded: (loaded: boolean) => void;
	setKV: (kv: Record<string, string>) => void;
}) => {
	const data = useLanyardWS(id);
	const [centered, setCentered] = React.useState(false);
	const [compact, setCompact] = React.useState(false);
	const lanyard = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (data) {
			waitTwoFrames(() => loaded(true));
			setKV(data.kv);
		}
	}, [data]);

	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			const { width } = entries[0].contentRect;
			setCentered(Math.floor(width / 300) <= 1);
			setCompact(width <= 500);
		});

		if (lanyard.current?.parentElement) resizeObserver.observe(lanyard.current.parentElement);
		return () => resizeObserver.disconnect();
	}, [data]);

	return (
		<>
			{!!data?.activities?.filter((activity) => ![4, 6].includes(activity.type)).length ? (
				<div className={classNames("lanyard", { centered })} ref={lanyard}>
					{data.activities
						.filter((activity) => ![4, 6].includes(activity.type))
						.map((activity) => (
							<Activity activity={activity} key={activity.id} compact={compact} />
						))}
				</div>
			) : (
				<h3 className="placeholder-text">I'm not doing anything right now...</h3>
			)}
		</>
	);
};
