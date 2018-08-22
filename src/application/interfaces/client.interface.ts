import {Document} from 'mongoose';

export interface Client extends Document {
    readonly client: any;
}