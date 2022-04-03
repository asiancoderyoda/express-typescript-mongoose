import { inject, injectable } from "inversify";
import { IUser } from "../db/interfaces/IUser";
import { IUserRepository, IUserService } from "../interfaces";
import { IOCTYPES } from "../ioc";

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(IOCTYPES.USER_REPOSITORY) private _userRepository: IUserRepository,
    ) { }

    public async login(): Promise<IUser> {
        try {
            const user = await this._userRepository.findOne({ email: "" }, { password: 0 }, { lean: true });
            return user;
        } catch (err) {
            throw new Error(err);
        }
    }
}