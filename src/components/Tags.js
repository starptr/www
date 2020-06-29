import React from "react";

import Tag from "./Tag";

const Tags = props => {
	if (!props.tags || props.tags.length === 0) return null;
	return (
		<>
			{props.showSeparator && " · "}
			{props.tags.sort().map(tagStr => (
				<Tag>{tagStr}</Tag>
			))}
		</>
	);
};

export default Tags;
