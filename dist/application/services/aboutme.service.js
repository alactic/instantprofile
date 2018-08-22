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
const mongoose_1 = require("mongoose");
const retrieveFromToken_1 = require("../utils/retrieveFromToken");
const constants_1 = require("../utils/constants");
const cloudinary_upload_1 = require("../utils/cloudinary-upload");
let AboutmeService = class AboutmeService {
    constructor(aboutModel) {
        this.aboutModel = aboutModel;
    }
    create(createAboutmeDto, authorization) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = retrieveFromToken_1.retrieveFromToken(authorization);
            createAboutmeDto['userId'] = decoded._id;
            const user = yield this.aboutModel.find({ userId: decoded._id });
            if (user && user.length > 0) {
                const updatedUser = yield this.aboutModel.findOneAndUpdate({ userId: decoded._id }, {
                    $set: {
                        'profession': createAboutmeDto.profession,
                        'city': createAboutmeDto.city,
                        'state': createAboutmeDto.state,
                        'country': createAboutmeDto.country,
                        'dob': createAboutmeDto.dob,
                        'short_description': createAboutmeDto.short_description,
                        'about_me': createAboutmeDto.about_me,
                        'hobby': createAboutmeDto.hobby,
                        'education': createAboutmeDto.education,
                        'skill': createAboutmeDto.skill,
                        'experience': createAboutmeDto.experience,
                    },
                }, { new: true });
                return updatedUser;
            }
            else {
                const createdUser = new this.aboutModel(createAboutmeDto);
                return yield createdUser.save();
            }
        });
    }
    updateCV(createAboutmeDto, authorization) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = retrieveFromToken_1.retrieveFromToken(authorization);
            createAboutmeDto['userId'] = decoded._id;
            const user = yield this.aboutModel.find({ userId: decoded._id });
            if (user && user.length > 0) {
                const updatedUser = yield this.aboutModel.findOneAndUpdate({ userId: decoded._id }, {
                    $set: {
                        'cv': createAboutmeDto['cv'],
                    },
                }, { new: true });
                return updatedUser;
            }
            else {
                const createdUser = new this.aboutModel(createAboutmeDto);
                return yield createdUser.save();
            }
        });
    }
    updateProfileImage(createAboutmeDto, authorization) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = retrieveFromToken_1.retrieveFromToken(authorization);
            createAboutmeDto['userId'] = decoded._id;
            const user = yield this.aboutModel.find({ userId: decoded._id });
            if (user && user.length > 0) {
                cloudinary_upload_1.deleteCloudFile(user['image_id']).then((result) => {
                    console.log('result :: ', result);
                }).catch(error => {
                    console.log('error :: ', error);
                });
                const updatedUser = yield this.aboutModel.findOneAndUpdate({ userId: decoded._id }, {
                    $set: {
                        'image_name': createAboutmeDto['image_name'],
                        'image_id': createAboutmeDto['image_id'],
                    },
                }, { new: true });
                return updatedUser;
            }
            else {
                const createdUser = new this.aboutModel(createAboutmeDto);
                return yield createdUser.save();
            }
        });
    }
    update(updateAboutmeDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_Id = yield this.aboutModel.find({ userId });
            if (user_Id) {
                const updatedUser = yield this.aboutModel.findOneAndUpdate({ user_Id }, {
                    $set: {
                        'profession': updateAboutmeDto.profession,
                        'city': updateAboutmeDto.city,
                        'state': updateAboutmeDto.state,
                        'country': updateAboutmeDto.country,
                        'dob': updateAboutmeDto.dob,
                        'short_description': updateAboutmeDto.short_description,
                        'about_me': updateAboutmeDto.about_me,
                        'hobby': updateAboutmeDto.hobby,
                        'education': updateAboutmeDto.education,
                    },
                }, { new: true });
                return updatedUser;
            }
            else {
                throw new common_1.HttpException('User does not Exist', common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.aboutModel.find({ userId: _id });
            if (user) {
                return yield this.aboutModel.findOne({ userId: _id });
            }
            else {
                throw new common_1.HttpException('User does not Exist', common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    getUser(authorization) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = retrieveFromToken_1.retrieveFromToken(authorization);
            return yield this.aboutModel.find({ userId: decoded._id });
        });
    }
};
AboutmeService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.AboutModelName)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" && _a || Object])
], AboutmeService);
exports.AboutmeService = AboutmeService;
//# sourceMappingURL=aboutme.service.js.map