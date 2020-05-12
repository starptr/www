import React from "react";
import { rhythm, scale } from "../utils/typography";

const SmallBoxed = props => (
	<small
		style={{
			paddingLeft: rhythm(1 / 8),
			paddingRight: rhythm(1 / 8),
			backgroundColor: `rgb(221, 221, 221)`,
		}}
	>
		{props.children}
	</small>
);

export default SmallBoxed;
