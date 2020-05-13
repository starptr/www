import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Link from "./Link";

const Blog = props => {
	const data = useStaticQuery(graphql`
		query BlogQuery {
			site {
				siteMetadata {
					blog {
						title
					}
				}
			}
		}
	`);

	return (
		<Link
			style={{
				...props.style,
			}}
			to={`/blog`}
		>
			{data.site.siteMetadata.blog.title}
		</Link>
	);
};

export default Blog;
