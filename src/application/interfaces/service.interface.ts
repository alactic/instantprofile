import {Document} from 'mongoose';

export interface Service extends Document {
    readonly service: any;
}