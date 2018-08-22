import * as mongoose from 'mongoose';
import {Schema} from "inspector";

export const ClientSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    client: [{
        name: {
            type: String,
        },
        image_name: {
            type: String,
        },
    }],
});