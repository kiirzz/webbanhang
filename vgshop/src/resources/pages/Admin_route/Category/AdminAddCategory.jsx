import axios from "axios";
import React, { useState } from "react";

const AdminAddCategory = () => {
    const [inputs, setInputs] = useState({
        category_name: "",
    });

    const [err, setError] = useState(null)

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleNoti = e => {
        setError(null)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post("/category/add_category", inputs)
            setError("Category has been created!")
        }
        catch(err) {
            setError(err.response.data);
        }
    }

    return (
        <div className="">
            <h2>Add category</h2>
            <p className={`admin-form-default ${err === "Category has been created!"? "admin-form-success":"admin-form-caution"}`}>{err}</p>
            <form className="form d-flex flex-column admin-form">
                <div className="admin-form-element">
                    <h5>Category name</h5>
                    <input type="text" className="admin-form-input" name="category_name" onChange={handleChange} onMouseDown={handleNoti}/>
                </div>
                <div className="admin-form-submit-group">
                    <button className="admin-form-submit" onClick={handleSubmit}>Add category</button>
                </div>
            </form>
        </div>
    )
}

export default AdminAddCategory; 