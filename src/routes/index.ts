import * as express from 'express';
import { Container } from 'inversify';
import { UserRoutes } from './UserRoutes';

export class RouteBinder {
    public static configureRoutes(app: express.Express, container: Container): void {
        UserRoutes.configureRoutes(app, container);
    }
}