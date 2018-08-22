"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
const contact_schema_1 = require("../schemas/contact.schema");
exports.contactProviders = [
    {
        provide: constants_1.ContactModelName,
        useFactory: (connection) => connection.model('contact', contact_schema_1.ContactSchema),
        inject: ['DbConnectionToken'],
    },
];
//# sourceMappingURL=contact.provider.js.map