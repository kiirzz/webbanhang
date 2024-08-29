import { Order, OrderGame, Game, sequelize } from "../db.js";
import { Op } from 'sequelize';


export const getOrderFromDB = async (req, res) => {
    try {
        const data = await Order.findAll();
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal Server Error')
    }
}

export const getOrderGameFromDB = async (req, res) => {
    try {
        const data = await OrderGame.findAll();
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal Server Error')
    }
}

export const createOrder = async (req, res) => {
    function unID() {
        return Math.floor(Math.random() * Date.now()).toString(16).slice(-10)
    }

    async function createId() {
        let newId;
        let check;
    
        do {
            newId = unID();
            check = await Order.findOne({ where: { order_id: newId } });
        } while (check !== null);
    
        return newId;
    }

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); 
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();

    if (req.body.cart.length !== 0) {
        const orderId = await createId();
        const updateGameSoldQuantity = req.body.cart.map(game => game.gameGameId)
        const newOrderGame = req.body.cart.map(item => ({
            gameGameId: item.gameGameId,
            orderOrderId: orderId,
        }));

        const gamesToUpdate = await Game.findAll({ 
            where: {
                game_id: { [Op.in]: updateGameSoldQuantity }
            }
        });

        try {
            const newOrder = Order.build({
                order_id: orderId,
                user_id: req.body.id,
                total: req.body.sum,
                created_at: `${year}-${month}-${day}`,
                status: 1,
            })

            await newOrder.save();

            await OrderGame.bulkCreate(newOrderGame);

            const updatePromises = gamesToUpdate.map(async game => {
                const updatedSoldQuantity = game.sold_quantity + 1;
                await Game.update({
                    sold_quantity: updatedSoldQuantity,
                }, {
                    where: {
                        game_id: game.game_id,
                    },
                });
            });

            await Promise.all(updatePromises);

            return res.status(201).json("Paid!");
        } 
        catch (err) {
            return res.status(500).json(err);
        }
    }
}