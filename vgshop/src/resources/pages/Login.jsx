import React, { useContext, useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import 'react-phone-input-2/lib/style.css'
import { AuthContext } from '../context/AuthContext'

const Login = () => {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    })

    const [err, setError] = useState(null)
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { currentUser, login } = useContext(AuthContext);

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        if (isLoggedIn && currentUser !== null) {
            if (currentUser.dataValues.priority === "client") {
                navigate("/home");
            } else {
                navigate("/admin");
            }
        }
    }, [currentUser, isLoggedIn, navigate]);

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await login(inputs);
            setIsLoggedIn(true);         
        }
        catch(err) {
            setError(err.response.data);
        }
    }

    return (
        <div className="auth d-flex flex-column align-items-center justify-content-center">
            <h1 className="auth-title">Login</h1>
            <form className="form d-flex flex-column">
                <input className="auth-input" type="text" placeholder='Username' name='username' onChange={handleChange}/>
                <input className="auth-input" type="password" placeholder='Password' name='password' onChange={handleChange}/>
                <button className="auth-button mt-1" onClick={handleSubmit}>Login</button>
                {err && <p className="auth-caution mb-0">{err}</p>}
                <span className='auth-question'>Do you have an account yet? <Link to="/register" className='auth-link'>Register</Link>                    
                </span>
            </form>
        </div>
    )
}

export default Login