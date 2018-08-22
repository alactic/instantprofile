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
const fs = require("fs");
const client_service_1 = require("../services/client.service");
const client_dto_1 = require("../dto/client.dto");
const user_service_1 = require("../services/user.service");
let ClientController = class ClientController {
    constructor(clientService, userservice) {
        this.clientService = clientService;
        this.userservice = userservice;
    }
    createService(files, createClientDto, res, req) {
        const clientdata = JSON.parse(createClientDto['data']);
        clientdata.client.forEach((value, i) => {
            value['image_name'] = Date.now() + '-' + 'file.originalname' + i;
        });
        files.forEach((file, i) => {
            const buff = new Buffer(file.buffer, 'base64');
            fs.writeFileSync('./src/public/uploads/' + clientdata.client[i]['image_name'], buff);
        });
        this.clientService.create(clientdata, req.headers.authorization).then(response => {
            res.send(response);
        }).catch(error => {
            res.status(400).send(error);
        });
    }
    getService(res, req) {
        this.userservice.findOneByUsername(req.headers.named).then(resp => {
            this.clientService.getClient(resp._id).then(response => {
                res.send(response[0]['client']);
            }).catch(error => {
                res.status(400).send(error);
            });
        });
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.UseInterceptors(common_1.FilesInterceptor('files', 5)),
    __param(0, common_1.UploadedFiles()), __param(1, common_1.Body()), __param(2, common_1.Res()), __param(3, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, client_dto_1.CreateClientDto, Object, Object]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "createService", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ClientController.prototype, "getService", null);
ClientController = __decorate([
    common_1.Controller('client'),
    __metadata("design:paramtypes", [client_service_1.ClientService,
        user_service_1.UserService])
], ClientController);
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map