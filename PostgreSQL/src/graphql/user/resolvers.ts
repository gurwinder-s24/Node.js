import UserService, { type createUserDTO } from "../../services/userService.js";

const queryResolvers = {
    hello: () => 'Hello world!',
};
const mutationResolvers = {
    createUser: async (_: any, payload: createUserDTO) => {
        const newUser = await UserService.createUser(payload);
        return newUser;
    }
};

export const userResolvers = { queryResolvers, mutationResolvers };