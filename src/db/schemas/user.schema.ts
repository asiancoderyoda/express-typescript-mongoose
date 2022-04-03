import { Schema } from 'mongoose';
import { IUser } from '..';
import Config = require('../config');

var mongooseConnection = Config.mongooseConnection;

class UserSchema {
    static get schema() {
        var schema = new Schema(
            {
                firstName: {
                    type: String,
                    required: true,
                    minlength: 2,
                    maxLength: 20,
                },
                lastName: {
                    type: String,
                    required: true,
                    minlength: 2,
                    maxLength: 20,
                },
                userName: {
                    type: String,
                    required: true,
                    unique: true,
                    lowercase: true,
                    match: /^[a-zA-Z0-9]+$/,
                    minlength: 4,
                    maxlength: 15,
                },
                email: {
                    type: String,
                    required: true,
                    unique: true,
                    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                },
                password: {
                    type: String,
                    required: true,
                    match: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/,
                },
                createdAt: {
                    type: Date,
                    default: Date.now(),
                },
                addresses: [
                    {
                        type: String,
                    },
                ],
            },
            {
                timestamps: { createdAt: 'createdAt', updatedAt: 'modifiedAt' },
                toObject: { virtuals: true },
                toJSON: { virtuals: true },
                collection: 'users',
                // discriminatorKey: '_type',
            },
        );

        return schema;
    }
}
var userSchema = mongooseConnection.model<IUser>('User', UserSchema.schema);
export { userSchema };
