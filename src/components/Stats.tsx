import { useEffect, useState } from "react";
import { fetchGitHubStats } from "../utils";
import * as VSCIcons from "react-icons/vsc";

import "../styles/Stats.scss";

type StatsData = {
	name: string;
	totalPRs: number;
	totalPRsMerged: number;
	mergedPRsPercentage: number;
	totalReviews: number;
	totalCommits: number;
	totalIssues: number;
	totalStars: number;
	totalDiscussionsStarted: number;
	totalDiscussionsAnswered: number;
	contributedTo: number;
	rank: { level: string; percentile: number };
};

export const Stats = ({ loaded }: { loaded: (loaded: boolean) => void }) => {
	const [stats, setStats] = useState<StatsData | Record<string, never> | null>(null);

	useEffect(() => {
		fetchGitHubStats("kyrie25", setStats, () => setStats({}));
	}, []);

	useEffect(() => {
		if (stats) {
			loaded(true);
		}
	}, [stats]);

	return (
		<article className="stats">
			<div className="stats-title">
				<h3>GitHub stats</h3>
			</div>
			<div className="stats-wrapper">
				<div className="stats-body">
					<div className="stats-body-item">
						<VSCIcons.VscHistory />
						<h4>Commits</h4>
						<p>{stats?.totalCommits}</p>
					</div>
					<div className="stats-body-item">
						<VSCIcons.VscStarEmpty />
						<h4>Stars</h4>
						<p>{stats?.totalStars}</p>
					</div>
					<div className="stats-body-item">
						<VSCIcons.VscGitPullRequest />
						<h4>PRs</h4>
						<p>{stats?.totalPRs}</p>
					</div>
					<div className="stats-body-item">
						<VSCIcons.VscIssues />
						<h4>Issues</h4>
						<p>{stats?.totalIssues}</p>
					</div>
					<div className="stats-body-item">
						<VSCIcons.VscCommentDiscussion />
						<h4>Reviews</h4>
						<p>{stats?.totalReviews}</p>
					</div>
					<div className="stats-body-item">
						<VSCIcons.VscRepoForked />
						<h4>Contributed</h4>
						<p>{stats?.contributedTo}</p>
					</div>
				</div>
			</div>
		</article>
	);
};
