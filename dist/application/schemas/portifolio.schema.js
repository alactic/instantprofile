"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.PortifolioSchema = new mongoose.Schema({
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
exports.CategorySchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    category: {
        type: String,
    },
});
//# sourceMappingURL=portifolio.schema.js.map