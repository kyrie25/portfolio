/* eslint-disable camelcase */
import {
	concatClassname,
	formatTime,
	getFlags,
	processDiscordImage
} from "@/utils/utils";
import { useEffect, useReducer, useState } from "react";
import { Activity, useLanyard } from "use-lanyard";

import "./Lanyard.scss";

const Lanyard = () => {
	if (!import.meta.env.VITE_DISCORD_ID) {
		return (
			<div className="lanyard">
				<p>Discord ID not provided</p>
			</div>
		);
	}

	const { data, revalidate } = useLanyard(import.meta.env.VITE_DISCORD_ID);
	const activities = data?.activities.filter(activity => activity.type === 0);
	let activity = Array.isArray(activities) ? activities[0] : activities;
	const hasTimestamp =
		!!activity?.timestamps?.start || !!activity?.timestamps?.end;

	useEffect(() => {
		const counter = setInterval(() => {
			revalidate();
			return () => clearInterval(counter);
		}, 1000);
	}, []);

	if (!data) {
		return (
			<div className="lanyard idle">
				<p>Loading...</p>
			</div>
		);
	}

	let borderColor = "#747F8D",
		avatarExtension = "webp",
		statusExtension = "webp";
	const idleMessage = "I'm not currently doing anything!";

	if (data.activities[0]?.emoji?.animated) statusExtension = "gif";
	if (data.discord_user.avatar && data.discord_user.avatar.startsWith("a_"))
		avatarExtension = "gif";
	const avatar = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.${avatarExtension}?size=256`;

	switch (data.discord_status) {
		case "online":
			borderColor = "#43B581";
			break;
		case "idle":
			borderColor = "#FAA61A";
			break;
		case "dnd":
			borderColor = "#F04747";
			break;
		case "offline":
			borderColor = "#747F8D";
			break;
	}

	let userStatus: Activity | null = null;
	if (data.activities[0] && data.activities[0].type === 4)
		userStatus = data.activities[0];

	const flags: string[] = getFlags(data.discord_user.public_flags);
	if (
		(data.discord_user.avatar && data.discord_user.avatar.includes("a_")) ||
		userStatus?.emoji?.id
	)
		flags.push("Nitro");

	const isSpotify = data.listening_to_spotify === true && !activity;
	const hasStatus =
		!!userStatus?.state || !!userStatus?.emoji?.name || !!userStatus?.emoji?.id;
	const displayActivity = activity || isSpotify;

	if (!activity && isSpotify && data.spotify) {
		activity = {
			name: "Listening to Spotify",
			details: data.spotify.song,
			state: data.spotify.artist,
			type: 2,
			id: data.spotify.track_id?.toString() || "",
			created_at: Date.now()
		};
	}

	return (
		<a
			className="lanyard"
			href="https://github.com/kyrie25/lanyard-profile-readme"
		>
			<div className="profile">
				<div className="profile-avatar">
					<img
						src={avatar}
						alt="avatar"
						style={{
							borderColor
						}}
					/>
				</div>
				<div className="profile-info">
					<div
						className={concatClassname(
							"profile-info-name",
							"has-status",
							hasStatus
						)}
					>
						<h1>
							<span className="tag">{data.discord_user.username}</span>
							<span className="discriminator">
								#{data.discord_user.discriminator}
							</span>
						</h1>
						<div className="profile-info-name-badges">
							{flags.map(flag => (
								<img key={flag} src={`/assets/badges/${flag}.png`} alt={flag} />
							))}
						</div>
					</div>
					<h1 className="profile-info-status">
						{userStatus?.emoji?.id && (
							<img
								src={`https://cdn.discordapp.com/emojis/${userStatus.emoji.id}.${statusExtension}`}
								alt="status"
							/>
						)}
						{!userStatus?.emoji?.id && userStatus?.emoji?.name}
						{userStatus?.state}
					</h1>
				</div>
			</div>
			<div className={concatClassname("activity", "idle", !displayActivity)}>
				{displayActivity ? (
					<>
						<div
							className={concatClassname(
								"wave-container",
								"spotify",
								isSpotify
							)}
						>
							<div className="wave-primary" />
							<div className="wave-secondary" />
						</div>
						<div
							className={concatClassname("activity-info", "spotify", isSpotify)}
						>
							<div className="activity-image">
								{activity?.assets?.large_image ? (
									<img
										src={processDiscordImage(
											activity.assets.large_image,
											activity.application_id
										)}
										className="activity-image-large"
										alt="activity"
									/>
								) : isSpotify && data.spotify?.album_art_url ? (
									<img
										src={data.spotify.album_art_url}
										className="activity-image-large"
										alt="activity"
									/>
								) : (
									<img
										src="/assets/unknown.png"
										className="activity-image-unknown"
										alt="activity"
									/>
								)}
								{activity?.assets?.small_image && (
									<img
										src={processDiscordImage(
											activity.assets.small_image,
											activity.application_id
										)}
										className="activity-image-small"
										alt="activity"
									/>
								)}
							</div>
							<div
								className={concatClassname(
									"activity-info-text",
									"has-timestamp",
									hasTimestamp
								)}
							>
								<p className="activity-info-text-name">{activity?.name}</p>
								{activity?.details && (
									<p className="activity-info-text-details">
										{activity?.details}
									</p>
								)}
								{activity?.state && (
									<p className="activity-info-text-state">{activity?.state}</p>
								)}
								{hasTimestamp && (
									<p className="activity-info-text-timestamp">
										{formatTime(activity?.timestamps)}
									</p>
								)}
							</div>
						</div>
					</>
				) : (
					<p className="activity-idle">{idleMessage}</p>
				)}
			</div>
		</a>
	);
};

export default Lanyard;
