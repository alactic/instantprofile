import {Injectable, Module} from '@nestjs/common';
import {Connection} from 'mongoose';
import {ClientModelName} from '../utils/constants';
import {ClientSchema} from '../schemas/client.schema';

export const clientProviders = [
    {
        provide: ClientModelName,
        useFactory: (connection: Connection) => connection.model('Client', ClientSchema),
        inject: ['DbConnectionToken'],
    },
];
