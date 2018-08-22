"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./application/modules/user.module");
const auth_module_1 = require("./application/modules/auth.module");
const aboutme_module_1 = require("./application/modules/aboutme.module");
const service_module_1 = require("./application/modules/service.module");
const client_module_1 = require("./application/modules/client.module");
const Portifolio_module_1 = require("./application/modules/Portifolio.module");
const contact_module_1 = require("./application/modules/contact.module");
const cloudinaryupload_service_1 = require("./application/services/cloudinaryupload.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://softloft:0gbunike@ds113122.mlab.com:13122/myprofile'),
            user_module_1.UserModule,
            service_module_1.ServiceModule,
            auth_module_1.AuthModule,
            contact_module_1.ContactModule,
            aboutme_module_1.AboutmeModule,
            Portifolio_module_1.PortifolioModule,
            client_module_1.ClientModule
        ],
        exports: [cloudinaryupload_service_1.CloudinaryuploadService],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, cloudinaryupload_service_1.CloudinaryuploadService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map