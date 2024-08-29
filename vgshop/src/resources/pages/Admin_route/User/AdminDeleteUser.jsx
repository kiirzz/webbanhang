import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDeleteUser = () => {
    const [data, setData] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [err, setError] = useState(null)

    function handleDeleteItem(params) {
        setSelectedUser(params);
        setShowConfirmation(true);
    }

    const handleConfirmDelete = async() => {
        try{
            await axios.post("/user/delete_user", selectedUser)
            setError("User deleted successfully!")
            setTimeout(() => setError(null), 1500);
            setShowConfirmation(false)
            setSelectedUser(null)

            //refetch data
            const result = await axios('user/');
            setData(result.data.filter(i => i.priority === "client"));
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
            setData(result.data.filter(i => i.priority === "client"));
        };
        fetchData();
    }, []);

    return (
        <div className="">
            <h2>Delete user</h2>
            <p className="admin-form-default admin-form-success">{err}</p>
            <div className="admin-table admin-table-delete">            
                <table>
                    <thead>
                        <tr>
                            <th className="table-head">user_id</th>
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
                    <p className="admin-delete-confirmation-ask">Are you sure you want to delete this user?</p>
                    <div className="admin-delete-confirmation-button">
                        <button onClick={handleConfirmDelete}>Yes</button>
                        <button onClick={handleCancelDelete}>No</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminDeleteUser;