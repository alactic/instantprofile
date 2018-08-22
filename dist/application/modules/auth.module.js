"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../services/auth.service");
const user_module_1 = require("./user.module");
const jwt_strategy_1 = require("../jwt/jwt.strategy");
const auth_controller_1 = require("../controllers/auth.controller");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [common_1.forwardRef(() => user_module_1.UserModule)],
        exports: [auth_service_1.AuthService],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map