"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
const client_schema_1 = require("../schemas/client.schema");
exports.clientProviders = [
    {
        provide: constants_1.ClientModelName,
        useFactory: (connection) => connection.model('Client', client_schema_1.ClientSchema),
        inject: ['DbConnectionToken'],
    },
];
//# sourceMappingURL=client.provider.js.map