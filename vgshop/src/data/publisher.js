import { game } from "./game"

export const publisher = {
    id: "1",
    name: "Riot Game",
    game_list: Array(5).fill().map(_ => game),
}