"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.ServiceSchema = new mongoose.Schema({
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
//# sourceMappingURL=service.schema.js.map