import express from 'express';
import path from 'path';
import appRoutes from './routes/appRouter.js';
import notFoundHandler from './middlewares/notFound.js';

async function startServer() {
  const app = express();
  app.set('view engine', 'ejs');
  app.set('views', path.resolve('./views'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/', appRoutes );
  app.use(notFoundHandler);

  const port = 5000;
  app.listen(port, () => {
    console.log(`Server is Up! Listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});