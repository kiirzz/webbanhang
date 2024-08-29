import React, { useEffect } from "react";
import { useGame } from "../../../context/GameContext"; 

const AdminGameList = () => {

    const { games, fetchGames } = useGame();

    useEffect(() => {
        fetchGames();
    }, [fetchGames]);

    return (
        <div className="">
            <h2>Game list</h2>
            <div className="admin-gamelist-span-box">
                <span className="admin-gamelist-span">Quantity:</span>
                <span className="admin-gamelist-span">{games.length}</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th className="table-head">game_id</th>
                        <th className="table-head">publisher</th>
                        <th className="table-head">category</th>
                        <th className="table-head">name</th>
                        <th className="table-head">price</th>
                        <th className="table-head">status</th>
                        <th className="table-head">sold_quantity</th>
                        <th className="table-head">rating</th>
                        <th className="table-head">released</th>
                        <th className="table-head">description</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map(item => (
                        <tr className="table-body-element" key={item.game_id}>
                            <th>{item.game_id}</th>
                            <th>{item.publisher_id}</th>
                            <th>{item.category_id}</th>
                            <th>{item.game_name}</th>
                            <th>{item.price}</th>
                            <th>{item.status}</th>
                            <th>{item.sold_quantity}</th>
                            <th>{item.rating}</th>
                            <th>{item.released}</th>
                            <th>{item.description}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminGameList;