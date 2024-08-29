import { game } from "./game"

export const category = {
    id: "1",
    name: "RPG",
    game_list: Array(5).fill().map(_ => game),
}