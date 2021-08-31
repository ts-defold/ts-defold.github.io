const path = require('path');
const startCase = require('lodash.startcase');
const chokidar = require(`chokidar`);
const { touch } = require('./src/utils/fileUtils');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: MdxFrontmatter
    }
    type MdxFrontmatter {
      hideTitle: Boolean
      showToc: Boolean
      tocDepth: Int
      editable: Boolean
      showMetadata: Boolean
      showPreviousNext: Boolean
      description: String
      metaTitle: String
      order: Int
    }
    type File implements Node {
      fields: Fields
    }
    type Fields {
      gitLogLatestAuthorName: String
      gitLogLatestAuthorEmail: String
      gitLogLatestDate: Date @dateformat
    }
    type SiteSiteMetadata implements Node {
      headerLinks: [HeaderLinks]
    }
    type HeaderLinks {
      text: String!
      link: String!
      external: Boolean
    }
  `;
  createTypes(typeDefs);
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx(filter: {fields: {draft: {ne: true}}}) {
              edges {
                node {
                  fields {
                    id
                    slug
                  }
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors); // eslint-disable-line no-console
          reject(result.errors);
        }
        actions.createPage({
          path: `/404.html`,
          component: path.resolve('./src/pages/404.js'),
        });

        // Create pages.
        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug ? node.fields.slug : '/',
            component: path.resolve('./src/layouts/index.js'),
            context: {
              id: node.fields.id,
              docs: true,
            },
          });
        });
      })
    );
  });
};

const resolve = (query) => path.resolve(__dirname, query);

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  actions.setWebpackConfig({
    node: { fs: "empty" },
    resolveLoader: {
      // Don't generate worker files in server build, because it overrides client files
      alias: stage.indexOf("html") >= 0 ? { "worker-loader": require.resolve("null-loader") } : {},
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
        buble: '@philpl/buble', // to reduce bundle size
          
        // Replace vendored monaco-typescript services build with typescript, already used by typescript-to-lua
        [require.resolve("monaco-editor/esm/vs/language/typescript/lib/typescriptServices.js")]:
        require.resolve("typescript"),

        // Exclude builtin monaco-typescript libs
        [require.resolve("monaco-editor/esm/vs/language/typescript/lib/lib.js")]: resolve(
            "src/playground/lib/monaco-typescript-lib-stub.js",
        ),

        // Stub file resolution for playground
        [require.resolve("typescript-to-lua/dist/transpilation/resolve.js")]:
            resolve("src/playground/lib/resolve-stub.js"),
      },
    },
    module: {
      rules: [
        {
          test: /\.ttf$/,
          use: ['file-loader']
        }
    ]
    },
  });
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-export-default-from',
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);
    let value = parent.relativePath.replace(parent.ext, '');

    if (value === 'index') {
      value = '';
    }

    createNodeField({
      name: `slug`,
      node,
      value: `/${value}`,
    });

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    });

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title || startCase(parent.name),
    });
  }
};

exports.onPreBootstrap = () => {
  const watcher = chokidar.watch('./config', {
    ignored: ['jargon*'],
  });
  watcher.on(`change`, () => {
    touch('./gatsby-config.js');
  });
};
