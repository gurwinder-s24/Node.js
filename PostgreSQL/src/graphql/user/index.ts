import { userTypeDefs } from './typedef.js';
import { userQueries } from './queries.js';
import { userMutations } from './mutations.js';

import { userResolvers } from './resolvers.js';


export const User = {
    typeDefs: userTypeDefs,
    queries: userQueries,
    mutations: userMutations,
    
    resolvers: userResolvers
};