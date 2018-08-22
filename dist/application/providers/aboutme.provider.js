"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
const aboutme_schema_1 = require("../schemas/aboutme.schema");
exports.aboutProviders = [
    {
        provide: constants_1.AboutModelName,
        useFactory: (connection) => connection.model('Aboutme', aboutme_schema_1.AboutMeSchema),
        inject: ['DbConnectionToken'],
    },
];
//# sourceMappingURL=aboutme.provider.js.map