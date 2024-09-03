import express from 'express';
import authRoutes from '../api/routes/auth.js';
import gameRoutes from '../api/routes/games.js';
import orderRoutes from '../api/routes/orders.js';
import userRoutes from '../api/routes/users.js';
import publisherRoutes from '../api/routes/publishers.js';
import categoryRoutes from '../api/routes/category.js';
import cartItemRoutes from '../api/routes/cart.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/user', userRoutes);
app.use('/api/publisher', publisherRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/cart', cartItemRoutes);

app.use('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(8800, () => {
  console.log(`Server is running on port 8800`);
});

export default app;
