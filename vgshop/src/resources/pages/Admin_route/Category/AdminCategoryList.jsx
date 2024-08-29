import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminCategoryList = () => {
    const [data, setData] = useState([]);

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
            <div className="admin-gamelist-span-box">
                <span className="admin-gamelist-span">Quantity:</span>
                <span className="admin-gamelist-span">{data.length}</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th className="table-head">category_id</th>
                        <th className="table-head">category_name</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr className="table-body-element" key={item.category_id}>
                            <th>{item.category_id}</th>
                            <th>{item.category_name}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminCategoryList; 