const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const _ = require("lodash");

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	const blogPost = path.resolve(`./src/templates/blog-post.js`);
	const tagIndex = path.resolve(`./src/templates/tag-index.js`);
	const result = await graphql(
		`
			{
				allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
					edges {
						node {
							fields {
								slug
								source
							}
							frontmatter {
								title
								tags
							}
						}
					}
				}
			}
		`
	);

	if (result.errors) {
		throw result.errors;
	}

	// Create blog posts pages.
	const posts = result.data.allMdx.edges.filter(page => page.node.fields.source === "blog");

	posts.forEach((post, index) => {
		const previous = index === posts.length - 1 ? null : posts[index + 1].node;
		const next = index === 0 ? null : posts[index - 1].node;

		createPage({
			path: post.node.fields.slug,
			component: blogPost,
			context: {
				slug: post.node.fields.slug, //this is passed as arg to pageQuery as $slug
				previous,
				next,
			},
		});
	});

	// Create tag index pages for blog posts
	const allTags = [
		...new Set(
			posts.reduce((allTagsWithRedundancy, post) => {
				let rawTags = post.node.frontmatter.tags;
				if (rawTags) {
					if (Array.isArray(rawTags)) {
						rawTags.forEach(rawTag => allTagsWithRedundancy.push(rawTag));
					} else {
						allTagsWithRedundancy.push(rawTags);
					}
				}
				return allTagsWithRedundancy;
			}, [])
		),
	];

	allTags.forEach(tag => {
		createPage({
			path: `/blog-tags/${_.kebabCase(tag)}`,
			component: tagIndex,
			context: {
				tagStr: tag,
			},
		});
	});

	//Create notes pages
	const notes = result.data.allMdx.edges.filter(page => page.node.fields.source === "notes");

	notes.forEach((note, index) => {
		const previous = index === notes.length - 1 ? null : notes[index + 1].node;
		const next = index === 0 ? null : notes[index - 1].node;

		createPage({
			path: note.node.fields.slug,
			component: blogPost, //Use same layout as blog posts
			context: {
				slug: note.node.fields.slug, //this is passed as arg to pageQuery as $slug
				previous,
				next,
			},
		});
	});
};

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;

	if (node.internal.type === `Mdx`) {
		if (node.fields.source === `blog`) {
			const relativeFilePath = createFilePath({ node, getNode });
			createNodeField({
				name: `slug`,
				node,
				value: `/blog${relativeFilePath}`,
			});
		} else if (node.fields.source === `notes`) {
			const relativeFilePath = createFilePath({ node, getNode });
			createNodeField({
				name: `slug`,
				node,
				value: `/notes${relativeFilePath}`,
			});
		}
	}
};
