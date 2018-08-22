import {Document} from 'mongoose';

export interface Portifolio extends Document {
    readonly portifolio: any;
}

export interface Category extends Document {
    readonly category: string;
}