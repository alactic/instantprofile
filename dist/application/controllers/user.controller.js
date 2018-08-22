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
const passport_1 = require("@nestjs/passport");
const user_service_1 = require("../services/user.service");
const auth_service_1 = require("../services/auth.service");
const user_dto_1 = require("../dto/user.dto");
const lodash_1 = require("lodash");
const swagger_1 = require("@nestjs/swagger");
const admin_guard_1 = require("../guard/admin.guard");
let UserController = class UserController {
    constructor(userservice, authservice) {
        this.userservice = userservice;
        this.authservice = authservice;
    }
    findAll(res, req) {
        this.userservice.getAllUser().then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }
    findUser(res, req) {
        this.userservice.findOneByUsername(req.headers.portaluser).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }
    findUserClient(res, req) {
        this.userservice.findOneByUsername(req.headers.named).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }
    createUser(res, createUserDto) {
        this.userservice.create(createUserDto).then((response) => {
            const feedback = lodash_1.pick(response, ['firstName', 'lastName', 'middleName', 'phone', 'username', 'email', 'profession', '_id']);
            res.status(200).send(feedback);
        }).catch((error) => {
            if (error && error.code === 11000) {
                res.status(400).send({ message: `${createUserDto.email} already exist` });
            }
            else {
                res.status(400).send({ message: error.message });
            }
        });
    }
    updateUser(updateUserDto, res, req) {
        this.userservice.updateUser(req.headers.authorization, updateUserDto).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }
    toggleUser(updateUserDto, res, req) {
        this.userservice.toggleUser(updateUserDto).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }
    adminUser(updateUserDto, res, req) {
        this.userservice.toggleAdmin(updateUserDto).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }
};
__decorate([
    common_1.Get('all'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), admin_guard_1.AdminGuard),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUser", null);
__decorate([
    common_1.Get('user'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUserClient", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUser", null);
__decorate([
    common_1.Put(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Body()), __param(1, common_1.Res()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateUserDto, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    common_1.Put('toggle'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Body()), __param(1, common_1.Res()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateUserDto, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "toggleUser", null);
__decorate([
    common_1.Put('admin'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), admin_guard_1.AdminGuard),
    __param(0, common_1.Body()), __param(1, common_1.Res()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateUserDto, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "adminUser", null);
UserController = __decorate([
    swagger_1.ApiUseTags('user'),
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map