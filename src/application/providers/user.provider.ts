import {Injectable, Module} from '@nestjs/common';
import {Connection} from 'mongoose';
import {UserSchema} from '../schemas/user.schema';
import {ModelName} from '../utils/constants';
import * as paginate from 'mongoose-paginate';

UserSchema.plugin(paginate);
UserSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};
export const userProviders = [
    {
        provide: ModelName,
        useFactory: (connection: Connection) => connection.model('User', UserSchema),
        inject: ['DbConnectionToken'],
    },
];
