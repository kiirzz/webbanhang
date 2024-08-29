import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDeleteCategory = () => {
    const [data, setData] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [err, setError] = useState(null)

    function handleDeleteItem(params) {
        setSelectedCategory(params);
        setShowConfirmation(true);
    }

    const handleConfirmDelete = async() => {
        try{
            await axios.post("/category/delete_category", selectedCategory)
            setError("Category deleted successfully!")
            setTimeout(() => setError(null), 1500);
            setShowConfirmation(false)
            setSelectedCategory(null)

            //refetch data
            const result = await axios.get('/category/');
            setData(result.data);
        } 
        catch(err) {
            setShowConfirmation(false)
        }
    }

    const handleCancelDelete = () => {
        setShowConfirmation(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('category/');
            setData(result.data);
        };
        fetchData();
    }, []);

    return (
        <div className="">
            <h2>Delete category</h2>
            <p className="admin-form-default admin-form-success">{err}</p>
            <div className="admin-table admin-table-delete">            
                <table>
                    <thead>
                        <tr>
                            <th className="table-head">category_id</th>
                            <th className="table-head">category_name</th>
                            <th className="table-head table-head-delete">delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr className="table-body-element" key={item.category_id}>
                                <th>{item.category_id}</th>
                                <th>{item.category_name}</th>
                                <th><button className="table-body-delete" onClick={() => handleDeleteItem(item)}></button></th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showConfirmation && (
                <div className="admin-delete-confirmation-dialog">
                    <p className="admin-delete-confirmation-ask">Are you sure you want to delete this category?</p>
                    <div className="admin-delete-confirmation-button">
                        <button onClick={handleConfirmDelete}>Yes</button>
                        <button onClick={handleCancelDelete}>No</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminDeleteCategory; 