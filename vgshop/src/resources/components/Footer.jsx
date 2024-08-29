import React from 'react'
import Logo from "../../img/logo.png"

const Footer = () => {
    return (
        <footer>
            <img src={Logo} alt="" className="footer-img" />
            <div className="">
                <p className="footer-info footer-info-title">
                    Contact:
                </p>
                <p className="footer-info">
                    Gmail: goodgame@gmail.com
                </p>
                <p className="footer-info">
                    tel. : +7 (999) 99-9999
                </p>
                <p className="footer-info">
                    Address: Moscow, Tverskaya str., 1A
                </p>
            </div>
        </footer>
    )
}

export default Footer