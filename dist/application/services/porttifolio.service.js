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
var _a, _b;
const common_1 = require("@nestjs/common");
const constants_1 = require("../utils/constants");
const mongoose_1 = require("mongoose");
const fs = require("fs");
const retrieveFromToken_1 = require("../utils/retrieveFromToken");
let PortifolioService = class PortifolioService {
    constructor(portifolioModel, categoryModel) {
        this.portifolioModel = portifolioModel;
        this.categoryModel = categoryModel;
    }
    create(createPortifolioDto, authorization) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = retrieveFromToken_1.retrieveFromToken(authorization);
            createPortifolioDto['userId'] = decoded._id;
            const portifolio = yield this.portifolioModel.findOne({ userId: decoded._id });
            if (portifolio) {
                portifolio.portifolio.forEach((value, i) => {
                    value['project_name'] = createPortifolioDto['portifolio'][i]['project_name'];
                    value['categoryId'] = createPortifolioDto['portifolio'][i]['categoryId'];
                });
                const updatedUser = yield this.portifolioModel.findOneAndUpdate({ userId: decoded._id }, {
                    $set: {
                        'portifolio': portifolio.portifolio,
                    },
                }, { new: true });
                return updatedUser;
            }
            else {
                const createdPortifolio = new this.portifolioModel(createPortifolioDto);
                return yield createdPortifolio.save();
            }
        });
    }
    addCategory(addCategory, authorization) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = retrieveFromToken_1.retrieveFromToken(authorization);
            addCategory['userId'] = decoded._id;
            const createdCategory = new this.categoryModel(addCategory);
            return yield createdCategory.save();
        });
    }
    getCategory(authorization) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = retrieveFromToken_1.retrieveFromToken(authorization);
            const category = yield this.categoryModel.find({ userId: decoded._id });
            if (category) {
                return yield this.categoryModel.find();
            }
        });
    }
    getPortifolio(authorization) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = retrieveFromToken_1.retrieveFromToken(authorization);
            return yield this.portifolioModel.find({ userId: decoded._id });
        });
    }
    getCategoryUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.categoryModel.find({ userId: id });
        });
    }
    getPortifolioUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.portifolioModel.find({ userId: id }).populate('portifolio.categoryId');
        });
    }
    updateImage(createPortfilioDto, authorization) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = +createPortfilioDto['data'];
            const decoded = retrieveFromToken_1.retrieveFromToken(authorization);
            const portifolio = yield this.portifolioModel.findOne({ userId: decoded._id });
            if (!portifolio) {
                const createdPortifilio = new this.portifolioModel(createPortfilioDto);
                return yield createdPortifilio.save();
            }
            else {
                portifolio.portifolio.forEach((value, i) => {
                    if (i === index) {
                        const path = './src/public/uploads/' + value['image_name'];
                        if (fs.existsSync(path)) {
                            fs.unlinkSync('./src/public/uploads/' + value['image_name']);
                            value['image_name'] = createPortfilioDto['image'];
                        }
                        else {
                            value['image_name'] = createPortfilioDto['image'];
                        }
                    }
                });
                const updatedPortifilio = yield this.portifolioModel.findOneAndUpdate({ userId: decoded._id }, {
                    $set: {
                        'portifolio': portifolio.portifolio,
                    },
                }, { new: true });
                return updatedPortifilio;
            }
        });
    }
};
PortifolioService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.PortifolioModelName)),
    __param(1, common_1.Inject(constants_1.CategoryModelName)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" && _a || Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" && _b || Object])
], PortifolioService);
exports.PortifolioService = PortifolioService;
//# sourceMappingURL=porttifolio.service.js.map