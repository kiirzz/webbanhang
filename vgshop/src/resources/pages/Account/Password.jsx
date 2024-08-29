import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import axios from "axios";

const Password = () => {
    const { currentUser } = useContext(AuthContext);
    const [err, setError] = useState(null);
    const [pass, setPass] = useState({
        id: currentUser.dataValues.user_id,
        old: "",
        new: "",
    });

    const [redirecting, setRedirecting] = useState(false);

    const navigate = useNavigate();

    const handleChange = e => {
        setPass(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (redirecting) return;

        try {
            const res = await axios.post("/user/change_pass", pass);
            setError(res.data);
            setRedirecting(true);
        } catch (err) {
            setError(err.response.data);
        }
    }

    useEffect(() => {
        if (err === "Password changed") {
            setTimeout(() => {
                navigate("/login");
            }, 1000)
        }
    }, [err, navigate])

    return (
        <div className="information">
            <h2 className="information-title">Change password</h2>
            <div className="information-content">
                <form className="form d-flex flex-column admin-form">
                    <div className="admin-form-element">
                        <h5>Old password</h5>
                        <input type="password" className="admin-form-input" name="old" onChange={handleChange} disabled={redirecting}/>
                    </div>
                    <div className="admin-form-element">
                        <h5>New password</h5>
                        <input type="password" className="admin-form-input" name="new" onChange={handleChange} disabled={redirecting}/>
                    </div>
                    <div className="information-form-button-box">
                        <p className={`admin-form-default ${err === "Password changed"? "admin-form-success":"admin-form-caution"}`}>{err}</p>
                        <button className="information-form-button" onClick={handleSubmit} disabled={redirecting}>
                            <p className="information-form-button-text">Change</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Password;