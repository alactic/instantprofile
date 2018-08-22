import {Injectable, Module} from '@nestjs/common';
import {Connection} from 'mongoose';
import {ServiceModelName} from '../utils/constants';
import {ServiceSchema} from '../schemas/service.schema';

export const serviceProviders = [
    {
        provide: ServiceModelName,
        useFactory: (connection: Connection) => connection.model('Service', ServiceSchema),
        inject: ['DbConnectionToken'],
    },
];
