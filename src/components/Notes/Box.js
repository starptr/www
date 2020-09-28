import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";

import { rhythm } from "../../utils/typography";

const Box = props => (
	<div
		style={{
			padding: rhythm(1 / 3),
			borderColor: `black`,
			borderStyle: `solid`,
			borderWidth: `1px`,
			borderRadius: `10px`,
			backgroundColor: `gray`,
			boxShadow: `none`,
			marginBottom: rhythm(1),
			...props.style,
		}}
	>
		{props.children}
	</div>
);

export default Box;
