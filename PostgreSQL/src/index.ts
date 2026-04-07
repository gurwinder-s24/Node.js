import 'dotenv/config';
import express from 'express';
import createApolloGraphqlServer from './graphql/index.js';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';

// Create express server
const app = express();
const PORT = Number(process.env.PORT) || 7000;
app.use(express.json());


// Create graphql server
const gqlServer = await createApolloGraphqlServer();
app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    expressMiddleware(gqlServer)
    // We can also set context (i.e., third argument for resolvers)
    // expressMiddleware(gqlServer, {
    //     context: async ({ req }) => ({ token: req.headers.token }),
    // })
);


// Routes and app logic
app.get('/', (req, res) => {
    res.send('Everything is working fine!');
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});