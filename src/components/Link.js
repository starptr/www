import React from "react";
import { Link } from "gatsby";

const CustomLink = props => (
	<Link
		style={{
			boxShadow: `none`,
			...props.style,
		}}
		to={props.to}
	>
		{props.children}
	</Link>
);

export default CustomLink;
