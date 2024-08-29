import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Information = () => {
    const { currentUser, changeInformation } = useContext(AuthContext);
    const [updateUser, setUpdateUser] = useState(currentUser.dataValues);
    const [err, setError] = useState(null);

    const handleChange = e => {
        setUpdateUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }   
    
    const handleNoti = () => {
        setError(null);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await changeInformation(updateUser);
            setError("Information updated!");
        } catch(err) {
            setError(err.response.data);
        }
    }

    console.log(updateUser);
    

    return (
        <div className="information">
            <h2 className="information-title">Change information</h2>
            <div className="information-content">
                <form className="form d-flex flex-column admin-form">
                    <div className="admin-form-element">
                        <h5>Name</h5>
                        <div className="d-flex align-items-center justify-content-between gap-3">
                            <input type="text" placeholder='First name' name='firstname' className='admin-form-input' value={updateUser.firstname} onChange={handleChange} onClick={handleNoti}/>
                            <input type="text" placeholder='Last name' name='lastname' className='admin-form-input' value={updateUser.lastname} onChange={handleChange} onClick={handleNoti}/>
                        </div>
                    </div>
                    <div className="admin-form-element">
                        <h5>Username</h5>
                        <input type="text" className="admin-form-input" name="username" value={updateUser.username} onClick={handleNoti}/>
                    </div>
                    <div className="admin-form-element">
                        <h5>Email</h5>
                        <input type="text" className="admin-form-input" name="email" value={updateUser.email} onChange={handleChange} onClick={handleNoti}/>
                    </div>
                    <div className="admin-form-element">
                        <h5>Phone number</h5>
                        <PhoneInput
                            className="telnumber"
                            name='tel'
                            country={'ru'}
                            value={updateUser.tel}
                            onChange={tel => {setUpdateUser(prev => ({ ...prev, tel }))}}
                            onClick={handleNoti}
                        />
                    </div>
                    <div className="information-form-button-box">
                        <p className={`admin-form-default ${err === "Information updated!"? "admin-form-success":"admin-form-caution"}`}>{err}</p>
                        <button className="information-form-button" onClick={handleSubmit}>
                            <p className="information-form-button-text">Save</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Information;