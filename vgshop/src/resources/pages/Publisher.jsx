import React, { useState, useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useGame } from '../context/GameContext';
import { useCart } from "../context/CartContext";
import axios from "axios";
import noImg from '../../img/noimg.jpg'

const Publisher = () => {

    const { id } = useParams();
    const { games, fetchGames } = useGame();
    const [publisher, setPublisher] = useState();
    const [pubGames, setPubGames] = useState();
    const { cart, fetchCartItem, handleCart } = useCart();
    
    useEffect(() => {
        const fetchPublisher = async () => {
            // Fetch games
            await fetchGames();
            // Fetch cart_item
            await fetchCartItem();
            // Fetch publisher
            const result = await axios.get(`/publisher/`);
            setPublisher(result.data.find(i => i.publisher_id === id));
        };

        fetchPublisher();
    }, [fetchCartItem, fetchGames, id]);

    useEffect(() => {
        if (publisher && games) {
            setPubGames(games.filter(i => i.publisher_id === publisher.publisher_id))
        }        
    }, [publisher, games]);

    return (
        <div className="">
            {!pubGames || !publisher ?
                <div>Loading...</div>
                : <div className="publisher">
                    <div className="publisher-list" key={publisher.publisher_id}>
                        <div className="publisher-list-header">
                            <span className="publisher-list-title">
                                <Link to={`/publisher/${publisher.publisher_id}`} className="publisher-list-title-link">
                                    <h2 className="publisher-list-title-name">{publisher.publisher_name}</h2>
                                </Link>
                            </span>
                        </div>
                        <div className="publisher-games">
                            {pubGames.map((game) => (
                                <div className="publisher-game" key={game.game_id}>
                                    <Link to={`/games/${game.game_id}`} className="publisher-game-link">
                                        {(game.image === null)||(game.image === "") ? 
                                            <img src={noImg} alt="" className="home-game-img home-game-no-img" />
                                            : <img src={game.image} alt="" className="home-game-img" />
                                        }
                                        <div className="publisher-game-info">
                                            <div className="publisher-game-price-box">
                                                <span className="publisher-game-price">${game.price}</span>
                                            </div>
                                            <div className="publisher-game-name-box">
                                                <span className="publisher-game-name">{game.game_name}</span>
                                            </div>
                                            <div className="publisher-game-rating">
                                                <span className="publisher-game-rating-title">{game.rating}</span>
                                                <FontAwesomeIcon icon={icon({name: "star"})} className="publisher-game-rating-star" />                                           
                                            </div> 
                                        </div>                                                                          
                                    </Link>
                                    {game.status === 1 ?
                                        <div className="publisher-game-button-box">
                                            <button className={`home-game-button ${cart.some(item => item.gameGameId === game.game_id) ? "home-game-button-remove" : "home-game-button-add"}`} onClick={() => handleCart(game.game_id)}>{cart.some(item => item.gameGameId === game.game_id) ? "Remove":"Add to Cart"}</button>
                                            <button className="publisher-game-button">Buy now!</button>
                                        </div>
                                        : <div className="publisher-game-button-box">
                                            <p className="publisher-game-not-available">Not available</p>
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

export default Publisher