import * as mongoose from 'mongoose';

export interface IRead<T extends mongoose.Document> {
    retrieve: (callback: (error: any, result: T[]) => void) => Promise<T[]>;
    findById: (id: string, callback?: (error: any, result: T) => void) => Promise<T>;
    findOne: (cond: any, fields: any, options: any, callback?: (err: any, res: T) => void) => Promise<T>;
    find: (cond: any, fields: any, options: any, sortOptions?: any,
        callback?: (err: any, res: T[]) => void) => Promise<T[]>;
    count: (cond?: any) => Promise<number>;
}

export interface IWrite<T extends mongoose.Document> {
    create: (item: any, callback?: (error: any, result: T) => void) => Promise<T>;
    save: (item: T, callback?: (error: any, result: T) => void) => Promise<T>;
    upsert: (cond: any, item: T, callback?: (error: any, result: T) => void) => Promise<T>;
    findByIdAndPush: (_id: string, item: any, callback?: (error: any, result: T) => void) => Promise<T>;
    delete: (_id: string, callback?: (error: any) => void) => Promise<boolean>;
    deleteAll: (callback?: (error: any) => void) => Promise<boolean>;
}

export interface IRepository<T extends mongoose.Document> extends IRead<T>, IWrite<T> {

}