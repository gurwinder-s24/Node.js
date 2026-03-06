import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs:`
            type User {
                id: ID!
                name: String!
                username: String!
                email: String!
                phone: String!
                website: String!
            }
            type Todo {
                id: ID!
                title: String!
                completed: Boolean!
                user: User!
            }

            type Query {
                getTodos: [Todo!]
                getUsers: [User!]
                getUser(id: ID!): User
            }
        `,
        resolvers: {
            Todo: {
                user: async (todo) => {
                    return (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data;
                }
            },
            Query: {
                getTodos: async () => (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
                getUsers: async () => (await axios.get('https://jsonplaceholder.typicode.com/users')).data,
                getUser: async (parent, { id }) => {
                    return (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data;
                }
            }
        }
    });

    app.use(express.json());
    // app.use(bodyParser);
    app.use(cors());


    await server.start();
    app.use('/graphql', expressMiddleware(server));

    app.listen(5000, () => {
        console.log('Server is Up!');
    });
}

startServer();