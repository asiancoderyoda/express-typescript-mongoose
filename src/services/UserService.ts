import { inject, injectable } from 'inversify';
// import { IUser } from '../db/interfaces/IUser';
import { IUserRepository, IUserService } from '../interfaces';
import { IOCTYPES } from '../ioc';

@injectable()
export class UserService implements IUserService {
    constructor(@inject(IOCTYPES.USER_REPOSITORY) private _userRepository: IUserRepository) {}

    public async login(): Promise<string> {
        try {
            const user = await this._userRepository.findOne({ email: 'avigyanbhaktacontai@gmail.com' }, { password: 0 }, {});
            return user.fullName;
        } catch (err) {
            throw new Error(err);
        }
    }
}
