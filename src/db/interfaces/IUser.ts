import { Document } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    addresses: string[];
    // __type: string;
}