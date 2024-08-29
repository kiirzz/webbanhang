import React, { useEffect, useState } from "react";
import { useGame } from "../../../context/GameContext";
import axios from "axios";

const AdminOrders = () => {
    const [data, setData] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderGame, setOrderGame] = useState([]);
    const { games, fetchGames } = useGame();

    const handleBack = () => {
        setSelectedOrder(null);
    }

    useEffect(() => {
        const fetchData = async () => {
            // fetch game
            await fetchGames();
            // fetch order
            const result = await axios.get('/order/');
            setData(result.data);
        };
        fetchData();
    }, [fetchGames]);

    useEffect(() => {
        if (data && selectedOrder && games) {
            const fetchOrderGame = async () => {
                const result = await axios.get('/order/order_game');
                const newOrderGameId = result.data.filter(i => i.orderOrderId === selectedOrder.order_id)
                setOrderGame(games.filter(i => newOrderGameId.some(ii => ii.gameGameId === i.game_id)))
            }
            fetchOrderGame();
        }
    }, [games, data, selectedOrder])

    function handleSelectedOrder(params) {
        setSelectedOrder(params);
    }

    return (
        <div className="">
            <h2>Orders</h2>
            {selectedOrder === null ?
                <div className="">
                    <div className="admin-gamelist-span-box">
                        <span className="admin-gamelist-span">Quantity:</span>
                        <span className="admin-gamelist-span">{data.length}</span>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th className="table-head">order_id</th>
                                <th className="table-head">user</th>
                                <th className="table-head">total</th>
                                <th className="table-head">date</th>
                                <th className="table-head">status</th>
                                <th className="table-head">detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr className="table-body-element" key={item.order_id}>
                                    <th>{item.order_id}</th>
                                    <th>{item.user_id}</th>
                                    <th>{item.total}</th>
                                    <th>{item.created_at}</th>
                                    <th>{item.status}</th>
                                    <th><button onClick={() => handleSelectedOrder(item)}></button></th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                : <div className="">
                    {orderGame.length === 0 ?
                        <div className="">loading...</div>
                        : <div className="admin-order">
                            <h5 className="admin-order-title">Order detail</h5>
                            <div className="">
                                <div className="admin-order-element">
                                    <span className="admin-order-element-text head-text">Order id:</span>
                                    <span className="admin-order-element-text">{selectedOrder.order_id}</span>
                                </div>
                                <div className="admin-order-element">
                                    <span className="admin-order-element-text head-text">User id:</span>
                                    <span className="admin-order-element-text">{selectedOrder.user_id}</span>
                                </div>
                                <div className="admin-order-element">
                                    <span className="admin-order-element-text head-text">Time:</span>
                                    <span className="admin-order-element-text">{selectedOrder.created_at}</span>
                                </div>
                                <div className="admin-order-element">
                                    <span className="admin-order-element-text head-text">Status:</span>
                                    <span className="admin-order-element-text">{selectedOrder.status === 1 ? "success":"fail"}</span>
                                </div>
                                <div className="admin-order-element-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="table-head table-head-order table-left">Game</th>
                                                <th className="table-head table-head-order table-right">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderGame.map(game_item => (
                                                <tr className="" key={game_item.game_id}>
                                                    <th className="table-element-order table-left">{game_item.game_name}</th>
                                                    <th className="table-element-order table-right">{game_item.price}</th>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="admin-order-element">
                                    <span className="admin-order-element-text head-text admin-order-total">Total:</span>
                                    <span className="admin-order-element-text head-text admin-order-total">{selectedOrder.total}</span>
                                </div>
                            </div>
                            <div className="admin-order-button-box">
                                <button className="admin-order-button" onClick={handleBack}>Back</button>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default AdminOrders;