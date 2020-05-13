import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Link from "./Link";

const Home = props => {
	const data = useStaticQuery(graphql`
		query HomeQuery {
			site {
				siteMetadata {
					title
				}
			}
		}
	`);

	return (
		<Link
			style={{
				...props.style,
			}}
			to={`/`}
		>
			{data.site.siteMetadata.title}
		</Link>
	);
};

export default Home;
