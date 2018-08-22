"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const portifolio_provider_1 = require("../providers/portifolio.provider");
const porttifolio_service_1 = require("../services/porttifolio.service");
const portifolio_controller_1 = require("../controllers/portifolio.controller");
const user_module_1 = require("./user.module");
let PortifolioModule = class PortifolioModule {
};
PortifolioModule = __decorate([
    common_1.Module({
        controllers: [portifolio_controller_1.PortifolioController],
        imports: [user_module_1.UserModule],
        providers: [porttifolio_service_1.PortifolioService, ...portifolio_provider_1.portifolioProviders, ...portifolio_provider_1.categoryProviders],
    })
], PortifolioModule);
exports.PortifolioModule = PortifolioModule;
//# sourceMappingURL=Portifolio.module.js.map