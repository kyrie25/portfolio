import React from "react";
import { IconType } from "react-icons";
import * as Icons from "react-icons/si";

import "../styles/Stack.scss";

const IconWithTooltip = ({ icon, tooltip, href }: { icon: IconType; tooltip: string; href: string }) => {
	return (
		<div className="icon" data-tooltip-id="tooltip" data-tooltip-content={tooltip}>
			<a href={href} target="_blank" rel="noreferrer">
				{icon({ size: "1.5rem" })}
			</a>
		</div>
	);
};

export const Stack = () => {
	return (
		<article className="stack">
			<h3>Languages</h3>
			<div className="list">
				<IconWithTooltip icon={Icons.SiHtml5} tooltip="HTML5" href="https://developer.mozilla.org/en-US/docs/Web/HTML" />
				<IconWithTooltip icon={Icons.SiCss3} tooltip="CSS3" href="https://developer.mozilla.org/en-US/docs/Web/CSS" />
				<IconWithTooltip icon={Icons.SiJavascript} tooltip="JavaScript" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" />
				<IconWithTooltip icon={Icons.SiTypescript} tooltip="TypeScript" href="https://www.typescriptlang.org/" />
				<IconWithTooltip icon={Icons.SiPhp} tooltip="PHP" href="https://www.php.net/" />
				<IconWithTooltip icon={Icons.SiCplusplus} tooltip="C++" href="https://www.cplusplus.com/" />
				<IconWithTooltip icon={Icons.SiGo} tooltip="Go" href="https://golang.org/" />
			</div>

			<h3>Front-end stack</h3>
			<div className="list">
				<IconWithTooltip icon={Icons.SiReact} tooltip="React" href="https://reactjs.org/" />
				<IconWithTooltip icon={Icons.SiVuedotjs} tooltip="Vue" href="https://vuejs.org/" />
				<IconWithTooltip icon={Icons.SiSvelte} tooltip="Svelte" href="https://svelte.dev/" />
				<IconWithTooltip icon={Icons.SiSass} tooltip="Sass" href="https://sass-lang.com/" />
				<IconWithTooltip icon={Icons.SiTailwindcss} tooltip="Tailwind CSS" href="https://tailwindcss.com/" />
			</div>

			<h3>Back-end stack</h3>
			<div className="list">
				<IconWithTooltip icon={Icons.SiNodedotjs} tooltip="Node.js" href="https://nodejs.org/" />
				<IconWithTooltip icon={Icons.SiLaravel} tooltip="Laravel" href="https://laravel.com/" />
				<IconWithTooltip icon={Icons.SiElectron} tooltip="Electron" href="https://www.electronjs.org/" />
				<IconWithTooltip icon={Icons.SiVercel} tooltip="Vercel" href="https://vercel.com/" />
				<IconWithTooltip icon={Icons.SiDocker} tooltip="Docker" href="https://www.docker.com/" />
				<IconWithTooltip icon={Icons.SiNextdotjs} tooltip="Next.js" href="https://nextjs.org/" />
				<IconWithTooltip icon={Icons.SiVite} tooltip="Vite" href="https://vitejs.dev/" />
				<IconWithTooltip icon={Icons.SiSequelize} tooltip="Sequelize" href="https://sequelize.org/" />
				<IconWithTooltip icon={Icons.SiMysql} tooltip="MySQL" href="https://www.mysql.com/" />
				<IconWithTooltip icon={Icons.SiPostgresql} tooltip="PostgreSQL" href="https://www.postgresql.org/" />
				<IconWithTooltip icon={Icons.SiSqlite} tooltip="SQLite" href="https://www.sqlite.org/" />
				<IconWithTooltip icon={Icons.SiGraphql} tooltip="GraphQL" href="https://graphql.org/" />
			</div>
		</article>
	);
};
