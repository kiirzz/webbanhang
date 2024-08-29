import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import axios from 'axios'

const Register = () => {

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

    const navigate = useNavigate()

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post("/auth/register", inputs)
            navigate("/login");
        }
        catch(err) {
            setError(err.response.data);
        }
    }    

    return (
        <div className="auth d-flex flex-column align-items-center justify-content-center">
            <h1 className="auth-title">Register</h1>
            <form className="form d-flex flex-column">
                <div className="d-flex align-items-center justify-content-center">
                    <input type="text" placeholder='First name' name='firstname' className='auth-input name me-2' onChange={handleChange}/>
                    <input type="text" placeholder='Last name' name='lastname' className='auth-input name ms-2' onChange={handleChange}/>
                </div>
                <input className="auth-input" type="text" placeholder='Username' name='username' onChange={handleChange}/>
                <input className="auth-input" type="password" placeholder='Password' name='password' onChange={handleChange}/>
                <input className="auth-input" type="text" placeholder='Email' name='email' onChange={handleChange}/>
                <span className='telnumber-title'>Phone number:</span>
                <PhoneInput
                    className="telnumber"
                    name='tel'
                    country={'ru'}
                    value={""}
                    onChange={tel => {setInputs(prev => ({ ...prev, tel }))}}
                />
                <button className="auth-button mt-1" onClick={handleSubmit}>Register</button>
                {err && <p className="auth-caution mb-0">{err}</p>}  
                <span className='auth-question'>Do you already have account? <Link to="/login" className='auth-link'>Login</Link>                    
                </span>
            </form>
        </div>
    )
}

export default Register

