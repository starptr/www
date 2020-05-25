// Gatsby supports TypeScript natively!
import React from "react";
import { graphql } from "gatsby";
import type { PageProps } from "gatsby";

import Bio from "../../components/bio";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import SmallBoxed from "../../components/SmallBoxed";
import Link from "../../components/Link";
import { rhythm } from "../../utils/typography";

type Data = {
	site: {
		siteMetadata: {
			title: string;
			blog: {
				title: string;
			};
		};
	};
	allMdx: {
		edges: {
			node: {
				excerpt: string;
				frontmatter: {
					title: string;
					date: string;
					description: string;
				};
				fields: {
					slug: string;
				};
			};
		}[];
	};
};

const BlogIndex = ({ data, location }: PageProps<Data>) => {
	const siteTitle = data.site.siteMetadata.title;
	const posts = data.allMdx.edges;
	const blogTitle = data.site.siteMetadata.blog.title;

	return (
		<Layout location={location} title={siteTitle}>
			<SEO title="All posts" />
			<Bio
				style={{
					marginTop: rhythm(1.25),
					marginBottom: rhythm(1.5),
				}}
			/>
			{posts.map(({ node }) => {
				const title = node.frontmatter.title || node.fields.slug;
				return (
					<article key={node.fields.slug}>
						<header>
							<h3
								style={{
									marginTop: rhythm(1.5),
									marginBottom: 0,
								}}
							>
								<Link to={node.fields.slug}>{title}</Link>
							</h3>
							<div
								style={{
									marginTop: rhythm(1 / 8),
									marginBottom: rhythm(1 / 8),
								}}
							>
								<small>{node.frontmatter.date}</small>
							</div>
						</header>
						<section>
							<p
								dangerouslySetInnerHTML={{
									__html:
										node.frontmatter.description ||
										node.excerpt,
								}}
							/>
						</section>
					</article>
				);
			})}
		</Layout>
	);
};

export default BlogIndex;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
				blog {
					title
				}
			}
		}
		allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						date(formatString: "MMMM D, Y · H:mm a")
						title
						description
					}
				}
			}
		}
	}
`;
