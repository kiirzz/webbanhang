import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUpdateCategory = () => {
    const [data, setData] = useState([]);
    const [err, setError] = useState(null)
    const [updateItem, setUpdateItem] = useState(null)

    const handleChange = e => {
        setUpdateItem(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleNoti = e => {
        setError(null)
    }

    const handleBack = e => {
        setUpdateItem(null)
        if (err !== "Category has been created!") {
            setTimeout(() => setError(null), 1500);
        } 
    }

    function handleUpdateItem(params) {
        setUpdateItem(params)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post("/category/update_category", updateItem)
            setError("Category has been created!")
            setTimeout(() => setError(null), 1500);
            setUpdateItem(null);

            //refetch data
            const result = await axios.get('/category/');
            setData(result.data);
        }
        catch(err) {
            setError(err.response.data);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/category/');
            setData(result.data);
        };
        fetchData();
    }, []);

    return (
        <div className="">
            <h2>Category list</h2>
            <p className={`admin-form-default ${err === "Category has been created!"? "admin-form-success":"admin-form-caution"}`}>{err}</p>
            {updateItem === null ?
                <div className="admin-table admin-table-update">            
                    <table>
                        <thead>
                            <tr>
                                <th className="table-head">category_id</th>
                                <th className="table-head">category_name</th>
                                <th className="table-head">update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr className="table-body-element" key={item.category_id}>
                                    <th>{item.category_id}</th>
                                    <th>{item.category_name}</th>
                                    <th><button onClick={() => handleUpdateItem(item)}></button></th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                : <div className="">
                    <form className="form d-flex flex-column admin-form">
                        <div className="admin-form-element">
                            <h5>Category name</h5>
                            <input type="text" className="admin-form-input" name="category_name" onChange={handleChange} value={updateItem.category_name} onMouseDown={handleNoti}/>
                        </div>
                        <div className="admin-form-submit-group admin-update-button">
                            <button className="" onClick={handleBack}>Back</button>
                            <button className="admin-form-submit" onClick={handleSubmit}>Update category</button>
                        </div>
                    </form>
                </div>
            }
        </div> 
    )
}

export default AdminUpdateCategory;