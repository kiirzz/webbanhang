import React, { useState, useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useGame } from '../context/GameContext';
import { useCart } from "../context/CartContext";
import axios from "axios";
import noImg from '../../img/noimg.jpg';

const Games = () => {

    const { games, fetchGames } = useGame();
    const { id } = useParams();
    const { cart, fetchCartItem, handleCart } = useCart();
    
    useEffect(() => {
        // fetch game
        fetchGames();
        // fetch cart
        fetchCartItem();
    }, [fetchGames, fetchCartItem])
    
    const [publishers, setPublishers] = useState([]);
    const [categories, setCategories] = useState([]);
    const game = games.find(i => i.game_id === id);
    
    useEffect(() => {
        const fetchPublishers = async () => {
            const result = await axios.get('/publisher/');
            setPublishers(result.data);
        };
        fetchPublishers();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            const result = await axios.get('/category/');
            setCategories(result.data);
        };
        fetchCategories();
    }, []);
    
    const publisher = publishers.find(i => i.publisher_id === game.publisher_id);
    const category = categories.find(i => i.category_id === game.category_id);
    const reviews = []

    return (
        <div className="">
            {!game ?
                <div>Loading...</div>
                : <div className="game" key={game.game_id}>
                <div className="game-head-link">
                    <Link to={`/home`} className="game-head-link-text"><h5>Home</h5></Link>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" class="arrow"><path fill="currentColor" d="M5.293 12.293a1 1 0 1 0 1.414 1.414l5-5a1 1 0 0 0 0-1.414l-5-5a1 1 0 0 0-1.414 1.414L9.586 8l-4.293 4.293Z"></path></svg>
                    <Link to={`/games/${game.game_id}`} className="game-head-link-text"><h5>{game.game_name}</h5></Link>
                </div>
                <div className="game-content">
                    <div className="game-images">
                        <div className="game-image">
                            {(game.image === null)||(game.image === "") ? 
                                <img src={noImg} alt="" className="game-img" />
                                : <img src={game.image} alt="" className="game-img" />
                            }
                        </div>
                    </div>
                    <div className="game-text">
                        <div className="game-text-header">
                            <div className="game-header">
                                <span className="game-title">
                                    <h2 className="game-name">{game.game_name}</h2>
                                </span>
                            </div>
                            <div>
                                <span className="game-price-title">
                                    <h3 className="game-price">${game.price}</h3>
                                </span>
                            </div>
                            <div className="game-sold-box">
                                <span className="game-sold-text">{game.rating}</span>
                                <FontAwesomeIcon icon={icon({name: "star"})} className="game-sold-text pt-1 me-1" />
                                <div className="game-sold-text game-rating">rating</div>
                                <span className="game-sold ms-3 me-1">{game.sold_quantity}</span>
                                <div className="game-sold-text">purchased</div>
                            </div>
                        </div>                  
                        <div className="game-text-info">
                            <div className="game-info">
                                <div className="game-text-info-head">RELEASE DATE</div>
                                <div className="game-text-info-body">{game.released}</div>
                            </div>
                            <div className="game-info">
                                <div className="game-text-info-head">PUBLISHER</div>
                                <div className="game-text-info-body">
                                    {!publisher ?
                                        <p className="game-default-publisher">Default</p>
                                        : <Link to={`/publisher/${publisher.publisher_id}`} className="game-publisher-link">{publisher.publisher_name}</Link>
                                    }
                                </div>
                            </div>
                            <div className="game-info game-category">
                                <div className="game-text-info-head">CATEGORY</div>
                                <div className="game-text-info-body">
                                    <span className="game-category-box">
                                        {!category ?
                                            <p className="game-default-category">Default</p>  
                                            : <Link to={`/category/${category.category_id}`} className="game-category-link">{category.category_name}</Link>
                                        }
                                    </span> 
                                </div>
                            </div>                        
                        </div>
                        {game.status === 1 ?
                            <div className="game-button-box">
                                <button className={`game-button ${cart.some(item => item.gameGameId === game.game_id) ? "game-button-remove" : "game-button-add"}`} onClick={() => handleCart(game.game_id)}>{cart.some(item => item.gameGameId === game.game_id) ? "Remove":"Add to Cart"}</button>
                                <button className="game-button">Buy now!</button>
                            </div>
                            : <div className="game-button-box">
                                <p className="game-not-available">Not available</p>
                            </div>
                        }
                    </div>
                </div>
                <div className="game-review">
                    <h3>Description:</h3>
                    <span className="game-description">{game.description}</span>
                </div>
                <div className="game-review-box w-100">
                    <h3>Comment:</h3>
                    <div className="game-review w-100">
                        {reviews.length === 0 ? (
                            <div className="game-review-none">
                                <span className="game-review-no-cmt">No comment</span>
                            </div>
                        )
                        : <div></div>}
                    </div>
                </div>
            </div>
            }
        </div>   
    )
}

export default Games