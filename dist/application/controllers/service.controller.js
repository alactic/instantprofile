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
const service_service_1 = require("../services/service.service");
const passport_1 = require("@nestjs/passport");
const service_dto_1 = require("../dto/service.dto");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("../services/user.service");
const cloudinary_upload_1 = require("../utils/cloudinary-upload");
let ServiceController = class ServiceController {
    constructor(serviceService, userservice) {
        this.serviceService = serviceService;
        this.userservice = userservice;
    }
    createService(files, createServiceDto, res, req) {
        console.log('files :: ', files);
        const servicedata = JSON.parse(createServiceDto['data']);
        if (servicedata.service.length === files.length) {
            let index = 0;
            files.forEach((file, i) => {
                cloudinary_upload_1.cloud(file.buffer).then((result) => {
                    index = index + 1;
                    servicedata.service[i]['image_name'] = result['url'];
                    servicedata.service[i]['image_id'] = result['public_id'];
                    if (index === files.length) {
                        this.serviceService.create(servicedata, req.headers.authorization).then(response => {
                            res.send(response);
                        }).catch(error => {
                            res.status(400).send(error);
                        });
                    }
                });
            });
        }
        else {
            res.status(400).send({ message: 'Error occur while uploading, please try again' });
        }
    }
    getService(res, req) {
        this.userservice.findOneByUsername(req.headers.named).then(resp => {
            this.serviceService.getService(resp._id).then(response => {
                if (response[0]) {
                    res.send(response[0]['service']);
                }
                else {
                    res.send(response);
                }
            }).catch(error => {
                res.status(400).send(error);
            });
        });
    }
    getServiceUser(res, req) {
        this.serviceService.getServiceUser(req.headers.authorization).then(response => {
            res.send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }
    updateProfileImage(files, res, req, createServiceDto) {
        cloudinary_upload_1.cloud(files.buffer).then(result => {
            createServiceDto['image_name'] = result['url'];
            createServiceDto['image_id'] = result['public_id'];
            this.serviceService.updateImage(createServiceDto, req.headers.authorization, files.buffer).then(response => {
                res.send(response);
            }).catch(error => {
                res.status(400).send(error);
            });
        });
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.UseInterceptors(common_1.FilesInterceptor('files')),
    __param(0, common_1.UploadedFiles()), __param(1, common_1.Body()), __param(2, common_1.Res()), __param(3, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, service_dto_1.CreateServiceDto, Object, Object]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "createService", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "getService", null);
__decorate([
    common_1.Get('user'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "getServiceUser", null);
__decorate([
    common_1.Post('image'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.UseInterceptors(common_1.FileInterceptor('files')),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Res()), __param(2, common_1.Req()), __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, service_dto_1.CreateServiceDto]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "updateProfileImage", null);
ServiceController = __decorate([
    swagger_1.ApiUseTags('service'),
    common_1.Controller('service'),
    __metadata("design:paramtypes", [service_service_1.ServiceService,
        user_service_1.UserService])
], ServiceController);
exports.ServiceController = ServiceController;
//# sourceMappingURL=service.controller.js.map