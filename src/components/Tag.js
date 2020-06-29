import React from "react";
import { rhythm } from "../utils/typography";

const Tag = props => (
	<small
		style={{
			color: "rgb(68, 68, 68)",
			backgroundColor: "rgb(221, 221, 221)",
			cursor: "pointer",
			whiteSpace: "pre",
			paddingLeft: rhythm(0.2),
			paddingRight: rhythm(0.2),
			marginRight: rhythm(0.2),
		}}
	>
		{props.children}
	</small>
);

export default Tag;
