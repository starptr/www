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
			<article>
				<header>
					<h1
						style={{
							marginTop: rhythm(1),
							marginBottom: 0,
						}}
					>
						{post.frontmatter.title}
					</h1>
					<hr
						style={{
							marginTop: rhythm(0.5),
							marginBottom: rhythm(0.5),
						}}
					/>
					<div style={{ marginBottom: rhythm(1) }}>
						<p
							style={{
								display: `inline`,
							}}
						>
							{post.frontmatter.date}
						</p>
						<Tags showSeparator tags={post.frontmatter.tags} />
					</div>
				</header>
				<MDXProvider
					components={{
						wrapper: ({ children, ...props }) => {
							//If no members, return itself
							if (!children) return <>{children}</>;
							//If only 1 member in mdx, children is not an array
							const updatedChildren = Array.isArray(children)
								? children.map(blogAdjustComponent)
								: blogAdjustComponent(children);
							return <section>{updatedChildren}</section>;
						},
					}}
				>
					<MDXRenderer>{post.body}</MDXRenderer>
				</MDXProvider>
				<hr
					style={{
						marginTop: rhythm(1),
						marginBottom: rhythm(1),
					}}
				/>
				<footer>
					<Bio
						style={{
							marginTop: rhythm(1),
							marginBottom: rhythm(1),
						}}
					/>
				</footer>
			</article>

			<nav>
				<ul
					style={{
						display: `flex`,
						flexWrap: `wrap`,
						justifyContent: `space-between`,
						listStyle: `none`,
						padding: 0,
					}}
				>
					<li>
						{previous && (
							<Link to={previous.fields.slug} rel="prev">
								← {previous.frontmatter.title}
							</Link>
						)}
					</li>
					<li>
						{next && (
							<Link to={next.fields.slug} rel="next">
								{next.frontmatter.title} →
							</Link>
						)}
					</li>
				</ul>
			</nav>
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
