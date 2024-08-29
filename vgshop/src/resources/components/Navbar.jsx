import React, { useContext } from 'react'
import Logo from "../../img/logo.png"
import {Link, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbarbt from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import def_ava from '../../img/default_avatar.png'
import { AuthContext } from '../context/AuthContext'
import { useGame } from '../context/GameContext'
import { useCart } from '../context/CartContext'

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const { setSearchTerm } = useGame();
    const { cartQuantity } = useCart();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <Navbarbt expand="lg">
            <Container>
                <Link className="logo" to="/home">
                    <img className="logo-img" src={Logo} alt="" />
                </Link>
                <Navbarbt.Toggle aria-controls="basic-navbar-nav" />
                <Navbarbt.Collapse id="basic-navbar-nav">
                    <form class="search-form d-flex align-item-center" role="search" onSubmit={handleSearchSubmit}>
                        <button class="btn-search" type="submit">
                            <FontAwesomeIcon icon={icon({name: "magnifying-glass"})} />
                        </button>
                        <input class="search-bar" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch}/>
                    </form>
                    <Nav className="me-auto">
                        {currentUser ? 
                            <div className="navbar-account"  key={currentUser.dataValues.id}>
                                <Link to={`/category`} className="navbar-cart-link">
                                    <FontAwesomeIcon icon={icon({name: "list"})} className="navbar-cart"/>
                                </Link>
                                <Link to={`/cart/${currentUser.dataValues.user_id}`} className="navbar-cart-link">
                                    <div className={`navbar-cart-number ${cartQuantity === 0? "disappear":""}`}>
                                        <p className="navbar-cart-number-text">{cartQuantity}</p>
                                    </div>
                                    <FontAwesomeIcon icon={icon({name: "cart-shopping"})} className="navbar-cart"/>
                                </Link>
                                <Link to={`/clients/${currentUser.dataValues.user_id}`} className="navbar-cart-link navbar-cart-link-img">
                                    {currentUser.dataValues.avatar === undefined || currentUser.dataValues.avatar === "" ? 
                                    <img className="user-logo-def-img" src={def_ava} alt="" />
                                    :<img className="user-logo-img" src={currentUser.dataValues.avatar} alt="" />}                        
                                </Link>
                                <NavDropdown
                                    id="nav-dropdown-example"
                                    title={currentUser.dataValues.firstname + " " + currentUser.dataValues.lastname}
                                    menuVariant="white"
                                    className="navbar-dropdown"
                                >
                                    <NavDropdown.Item href={`/account/${currentUser.dataValues.user_id}`}>Account</NavDropdown.Item>
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

export default Navbar