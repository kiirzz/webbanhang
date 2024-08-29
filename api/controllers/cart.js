import { CartItem, sequelize } from "../db.js";

export const getCartItemFromDB = async (req, res) => {
    try {
        const data = await CartItem.findAll();
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal Server Error')
    }
}

export const updateCartItem = async (req, res) => {
    try {
        await CartItem.destroy({ where: { cartCartId: req.body.id } });

        if (req.body.cart.length !== 0) {
            await CartItem.bulkCreate(req.body.cart);
        }

        return res.status(201).json("Cart updated successfully!");
    } 
    catch (error) {
        return res.status(500).json(err);
    }
}

export const destroyCartItem = async (req, res) => {
    try {
        await CartItem.destroy({ where: { cartCartId: req.body.id } });
    }
    catch (err) {
        return res.status(500).json(err);
    }
}