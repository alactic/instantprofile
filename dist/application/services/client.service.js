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
let ClientService = class ClientService {
    constructor(clientModel) {
        this.clientModel = clientModel;
    }
    create(createClientDto, authorization) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = retrieveFromToken_1.retrieveFromToken(authorization);
            createClientDto['userId'] = decoded._id;
            const user = yield this.clientModel.find({ userId: decoded._id });
            console.log('user data :: ', user);
            if (user && user.length > 0) {
                const updatedUser = yield this.clientModel.findOneAndUpdate({ userId: decoded._id }, {
                    $set: {
                        'client': createClientDto.client,
                    },
                }, { new: true });
                return updatedUser;
                throw new common_1.HttpException('Client already exist, Kindly update if you want to make changes', common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                const createdClient = new this.clientModel(createClientDto);
                return yield createdClient.save();
            }
        });
    }
    getClient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clientModel.find({ userId: id });
        });
    }
};
ClientService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.ClientModelName)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" && _a || Object])
], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map