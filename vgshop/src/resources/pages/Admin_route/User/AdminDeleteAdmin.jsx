import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDeleteAdmin = () => {
    const [data, setData] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [err, setError] = useState(null)

    function handleDeleteItem(params) {
        setSelectedAdmin(params);
        setShowConfirmation(true);
    }

    const handleConfirmDelete = async() => {
        try{
            await axios.post("/user/delete_user", selectedAdmin)
            setError("Admin deleted successfully!")
            setTimeout(() => setError(null), 1500);
            setShowConfirmation(false)
            setSelectedAdmin(null)

            //refetch data
            const result = await axios('user/');
            setData(result.data.filter(i => i.priority === "admin"));
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
            const result = await axios('user/');
            setData(result.data.filter(i => i.priority === "admin"));
        };
        fetchData();
    }, []);

    return (
        <div className="">
            <h2>Delete admin</h2>
            <p className="admin-form-default admin-form-success">{err}</p>
            <div className="admin-table admin-table-delete">            
                <table>
                    <thead>
                        <tr>
                            <th className="table-head">admin_id</th>
                            <th className="table-head">name</th>
                            <th className="table-head">username</th>
                            <th className="table-head">password</th>
                            <th className="table-head">email</th>
                            <th className="table-head">tel</th>
                            <th className="table-head table-head-delete">delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr className="table-body-element" key={item.user_id}>
                                <th>{item.user_id}</th>
                                <th>{item.firstname + " " + item.lastname}</th>
                                <th>{item.username}</th>
                                <th>{item.password}</th>
                                <th>{item.email}</th>
                                <th>{item.tel}</th>
                                <th><button className="table-body-delete" onClick={() => handleDeleteItem(item)}></button></th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showConfirmation && (
                <div className="admin-delete-confirmation-dialog">
                    <p className="admin-delete-confirmation-ask">Are you sure you want to delete this admin?</p>
                    <div className="admin-delete-confirmation-button">
                        <button onClick={handleConfirmDelete}>Yes</button>
                        <button onClick={handleCancelDelete}>No</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminDeleteAdmin; 