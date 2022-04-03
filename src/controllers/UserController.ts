import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { IOCTYPES } from '../ioc';
import { IUserService } from '../interfaces';

@injectable()
export class UserController {
    constructor( @inject(IOCTYPES.USER_SERVICE) private _userService: IUserService) { }

    public async login() {
        try {
            const user = await this._userService.login();
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    }
}