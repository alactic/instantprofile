import * as mongoose from 'mongoose';
import {Schema} from "inspector";

export const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email : {
        type: String,
    },
    subject: {
        type: String,
    },
    message: {
        type: String,
    },
});