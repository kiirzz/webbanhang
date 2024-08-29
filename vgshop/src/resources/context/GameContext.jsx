import axios from "axios";
import {createContext, useContext, useEffect, useState} from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchGames = async () => {
        try {
            const result = await axios('/game/');
            setGames(result.data);
        }
        catch (err) {
            console.error("Error fetching data", err);
        }
    };
    
    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <GameContext.Provider value={{ games, fetchGames, searchTerm, setSearchTerm }}>
            {children}
        </GameContext.Provider>
    );
}

export default GameProvider;

export const useGame = () => {
    return useContext(GameContext)
}

