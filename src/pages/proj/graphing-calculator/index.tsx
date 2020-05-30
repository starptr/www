import React from "react";
import { Link, graphql } from "gatsby";
import type { PageProps } from "gatsby";

import Bio from "../../../components/bio";
import Layout from "../../../components/layout";
import SEO from "../../../components/seo";
import Home from "../../../components/Home";
import Blog from "../../../components/Blog";
import { rhythm } from "../../../utils/typography";
import Calculator from "../../../components/Calculator";

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
			<Calculator />
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
