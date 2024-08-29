import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import axios from 'axios'

const AdminAddUser = () => {
    const [inputs, setInputs] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        tel: "",
        priority: "client",
        password: "",
        avatar: "",
        balance: 0,
    })

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
            await axios.post("/auth/register", inputs) 
            setError("User has been created!")
        }
        catch(err) {
            setError(err.response.data);
        }
    }

    return (
        <div className="">
            <h2>Add user</h2>
            <p className={`admin-form-default ${err === "User has been created!"? "admin-form-success":"admin-form-caution"}`}>{err}</p>
            <form className="form d-flex flex-column admin-form">
                <div className="admin-form-element">
                    <h5>Name</h5>
                    <div className="d-flex align-items-center justify-content-between gap-3">
                        <input type="text" placeholder='First name' name='firstname' className='admin-form-input' onChange={handleChange} onMouseDown={handleNoti}/>
                        <input type="text" placeholder='Last name' name='lastname' className='admin-form-input' onChange={handleChange} onMouseDown={handleNoti}/>
                    </div>
                </div>
                <div className="admin-form-element">
                    <h5>Username</h5>
                    <input type="text" className="admin-form-input" name="username" onChange={handleChange} onMouseDown={handleNoti}/>
                </div>
                <div className="admin-form-element">
                    <h5>Password</h5>
                    <input type="password" className="admin-form-input" name="password" onChange={handleChange} onMouseDown={handleNoti}/>
                </div>
                <div className="admin-form-element">
                    <h5>Email</h5>
                    <input type="text" className="admin-form-input" name="email" onChange={handleChange} onMouseDown={handleNoti}/>
                </div>
                <div className="admin-form-element">
                    <h5>Phone number</h5>
                    <PhoneInput
                        className="telnumber"
                        name='tel'
                        country={'ru'}
                        value={""}
                        onChange={tel => {setInputs(prev => ({ ...prev, tel }))}}
                        onClick={handleNoti} 
                    />
                </div>
                <div className="admin-form-submit-group">
                    <button className="admin-form-submit" onClick={handleSubmit}>Add user</button>
                </div>
            </form>
        </div>
    )
}

export default AdminAddUser;