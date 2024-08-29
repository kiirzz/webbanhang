import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useGame } from '../context/GameContext';
import { useCart } from "../context/CartContext";
import noImg from '../../img/noimg.jpg'

const HomeClient = () => {

    const { games, fetchGames, searchTerm } = useGame();
    const { cart, fetchCartItem, handleCart } = useCart();
    const [filteredGames, setFilteredGames] = useState([]);

    useEffect(() => {
        // fetch game
        fetchGames();
        // fetch cart
        fetchCartItem();
    }, [fetchGames, fetchCartItem]);

    useEffect(() => {
        if (searchTerm) {
          const filtered = games.filter((game) =>
            game.game_name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredGames(filtered);
        } else {
          setFilteredGames(games);
        }
      }, [searchTerm, games]);

    return (
        <div className="home">
            <div className="home-title"><h2>Home</h2></div>
            <div className="home-content">
                <div className="home-games">
                    {games === undefined ? 
                        <div className="home-no-game"><span className="home-no-game-cmt">No games</span></div>
                        : filteredGames.length === 0 ? 
                            <div className="home-no-game-found-box">
                                <div className="home-no-game-found">No game found</div>
                            </div>
                            :filteredGames.map((game) => (
                                <div className="home-game" key={game.game_id}>
                                    <Link to={`/games/${game.game_id}`} className="home-game-link">
                                        {(game.image === null)||(game.image === "") ? 
                                            <img src={noImg} alt="" className="home-game-img home-game-no-img" />
                                            : <img src={game.image} alt="" className="home-game-img" />
                                        }
                                        <div className="home-game-info">
                                            <div className="home-game-price-box">
                                                <span className="home-game-price">${game.price}</span>
                                            </div>
                                            <div className="home-game-name-box">
                                                <span className="home-game-name">{game.game_name}</span>
                                            </div>
                                            <div className="home-game-rating">
                                                <span className="home-game-rating-title">{game.rating}</span>
                                                <FontAwesomeIcon icon={icon({name: "star"})} className="home-game-rating-star" />                                           
                                            </div> 
                                        </div>                                                                          
                                    </Link>
                                    {game.status === 1 ?
                                        <div className="home-game-button-box">
                                            <button className={`home-game-button ${cart.some(item => item.gameGameId === game.game_id) ? "home-game-button-remove" : "home-game-button-add"}`} onClick={() => handleCart(game.game_id)}>{cart.some(item => item.gameGameId === game.game_id) ? "Remove":"Add to Cart"}</button>
                                            <button className="home-game-button">Buy now!</button>
                                        </div>
                                        : <div className="home-game-button-box">
                                            <p className="home-game-not-available">Not available</p>
                                        </div>
                                    }
                                </div>
                            ))
                    }
                </div>
            </div>                                 
        </div>
    )
}

export default HomeClient
