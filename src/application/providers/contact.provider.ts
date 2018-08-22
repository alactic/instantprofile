import {Injectable, Module} from '@nestjs/common';
import {Connection} from 'mongoose';
import {ContactModelName, PortifolioModelName, ServiceModelName} from '../utils/constants';
import {ServiceSchema} from '../schemas/service.schema';
import {PortifolioSchema} from "../schemas/portifolio.schema";
import {ContactSchema} from "../schemas/contact.schema";

export const contactProviders = [
    {
        provide: ContactModelName,
        useFactory: (connection: Connection) => connection.model('contact', ContactSchema),
        inject: ['DbConnectionToken'],
    },
];
