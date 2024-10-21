import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import classNames from "classnames";
import { inject } from "@vercel/analytics";
import { Tooltip } from "react-tooltip";
import { SiDiscord, SiX, SiMinutemailer, SiGithub, SiBluesky } from "react-icons/si";

import "./styles/index.scss";
import "react-tooltip/dist/react-tooltip.css";

import { Lanyard } from "./components/Lanyard";
import { Stack } from "./components/Stack";
import { LoadingIcon, Anchor, Image } from "./components/Misc";
import { fetchAPI, fetchGitHubStats, getDominantColor, WCGACheckColor } from "./utils";
import { Stats } from "./components/Stats";

const DISCORD_ID = import.meta.env.VITE_DISCORD_ID;

inject();

const App: React.FC = () => {
	const [data, setData] = React.useState<Record<any, any> | null>(null);
	const [color, setColor] = React.useState<string | null>(null);
	const [useBackgroundColor, setBackgroundColor] = React.useState<boolean>(false);

	// Loading states
	// I dont wanna refactor this
	const [loadingState, setLoadingState] = React.useState({
		avatar: false,
		banner: false,
		lanyard: false,
		// Too slow
		// github: false,
	});

	useEffect(() => {
		fetchAPI(DISCORD_ID, setData, () => setData({}));
	}, []);

	useEffect(() => {
		setLoadingState((prevState) => ({
			...prevState,
			avatar: !data?.avatar,
			banner: !data?.banner,
		}));
	}, [data]);

	useEffect(() => {
		if (color && useBackgroundColor) {
			document.body.style.setProperty("--accent", `#${color}`);
		} else {
			document.body.style.removeProperty("--accent");
		}

		document.body.classList.toggle("light", useBackgroundColor && color ? WCGACheckColor(color) : false);
	}, [color, useBackgroundColor]);

	const ext = (hash: string | null) => (hash?.startsWith("a_") ? "gif" : "webp");

	const avatar = `https://cdn.discordapp.com/avatars/${data?.id}/${data?.avatar}.${ext(data?.avatar)}?size=256`;
	const banner = `https://cdn.discordapp.com/banners/${data?.id}/${data?.banner}.${ext(data?.banner)}?size=2048`;
	const decoration = `https://cdn.discordapp.com/avatar-decoration-presets/${data?.avatar_decoration_data?.asset}.png`;

	const loading = !data || !Object.values(loadingState).every((state) => state);

	return (
		<main>
			<Tooltip
				id="tooltip"
				style={{
					zIndex: 9999999,
				}}
			/>
			<div className={classNames("loading", { "fade-out": !loading })}>
				<LoadingIcon />
			</div>
			<section>
				{data?.banner && (
					<>
						<span>Click the banner to switch colors</span>
						<header onClick={() => setBackgroundColor((prevState) => !prevState)}>
							<div className="banner">
								<Image
									src={banner}
									alt="banner"
									onLoad={(e) => {
										setColor(getDominantColor(e.target as HTMLImageElement));
										setLoadingState((prevState) => ({ ...prevState, banner: true }));
									}}
								/>
							</div>
						</header>
					</>
				)}

				<Lanyard id={DISCORD_ID} loaded={(state) => setLoadingState((prevState) => ({ ...prevState, lanyard: state }))} />

				<article className="intro">
					<div className="avatar">
						{
							<Image
								src={avatar}
								alt="avatar"
								onLoad={() => setLoadingState((prevState) => ({ ...prevState, avatar: true }))}
								onError={(e) => (e.target.src = "https://avatars.githubusercontent.com/u/77577746?v=4")}
							/>
						}
						{data?.avatar_decoration_data && <Image src={decoration} alt="decoration" className="decoration" />}
					</div>
					<h3>Hi, I'm Kyrie!👋</h3>
				</article>

				<article className="bio">
					<p>
						I'm a junior full-stack developer at <Anchor href="https://designveloper.com/">Designveloper</Anchor> and a CS undergraduate at fit@
						<Anchor href="https://en.hcmus.edu.vn/">hcmus</Anchor>. Starting as a self-taught developer and have been coding since 2021, my expertise
						focuses mainly on web & app development.
						<br />
						<br />
						Outside of work, I enjoy playing rougelite and hack-n-slash games (as seen from my <Anchor href="https://steam.kyrie25.dev">
							Steam
						</Anchor>{" "}
						profile), and listening to indie music. You can see the songs I'm listening to or the games I'm playing{" "}
						<a href="#">on the top of the page</a>.
					</p>
				</article>

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
