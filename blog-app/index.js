import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import { getAllBlogs } from './controllers/blogController.js';
// Importing routes
import userRoutes from './routes/userRouter.js';
import blogRoutes from './routes/blogRouter.js';
// Importing middlewares
import { checkForAuthentication } from './middlewares/authMiddleware.js';

dotenv.config();
connectDB();
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.static(path.resolve('./public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication('token'));

app.get('/', async (req, res) => {
  const allBlogs = await getAllBlogs();
  res.render('home', { user: req.user, blogs: allBlogs });
});
app.use('/user', userRoutes);
app.use('/blog', blogRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});