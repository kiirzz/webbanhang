import { where } from "sequelize";
import { Category, sequelize } from "../db.js";

export const getCategoryFromDB = async (req, res) => {
    try {
        const data = await Category.findAll();
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal Server Error')
    }
}

export const addCategory = async (req, res) => {

    function unID() {
        return Math.floor(Math.random() * Date.now()).toString(16).slice(-10)
    }

    async function createId() {
        let newId;
        let check;
    
        do {
            newId = unID();
            check = await Category.findOne({ where: { category_id: newId } });
        } while (check !== null);
    
        return newId;
    }

    //CHECK EXISTING CATEGORY
    const data = await Category.findOne({where: { 
        category_name: req.body.category_name, 
    }})

    if (data === null) {
        try {
            const categoryId = await createId();
            const newCategory = Category.build({
                category_id: categoryId,
                category_name: req.body.category_name,
            })

            await newCategory.save();

            return res.status(201).json("Category has been created")
        } 
        catch(err) {
            console.log(err);
        }
    } else {
        return res.status(409).json("Category already existed")
    }
}

export const updateCategory = async (req, res) => {

    //CHECK EXISTING PUBLISHER
    const data = await Category.findOne({ where: {
        category_name: req.body.category_name,
    }});

    if (data === null) {
        await Category.update({
            category_name: req.body.category_name,
        }, {
            where: { category_id: req.body.category_id }
        })
        .then(() => {
            return res.status(201).json("Category has been updated")
        })
        .catch(err => {
            console.log(err);
        })
    } 
    else {
        return res.status(409).json("Category already existed")
    }
}

export const deleteCategory = async (req, res) => {
    try {
        await Category.destroy({
            where: { category_id: req.body.category_id }
        });

        return res.status(201).json("Category has been deleted")
    } catch(err) {
        console.log(err);
    }
}