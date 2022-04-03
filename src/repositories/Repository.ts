import { injectable, unmanaged } from 'inversify';
import * as mongoose from "mongoose";
import 'reflect-metadata';
import { IRepository } from '../interfaces';

@injectable()
export abstract class Repository<T extends mongoose.Document> implements IRepository<T> {
    private _model: mongoose.Model<mongoose.Document>;

    constructor( @unmanaged() model: mongoose.Model<any, {}, {}, {}>) {
        this._model = model;
    }

    create(item: any, callback?: (error: any, result: T) => void): Promise<T> {
        let self = this;
        let p = new Promise<T>((resolve, reject) => {
            self._model.create(item).then(res => {
                if (callback) {
                    callback(null, <T>res);
                } else {
                    resolve(<T>res);
                }
            }).catch(err => {
                if (callback) {
                    callback(err, <T>{});
                }
                if (err) {
                    reject(err);
                }
            })
        });

        return p;
    }

    retrieve(callback: (error: any, result: T[]) => void): Promise<T[]> {
        let self = this;
        let p = new Promise<T[]>((resolve, reject) => {
            self._model.find({}, (err, res) => {
                if (callback) {
                    callback(err, <T[]>res);
                }
                if (err) {
                    reject(err);
                }
                else {
                    resolve(<T[]>res);
                }
            });
        });

        return p;
    }

    findById(_id: string, callback?: (error: any, result: T) => void): Promise<T> {
        let self = this;
        let p = new Promise<T>((resolve, reject) => {
            self._model.findById(_id, (err: any, res: any) => {
                if (callback) {
                    callback(err, <T>res);
                }
                if (err) {
                    reject(err);
                }
                else {
                    resolve(<T>res);
                }
            });
        });

        return p;
    }

    findOne(cond: any, fields: any, options: any, callback?: (err: any, res: T) => void): Promise<T> {
        let self = this;
        let p = new Promise<T>((resolve, reject) => {
            self._model.findOne(cond, fields, options).exec((err, res) => {
                if (callback) {
                    callback(err, <T>res);
                }
                if (err) {
                    reject(err);
                }
                else {
                    resolve(<T>res);
                }
            });
        });

        return p;
    }

    find(cond: any, fields: any, options: any, sortOptions?: any, callback?: (err: any, res: T[]) => void): Promise<T[]> {
        let p = new Promise<T[]>((resolve, reject) => {
            let query = this._model.find(cond, fields, options);
            if (sortOptions) {
                query = query.sort(sortOptions);
            }

            query.exec((err, res) => {
                if (callback) {
                    callback(err, <T[]>res);
                }
                if (err) {
                    reject(err);
                }
                else {
                    resolve(<T[]>res);
                }
            });
        });

        return p;
    }

    count(cond?: any): Promise<number> {
        let self = this;
        let p = new Promise<number>((resolve, reject) => {
            self._model.count(cond, (err, count) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(count);
                }
            });
        });

        return p;
    }

    save(item: T, callback?: (error: any, result: T) => void): Promise<T> {
        let p = new Promise<T>((resolve, reject) => {
            item.save((err, result) => {
                if (callback) {
                    callback(err, <T>result);
                }

                if (err) {
                    reject(err);
                }
                else {
                    resolve(<T>result);
                }
            });
        });

        return p;
    }

    upsert(cond: any, item: any, callback?: (error: any, result: T) => void): Promise<T> {
        let self = this;
        let p = new Promise<T>((resolve, reject) => {
            let options = {
                upsert: true
            };
            self._model.findOneAndUpdate(cond, item, options, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(<T>result);
                }
            });
        });

        return p;
    }

    findByIdAndPush(_id: string, item: any, callback?: (error: any, result: T) => void): Promise<T> {
        let self = this;
        let p = new Promise<T>((resolve, reject) => {
            let options = {
                'new': true
            };
            self._model.findByIdAndUpdate(_id, { $push: item }, options, (err, result) => {
                console.log(item);
                if (err) {
                    reject(err);
                }
                else {
                    resolve(<T>result);
                }
            });
        });

        return p;
    }

    delete(_id: string, callback?: (error: any) => void): Promise<boolean> {
        let self = this;
        let p = new Promise<boolean>((resolve, reject) => {
            self._model.remove({ _id: this.toObjectId(_id) }, (err) => {
                if (callback) {
                    callback(err);
                }
                if (err) {
                    reject(err);
                }
                else {
                    resolve(true);
                }
            });
        });

        return p;
    }

    deleteAll(callback?: (error: any) => void): Promise<boolean> {
        let self = this;
        let p = new Promise<boolean>((resolve, reject) => {
            self._model.remove({}, (err) => {
                if (callback) {
                    callback(err);
                }
                if (err) {
                    reject(err);
                }
                else {
                    resolve(true);
                }
            });
        });

        return p;
    }

    toObjectId(_id: string) {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    }

}