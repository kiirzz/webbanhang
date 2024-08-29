import React, { useContext } from 'react'
import Logo from "../../img/logo.png"
import {Link, useNavigate} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbarbt from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import def_ava from '../../img/default_avatar.png'
import { AuthContext } from '../context/AuthContext'

const Navbar_admin = () => {

    const { currentUser, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <Navbarbt expand="lg">
            <Container>
                <img className="logo-img" src={Logo} alt="" />
                <Navbarbt.Toggle aria-controls="basic-navbar-nav" />
                <Navbarbt.Collapse id="basic-navbar-nav">
                    <span className="w-50"></span>
                    <Nav className="me-auto">
                        {currentUser ? 
                            <div className="navbar-account"  key={currentUser.dataValues.id}>
                                <Link to={`/clients/${currentUser.dataValues.id}`} className="navbar-cart-link">
                                    {currentUser.dataValues.avatar === undefined ? 
                                    <img className="user-logo-def-img" src={def_ava} alt="" />
                                    :<img className="user-logo-img" src={currentUser.dataValues.avatar} alt="" />}                        
                                </Link>
                                <NavDropdown
                                    id="nav-dropdown-example"
                                    title={currentUser.dataValues.firstname + " " + currentUser.dataValues.lastname}
                                    menuVariant="white"
                                    className="navbar-dropdown"
                                >
                                    <NavDropdown.Item href={`/admin_account/${currentUser.dataValues.user_id}`}>Account</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>                            
                                </NavDropdown>
                            </div>
                            :<Link to={`/login`} className="navbar-login-dropdown">Login</Link>
                            
                        }                 
                    </Nav>
                </Navbarbt.Collapse>
            </Container>
        </Navbarbt>
    )
}

export default Navbar_admin