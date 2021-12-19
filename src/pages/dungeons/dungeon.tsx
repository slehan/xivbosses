
import Layout from "../../components/layout"
import { graphql } from "gatsby"
import React from "react"
import { Dungeon } from "../../models/dungeons/dungeon"
import { GraphQlResult } from "../../models/common/data"

const DungeonName = ({ data } : GraphQlResult<Dungeon>) => {
  return (
    <Layout>
      <h1>{data.allDataYaml.edges[0].node.name}</h1>

      {data.allDataYaml.edges[0].node.fights.map((fight) => {
        return (
          <div>
            <h2>{fight.name}</h2>
            <ul>
            {fight.strategy.map((strat, index) => {
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
    allDataYaml(filter: {dungeonId: {eq: $dungeonId}}) {
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
