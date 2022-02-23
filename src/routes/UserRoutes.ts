import * as express from 'express';
import { Container } from 'inversify';

export class UserRoutes {
    public static configureRoutes(app: express.Express, container: Container): void {

        app.use('/api/users')

        app.route('/').get((req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
    }
}