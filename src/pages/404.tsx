import React from "react";
import { Link, graphql } from "gatsby";
import type { PageProps } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

type Data = {
	site: {
		siteMetadata: {
			title: string;
		};
	};
};

const NotFoundPage = ({ data, location }: PageProps<Data>) => {
	const siteTitle = data.site.siteMetadata.title;

	return (
		<Layout location={location} title={siteTitle}>
			<SEO title="404: Not Found" />
			<h1>Page Not Found</h1>
			<p>
				Here is a cool circle in continuous{" "}
				<a href="https://en.wikipedia.org/wiki/Taxicab_geometry#Circles">
					taxicab geometry
				</a>
				:
			</p>
		</Layout>
	);
};

export default NotFoundPage;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
	}
`;
