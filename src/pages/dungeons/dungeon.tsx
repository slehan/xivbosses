
import Layout from "../../components/layout"
import { graphql, PageProps } from "gatsby"
import React from "react"
import { DungeonDataQuery, DungeonsYaml } from "../../../graphql-types"

const DungeonName = ({ data }: PageProps<DungeonDataQuery>) => {
  return (
    <Layout>
      <h1>{data.allDungeonsYaml.edges[0].node.name}</h1>

      {data.allDungeonsYaml.edges[0].node.fights?.map((fight) => {
        return (
          <div>
            <h2>{fight?.name}</h2>
            <ul>
            {fight?.strategy?.map((strat, index) => {
              return (
                <li key={index}>{strat}</li>
              )
            })}
            </ul>
          </div>
          
        )
      })}
    </Layout>
  )
}
export default DungeonName

export const query = graphql`
  query DungeonData($dungeonId: String) {
    allDungeonsYaml(filter: {dungeonId: {eq: $dungeonId}}) {
      edges {
      node {
        name,
        fights {
          name,
          strategy
        }
      }
    }
  }
}`
