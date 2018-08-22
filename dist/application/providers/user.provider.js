"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("../schemas/user.schema");
const constants_1 = require("../utils/constants");
const paginate = require("mongoose-paginate");
user_schema_1.UserSchema.plugin(paginate);
user_schema_1.UserSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};
exports.userProviders = [
    {
        provide: constants_1.ModelName,
        useFactory: (connection) => connection.model('User', user_schema_1.UserSchema),
        inject: ['DbConnectionToken'],
    },
];
//# sourceMappingURL=user.provider.js.map