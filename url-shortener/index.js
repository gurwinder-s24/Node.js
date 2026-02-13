import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import urlRoutes from './routes/urlRouter.js';
import analyticsRoute from './routes/analyticsRoute.js';
import testRoutes from './routes/testRouter.js';
import appRoutes from './routes/appRouter.js';  
import notFoundHandler from './middlewares/notFound.js';
import path from 'path';


// 1. Load environment variables
dotenv.config();

async function startServer() {
  // 2. Connect DB before handling any requests
  await connectDB(); // i.e., start server only after DB connects.

  // 3. Initialize express app
  const app = express();
  app.set('view engine', 'ejs');
  app.set('views', path.resolve('./views'));

  // 4. Global middlewares 
  app.use(express.json());
  app.use(express.urlencoded({ extended: false })); // for parsing form data (if any)

  // 5. Static files // for serving static files like css, js, images etc. (if any)
  app.use(express.static(path.resolve('./public')));

  // 6. Routes
  app.use('/api/url', urlRoutes );
  app.use('/analytics/', analyticsRoute );
  app.use('/test', testRoutes );
  app.use('/', appRoutes );
  app.use(notFoundHandler);

  // 7. Start the server
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server is Up! Listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});