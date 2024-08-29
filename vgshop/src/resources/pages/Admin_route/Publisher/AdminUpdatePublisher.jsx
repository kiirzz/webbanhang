import React, { useEffect, useState } from "react";
import axios from "axios";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const AdminUpdatePublisher = () => {
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
        if (err !== "Publisher has been created!") {
            setTimeout(() => setError(null), 1500);
        } 
    }

    function handleUpdateItem(params) {
        setUpdateItem(params)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post("/publisher/update_publisher", updateItem)
            setError("Publisher has been created!")
            setTimeout(() => setError(null), 1500);
            setUpdateItem(null);

            //refetch data
            const result = await axios.get('/publisher/');
            setData(result.data);
        }
        catch(err) {
            setError(err.response.data);
        }
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
            <h2>Publisher list</h2>
            <p className={`admin-form-default ${err === "Publisher has been created!"? "admin-form-success":"admin-form-caution"}`}>{err}</p>
            {updateItem === null ?
                <div className="admin-table admin-table-update">            
                    <table>
                        <thead>
                            <tr>
                                <th className="table-head">publisher_id</th>
                                <th className="table-head">publisher_name</th>
                                <th className="table-head">address</th>
                                <th className="table-head">tel</th>
                                <th className="table-head">email</th>
                                <th className="table-head">update</th>
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
                                    <th><button onClick={() => handleUpdateItem(item)}></button></th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                : <div className="">
                    <form className="form d-flex flex-column admin-form">
                        <div className="admin-form-element">
                            <h5>Publisher name</h5>
                            <input type="text" className="admin-form-input" name="publisher_name" onChange={handleChange} value={updateItem.publisher_name} onMouseDown={handleNoti}/>
                        </div>
                        <div className="admin-form-element">
                            <h5>Address</h5>
                            <input type="text" className="admin-form-input" name="address" onChange={handleChange} value={updateItem.address} onMouseDown={handleNoti}/>
                        </div>
                        <div className="admin-form-element">
                            <h5>Email</h5>
                            <input type="text" className="admin-form-input" name="email" onChange={handleChange} value={updateItem.email} onMouseDown={handleNoti}/>
                        </div>
                        <div className="admin-form-element">
                            <h5>Phone number</h5>
                            <PhoneInput
                                className="admin-telnumber"
                                name='number'
                                country={'ru'}
                                value={updateItem.tel}
                                onChange={tel => {setUpdateItem(prev => ({ ...prev, tel }))}}
                                onClick={handleNoti} 
                            />
                        </div>
                        <div className="admin-form-submit-group admin-update-button">
                            <button className="" onClick={handleBack}>Back</button>
                            <button className="admin-form-submit" onClick={handleSubmit}>Update publisher</button>
                        </div>
                    </form>
                </div>
            }
        </div> 
    )
}

export default AdminUpdatePublisher;