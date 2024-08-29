import React, { useState, useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useGame } from '../context/GameContext';
import { useCart } from "../context/CartContext";
import axios from "axios";
import noImg from '../../img/noimg.jpg'

const Category = () => {

    const { id } = useParams();
    const { games, fetchGames } = useGame();
    const [category, setCategory] = useState();
    const [pubGames, setPubGames] = useState();
    const { cart, fetchCartItem, handleCart } = useCart();
    
    
    useEffect(() => {
        const fetchCategory = async () => {
            // Fetch games
            await fetchGames();
            // Fetch cart_item
            await fetchCartItem();
            // Fetch category
            const result = await axios.get(`/category/`);
            setCategory(result.data.find(i => i.category_id === id));
            // fetch cart_item
        };

        fetchCategory();
    }, [fetchGames, fetchCartItem, id]);

    useEffect(() => {
        if (category && games) {
            setPubGames(games.filter(i => i.category_id === category.category_id))
        }        
    }, [category, games]);

    return (
        <div className="">
            {!pubGames || !category ?
                <div>Loading...</div>
                : <div className="category">
                    <div className="category-list" key={category.category_id}>
                        <div className="category-list-header">
                            <span className="category-list-title">
                                <Link to={`/category/${category.category_id}`} className="category-list-title-link">
                                    <h2 className="category-list-title-name">{category.category_name}:</h2>
                                </Link>
                            </span>
                        </div>
                        <div className="category-games">
                            {pubGames.map((game) => (
                                <div className="category-game" key={game.game_id}>
                                    <Link to={`/games/${game.game_id}`} className="category-game-link">
                                        {(game.image === null)||(game.image === "") ? 
                                            <img src={noImg} alt="" className="home-game-img home-game-no-img" />
                                            : <img src={game.image} alt="" className="home-game-img" />
                                        }
                                        <div className="category-game-info">
                                            <div className="category-game-price-box">
                                                <span className="category-game-price">${game.price}</span>
                                            </div>
                                            <div className="category-game-name-box">
                                                <span className="category-game-name">{game.game_name}</span>
                                            </div>
                                            <div className="category-game-rating">
                                                <span className="category-game-rating-title">{game.rating}</span>
                                                <FontAwesomeIcon icon={icon({name: "star"})} className="category-game-rating-star" />                                           
                                            </div> 
                                        </div>                                                                          
                                    </Link>
                                    {game.status === 1 ?
                                        <div className="category-game-button-box">
                                            <button className={`home-game-button ${cart.some(item => item.gameGameId === game.game_id) ? "home-game-button-remove" : "home-game-button-add"}`} onClick={() => handleCart(game.game_id)}>{cart.some(item => item.gameGameId === game.game_id) ? "Remove":"Add to Cart"}</button>
                                            <button className="category-game-button">Buy now!</button>
                                        </div>
                                        : <div className="category-game-button-box">
                                            <p className="category-game-not-available">Not available</p>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
        
    )
}

export default Category