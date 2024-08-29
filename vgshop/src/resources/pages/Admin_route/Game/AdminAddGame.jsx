import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAddGame = () => {

    const [inputs, setInputs] = useState({
        name: "",
        publisher: "",
        category: "",
        description: "",
        price: 0,
        status: 0,
        image: "",
        sold_quantity: 0,
        rating: 0,
    });

    const [publisherData, setPublisherData] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [err, setError] = useState(null)

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

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleNoti = e => {
        setError(null)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post("/game/add_game", inputs)
            setError("Game has been created!")
        }
        catch(err) {
            setError(err.response.data);
        }
    }

    return (
        <div className="">
            <h2>Add game</h2>
            <p className={`admin-form-default ${err === "Game has been created!"? "admin-form-success":"admin-form-caution"}`}>{err}</p>
            <form className="form d-flex flex-column admin-form">
                <div className="admin-form-element">
                    <h5>Game name</h5>
                    <input type="text" className="admin-form-input" name="name" onChange={handleChange} onMouseDown={handleNoti}/>
                </div>
                <div className="admin-form-element">
                    <h5>Publisher</h5>
                    <select className="admin-form-input" id="publisher" name="publisher" onChange={handleChange} onClick={handleNoti}>
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
                    <select className="admin-form-input" id="category" name="category" onChange={handleChange} onClick={handleNoti}>
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
                    <input type="text" className="admin-form-input" name="description" onChange={handleChange} onMouseDown={handleNoti}/>
                </div>
                <div className="admin-form-element">
                    <h5>Price</h5>
                    <input type="number" className="admin-form-input" name="price" onChange={handleChange} onMouseDown={handleNoti}/>
                </div>
                <div className="admin-form-element">
                    <h5>Image</h5>
                    <input type="text" className="admin-form-input" name="image" onChange={handleChange} onMouseDown={handleNoti}/>
                </div>
                <div className="admin-form-element">
                    <h5>Status</h5>
                    <div className="admin-form-element-radio">
                        <label>
                            <input type="radio" name="status" value="1" onChange={handleChange} onClick={handleNoti}/>
                            Available
                        </label>
                        <label>
                            <input type="radio" name="status" value="0" onChange={handleChange} onClick={handleNoti}/>
                            Not available
                        </label>
                    </div>
                </div>
                <div className="admin-form-submit-group">
                    <button className="admin-form-submit" onClick={handleSubmit}>Add game</button>
                </div>
            </form>
        </div>
    )
}

export default AdminAddGame; 