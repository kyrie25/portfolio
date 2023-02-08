/* eslint-disable camelcase */
import {
	concatClassname,
	formatTime,
	getFlags,
	processDiscordImage
} from "@/utils/utils";
import React from "react";
import { useEffect, useState } from "react";
import { Activity, useLanyard } from "use-lanyard";

import "./Lanyard.scss";

const Lanyard = React.memo(
	(props: {
		cache: Record<string, any>;
		setCache: (key: string, value) => void;
		hidden: boolean;
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
		const { data, revalidate } = useLanyard(import.meta.env.VITE_DISCORD_ID);
		const activities = data?.activities.filter(activity => activity.type === 0);
		let activity = Array.isArray(activities) ? activities[0] : activities;
		const hasTimestamp =
			!!activity?.timestamps?.start || !!activity?.timestamps?.end;

		useEffect(() => {
			if (!bannerID && !props.cache.hidden) {
				fetch(
					`https://dacoolbot.kyrie25.me/?id=${import.meta.env.VITE_DISCORD_ID}`
				)
					.then(async res => {
						const json = await res.json();
						if (json.banner) {
							setBannerID(json.banner);
							props.setCache("banner", json.banner);
						}
					})
					.catch(err => console.error(err));
			}

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

		const avatarExtension = data.discord_user.avatar?.startsWith("a_")
				? "gif"
				: "webp",
			statusExtension = data.activities[0]?.emoji?.animated ? "gif" : "webp",
			bannerExtension = bannerID?.startsWith("a_") ? "gif" : "webp";

		const idleMessage = "I'm not currently doing anything!";
		const avatar = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.${avatarExtension}?size=256`;
		const banner = `https://cdn.discordapp.com/banners/${data.discord_user.id}/${bannerID}.${bannerExtension}?size=256`;

		let userStatus: Activity | null = null;
		if (data.activities[0] && data.activities[0].type === 4)
			userStatus = data.activities[0];

		const flags: string[] = getFlags(data.discord_user.public_flags);
		if (avatarExtension === "gif" || userStatus?.emoji?.id) flags.push("Nitro");

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

		return (
			<div
				className={concatClassname(
					"lanyard",
					"has-banner",
					!!bannerID && !props.hidden
				)}
			>
				{!!bannerID && !props.hidden && (
					<div className="banner">
						<img src={banner} alt="banner" />
					</div>
				)}
				<div className="profile">
					<div
						className={concatClassname(
							"profile-avatar",
							data.discord_status,
							true
						)}
					>
						<img src={avatar} alt="avatar" />
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
									<img
										key={flag}
										src={`/assets/badges/${flag}.png`}
										alt={flag}
									/>
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
										<p className="activity-info-text-state">
											{activity?.state}
										</p>
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
