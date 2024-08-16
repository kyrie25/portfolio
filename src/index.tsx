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
import { fetchAPI } from "./utils";
import { Stack } from "./components/Stack";

const DISCORD_ID = import.meta.env.VITE_DISCORD_ID;

inject();

const App: React.FC = () => {
	const [data, setData] = React.useState<Record<string, any>>({});

	// Loading states
	// I dont wanna refactor this
	const [fetching, setFetching] = React.useState(true);
	const [avatarLoaded, setAvatarLoaded] = React.useState(false);
	const [bannerLoaded, setBannerLoaded] = React.useState(false);
	const [onekoLoaded, setOnekoLoaded] = React.useState(false);
	const [lanyardLoaded, setLanyardLoaded] = React.useState(false);

	useEffect(() => {
		fetchAPI(DISCORD_ID, setData, () => setData({}));
	}, []);

	useEffect(() => {
		setFetching(false);
		setAvatarLoaded(!data.avatar);
		setBannerLoaded(!data.banner);
		setOnekoLoaded(!data.banner);
	}, [data]);

	const ext = (hash: string | null) => (hash?.startsWith("a_") ? "gif" : "webp");

	const avatar = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.${ext(data.avatar)}?size=256`;
	const banner = `https://cdn.discordapp.com/banners/${data.id}/${data.banner}.${ext(data.banner)}?size=2048`;
	const decoration = `https://cdn.discordapp.com/avatar-decoration-presets/${data.avatar_decoration_data?.asset}.webp`;
	const oneko = "https://raw.githubusercontent.com/kyrie25/spicetify-oneko/main/assets/oneko/oneko-classic.gif";

	const loading = fetching || !avatarLoaded || !bannerLoaded || !lanyardLoaded || !onekoLoaded;

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
				<header>
					{data.banner && (
						<div className="banner" style={{ backgroundImage: `url(${banner})` }}>
							<Image src={banner} alt="banner" onLoad={() => setBannerLoaded(true)} />
							<Image src={oneko} alt="oneko" onLoad={() => setOnekoLoaded(true)} />
						</div>
					)}
					<div className="avatar">
						{data.avatar && <Image src={avatar} alt="avatar" onLoad={() => setAvatarLoaded(true)} />}
						{data.avatar_decoration_data && <Image src={decoration} alt="decoration" className="decoration" />}
						<div className="name">
							<h1>Kyrie</h1>
							<span>@kyrie25</span>
						</div>
					</div>
				</header>

				<Lanyard id={DISCORD_ID} loaded={setLanyardLoaded} />

				<article className="intro">
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
					<Image
						id="stats"
						src="https://github-readme-stats.vercel.app/api?username=kyrie25&include_all_commits=true&show_icons=true&count_private=true&custom_title=Kyrie%27s+GitHub+Stats&theme=react&border_color=1d2a38&bg_color=1d2a38"
					/>
				</article>

				<article>
					<h3>Contact me via:</h3>
					<div className="icons">
						<Anchor href="mailto:contact@kyrie25.me" title="Mail" data-tooltip-id="tooltip" data-tooltip-content="Email">
							<SiMinutemailer />
						</Anchor>
						<Anchor href={`https://discord.com/users/${data.id}`} title="Discord" data-tooltip-id="tooltip" data-tooltip-content="Discord">
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
