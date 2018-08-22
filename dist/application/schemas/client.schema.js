"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.ClientSchema = new mongoose.Schema({
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
//# sourceMappingURL=client.schema.js.map