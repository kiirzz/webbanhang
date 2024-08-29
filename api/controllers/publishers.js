import { Publisher, sequelize } from "../db.js";

export const getPublisherFromDB = async (req, res) => {
    try {
        const data = await Publisher.findAll();
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal Server Error')
    }
}

export const addPublisher = async (req, res) => {
    function unID() {
        return Math.floor(Math.random() * Date.now()).toString(16).slice(-10)
    }

    async function createId() {
        let newId;
        let check;
    
        do {
            newId = unID();
            check = await Publisher.findOne({ where: { publisher_id: newId } });
        } while (check !== null);
    
        return newId;
    }

    //CHECK EXISTING PUBLISHER
    const data = await Publisher.findOne({ where: {
        publisher_name: req.body.name,
    }});

    if (data === null) {
        try {
            const publisherId = await createId();
            const newPublisher = Publisher.build({
                publisher_id: publisherId,
                publisher_name: req.body.name,
                address: req.body.address,
                tel: req.body.number,
                email: req.body.email,
            });

            await newPublisher.save();

            return res.status(201).json("Publisher has been created")
        }
        catch (err) {
            console.log(err);
        }
    } else {
        return res.status(409).json("Publisher already existed")
    }
}

export const updatePublisher = async (req, res) => {

    //CHECK EXISTING PUBLISHER
    const data = await Publisher.findAll({ where: {
        publisher_name: req.body.publisher_name,
    }});

    if (data.length === 0 || (data.length === 1 && data[0].publisher_id === req.body.publisher_id)) {
        await Publisher.update({
            publisher_name: req.body.publisher_name,
            address: req.body.address,
            tel: req.body.tel,
            email: req.body.email,
        }, {
            where: { publisher_id: req.body.publisher_id }
        })
        .then(() => {
            return res.status(201).json("Publisher has been updated")
        })
        .catch(err => {
            console.log(err);
        })
    }
    else {
        return res.status(409).json("Publisher already existed")
    }
}

export const deletePublisher = async (req, res) => {
    try {
        await Publisher.destroy({
            where: { publisher_id: req.body.publisher_id }
        });

        return res.status(201).json("Publisher has been deleted")
    } catch(err) {
        console.log(err);
    }
}