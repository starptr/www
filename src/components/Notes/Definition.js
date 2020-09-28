import React from "react";

import Box from "./Box";

const Definition = props => (
	<Box
		style={{
			borderColor: `#33609a`,
			backgroundColor: `#d9e4f2`,
			...props.style,
		}}
	>
		<span>
			{Array.isArray(props.term) ? (
				props.term
					.map(term => <strong>{term}</strong>)
					.reduce((accu, cur) => [accu, "／", cur])
			) : (
				<strong>{props.term}</strong>
			)}{" "}
			— {props.children}
		</span>
	</Box>
);

export default Definition;
