import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from '../context/AuthContext';
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(cart.length);
    const { currentUser } = useContext(AuthContext);
    const [paid, setPaid] = useState(false);

    const fetchCartItem = useCallback(async () => {
        const result = await axios.get("/cart/");
        if (currentUser !== null) {
            setCart(result.data.filter(i => i.cartCartId === currentUser.dataValues.user_id));
        }
    }, [currentUser]);

    async function handleCart(params) {
        let updatedCart;
        if (currentUser !== null) {
            const existingItemIndex = cart.findIndex(item => item.gameGameId === params);

            if (existingItemIndex !== -1) {
                updatedCart = cart.filter(item => item.gameGameId !== params);
            } else {
                const newItem = { cartCartId: currentUser.dataValues.user_id, gameGameId: params };
                updatedCart = [...cart, newItem];
            }

            try {
                await axios.post("/cart/update_cart", {id: currentUser.dataValues.user_id, cart: updatedCart});
                setCart(updatedCart);
            } catch (err) {
                console.log(err);
            }
        }
    }

    const destroyCart = async () => {
        try {
            await axios.post("/cart/destroy_cart", {id: currentUser.dataValues.user_id});
        }
        catch (err) {
            console.log(err);
        }
    }

    async function handlePay(params) {
        try {
            await axios.post("/order/create_order", {id: currentUser.dataValues.user_id, cart: cart, sum: params});
            destroyCart();
            setPaid(true);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handlePaid = () => {
        setPaid(false);
    }

    useEffect(() => {
        setCartQuantity(cart.length);
    }, [cart])

    useEffect(() => {
        fetchCartItem();
    }, [currentUser, paid, fetchCartItem])

    return(
        <CartContext.Provider value={{ cart, cartQuantity, paid, fetchCartItem, handleCart, handlePay, handlePaid }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
}
