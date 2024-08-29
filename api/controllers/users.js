import { User, sequelize } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const getUserFromDB = async (req, res) => {
    try {
        const data = await User.findAll();
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal Server Error')
    }
}

export const updateUser = async (req, res) => {

    //CHECK EXISTING USER
    const data = await User.findAll({ where: {
        username: req.body.username,
    }});

    if (data.length === 0 || (data.length === 1 && data[0].user_id === req.body.user_id)) {
        await User.update({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            tel: req.body.tel,
        }, {
            where: {user_id: req.body.user_id}
        })
        .then(() => {
            return res.status(201).json("User has been updated")
        })
        .catch(err => {
            console.log(err);
        })
    } else {
        if (req.body.priority === "admin") {
            return res.status(409).json("Admin already existed")
        } else {
            return res.status(409).json("User already existed")
        }
    }
}

export const deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: { user_id: req.body.user_id }
        });

        return res.status(201).json("User has been deleted")
    } catch(err) {
        console.log(err);
    }
}

export const updateUserInformation = async (req, res) => {
    try {
        const data = await User.findOne({ where: {
            user_id: req.body.user_id,
        }});
    
        if (data !== null) {
            await User.update({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                tel: req.body.tel,
            }, {
                where: {user_id: req.body.user_id}
            })
        }

        const updatedData = await User.findOne({
            where: { user_id: req.body.user_id },
            attributes: { exclude: ['password'] },
        })

        const token = jwt.sign({ user_id: updatedData.user_id }, "jwtkey");
        const { password, ...other } = updatedData

        res.cookie("access_token", token, {
            httpOnly: true
        })

        return res.status(200).json(other);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred while updating user information" });
    }

    
}

export const changePasswordUser = async (req, res) => {
    try {
        const userData = await User.findOne({ where: {
            user_id: req.body.id
        }})

        if (userData !== null) {
            const checkPassword = await bcrypt.compare(req.body.old, userData.password);

            if (checkPassword) {
                const newHashPassword = await bcrypt.hash(req.body.new, 10);

                userData.password = newHashPassword;
                await userData.save();

                return res.status(201).json("Password changed")
            } else {
                return res.status(409).json("Wrong password")
            }
        }
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred while changing password" });
    }
}