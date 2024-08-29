import { Game, sequelize } from "../db.js";

export const getGameFromDB = async (req, res) => {
    try {
        const data = await Game.findAll();
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal Server Error')
    }
}

export const addGame = async (req, res) => {
    function unID() {
        return Math.floor(Math.random() * Date.now()).toString(16).slice(-10)
    }

    async function createId() {
        let newId;
        let check;
    
        do {
            newId = unID();
            check = await Game.findOne({ where: { game_id: newId } });
        } while (check !== null);
    
        return newId;
    }

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); 
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();

    //CHECK EXISTING GAME
    const data = await Game.findOne({ where: {
        game_name: req.body.name,
        publisher_id: req.body.publisher,
    }})

    if (data === null) {
        try {
            const gameId = await createId();
            const newGame = Game.build({
                game_id: gameId,
                game_name: req.body.name,
                publisher_id: req.body.publisher,
                category_id: req.body.category,
                description: req.body.description,
                price: req.body.price,
                status: req.body.status,
                image: req.body.image,
                sold_quantity: req.body.sold_quantity,
                rating: req.body.rating,
                released: `${year}-${month}-${day}`
            });
            
            await newGame.save();

            return res.status(201).json("Game has been created")
        } 
        catch(err) {
            console.log(err);
        }
    } else {
        res.status(409).json("Game already existed")
    }
}

export const updateGame = async (req, res) => {

    //CHECK EXISTING GAME
    const data = await Game.findAll({ where: {
        game_name: req.body.game_name,
        publisher_id: req.body.publisher_id,
    }})

    if (data.length === 0 || (data.length === 1 && data[0].game_id === req.body.game_id)) {
        await Game.update({
            game_name: req.body.game_name,
            publisher_id: req.body.publisher_id,
            category_id: req.body.category_id,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            status: req.body.status,
        }, {
            where: { game_id: req.body.game_id }
        })
        .then(() => {
            return res.status(201).json("Game has been updated")
        })
        .catch(err => {
            console.log(err);
        })
    }
    else {
        return res.status(409).json("Game already existed")
    }
}

export const deleteGame = async (req, res) => {
    try {
        await Game.destroy({
            where: { game_id: req.body.game_id }
        });

        return res.status(201).json("Game has been deleted")
    } catch(err) {
        console.log(err);
    }
}