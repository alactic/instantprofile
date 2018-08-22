"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
const service_schema_1 = require("../schemas/service.schema");
exports.serviceProviders = [
    {
        provide: constants_1.ServiceModelName,
        useFactory: (connection) => connection.model('Service', service_schema_1.ServiceSchema),
        inject: ['DbConnectionToken'],
    },
];
//# sourceMappingURL=service.provider.js.map