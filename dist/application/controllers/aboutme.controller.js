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
const aboutme_dto_1 = require("../dto/aboutme.dto");
const swagger_1 = require("@nestjs/swagger");
const aboutme_service_1 = require("../services/aboutme.service");
const passport_1 = require("@nestjs/passport");
const user_service_1 = require("../services/user.service");
const path = require("path");
const fs = require("fs");
const cloudinary_upload_1 = require("../utils/cloudinary-upload");
let AboutmeController = class AboutmeController {
    constructor(aboutmeService, userservice) {
        this.aboutmeService = aboutmeService;
        this.userservice = userservice;
    }
    createUser(res, req, createAboutMeDto) {
        this.aboutmeService.create(createAboutMeDto, req.headers.authorization).then((response) => {
            res.status(200).send(response);
        }).catch((error) => {
            res.status(400).send({ message: error.message });
        });
    }
    updateCV(files, res, req, createAboutMeDto) {
        const name = Date.now() + '-' + files.originalname;
        createAboutMeDto['cv'] = name;
        const buff = new Buffer(files.buffer, 'base64');
        fs.writeFileSync('./src/public/uploads/' + name, buff);
        this.aboutmeService.updateCV(createAboutMeDto, req.headers.authorization).then(response => {
            res.send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }
    updateProfileImage(files, res, req, createAboutMeDto) {
        cloudinary_upload_1.cloud(files.buffer).then((result) => {
            createAboutMeDto['image_name'] = result['url'];
            createAboutMeDto['image_id'] = result['public_id'];
            this.aboutmeService.updateProfileImage(createAboutMeDto, req.headers.authorization).then(response => {
                res.send(response);
            }).catch(error => {
                res.status(400).send(error);
            });
        });
    }
    updateUser(res, req, updateAboutMeDto) {
        this.userservice.findOneByUsername(req.headers.named).then(resp => {
            this.aboutmeService.update(updateAboutMeDto, resp._id).then((response) => {
                res.status(200).send(response);
            }).catch((error) => {
                res.status(400).send({ message: error.message });
            });
        });
    }
    getById(res, req) {
        this.userservice.findOneByUsername(req.headers.named).then(resp => {
            this.aboutmeService.getById(resp._id).then((response) => {
                res.status(200).send(response);
            }).catch((error) => {
                res.status(400).send({ message: error.message });
            });
        });
    }
    getUser(res, req) {
        this.aboutmeService.getUser(req.headers.authorization).then((response) => {
            res.status(200).send(response);
        }).catch((error) => {
            res.status(400).send({ message: error.message });
        });
    }
    getDownload(params, res, req) {
        const url = req.query['cv'];
        const image = path.join(__dirname, '../../../src/public/uploads/') + '/' + url;
        res.setHeader('Content-Type', 'application/octet-stream');
        res.sendFile(image);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Res()), __param(1, common_1.Req()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, aboutme_dto_1.CreateAboutMeDto]),
    __metadata("design:returntype", void 0)
], AboutmeController.prototype, "createUser", null);
__decorate([
    common_1.Post('cv'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.UseInterceptors(common_1.FileInterceptor('files')),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Res()), __param(2, common_1.Req()), __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, aboutme_dto_1.CreateAboutMeDto]),
    __metadata("design:returntype", void 0)
], AboutmeController.prototype, "updateCV", null);
__decorate([
    common_1.Post('profile_image'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.UseInterceptors(common_1.FileInterceptor('files')),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Res()), __param(2, common_1.Req()), __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, aboutme_dto_1.CreateAboutMeDto]),
    __metadata("design:returntype", void 0)
], AboutmeController.prototype, "updateProfileImage", null);
__decorate([
    common_1.Put(),
    __param(0, common_1.Res()), __param(1, common_1.Req()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, aboutme_dto_1.UpdateAboutMeDto]),
    __metadata("design:returntype", void 0)
], AboutmeController.prototype, "updateUser", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AboutmeController.prototype, "getById", null);
__decorate([
    common_1.Get('user'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AboutmeController.prototype, "getUser", null);
__decorate([
    common_1.Get('getCV'),
    __param(0, common_1.Param()), __param(1, common_1.Res()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AboutmeController.prototype, "getDownload", null);
AboutmeController = __decorate([
    swagger_1.ApiUseTags('about'),
    common_1.Controller('about'),
    __metadata("design:paramtypes", [aboutme_service_1.AboutmeService,
        user_service_1.UserService])
], AboutmeController);
exports.AboutmeController = AboutmeController;
//# sourceMappingURL=aboutme.controller.js.map