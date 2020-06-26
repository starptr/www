import React from "react";
import { graphql } from "gatsby";
import type { PageProps } from "gatsby";

import Layout from "../../../../components/layout";
import SEO from "../../../../components/seo";
import Perfekt from "../../../../components/Microeconomics/PerfectlyCompetitive";
import Link from "../../../../components/Link";

type Data = {
	site: {
		siteMetadata: {
			title: string;
			author: {
				name: string;
			};
			blog: {
				title: string;
			};
		};
	};
};

const Index = (props: PageProps<Data>) => {
	const siteTitle = props.data.site.siteMetadata.title;
	const name = props.data.site.siteMetadata.author.name;
	const blogTitle = props.data.site.siteMetadata.blog.title;
	return (
		<Layout location={props.location} title={siteTitle}>
			<SEO title="Graphing Calculator" />
			<h1>Perfect Competition</h1>
			<p>
				See my post <Link to="/blog/perfekt-as-math">here</Link> for this applet's details.
			</p>
			<Perfekt />
		</Layout>
	);
};

export default Index;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
				author {
					name
				}
				blog {
					title
				}
			}
		}
	}
`;
