"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const constants_1 = require("./constants");
exports.retrieveFromToken = (authorization) => {
    const token = authorization.split('Bearer').join('').trim();
    return jwt.verify(token, constants_1.SecreytKey);
};
//# sourceMappingURL=retrieveFromToken.js.map