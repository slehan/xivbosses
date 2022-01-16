import * as React from "react"

import Layout from "../components/layout"
import { graphql, PageProps } from "gatsby"
import { ExpansionsQuery, ExpansionsYaml  } from "../../graphql-types"

const IndexPage = ({ data }: PageProps<ExpansionsQuery>) => {
   return (
  <Layout>
    <ul>
      {data.allExpansionsYaml.nodes.map(expansion =>
        <li>
          {expansion.name}
          <ul>{expansion.dungeons?.sort((a, b) => (a.level - b.level) + (a.lootItemLevel - b.lootItemLevel)).map(dungeon =>
            <li><a href={`/dungeons/${dungeon?.dungeonId}`}>{dungeon?.name}</a></li>)}
          </ul>
        </li>
      )}
    </ul>
  </Layout>
)}
export default IndexPage

export const query = graphql`
query Expansions {
    allExpansionsYaml {
      nodes {
				name,
        dungeons {
          name,
          dungeonId,
          level,
          lootItemLevel
        }
      }
    }
}`