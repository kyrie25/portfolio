import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";

import "./index.scss";
import "react-tooltip/dist/react-tooltip.css";

import { Lanyard } from "./Lanyard";
import classNames from "classnames";
import { LoadingIcon, Anchor, Image } from "./Misc";
import { fetchAPI } from "./utils";

const DISCORD_ID = import.meta.env.VITE_DISCORD_ID;

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
	const oneko = "https://raw.githubusercontent.com/kyrie25/spicetify-oneko/main/assets/oneko/oneko-classic.gif";

	const loading = fetching || !avatarLoaded || !bannerLoaded || !lanyardLoaded || !onekoLoaded;

	return (
		<>
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
							<div className="name">
								<h1>Kyrie</h1>
								<span>@kyrie25</span>
							</div>
						</div>
					</header>

					<Lanyard id={DISCORD_ID} loaded={setLanyardLoaded} />

					<article>
						<h3>
							Junior full-stack developer, CS undergraduate at fit@<Anchor href="https://en.hcmus.edu.vn/">hcmus</Anchor>
						</h3>
					</article>

					<article>
						<p>Absolute Granblue nerd</p>
					</article>

					<article>
						<object
							data="https://github-readme-stats.vercel.app/api?username=kyrie25&include_all_commits=true&show_icons=true&count_private=true&custom_title=Kyrie%27s+GitHub+Stats&theme=react&border_color=1d2a38&bg_color=1d2a38"
							type="image/svg+xml"
						/>
					</article>

					<article>
						<h3>Contact me via:</h3>
						<div className="icons">
							<Anchor href="mailto:contact@kyrie25.me" title="Mail">
								<FontAwesomeIcon icon={faEnvelope} size="1x" />
							</Anchor>
							<Anchor href={`https://discord.com/users/${data.id}`} title="Discord">
								<FontAwesomeIcon icon={faDiscord} size="1x" />
							</Anchor>
							<Anchor href="https://twitter.com/_kyrie_25" title="Twitter">
								<FontAwesomeIcon icon={faTwitter} size="1x" />
							</Anchor>
							<Anchor href="https://github.com/kyrie25" title="GitHub">
								<FontAwesomeIcon icon={faGithub} size="1x" />
							</Anchor>
						</div>
					</article>
				</section>
			</main>
			<Analytics />
		</>
	);
};

createRoot(document.getElementById("root")!).render(<App />);
