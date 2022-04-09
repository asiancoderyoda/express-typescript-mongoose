import { Express, Request, Response, NextFunction } from 'express';
import { Container } from 'inversify';
import { UserController } from '../controllers';

export class UserRoutes {
    public static configureRoutes(app: Express, container: Container): void {
        const userController = container.get(UserController);

        app.route('/auth').get((req: Request, res: Response, next: NextFunction) => userController.login(req, res, next));
        // .post((req: Request, res: Response, next: NextFunction) => userController.register(req, res, next));
    }
}
