import React from "react";

import { rhythm } from "../../../utils/typography";

const P = props => (
	<p
		{...props}
		style={{
			marginBottom: rhythm(0.5),
			...props.style,
		}}
	/>
);

export default P;
