import * as mongoose from 'mongoose';

export const AboutMeSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    cv: {
        type: String,
        require: true,
    },
    profile_image: {
        type: String,
        require: true,
    },
    profession: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    dob: {
        type: String,
        require: true,
        unique: true,
    },
    short_description: {
        type: String,
        require: true,
    },
    about_me: {
        type: String,
        require: true,
    },
    hobby: [{
        type: String,
    }],
    education: [{
        school_name: {
            type: String,
        },
        course_of_study: {
            type: String,
        },
        graduation_date: {
            type: String,
        },
        entry_date: {
            type: String,
        },
    }],
    skill: [{
        name: {
            type: String,
        },
        level: {
            type: String,
        },
    }],
    experience: [{
        name: {
            type: String,
        },
        place: {
            type: String,
        },
    }],
});