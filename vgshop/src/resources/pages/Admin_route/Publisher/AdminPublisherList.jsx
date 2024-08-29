import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPublisherList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/publisher/');
            setData(result.data);
        };
        fetchData();
    }, []);

    return (
        <div className="">            
            <h2>Publisher list</h2>
            <div className="admin-gamelist-span-box">
                <span className="admin-gamelist-span">Quantity:</span>
                <span className="admin-gamelist-span">{data.length}</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th className="table-head">publisher_id</th>
                        <th className="table-head">publisher_name</th>
                        <th className="table-head">address</th>
                        <th className="table-head">tel</th>
                        <th className="table-head">email</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminPublisherList 