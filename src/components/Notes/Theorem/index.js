import React from "react";

import Link from "../../Link";
import Box from "../Box";

let counter = 1;
let references = new Map();

const TheoremReference = props => {
	const hash = references.get(props.ident);

	return <>Theorem {references.get(props.ident) || "??"}</>;
};

const Theorem = props => {
	if (props.ident) {
		references.set(props.ident, counter);
	}
	return (
		<h4 id={counter} style={{ display: "inline" }}>
			<strong>Theorem {counter++}.</strong>
		</h4>
	);
};

export default Theorem;
export { TheoremReference };
