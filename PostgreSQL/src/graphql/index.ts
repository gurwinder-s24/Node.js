import { ApolloServer } from '@apollo/server';
import { User } from './user/index.js';

async function createApolloGraphqlServer() {

    const typeDefs = `
        ${User.typeDefs}

        type Query {
            ${User.queries}
        }
        type Mutation {
            ${User.mutations}
        }
    `;

    const resolvers = {
        Query: {
            ...User.resolvers.queryResolvers,
        },
        Mutation: {
            ...User.resolvers.mutationResolvers,
        }
    };

    // Create graphql server
    const gqlServer = new ApolloServer({
        typeDefs,
        resolvers,
        // introspection: false,
    });

    // Start graphql server
    await gqlServer.start();
    return gqlServer;
}

export default createApolloGraphqlServer;