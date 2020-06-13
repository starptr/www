import React from "react";
import { Link, graphql } from "gatsby";
import type { PageProps } from "gatsby";

import Layout from "../../components/layout";
import SEO from "../../components/seo";

import TaxicabCircleSrc from "./taxicab-circle.svg";

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
				While you're finding your way back, enjoy this circle in continuous{" "}
				<a href="https://en.wikipedia.org/wiki/Taxicab_geometry#Circles">taxicab geometry</a>:
			</p>
			<img src={TaxicabCircleSrc} alt="Taxicab circle" style={{ width: "100%" }} />
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
