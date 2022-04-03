import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { IOCTYPES } from '../ioc';
import { IUserService } from '../interfaces';
import { NextFunction, Request, Response } from 'express';

@injectable()
export class UserController {
    constructor(@inject(IOCTYPES.USER_SERVICE) private _userService: IUserService) {}

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this._userService.login();
            res.status(200).send({...user});
        } catch (error) {
            console.log(error);
        }
    }
}
