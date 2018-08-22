import {Injectable, Module} from '@nestjs/common';
import {Connection} from 'mongoose';
import {AboutModelName} from "../utils/constants";
import {AboutMeSchema} from "../schemas/aboutme.schema";

export const aboutProviders = [
    {
        provide: AboutModelName,
        useFactory: (connection: Connection) => connection.model('Aboutme', AboutMeSchema),
        inject: ['DbConnectionToken'],
    },
];
