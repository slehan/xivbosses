import Fuse from "fuse.js"
import { graphql, PageProps, useStaticQuery } from "gatsby"
import React, { useState } from "react"
import { DungeonsQuery, DungeonsYaml } from "../../graphql-types"

class DungeonResult {
  name: string | undefined | null
  dungeonId: string | undefined | null

  constructor(name: string | undefined | null, dungeonId: string | undefined | null) {
    this.name = name
    this.dungeonId = dungeonId
  }
}

const DungeonSearch = () => {
  const [results, setResults] = useState<(DungeonResult | null | undefined)[]>([])
  const data = useStaticQuery<DungeonsQuery>(graphql`
  query Dungeons {
    allDungeonsYaml {
      edges {
        node {
          name
          dungeonId
        }
      }
    }
  }`)

  return (
    <>
      <input type="text" onChange={(event) => {
          console.log(event.target.value)
          const dungeons = data.allDungeonsYaml.edges.map(node => node.node)
          const fuse = new Fuse(dungeons, {
            keys: ['name', 'dungeonId'],
            threshold: 0.3
          })

          // const foundDungeon = data.allDungeonsYaml.edges.find((dungeon) => dungeon.node.name?.toLowerCase() === event.target.value.toLowerCase())?.node.dungeonId
          const results = fuse.search(event.target.value).map((result) => new DungeonResult(result.item.name, result.item.dungeonId))

          console.log(results)
          if (results != null) {
            setResults(results)
          }
      }}></input>
      <div>
        {results.length > 0 ? <ul>{results.map((result) => <li><a href={`/dungeons/${result?.dungeonId}`}>{result?.name}</a></li>)}</ul> : null}
      </div>
      </>
  )
}
export default DungeonSearch
