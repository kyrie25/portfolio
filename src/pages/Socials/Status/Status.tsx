import React from "react";
import LocalClock from "../Clock/Clock";
import FadeIn from "@/components/FadeIn";
import "./Status.scss";
import Lanyard from "@/components/Lanyard";
import { concatClassname } from "@/utils/utils";

const Status = React.memo(
	(props: {
		cache: Record<string, unknown>;
		callback: (key: string, value) => void;
	}) => {
		return (
			<FadeIn>
				<div className="status__container">
					<div className="clock clock__container">
						<LocalClock></LocalClock>
					</div>
					<div className="status">
						<Lanyard
							cache={props.cache}
							setCache={props.callback}
							hidden={true}
						/>
					</div>
				</div>
			</FadeIn>
		);
	}
);
export default Status;
