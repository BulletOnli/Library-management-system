import { UserType } from "../models/userModel";

interface User extends UserType {
    _id: string;
}

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

export {};
