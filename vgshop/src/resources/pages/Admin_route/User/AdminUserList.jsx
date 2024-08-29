import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUserList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('user/');
            setData(result.data.filter(i => i.priority === "client"));
        };
        fetchData();
    }, []);

    return (
        <div className="">            
            <h2>User list</h2>
            <table>
                <thead>
                    <tr>
                        <th className="table-head">user_id</th>
                        <th className="table-head">name</th>
                        <th className="table-head">username</th>
                        <th className="table-head">password</th>
                        <th className="table-head">email</th>
                        <th className="table-head">tel</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminUserList;