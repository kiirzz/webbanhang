import React, { useState } from 'react';
import Information from './Account/Information';
import Password from './Account/Password';

const Account = () => {
    const [mode, setMode] = useState('account');

    function handleMode(params) {
        setMode(params);
    }

    return (
        <div className="account">
            <div className="account-content-box">
                <div className="account-button-box">
                    <div className={`account-button ${mode === 'account'? "button-selection":""}`} onClick={() => handleMode('account')}>Account</div>
                    <div className={`account-button ${mode === 'password'? "button-selection":""}`} onClick={() => handleMode('password')}>Password</div>
                </div>
                <div className="account-content">
                    {mode === null?
                        <div></div>
                        :<div className="">
                            {mode === 'account'?
                                <Information />
                                :<Password />
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Account;