import mongoose, { Connection } from 'mongoose';
import * as dotenv from 'dotenv';

class Config {
    static mongooseInstance: any;
    static mongooseConnection: Connection;
    private static envConfig: Record<string, string | undefined>;
    private static readonly thisConfig = dotenv.config();

    constructor() {
        Config.connect();
    }

    static connect() {
        const connection = Config.connectToMongo();
        return connection;
    }

    private static connectToMongo() {
        if (this.mongooseInstance) {
            return this.mongooseInstance;
        }

        const uri = 'mongodb://' + this.get('MONGO_HOST') + '/' + this.get('MONGO_DATABASE');
        const mongoConfig = this.getMongoConfig();

        this.mongooseConnection = mongoose.connection;
        this.mongooseConnection
            .once('open', () => {
                console.log('MongoDB database connection established successfully');
                console.log('Connected to: ' + uri);
            })
            .on('error', (error: any) => {
                return Config.connect();
            });

        this.mongooseInstance = mongoose.connect(uri, { ...mongoConfig });
        this.mongooseInstance = global.Promise;
        return this.mongooseInstance;
    }

    static get(key: string): string | undefined {
        if (Config.envConfig && Config.envConfig.hasOwnProperty('MONGO_HOST')) {
            return this.envConfig[key];
        }
        if (Config.thisConfig.error) {
            this.envConfig = process.env;
        } else {
            this.envConfig = Config.thisConfig.parsed || {};
            console.log('Using .env file to set config variables', Config.envConfig);
        }
        return this.envConfig[key];
    }

    private static getMongoConfig() {
        return {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepAlive: true,
            socketTimeoutMS: 360000,
            connectTimeoutMS: 360000,
        };
    }
}

Config.connect();
export = Config;
