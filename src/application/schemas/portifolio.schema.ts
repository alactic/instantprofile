import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const PortifolioSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
    },
    portifolio: [{
        project_name: {
            type: String,
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'category',
        },
        image_name: {
            type: String,
        },
        image_id: {
            type: String,
        },
    }],
});

export const CategorySchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    category: {
        type: String,
    },
});