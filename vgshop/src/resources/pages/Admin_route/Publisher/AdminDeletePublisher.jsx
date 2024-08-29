import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDeletePublisher = () => {
    const [data, setData] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedPublisher, setSelectedPublisher] = useState(null);
    const [err, setError] = useState(null)

    function handleDeleteItem(params) {
        setSelectedPublisher(params);
        setShowConfirmation(true);
    }

    const handleConfirmDelete = async() => {
        try{
            await axios.post("/publisher/delete_publisher", selectedPublisher)
            setError("Publisher deleted successfully!")
            setTimeout(() => setError(null), 1500);
            setShowConfirmation(false)
            setSelectedPublisher(null)

            //refetch data
            const result = await axios.get('/publisher/');
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
            const result = await axios.get('/publisher/');
            setData(result.data);
        };
        fetchData();
    }, []);

    return (
        <div className="">
            <h2>Delete publisher</h2>
            <p className="admin-form-default admin-form-success">{err}</p>
            <div className="admin-table admin-table-delete">            
                <table>
                    <thead>
                        <tr>
                            <th className="table-head">publisher_id</th>
                            <th className="table-head">publisher_name</th>
                            <th className="table-head">address</th>
                            <th className="table-head">tel</th>
                            <th className="table-head">email</th>
                            <th className="table-head table-head-delete">delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr className="table-body-element" key={item.publisher_id}>
                                <th>{item.publisher_id}</th>
                                <th>{item.publisher_name}</th>
                                <th>{item.address}</th>
                                <th>{item.tel}</th>
                                <th>{item.email}</th>
                                <th><button className="table-body-delete" onClick={() => handleDeleteItem(item)}></button></th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showConfirmation && (
                <div className="admin-delete-confirmation-dialog">
                    <p className="admin-delete-confirmation-ask">Are you sure you want to delete this publisher?</p>
                    <div className="admin-delete-confirmation-button">
                        <button onClick={handleConfirmDelete}>Yes</button>
                        <button onClick={handleCancelDelete}>No</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminDeletePublisher;