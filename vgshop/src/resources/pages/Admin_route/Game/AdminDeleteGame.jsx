import React, { useEffect, useState } from "react";
import { useGame } from "../../../context/GameContext";
import axios from "axios";


const AdminDeleteGame = () => {
    const { games, fetchGames } = useGame();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [err, setError] = useState(null)

    function handleDeleteItem(params) {
        setSelectedGame(params);
        setShowConfirmation(true);
    }

    const handleConfirmDelete = async() => {
        try{
            await axios.post("/game/delete_game", selectedGame)
            setError("Game deleted successfully!")
            setTimeout(() => setError(null), 1500);
            setShowConfirmation(false)
            setSelectedGame(null)

            //refetch data
            fetchGames();
        } 
        catch(err) {
            setShowConfirmation(false)
        }
    }

    const handleCancelDelete = () => {
        setShowConfirmation(false)
    }

    useEffect(() => {
        fetchGames();
    }, [fetchGames]);

    return (
        <div className="">
            <h2>Delete game</h2>
            <p className="admin-form-default admin-form-success">{err}</p>
            <div className="admin-table admin-table-delete">            
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
                            <th className="table-head table-head-delete">delete</th>
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
                                <th><button className="table-body-delete" onClick={() => handleDeleteItem(item)}></button></th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showConfirmation && (
                <div className="admin-delete-confirmation-dialog">
                    <p className="admin-delete-confirmation-ask">Are you sure you want to delete this game?</p>
                    <div className="admin-delete-confirmation-button">
                        <button onClick={handleConfirmDelete}>Yes</button>
                        <button onClick={handleCancelDelete}>No</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminDeleteGame;