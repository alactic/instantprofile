"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_service_1 = require("../services/user.service");
const auth_service_1 = require("../services/auth.service");
const auth_dto_1 = require("../dto/auth.dto");
const swagger_1 = require("@nestjs/swagger");
const lodash_1 = require("lodash");
let AuthController = class AuthController {
    constructor(userservice, authservice) {
        this.userservice = userservice;
        this.authservice = authservice;
    }
    findByEmail(res, createtokendto) {
        this.authservice.createToken(createtokendto).then(response => {
            if (response.isArray && response.length === 0) {
                res.status(400).send({ message: 'Invalid Credentials' });
            }
            else {
                const feedback = lodash_1.pick(response, ['firstName', 'lastName', 'username', 'middleName', 'phone', 'email', 'profession']);
                res.status(200).send({ payload: feedback, token: response['token'] });
            }
        }).catch(error => {
            res.status(400).send(error);
        });
    }
    resetPassword(res, createtokendto) {
        this.authservice.resetPassword(createtokendto).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }
    recoverPassword(res, createtokendto) {
        this.authservice.recoverPassword(createtokendto).then(response => {
            console.log('recover response :: ', response);
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.CreateTokenDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "findByEmail", null);
__decorate([
    common_1.Post('reset'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.CreateTokenDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
__decorate([
    common_1.Post('recover'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.CreateTokenDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "recoverPassword", null);
AuthController = __decorate([
    swagger_1.ApiUseTags('login'),
    common_1.Controller('login'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map