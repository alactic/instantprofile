import * as mongoose from 'mongoose';
import {Schema} from "inspector";

export const ServiceSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
    },
    service: [{
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        image_name: {
            type: String,
        },
        image_id: {
            type: String,
        },
    }],
});