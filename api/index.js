import express from "express";
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.js"
import gameRoutes from "./routes/games.js"
import orderRoutes from "./routes/orders.js"
import userRoutes from "./routes/users.js"
import publisherRoutes from "./routes/publishers.js"
import categoryRoutes from "./routes/category.js"
import cartItemRoutes from "./routes/cart.js"
import cookieParser from "cookie-parser";

const app = express()

dotenv.config();

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/game", gameRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/user", userRoutes)
app.use("/api/publisher", publisherRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/cart", cartItemRoutes)

app.use("/", (req, res) => {
    res.send('Server is running!');
})

app.listen(process.env.PORT, () => {
    console.log("Connected!")
})