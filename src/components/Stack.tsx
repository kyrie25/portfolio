import React from "react";
import { IconType } from "react-icons";
import {
	SiHtml5,
	SiReact,
	SiNodedotjs,
	SiCss3,
	SiJavascript,
	SiTypescript,
	SiPhp,
	SiCplusplus,
	SiGo,
	SiVuedotjs,
	SiSvelte,
	SiSass,
	SiTailwindcss,
	SiLaravel,
	SiElectron,
	SiVercel,
	SiDocker,
	SiNextdotjs,
	SiVite,
	SiSequelize,
	SiMysql,
	SiPostgresql,
	SiSqlite,
	SiGraphql,
	SiKotlin,
} from "react-icons/si";

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
				<IconWithTooltip icon={SiHtml5} tooltip="HTML5" href="https://developer.mozilla.org/en-US/docs/Web/HTML" />
				<IconWithTooltip icon={SiCss3} tooltip="CSS3" href="https://developer.mozilla.org/en-US/docs/Web/CSS" />
				<IconWithTooltip icon={SiJavascript} tooltip="JavaScript" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" />
				<IconWithTooltip icon={SiTypescript} tooltip="TypeScript" href="https://www.typescriptlang.org/" />
				<IconWithTooltip icon={SiPhp} tooltip="PHP" href="https://www.php.net/" />
				<IconWithTooltip icon={SiCplusplus} tooltip="C++" href="https://www.cplusplus.com/" />
				<IconWithTooltip icon={SiGo} tooltip="Go" href="https://golang.org/" />
				<IconWithTooltip icon={SiKotlin} tooltip="Kotlin" href="https://kotlinlang.org/" />
			</div>

			<h3>Front-end stack</h3>
			<div className="list">
				<IconWithTooltip icon={SiReact} tooltip="React" href="https://reactjs.org/" />
				<IconWithTooltip icon={SiVuedotjs} tooltip="Vue" href="https://vuejs.org/" />
				<IconWithTooltip icon={SiSvelte} tooltip="Svelte" href="https://svelte.dev/" />
				<IconWithTooltip icon={SiSass} tooltip="Sass" href="https://sass-lang.com/" />
				<IconWithTooltip icon={SiTailwindcss} tooltip="Tailwind CSS" href="https://tailwindcss.com/" />
			</div>

			<h3>Back-end stack</h3>
			<div className="list">
				<IconWithTooltip icon={SiNodedotjs} tooltip="Node.js" href="https://nodejs.org/" />
				<IconWithTooltip icon={SiLaravel} tooltip="Laravel" href="https://laravel.com/" />
				<IconWithTooltip icon={SiElectron} tooltip="Electron" href="https://www.electronjs.org/" />
				<IconWithTooltip icon={SiVercel} tooltip="Vercel" href="https://vercel.com/" />
				<IconWithTooltip icon={SiDocker} tooltip="Docker" href="https://www.docker.com/" />
				<IconWithTooltip icon={SiNextdotjs} tooltip="Next.js" href="https://nextjs.org/" />
				<IconWithTooltip icon={SiVite} tooltip="Vite" href="https://vitejs.dev/" />
				<IconWithTooltip icon={SiSequelize} tooltip="Sequelize" href="https://sequelize.org/" />
				<IconWithTooltip icon={SiMysql} tooltip="MySQL" href="https://www.mysql.com/" />
				<IconWithTooltip icon={SiPostgresql} tooltip="PostgreSQL" href="https://www.postgresql.org/" />
				<IconWithTooltip icon={SiSqlite} tooltip="SQLite" href="https://www.sqlite.org/" />
				<IconWithTooltip icon={SiGraphql} tooltip="GraphQL" href="https://graphql.org/" />
			</div>
		</article>
	);
};
