import { injectable } from "inversify";
import { UserSchema } from "src/db";
import { IUser } from "src/db/interfaces/IUser";
import { IUserRepository } from "src/interfaces";
import { Repository } from "./Repository";

@injectable()
export class UserRepository extends Repository<IUser> implements IUserRepository {
    constructor() {
        super(UserSchema)
    }
}