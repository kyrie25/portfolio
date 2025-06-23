import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import classNames from "classnames";
import { inject } from "@vercel/analytics";
import { Tooltip } from "react-tooltip";
import { SiDiscord, SiX, SiMinutemailer, SiGithub, SiBluesky } from "react-icons/si";
import { FaImage, FaCircleUser } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";

import "./styles/index.scss";
import "react-tooltip/dist/react-tooltip.css";

import { Lanyard } from "./components/Lanyard";
import { Stack } from "./components/Stack";
import { LoadingIcon, Anchor, Img, Age, Clock, Cat } from "./components/Misc";
import { fetchAPI, getDominantColor, hexToRgb, waitTwoFrames, WCGACheckColor } from "./utils";
import { Stats } from "./components/Stats";

const DISCORD_ID = import.meta.env.VITE_DISCORD_ID;
const BIRTHDAY = import.meta.env.VITE_BIRTHDAY;

inject();

const App: React.FC = () => {
	const [data, setData] = React.useState<Record<any, any> | null>(null);
	const [KV, setKV] = React.useState<Record<any, any>>({});
	const backgroundImg = React.useRef<HTMLImageElement>(null);

	// Loading states
	const [loadingState, setLoadingState] = React.useState({
		avatar: false,
		banner: false,
		// Not necessary
		// lanyard: false,
		// Too slow
		// github: false,
	});

	const avatar = `https://cdn.discordapp.com/avatars/${data?.id}/${data?.avatar}.webp?size=256&${
		data?.avatar?.startsWith("a_") ? "animated=true" : ""
	}`;
	const banner = `https://cdn.discordapp.com/banners/${data?.id}/${data?.banner}.webp?${
		data?.banner?.startsWith("a_") ? "animated=true&size=2048" : "size=4096"
	}`;
	const decoration = `https://cdn.discordapp.com/avatar-decoration-presets/${data?.avatar_decoration_data?.asset}.png`;

	useEffect(() => {
		fetchAPI(
			DISCORD_ID,
			(data) => {
				setData(data.user);
				if (data.user_profile?.theme_colors && data.user_profile.theme_colors.length > 0) {
					const rgb = data.user_profile.theme_colors.map((color: number) => hexToRgb(color.toString(16)));
					document.documentElement.style.setProperty("--primary-color", rgb[0].join(","));
					document.documentElement.style.setProperty("--secondary-color", rgb[1].join(","));
				}
			},
			() => setData({})
		);
	}, []);

	useEffect(() => {
		setLoadingState((prevState) => ({
			...prevState,
			avatar: !data?.avatar,
			banner: !data?.banner,
		}));
	}, [data]);

	useEffect(() => {
		if (!data?.banner || !backgroundImg.current) return;

		if (banner?.includes("animated")) {
			// Load placeholder (webp) first
			const placeholder = banner.replace("animated=true", "animated=false");
			backgroundImg.current.src = placeholder;
			backgroundImg.current.crossOrigin = "Anonymous";
			backgroundImg.current.onload = () => {
				waitTwoFrames(() => {
					setLoadingState((prevState) => ({
						...prevState,
						banner: true,
					}));
					// Now load the gif
					const image = new Image();
					image.crossOrigin = "Anonymous";
					image.src = banner;
					image.onload = () => {
						waitTwoFrames(() => {
							backgroundImg.current!.src = banner;
						});
					};
				});

				backgroundImg.current!.onload = () => {};
			};
		} else {
			// Not a gif, load directly to ref
			backgroundImg.current.src = banner;
			backgroundImg.current.onload = () => {
				waitTwoFrames(() => {
					setLoadingState((prevState) => ({
						...prevState,
						banner: true,
					}));
				});
			};
		}
	}, [data?.banner]);

	const loading = !data || !Object.values(loadingState).every((state) => state);

	return (
		<main>
			<Img className="background" ref={backgroundImg} />
			<Tooltip
				id="tooltip"
				style={{
					zIndex: 9999999,
				}}
			/>
			<div className={classNames("loading", { "fade-out": !loading }, "test")}>
				<LoadingIcon />
			</div>
			<section>
				<article className="intro">
					<div className="avatar">
						<Img
							src={avatar}
							alt="avatar"
							onLoad={() => setLoadingState((prevState) => ({ ...prevState, avatar: true }))}
							onError={(e) => (e.currentTarget.src = "https://avatars.githubusercontent.com/u/77577746?v=4")}
						/>

						{data?.avatar_decoration_data && <Img src={decoration} alt="decoration" className="decoration" />}
					</div>
					<h3>Hi, I'm Kyrie!</h3>
				</article>
				<div className="header">
					<Cat />
					<Clock />
					<div className="widgets">
						{KV.avatar && (
							<Anchor href={KV.avatar} title="Avatar source" className="widgets-content">
								<FaCircleUser size={16} />
								<span>Avatar source</span>
								<FaExternalLinkAlt size={16} />
							</Anchor>
						)}
						{KV.banner && (
							<Anchor href={KV.banner} title="Banner source" className="widgets-content">
								<FaImage size={16} />
								<span>Banner source</span>
								<FaExternalLinkAlt size={16} />
							</Anchor>
						)}
					</div>
				</div>

				<Lanyard id={DISCORD_ID} loaded={(state) => setLoadingState((prevState) => ({ ...prevState, lanyard: state }))} setKV={setKV} />

				<article className="bio">
					<p>
						I'm a <Age date={BIRTHDAY} /> junior full-stack developer at <Anchor href="https://designveloper.com/">Designveloper</Anchor> and a CS
						undergraduate at fit@
						<Anchor href="https://en.hcmus.edu.vn/">hcmus</Anchor>. Starting as a self-taught developer and have been coding since 2021, my expertise
						focuses mainly on web & app development.
						<br />
						<br />
						Outside of work, I enjoy playing rougelite and hack-n-slash games (as seen from my <Anchor href="https://steam.kyrie25.dev">
							Steam
						</Anchor>{" "}
						profile), and listening to <i>whatever</i> doesn't make my ears bleed. You can see the songs I'm listening to or the games I'm playing{" "}
						<a href="#">on the top of the page</a>.
					</p>
				</article>

				{(KV.playlist1 || KV.playlist2) && (
					<article className="music">
						<h3>My playlists</h3>
						<div className="music">
							{KV.playlist1 && (
								<iframe
									allow="autoplay *; encrypted-media *;"
									sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
									src={KV.playlist1}
								/>
							)}
							{KV.playlist2 && (
								<iframe
									allow="autoplay *; encrypted-media *;"
									sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
									src={KV.playlist2}
								/>
							)}
						</div>
					</article>
				)}

				<Stack />

				<Stats loaded={(state) => setLoadingState((prevState) => ({ ...prevState, github: state }))} />

				<article>
					<h3>Contact me via:</h3>
					<div className="icons">
						<Anchor href="mailto:contact@kyrie25.dev" title="Mail" data-tooltip-id="tooltip" data-tooltip-content="Email">
							<SiMinutemailer />
						</Anchor>
						<Anchor href={`https://discord.kyrie25.dev`} title="Discord" data-tooltip-id="tooltip" data-tooltip-content="Discord">
							<SiDiscord />
						</Anchor>
						<Anchor href="https://twitter.kyrie25.dev" title="Twitter" data-tooltip-id="tooltip" data-tooltip-content="Twitter">
							<SiX />
						</Anchor>
						<Anchor href="https://bsky.kyrie25.dev" title="Bluesky" data-tooltip-id="tooltip" data-tooltip-content="Bluesky">
							<SiBluesky />
						</Anchor>
						<Anchor href="https://github.kyrie25.dev" title="GitHub" data-tooltip-id="tooltip" data-tooltip-content="GitHub">
							<SiGithub />
						</Anchor>
					</div>
				</article>
			</section>
		</main>
	);
};

createRoot(document.getElementById("root")!).render(<App />);
