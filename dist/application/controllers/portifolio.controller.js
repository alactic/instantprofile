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
const swagger_1 = require("@nestjs/swagger");
const fs = require("fs");
const porttifolio_service_1 = require("../services/porttifolio.service");
const portifolio_dto_1 = require("../dto/portifolio.dto");
const user_service_1 = require("../services/user.service");
let PortifolioController = class PortifolioController {
    constructor(porttifolioService, userservice) {
        this.porttifolioService = porttifolioService;
        this.userservice = userservice;
    }
    createportifolio(files, createPortifolioDto, res, req) {
        const portifoliodata = JSON.parse(createPortifolioDto['data']);
        portifoliodata.portifolio.forEach((value, i) => {
            value['image_name'] = Date.now() + '-' + value['imageName'];
        });
        files.forEach((file, i) => {
            const buff = new Buffer(file.buffer, 'base64');
            fs.writeFileSync('./src/public/uploads/' + portifoliodata.portifolio[i]['image_name'], buff);
        });
        this.porttifolioService.create(portifoliodata, req.headers.authorization).then(response => {
            res.send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }
    addCategory(addCategory, res, req) {
        this.porttifolioService.addCategory(addCategory, req.headers.authorization).then(response => {
            res.send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }
    getCategory(res, req) {
        this.porttifolioService.getCategory(req.headers.authorization).then(response => {
            res.send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }
    getCategoryUser(res, req) {
        this.userservice.findOneByUsername(req.headers.named).then(resp => {
            this.porttifolioService.getCategoryUser(resp._id).then(response => {
                res.send(response);
            }).catch(error => {
                res.status(400).send(error);
            });
        });
    }
    getPortifolioUser(res, req) {
        this.userservice.findOneByUsername(req.headers.named).then(resp => {
            this.porttifolioService.getPortifolioUser(resp._id).then(response => {
                if (response[0]) {
                    res.send(response[0]['portifolio']);
                }
                else {
                    res.send(response);
                }
            }).catch(error => {
                res.status(400).send(error);
            });
        });
    }
    getPortifolio(res, req) {
        this.porttifolioService.getPortifolio(req.headers.authorization).then(response => {
            res.send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }
    updateProfileImage(files, res, req, createPortifolioDto) {
        const name = Date.now() + '-' + files.originalname;
        createPortifolioDto['image'] = name;
        const buff = new Buffer(files.buffer, 'base64');
        fs.writeFileSync('./src/public/uploads/' + name, buff);
        this.porttifolioService.updateImage(createPortifolioDto, req.headers.authorization).then(response => {
            res.send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }
};
__decorate([
    common_1.Post(),
    common_1.UseInterceptors(common_1.FilesInterceptor('files', 10)),
    __param(0, common_1.UploadedFiles()), __param(1, common_1.Body()), __param(2, common_1.Res()), __param(3, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, portifolio_dto_1.CreatePortifolioDto, Object, Object]),
    __metadata("design:returntype", void 0)
], PortifolioController.prototype, "createportifolio", null);
__decorate([
    common_1.Post('category'),
    __param(0, common_1.Body()), __param(1, common_1.Res()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [portifolio_dto_1.AddCategory, Object, Object]),
    __metadata("design:returntype", void 0)
], PortifolioController.prototype, "addCategory", null);
__decorate([
    common_1.Get('category'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PortifolioController.prototype, "getCategory", null);
__decorate([
    common_1.Get('category/user'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PortifolioController.prototype, "getCategoryUser", null);
__decorate([
    common_1.Get('user'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PortifolioController.prototype, "getPortifolioUser", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PortifolioController.prototype, "getPortifolio", null);
__decorate([
    common_1.Post('image'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.UseInterceptors(common_1.FileInterceptor('files')),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Res()), __param(2, common_1.Req()), __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, portifolio_dto_1.CreatePortifolioDto]),
    __metadata("design:returntype", void 0)
], PortifolioController.prototype, "updateProfileImage", null);
PortifolioController = __decorate([
    swagger_1.ApiUseTags('portifolio'),
    common_1.Controller('portifolio'),
    __metadata("design:paramtypes", [porttifolio_service_1.PortifolioService,
        user_service_1.UserService])
], PortifolioController);
exports.PortifolioController = PortifolioController;
//# sourceMappingURL=portifolio.controller.js.map