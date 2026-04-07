import { prismaClient } from "../lib/db.js";

export interface createUserDTO {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}



class UserService {
    public static createUser(payload: createUserDTO) {
        return prismaClient.user.create({
            data: { ...payload }
        });
    }
}

export default UserService;