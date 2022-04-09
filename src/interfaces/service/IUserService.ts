// import { IUser } from '../../db/interfaces/IUser';

export interface IUserService {
    login(): Promise<string>;
}
