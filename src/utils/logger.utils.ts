import * as log4js from 'log4js';
import { injectable } from 'inversify';

@injectable()
class LoggerUtils {
    constructor() {
        log4js.configure({
            appenders: {
                out: {
                    type: 'stdout',
                    layout: {
                        type: 'pattern',
                        pattern: '%[[%r] [%p] %c -%] %m',
                    },
                },
                app: {
                    type: 'file',
                    filename: 'logs/app.log',
                    maxLogSize: 10485760,
                    backups: 3,
                    compress: true,
                    layout: {
                        type: 'basic',
                    },
                },
                error: {
                    type: 'file',
                    filename: 'logs/error.log',
                    maxLogSize: 10485760,
                    backups: 3,
                    compress: true,
                    layout: {
                        type: 'basic',
                    },
                },
            },
            categories: {
                default: {
                    appenders: ['out', 'app'],
                    level: 'info',
                },
                error: {
                    appenders: ['out', 'error'],
                    level: 'error',
                },
            },
        });
    }

    public getLogger(category: string): log4js.Logger {
        return log4js.getLogger(category);
    }
}

export { LoggerUtils };
