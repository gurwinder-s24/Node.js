import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';
// Importing routes
import userRoutes from './routes/userRouter.js';

dotenv.config();
connectDB();
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('home');
});
app.use('/user', userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});