// Copyright (c) 2018 Graham Kaemmer
// MIT License
import React, {
	JSXElementConstructor,
	PropsWithChildren,
	useEffect,
	useState
} from "react";

interface Props {
	delay?: number;
	transitionDuration?: number;
	wrapperTag?: JSXElementConstructor<unknown>;
	childTag?: JSXElementConstructor<unknown>;
	className?: string;
	childClassName?: string;
	visible?: boolean;
	onComplete?: () => void;
}

export default function FadeIn(props: PropsWithChildren<Props>) {
	const [maxIsVisible, setMaxIsVisible] = useState(0),
		transitionDuration =
			typeof props.transitionDuration === "number"
				? props.transitionDuration
				: 400,
		delay = typeof props.delay === "number" ? props.delay : 50,
		// eslint-disable-next-line no-one-time-vars/no-one-time-vars
		WrapperTag = props.wrapperTag || "div",
		ChildTag = props.childTag || "div",
		visible = typeof props.visible === "undefined" ? true : props.visible;

	useEffect(() => {
		let count = React.Children.count(props.children);
		if (!visible) {
			// Animate all children out
			count = 0;
		}

		if (count === maxIsVisible) {
			// We're done updating maxVisible, notify when animation is done
			const timeout = setTimeout(() => {
				if (props.onComplete) props.onComplete();
			}, transitionDuration);
			return () => clearTimeout(timeout);
		}

		// Move maxIsVisible toward count
		const increment = count > maxIsVisible ? 1 : -1,
			timeout = setTimeout(() => {
				setMaxIsVisible(maxIsVisible + increment);
			}, delay);
		return () => clearTimeout(timeout);
	}, [
		React.Children.count(props.children),
		delay,
		maxIsVisible,
		visible,
		transitionDuration
	]);

	return (
		<WrapperTag className={props.className}>
			{React.Children.map(props.children, (child, i) => {
				return (
					<ChildTag
						className={props.childClassName}
						style={{
							transition: `opacity ${transitionDuration}ms, transform ${transitionDuration}ms`,
							transform: maxIsVisible > i ? "none" : "translateY(20px)",
							opacity: maxIsVisible > i ? 1 : 0
						}}
					>
						{child}
					</ChildTag>
				);
			})}
		</WrapperTag>
	);
}
