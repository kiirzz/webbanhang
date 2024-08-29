import React, { useEffect, useState } from "react";
import axios from "axios";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const AdminUpdateUser = () => {
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
        if (err !== "User has been created!") {
            setTimeout(() => setError(null), 1500);
        } 
    }

    function handleUpdateItem(params) {
        setUpdateItem(params)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post("/user/update_user", updateItem)
            setError("User has been updated!")
            setTimeout(() => setError(null), 1500);
            setUpdateItem(null);

            //refetch data
            const result = await axios('user/');
            setData(result.data.filter(i => i.priority === "client"));
        }
        catch(err) {
            setError(err.response.data);
        }
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
            <h2>Update user</h2>
            <p className={`admin-form-default ${err === "User has been updated!"? "admin-form-success":"admin-form-caution"}`}>{err}</p>
            {updateItem === null ?
                <div className="admin-table admin-table-update">            
                    <table>
                        <thead>
                            <tr>
                                <th className="table-head">user_id</th>
                                <th className="table-head">name</th>
                                <th className="table-head">username</th>
                                <th className="table-head">password</th>
                                <th className="table-head">email</th>
                                <th className="table-head">tel</th>
                                <th className="table-head">update</th>
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
                                    <th><button onClick={() => handleUpdateItem(item)}></button></th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                : <div className="">
                    <form className="form d-flex flex-column admin-form">
                        <div className="admin-form-element">
                            <h5>Name</h5>
                            <div className="d-flex align-items-center justify-content-between gap-3">
                                <input type="text" placeholder='First name' name='firstname' className='admin-form-input' onChange={handleChange} value={updateItem.firstname} onMouseDown={handleNoti}/>
                                <input type="text" placeholder='Last name' name='lastname' className='admin-form-input' onChange={handleChange} value={updateItem.lastname} onMouseDown={handleNoti}/>
                            </div>
                        </div>
                        <div className="admin-form-element">
                            <h5>Username</h5>
                            <input type="text" className="admin-form-input" name="username" onChange={handleChange} value={updateItem.username} onMouseDown={handleNoti}/>
                        </div>
                        <div className="admin-form-element">
                            <h5>Password</h5>
                            <input type="text" className="admin-form-input" name="password" onChange={handleChange} value={updateItem.password} onMouseDown={handleNoti}/>
                        </div>
                        <div className="admin-form-element">
                            <h5>Email</h5>
                            <input type="text" className="admin-form-input" name="email" onChange={handleChange} value={updateItem.email} onMouseDown={handleNoti}/>
                        </div>
                        <div className="admin-form-element">
                            <h5>Phone number</h5>
                            <PhoneInput
                                className="telnumber"
                                name='tel'
                                country={'ru'}
                                value={updateItem.tel}
                                onChange={tel => {setUpdateItem(prev => ({ ...prev, tel }))}}
                                onClick={handleNoti} 
                            />
                        </div>
                        <div className="admin-form-submit-group admin-update-button">
                            <button className="" onClick={handleBack}>Back</button>
                            <button className="admin-form-submit" onClick={handleSubmit}>Update user</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default AdminUpdateUser;