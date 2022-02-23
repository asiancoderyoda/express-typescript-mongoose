import { IUser } from "src/db/interfaces/IUser";

export interface IUserService {
    login(): Promise<IUser>;
}