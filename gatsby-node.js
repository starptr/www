const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;

	/*
	if (node.internal.type === `Mdx`) {
		const relativeFilePath = createFilePath({ node, getNode });
		createNodeField({
			name: `slug`,
			node,
			value: `/blog${relativeFilePath}`,
		});
	}
	*/
};
