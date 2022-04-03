import { injectable } from 'inversify';
import { UserSchema } from '../db';
import { IUser } from '../db/interfaces/IUser';
import { IUserRepository } from '../interfaces';
import { Repository } from './Repository';

@injectable()
export class UserRepository extends Repository<IUser> implements IUserRepository {
    constructor() {
        super(UserSchema);
    }
}
