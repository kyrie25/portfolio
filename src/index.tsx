import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { inject } from "@vercel/analytics";
import { Tooltip } from "react-tooltip";
import { SiDiscord, SiX, SiMinutemailer, SiGithub } from "react-icons/si";

import "./styles/index.scss";
import "react-tooltip/dist/react-tooltip.css";

import { Lanyard } from "./components/Lanyard";
import classNames from "classnames";
import { LoadingIcon, Anchor, Image } from "./components/Misc";
import { fetchAPI, getDominantColor, WCGACheckColor } from "./utils";
import { Stack } from "./components/Stack";

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
	const decoration = `https://cdn.discordapp.com/avatar-decoration-presets/${data?.avatar_decoration_data?.asset}.webp`;

	const loading = !data && !Object.values(loadingState).every((state) => state);

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
				)}

				<Lanyard id={DISCORD_ID} loaded={(state) => setLoadingState((prevState) => ({ ...prevState, lanyard: state }))} />

				<article className="intro">
					<div className="avatar">
						{data?.avatar && <Image src={avatar} alt="avatar" onLoad={() => setLoadingState((prevState) => ({ ...prevState, avatar: true }))} />}
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
						Outside of work, I enjoy playing rougelite and hack-n-slash games (as seen from my{" "}
						<Anchor href="https://steamcommunity.com/id/kyrie25">Steam</Anchor> profile), and listening to indie music. You can see the songs I'm
						listening to or the games I'm playing <a href="#">on the top of the page</a>.
					</p>
				</article>

				<Stack />

				<article>
					<h3>Contact me via:</h3>
					<div className="icons">
						<Anchor href="mailto:contact@kyrie25.me" title="Mail" data-tooltip-id="tooltip" data-tooltip-content="Email">
							<SiMinutemailer />
						</Anchor>
						<Anchor href={`https://discord.com/users/${data?.id}`} title="Discord" data-tooltip-id="tooltip" data-tooltip-content="Discord">
							<SiDiscord />
						</Anchor>
						<Anchor href="https://twitter.com/_kyrie_25" title="Twitter" data-tooltip-id="tooltip" data-tooltip-content="Twitter">
							<SiX />
						</Anchor>
						<Anchor href="https://github.com/kyrie25" title="GitHub" data-tooltip-id="tooltip" data-tooltip-content="GitHub">
							<SiGithub />
						</Anchor>
					</div>
				</article>
			</section>
		</main>
	);
};

createRoot(document.getElementById("root")!).render(<App />);
