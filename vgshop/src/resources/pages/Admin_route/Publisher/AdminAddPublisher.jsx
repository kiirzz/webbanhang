import axios from "axios";
import React, { useState } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const AdminAddPublisher = () => {

    const [inputs, setInputs] = useState({
        name: "",
        address: "",
        number: "",
        email: "",
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
            await axios.post("/publisher/add_publisher", inputs)
            setError("Publisher has been created!")
        }
        catch(err) {
            setError(err.response.data);
        }
    }

    return (
        <div className="">
            <h2>Add publisher</h2>
            <p className={`admin-form-default ${err === "Publisher has been created!"? "admin-form-success":"admin-form-caution"}`}>{err}</p>
            <form className="form d-flex flex-column admin-form">
                <div className="admin-form-element">
                    <h5>Publisher name</h5>
                    <input type="text" className="admin-form-input" name="name" onChange={handleChange} onMouseDown={handleNoti}/>
                </div>
                <div className="admin-form-element">
                    <h5>Address</h5>
                    <input type="text" className="admin-form-input" name="address" onChange={handleChange} onMouseDown={handleNoti}/>
                </div>
                <div className="admin-form-element">
                    <h5>Email</h5>
                    <input type="text" className="admin-form-input" name="email" onChange={handleChange} onMouseDown={handleNoti}/>
                </div>
                <div className="admin-form-element">
                    <h5>Phone number</h5>
                    <PhoneInput
                        className="admin-telnumber"
                        name='number'
                        country={'ru'}
                        value={""}
                        onChange={number => {setInputs(prev => ({ ...prev, number }))}}
                        onClick={handleNoti} 
                    />
                </div>
                <div className="admin-form-submit-group">
                    <button className="admin-form-submit" onClick={handleSubmit}>Add publisher</button>
                </div>
            </form>
        </div>
    )
}

export default AdminAddPublisher; 