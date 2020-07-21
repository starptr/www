import React from "react";
import _ from "lodash";

import Link from "./Link";

const LinkTag = props => (
	<Link style={props.style} to={`/blog-tags/${_.kebabCase(props.tag)}`}>
		{props.children}
	</Link>
);

export default LinkTag;
