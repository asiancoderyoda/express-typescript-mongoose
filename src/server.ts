import express from 'express';
import * as bodyParser from 'body-parser';
import chalk from 'chalk';
import { RouteBinder } from './routes';
import { IOC } from './ioc';
import 'reflect-metadata';

const port = process.env.PORT;
const environment = process.env.NODE_ENV || 'development';
const success = chalk.green;

/* ==========================================================================
	-- Configs
========================================================================== */

const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* ==========================================================================
	-- Routes
========================================================================== */

const container = IOC.configureContainer();
RouteBinder.configureRoutes(app, container);

/* ==========================================================================
	-- Server
========================================================================== */

app.listen(port, () => {
    console.log(success(`Listening on port ${port} in ${environment} mode`));
});
