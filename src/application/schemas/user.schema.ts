import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    middleName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
        unique: true,
    },
    address: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    profession: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    habit: {
        type: String,
        require: true,
    },
    activate: {
        type: Boolean,
        require: true,
    },
    admin1: {
        type: Boolean,
        require: true,
    },
    admin2: {
        type: Boolean,
        require: true,
    },
    hobby: [{
        type: String,
    }],
    token: {
        type: String,
        require: true,
    },
});