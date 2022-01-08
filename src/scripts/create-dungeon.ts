import fs from "fs"
import * as csv from "csv-parse"
import { Fight } from "../models/dungeons/fight"
import { toCamelCase } from 'js-convert-case'
import yaml from 'js-yaml'

class DungeonYaml {
  dungeonId: string
  name: string
  level: number
  roulette: string
  lootItemLevel: number
  expansionId: string
  fights: Fight[] = [
    {
      name: "Boss 1",
      strategy: ["Put strategy here"],
    },
    {
      name: "Boss 2",
      strategy: ["Put strategy here"],
    },
    {
      name: "Boss 3",
      strategy: ["Put strategy here"],
    },
  ]

  constructor(
    dungeonId: string,
    name: string,
    level: number,
    roulette: string,
    lootItemLevel: number,
    expansionId: string
  ) {
    this.dungeonId = dungeonId
    this.name = name
    this.level = level
    this.roulette = roulette
    this.lootItemLevel = lootItemLevel
    this.expansionId = expansionId
  }
}

if (process.argv.length < 3) {
  console.error("Pass the path to the CSV as an argument")
  process.exit(1)
}

const csvPath = process.argv[2]

const parser = csv.parse({ columns: true }, (_, data) => {
  data.forEach((row: DungeonYaml) => {
      const dungeonYamlObj = new DungeonYaml(
        toCamelCase(row.name),
        row.name,
        row.level,
        row.roulette,
        row.lootItemLevel,
        row.expansionId
      )

      const dungeonYaml = yaml.dump(dungeonYamlObj)
      const dungeonYamlFilename = `./src/data/dungeons/${dungeonYamlObj.dungeonId}.yaml`
      fs.writeFile(dungeonYamlFilename, dungeonYaml, (error) => {
        if (error) {
            console.error(error)
        } else {
            console.log(`Wrote yaml to ${dungeonYamlFilename}`)
        }
      })
  })
})

fs.createReadStream(csvPath 
).pipe(parser)
