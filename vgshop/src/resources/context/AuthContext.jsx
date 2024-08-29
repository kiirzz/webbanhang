import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (inputs) => {
        const res = await axios.post("/auth/login", inputs);
        setCurrentUser(res.data);
    };

    const changeInformation = async (inputs) => {
        const res = await axios.post("/user/update_info", inputs);
        console.log(res.data);
        
        setCurrentUser(res.data);
    }

    const logout = async () => {
        await axios.post("/auth/logout");
        setCurrentUser(null);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{currentUser, login, logout, changeInformation}}>
            {children}
        </AuthContext.Provider>
    );
}
