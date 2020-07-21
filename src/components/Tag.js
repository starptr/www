import React from "react";

import LinkTag from "../components/LinkTag";
import { rhythm } from "../utils/typography";

const Tag = props => (
	<LinkTag
		style={{
			textDecoration: "none",
		}}
		tag={props.children}
	>
		<small
			style={{
				color: "rgb(68, 68, 68)",
				backgroundColor: "rgb(221, 221, 221)",
				whiteSpace: "pre",
				paddingLeft: rhythm(0.2),
				paddingRight: rhythm(0.2),
				marginRight: rhythm(0.2),
			}}
		>
			{props.children}
		</small>
	</LinkTag>
);

export default Tag;
