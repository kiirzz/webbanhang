import React, { useEffect, useState } from "react";
import { useGame } from "../../../context/GameContext";
import axios from "axios";

const AdminUpdateGame = () => {
    const { games, fetchGames } = useGame();
    const [publisherData, setPublisherData] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [err, setError] = useState(null)
    const [updateItem, setUpdateItem] = useState(null)

    const handleChange = e => {
        setUpdateItem(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleStatusChange = e => {
        const { name, value } = e.target;
    setUpdateItem(prev => ({ ...prev, [name]: parseInt(value) }));
    }

    const handleNoti = e => {
        setError(null)
    }

    const handleBack = e => {
        setUpdateItem(null)
        if (err !== "Publisher has been created!") {
            setTimeout(() => setError(null), 1500);
        } 
    }

    function handleUpdateItem(params) {
        setUpdateItem(params)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post("/game/update_game", updateItem)
            setError("Game has been updated!")
            setTimeout(() => setError(null), 1500);
            setUpdateItem(null);

            //refetch data
            fetchGames();
        }
        catch(err) {
            setError(err.response.data);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/publisher/');
            setPublisherData(result.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/category/');
            setCategoryData(result.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        fetchGames();
    }, [fetchGames]);

    return (
        <div className="">
            <h2>Publisher list</h2>
            <p className={`admin-form-default ${err === "Game has been updated!"? "admin-form-success":"admin-form-caution"}`}>{err}</p>
            {updateItem === null ?
                <div className="admin-table admin-table-update">            
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
                                <th className="table-head">update</th>
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
                                    <th><button onClick={() => handleUpdateItem(item)}></button></th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                : <div className="">
                    <form className="form d-flex flex-column admin-form">
                        <div className="admin-form-element">
                            <h5>Game name</h5>
                            <input type="text" className="admin-form-input" name="game_name" onChange={handleChange} value={updateItem.game_name} onMouseDown={handleNoti}/>
                        </div>
                        <div className="admin-form-element">
                            <h5>Publisher</h5>
                            <select className="admin-form-input" id="publisher" name="publisher_id" onChange={handleChange} value={updateItem.publisher_id} onClick={handleNoti}>
                                <option value="">Select a publisher</option>
                                {publisherData.map((publisher) => (
                                    <option key={publisher.publisher_id} value={publisher.publisher_id}>
                                        {publisher.publisher_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="admin-form-element">
                            <h5>Category</h5>
                            <select className="admin-form-input" id="category" name="category_id" onChange={handleChange} value={updateItem.category_id} onClick={handleNoti}>
                                <option value="">Select a category</option>
                                {categoryData.map((category) => (
                                    <option key={category.category_id} value={category.category_id}>
                                        {category.category_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="admin-form-element">
                            <h5>Description</h5>
                            <input type="text" className="admin-form-input" name="description" onChange={handleChange} value={updateItem.description} onMouseDown={handleNoti}/>
                        </div>
                        <div className="admin-form-element">
                            <h5>Price</h5>
                            <input type="number" className="admin-form-input" name="price" onChange={handleChange} value={updateItem.price} onMouseDown={handleNoti}/>
                        </div>
                        <div className="admin-form-element">
                            <h5>Image</h5>
                            <input type="text" className="admin-form-input" name="image" onChange={handleChange} value={updateItem.image} onMouseDown={handleNoti}/>
                        </div>
                        <div className="admin-form-element">
                            <h5>Status</h5>
                            <div className="admin-form-element-radio">
                                <label>
                                    <input type="radio" name="status" value={1} onChange={handleStatusChange} onClick={handleNoti} checked={updateItem.status === 1}/>
                                    Available
                                </label>
                                <label>
                                    <input type="radio" name="status" value={0} onChange={handleStatusChange} onClick={handleNoti} checked={updateItem.status === 0}/>
                                    Not available
                                </label>
                            </div>
                        </div>
                        <div className="admin-form-submit-group admin-update-button">
                            <button className="" onClick={handleBack}>Back</button>
                            <button className="admin-form-submit" onClick={handleSubmit}>Update game</button>
                        </div>
                    </form>
                </div>
            }
        </div> 
    )
}

export default AdminUpdateGame;