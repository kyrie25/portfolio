/* eslint-disable camelcase */
import { DISCORD_CDN, PERSONAL_API } from "@/utils/constants";
import {
	concatClassname,
	formatTime,
	getFlags,
	processDiscordImage
} from "@/utils/utils";
import React from "react";
import { useEffect, useState } from "react";
import { Activity, useLanyardWS } from "use-lanyard";
import chroma from "chroma-js";

import "./Lanyard.scss";

const Lanyard = React.memo(
	(props: {
		cache: Record<string, any>;
		setCache: (key: string, value) => void;
	}) => {
		if (!import.meta.env.VITE_DISCORD_ID) {
			return (
				<div className="lanyard">
					<p>Discord ID not provided</p>
				</div>
			);
		}

		const [bannerID, setBannerID] = useState<string | string>(
			props.cache.banner
		);
		const [, forceUpdate] = useState({});
		const [accentColor, setAccentColor] = useState("white");

		const data = useLanyardWS(import.meta.env.VITE_DISCORD_ID);
		const activities = data?.activities.filter(activity => activity.type === 0);
		let activity = Array.isArray(activities) ? activities[0] : activities;
		const hasTimestamp =
			!!activity?.timestamps?.start || !!activity?.timestamps?.end;

		useEffect(() => {
			if (bannerID) return;

			fetch(`${PERSONAL_API}/discord/${import.meta.env.VITE_DISCORD_ID}`)
				.then(async res => {
					const json = await res.json();
					if (json.banner) {
						setBannerID(json.banner);
						props.setCache("banner", json.banner);

						setAccentColor(chroma(json.accent_color).hex());
						props.setCache("accent", accentColor);
					}
				})
				.catch(err => console.error(err));
		}, []);

		useEffect(() => {
			// Update timer every second
			const timer = setInterval(() => {
				forceUpdate({});
			}, 1000);
			return () => clearInterval(timer);
		});

		if (!data) {
			return (
				<div className="lanyard idle">
					<p>Loading...</p>
				</div>
			);
		}

		const avatarExtension = data.discord_user.avatar?.startsWith("a_")
				? "gif"
				: "webp",
			statusExtension = data.activities[0]?.emoji?.animated ? "gif" : "webp",
			bannerExtension = bannerID?.startsWith("a_") ? "gif" : "webp";

		const idleMessage = "I'm not currently doing anything!";
		const avatar = `${DISCORD_CDN}/avatars/${data.discord_user.id}/${data.discord_user.avatar}.${avatarExtension}?size=4096`;
		const banner = `${DISCORD_CDN}/banners/${data.discord_user.id}/${bannerID}.${bannerExtension}?size=4096`;
		// Waiting for update
		const decoration = `${DISCORD_CDN}/avatar-decoration-presets/${(
			data.discord_user as any
		).avatar_decoration_data?.asset}.png`;

		let userStatus: Activity | null = null;
		if (data.activities[0] && data.activities[0].type === 4)
			userStatus = data.activities[0];

		const flags: string[] = getFlags(data.discord_user.public_flags);
		if (
			avatarExtension === "gif" ||
			userStatus?.emoji?.id ||
			bannerID ||
			// Waiting for update
			(data.discord_user as any).avatar_decoration_data
		)
			flags.push("Nitro");

		const isSpotify = data.listening_to_spotify === true && !activity;
		const hasStatus =
			!!userStatus?.state ||
			!!userStatus?.emoji?.name ||
			!!userStatus?.emoji?.id;
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

		const state =
			activity?.party?.size?.[0] && activity?.state
				? `${activity.state} (${activity.party.size[0]} of ${activity.party.size[1]})`
				: activity?.state;

		const status =
			data.discord_status === "dnd"
				? "Do Not Disturb"
				: data.discord_status[0].toUpperCase() + data.discord_status.slice(1);

		return (
			<div
				className={concatClassname("lanyard", "has-banner", !!bannerID)}
				style={{
					backgroundImage: `url(${banner})`
				}}
			>
				<div className="profile">
					<div
						className={concatClassname(
							"profile-avatar",
							data.discord_status,
							true
						)}
					>
						{(data.discord_user as any).avatar_decoration_data && (
							<img
								src={decoration}
								alt="decoration"
								className="profile-avatar-decoration"
							/>
						)}
						<img src={avatar} alt="avatar" className="profile-avatar-image" />
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="80">
							<rect
								x="4"
								y="54"
								width="16"
								height="16"
								rx="4"
								ry="4"
								data-tooltip-id="tooltip"
								data-tooltip-content={status}
							/>
						</svg>
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
								<span
									className="tag"
									style={{
										backgroundImage: `linear-gradient(60deg, ${chroma
											.scale([accentColor, "2A4858"])
											.mode("lch")
											.colors(6)
											.join(",")})`
									}}
								>
									{data.discord_user.username}
								</span>
							</h1>
							<div className="profile-info-name-badges">
								{flags.map(flag => (
									<img
										key={flag}
										src={`/assets/badges/${flag}.png`}
										alt={flag}
										data-tooltip-id="tooltip"
										data-tooltip-content={flag.replaceAll("_", " ")}
									/>
								))}
							</div>
						</div>
						<h1 className="profile-info-status">
							{userStatus?.emoji?.id && (
								<img
									src={`${DISCORD_CDN}/emojis/${userStatus.emoji.id}.${statusExtension}`}
									alt="status"
									data-tooltip-id="tooltip"
									data-tooltip-content={`:${userStatus.emoji.name}:`}
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
								className={concatClassname(
									"activity-info",
									"spotify",
									isSpotify
								)}
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
											data-tooltip-id="tooltip"
											data-tooltip-content={activity.assets.large_text}
										/>
									) : isSpotify && data.spotify?.album_art_url ? (
										<img
											src={data.spotify.album_art_url}
											className="activity-image-large"
											alt="activity"
											data-tooltip-id="tooltip"
											data-tooltip-content={data.spotify.album}
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
											data-tooltip-id="tooltip"
											data-tooltip-content={activity.assets.small_text}
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
											{activity.details}
										</p>
									)}
									{activity?.state && (
										<p className="activity-info-text-state">{state}</p>
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
			</div>
		);
	}
);

export default Lanyard;
