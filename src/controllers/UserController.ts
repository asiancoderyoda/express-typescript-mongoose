import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { IOCTYPES } from '../ioc';
import { IUserService } from '../interfaces';
import { NextFunction, Request, Response } from 'express';
import { LoggerUtils, ResponseUtils } from '../utils';

@injectable()
export class UserController {
    private readonly _errLogger;
    private readonly _appLogger;
    private readonly RESPONSE_CODE;
    private readonly RESPOSNE_MSG;

    constructor(
        @inject(IOCTYPES.USER_SERVICE) private _userService: IUserService,
        @inject(IOCTYPES.LOGGER_UTILS) private _loggerUtils: LoggerUtils,
        @inject(IOCTYPES.RESPONSE_UTILS) private _responseUtils: ResponseUtils,
    ) {
        this._errLogger = this._loggerUtils.getLogger('Error');
        this._appLogger = this._loggerUtils.getLogger('app');
        this.RESPONSE_CODE = this._responseUtils.ResponseCode;
        this.RESPOSNE_MSG = this._responseUtils.getResponseMsg;
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this._userService.login();
            this._appLogger.info(`UserController.login() - ${user}`);
            res.status(200).send({
                code: this.RESPONSE_CODE.Success,
                message: this.RESPOSNE_MSG(this.RESPONSE_CODE.Success),
                data: user,
            });
        } catch (error) {
            res.status(500).send({
                code: this.RESPONSE_CODE.InternalServerError,
                message: this.RESPOSNE_MSG(this.RESPONSE_CODE.InternalServerError),
            });
            this._errLogger.error(`UserController.login() - ${error}`);
        }
    }
}
