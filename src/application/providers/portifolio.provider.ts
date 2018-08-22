import {Injectable, Module} from '@nestjs/common';
import {Connection} from 'mongoose';
import {CategoryModelName, PortifolioModelName, ServiceModelName} from '../utils/constants';
import {ServiceSchema} from '../schemas/service.schema';
import {CategorySchema, PortifolioSchema} from "../schemas/portifolio.schema";

export const portifolioProviders = [
    {
        provide: PortifolioModelName,
        useFactory: (connection: Connection) => connection.model('portifolio', PortifolioSchema),
        inject: ['DbConnectionToken'],
    },
];

export const categoryProviders = [
    {
        provide: CategoryModelName,
        useFactory: (connection: Connection) => connection.model('category', CategorySchema),
        inject: ['DbConnectionToken'],
    },
];
