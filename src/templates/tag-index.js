import React from "react";
import { Link, graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import "katex/dist/katex.min.css";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Tags from "../components/Tags";
import RichPostCard from "../components/RichPostCard";
import { rhythm, scale } from "../utils/typography";

const TagIndexTemplate = ({ data, pageContext, location }) => {
	const posts = data.allMdx.edges;
	const siteTitle = data.site.siteMetadata.title;
	const { tagStr } = pageContext;

	return (
		<Layout location={location}>
			<SEO title={`Posts tagged ${tagStr}`} description={`List of posts that are tagged with ${tagStr}`} />
			<h1>Posts tagged with {tagStr}</h1>
			{posts.map(({ node }) => {
				const title = node.frontmatter.title || node.fields.slug;
				const tags = node.frontmatter.tags;

				return (
					<RichPostCard
						slug={node.fields.slug}
						title={title}
						date={node.frontmatter.date}
						tags={node.frontmatter.tags}
						description={node.frontmatter.description}
						excerpt={node.excerpt}
					/>
				);
			})}
		</Layout>
	);
};

export default TagIndexTemplate;

export const pageQuery = graphql`
	query BlogPostByTag($tagStr: String!) {
		site {
			siteMetadata {
				title
			}
		}
		allMdx(filter: { frontmatter: { tags: { in: [$tagStr] } } }, sort: { fields: frontmatter___date, order: DESC }) {
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						title
						date(formatString: "MMMM D, Y · H:mm a")
						description
						tags
					}
				}
			}
		}
	}
`;
