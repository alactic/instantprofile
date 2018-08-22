"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
const portifolio_schema_1 = require("../schemas/portifolio.schema");
exports.portifolioProviders = [
    {
        provide: constants_1.PortifolioModelName,
        useFactory: (connection) => connection.model('portifolio', portifolio_schema_1.PortifolioSchema),
        inject: ['DbConnectionToken'],
    },
];
exports.categoryProviders = [
    {
        provide: constants_1.CategoryModelName,
        useFactory: (connection) => connection.model('category', portifolio_schema_1.CategorySchema),
        inject: ['DbConnectionToken'],
    },
];
//# sourceMappingURL=portifolio.provider.js.map