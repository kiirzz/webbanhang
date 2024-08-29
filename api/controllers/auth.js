import { sequelize, User, Cart } from "../db.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const saltRound = 10;

export const register = async (req,res) => {

    function unID() {
        return Math.floor(Math.random() * Date.now()).toString(16).slice(-10)
    }
    
    async function createId() {
        let newId;
        let check;
    
        do {
            newId = unID();
            check = await User.findOne({ where: { user_id: newId } });
        } while (check !== null);
    
        return newId;
    }

    //CHECK EXISTING USER
    const data = await User.findOne({ where: {
        username: req.body.username
    }});

    if (data === null) {
        try {
            const userId = await createId();
            const hashPassword = await bcrypt.hash(req.body.password, saltRound);            

            const newUser = User.build({
                user_id: userId,
                firstname: req.body.firstname, 
                lastname: req.body.lastname, 
                username: req.body.username, 
                email: req.body.email, 
                tel: req.body.tel, 
                priority: req.body.priority, 
                password: hashPassword,
                avatar: req.body.avatar,
            });

            await newUser.save();

            if (newUser.priority === "client") {
                const newCart = Cart.build({
                    cart_id: newUser.user_id,
                })
                await newCart.save();
            }

            return res.status(201).json("User has been created")     
        } 
        catch(err) {
            console.log(err);
        }
    } else {
        if (req.body.priority === "admin") {
            return res.status(409).json("Admin already existed")
        } else {
            return res.status(409).json("User already existed")
        }
    }
}

export const login = async (req,res) => {
    const data = await User.findOne({ where: {
        username: req.body.username
    }});

    if (data === null) { return res.status(404).json("User not found!") }
    else {     
        const checkPassword = await bcrypt.compare(req.body.password, data.password);

        if (!checkPassword) {
            return res.status(400).json("Wrong password!")
        }

        const token = jwt.sign({ user_id: data.user_id }, "jwtkey")
        const { password, ...other } = data

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other)
    }
}

export const logout = (req,res) => {
    res.clearCookie("access_token", {
        samSite: "none",
        secure: true
    }).status(200).json("User has been logged out.");
}