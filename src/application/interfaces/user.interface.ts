import {Document} from 'mongoose';

export interface User extends Document {
    readonly firstName: string;
    readonly lastName: string;
    readonly middleName: string;
    readonly phone: string;
    readonly email: string;
    readonly password: string;
    readonly hobby: any;
    readonly address: string;
    readonly username: string;
    readonly habit: string;
    readonly profession: string;
    activate: boolean;
    admin1: boolean;
    admin2: boolean;
}