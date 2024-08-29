import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useCart } from '../context/CartContext';
import { useGame } from '../context/GameContext';
import noImg from '../../img/noimg.jpg';

const Cart = () => {

    const { games, fetchGames } = useGame();
    const { cart, paid, fetchCartItem, handleCart, handlePay, handlePaid } = useCart();
    const [gameCart, setGameCart] = useState([]);
    const [sum, setSum] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // fetch game
        fetchGames();
        // fetch cart
        fetchCartItem();
    }, [fetchGames, fetchCartItem])
        
    useEffect(() => {
        if (cart && games) {
            const filteredGames = games.filter(i => cart.some(item => item.gameGameId === i.game_id))
            setGameCart(filteredGames)
            const totalSum = filteredGames.reduce((acc, curr) => acc + curr.price, 0);
            setSum(totalSum);
        }    
    }, [cart, games]);

    const handlePayButton = () => {
        handlePaid();
        navigate("/home");
    }

    useEffect(() => {
        if (paid) {
            fetchCartItem();
        }
    }, [paid, fetchCartItem]);

    return (
        <div className="">
            {!gameCart ? 
                <div>Loading...</div>
                : <div className="cart-bg">
                    <div className="cart">
                        <div className="cart-title">Cart</div>  
                        {cart.length === 0 ? 
                            (paid === true ? 
                                (<div className="cart-paid">
                                    <h4 className="cart-paid-noti">Order paid successfully!</h4>
                                    <button className="cart-paid-button" onClick={handlePayButton}>Ok</button>
                                </div>
                                ) 
                                :(
                                    <div className="cart-none">
                                        <div className="cart-none-comment">Cart empty!</div>
                                    </div>
                                )
                            )
                            :(
                                <div className="cart-have">
                                    <div className="cart-list">
                                        {gameCart.map((item) => (
                                            <div className="cart-element" key={item.game_id}>
                                                <div className="d-flex">
                                                    <div className="cart-element-img">
                                                        {(item.image === null)||(item.image === "") ? 
                                                            <img src={noImg} alt="" className="cart-element-image home-game-no-img" />
                                                            : <img src={item.image} alt="" className="cart-element-image" />
                                                        }
                                                    </div>
                                                    <div className="cart-element-text">
                                                        <div className="cart-element-name">
                                                            <Link to={`/game/${item.game_id}`} className="cart-element-link">{item.game_name}</Link>
                                                        </div>                                    
                                                        <FontAwesomeIcon icon={icon({name: "trash"})} className="cart-element-delete" onClick={() => handleCart(item.game_id)}/>
                                                    </div>                               
                                                </div>                       
                                                <div className="cart-element-price">
                                                    ${item.price}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="cart-pay">
                                        <div className="cart-pay-box">
                                            <div className="cart-pay-title">Total</div>
                                            <div className="d-flex justify-content-between">
                                                <div className="cart-pay-quantity">
                                                    {cart.length}
                                                    {cart.length === 1 ? " item":" items"}
                                                </div>
                                                <div className="cart-pay-sum">${sum}</div>
                                            </div>
                                        </div>
                                        <div className="cart-pay-button-box">
                                            <button className="cart-pay-button" onClick={() => handlePay(sum)}>Pay</button>
                                        </div>
                                    </div>   
                                </div>
                            )
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Cart