import { Fight } from "./fight";

export interface Dungeon {
    id: string
    name: string
    fights: Fight[]
}