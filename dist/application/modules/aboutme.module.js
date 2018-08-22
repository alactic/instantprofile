"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const aboutme_controller_1 = require("../controllers/aboutme.controller");
const aboutme_service_1 = require("../services/aboutme.service");
const aboutme_provider_1 = require("../providers/aboutme.provider");
const user_module_1 = require("./user.module");
let AboutmeModule = class AboutmeModule {
};
AboutmeModule = __decorate([
    common_1.Module({
        controllers: [aboutme_controller_1.AboutmeController],
        imports: [user_module_1.UserModule],
        providers: [aboutme_service_1.AboutmeService, ...aboutme_provider_1.aboutProviders],
    })
], AboutmeModule);
exports.AboutmeModule = AboutmeModule;
//# sourceMappingURL=aboutme.module.js.map