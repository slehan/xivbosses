exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
      query {
        allDataYaml {
            edges {
              node {
                dungeonId
              }
            }
        }
    }
    `)

    data.allDataYaml.edges.forEach(edge => {
        const dungeonId = edge.node.dungeonId

        actions.createPage({
            path: `dungeons/${dungeonId}`,
            component: require.resolve(`./src/pages/dungeons/dungeon.tsx`),
            context: { dungeonId: dungeonId }
        })
    })
}
