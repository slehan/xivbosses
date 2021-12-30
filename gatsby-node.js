exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
      query {
        allDungeonsYaml {
            edges {
              node {
                dungeonId
              }
            }
        }
    }
    `)

    data.allDungeonsYaml.edges.forEach(edge => {
        const dungeonId = edge.node.dungeonId

        actions.createPage({
            path: `dungeons/${dungeonId}`,
            component: require.resolve(`./src/pages/dungeons/dungeon.tsx`),
            context: { dungeonId: dungeonId }
        })
    })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type ExpansionsYaml implements Node {
      dungeons: [DungeonsYaml] @link(from: "expansionId", by: "expansionId")
    }
  `
  createTypes(typeDefs)
}
