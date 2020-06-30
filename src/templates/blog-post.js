import React from "react";
import { Link, graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import "katex/dist/katex.min.css";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Tags from "../components/Tags";
import { rhythm, scale } from "../utils/typography";

const blogAdjustComponent = child => {
	if (child.props.className === "footnotes") {
		return <small {...child.props} />;
	} else {
		return child;
	}
};

const BlogPostTemplate = ({ data, pageContext, location }) => {
	const post = data.mdx;
	const siteTitle = data.site.siteMetadata.title;
	const { previous, next } = pageContext;

	return (
		<Layout location={location} title={siteTitle}>
			<SEO title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
			<h1>Tag: </h1>
		</Layout>
	);
};

export default BlogPostTemplate;

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		site {
			siteMetadata {
				title
			}
		}
		mdx(fields: { slug: { eq: $slug } }) {
			id
			excerpt(pruneLength: 160)
			body
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				description
				tags
			}
		}
	}
`;
