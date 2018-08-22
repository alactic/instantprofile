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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const common_1 = require("@nestjs/common");
const constants_1 = require("../utils/constants");
const mongoose_1 = require("mongoose");
const retrieveFromToken_1 = require("../utils/retrieveFromToken");
const cloudinary = require("cloudinary");
let ServiceService = class ServiceService {
    constructor(serviceModel) {
        this.serviceModel = serviceModel;
        cloudinary.config({
            cloud_name: 'softloft',
            api_key: 314466682599661,
            api_secret: 'o_fyN55i7DXY4lSt6a4QN2CpGH8',
        });
    }
    create(createServiceDto, authorization) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = retrieveFromToken_1.retrieveFromToken(authorization);
            createServiceDto['userId'] = decoded._id;
            const service = yield this.serviceModel.findOne({ userId: decoded._id });
            if (service) {
                service.service.forEach((value, i) => {
                    value['name'] = createServiceDto['service'][i]['name'];
                    value['description'] = createServiceDto['service'][i]['description'];
                });
                const updatedUser = yield this.serviceModel.findOneAndUpdate({ userId: decoded._id }, {
                    $set: {
                        'service': service.service,
                    },
                }, { new: true });
                return updatedUser;
            }
            else {
                const createdService = new this.serviceModel(createServiceDto);
                return yield createdService.save();
            }
        });
    }
    getService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.serviceModel.find({ userId: id });
        });
    }
    getServiceUser(authorization) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = retrieveFromToken_1.retrieveFromToken(authorization);
            return yield this.serviceModel.find({ userId: decoded._id });
        });
    }
    updateImage(createServiceDto, authorization, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = +createServiceDto['data'];
            const decoded = retrieveFromToken_1.retrieveFromToken(authorization);
            const service = yield this.serviceModel.findOne({ userId: decoded._id });
            let count = 0;
            if (!service) {
                const createdService = new this.serviceModel(createServiceDto);
                return yield createdService.save();
            }
            else {
                service.service.forEach((value, i) => {
                    if (i === index) {
                        cloudinary.v2.uploader.destroy(value['image_id'], (error, result) => {
                            console.log('result :: ', result, 'error :: ', error);
                        });
                        value['image_name'] = createServiceDto['image_name'];
                        value['image_id'] = createServiceDto['image_id'];
                    }
                });
                const updatedUser = yield this.serviceModel.findOneAndUpdate({ userId: decoded._id }, {
                    $set: {
                        'service': service.service,
                    },
                }, { new: true });
                return updatedUser;
            }
        });
    }
};
ServiceService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.ServiceModelName)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" && _a || Object])
], ServiceService);
exports.ServiceService = ServiceService;
//# sourceMappingURL=service.service.js.map