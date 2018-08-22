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
const bcryptjs_1 = require("bcryptjs");
const constants_1 = require("../utils/constants");
const retrieveFromToken_1 = require("../utils/retrieveFromToken");
const message_1 = require("../utils/message");
const sendMail_1 = require("../utils/sendMail");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    create(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ _id: createUserDto['_id'] }).exec();
            if (!user) {
                const salt = yield bcryptjs_1.genSalt(10);
                createUserDto['password'] = yield bcryptjs_1.hash(createUserDto.password, salt);
                createUserDto['activate'] = false;
                createUserDto['admin1'] = false;
                createUserDto['admin2'] = false;
                sendMail_1.sendmail(message_1.myMail, 'bluecard1992@yahoo.com', message_1.subject, message_1.new_user_message(createUserDto['username']));
                const createdUser = new this.userModel(createUserDto);
                return createdUser.save();
            }
            else {
                const update = yield this.userModel.findOneAndUpdate({ _id: createUserDto['_id'] }, {
                    $set: {
                        firstName: createUserDto['firstName'],
                        lastName: createUserDto['lastName'],
                        phone: createUserDto['phone'],
                        username: createUserDto['username'],
                        email: createUserDto['email'],
                        address: createUserDto['address'],
                        habit: createUserDto['habit'],
                        hobby: createUserDto['hobby'],
                        profession: createUserDto['profession'],
                    },
                }, { new: true }).exec();
                return yield update;
            }
        });
    }
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userModel.paginate({}, { page: 1, limit: 10 });
            if (users) {
                return users;
            }
        });
    }
    findOneByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOne({ username: username }).exec();
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOne({ email: email }).exec();
        });
    }
    updateUser(authorization, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = retrieveFromToken_1.retrieveFromToken(authorization);
            const update = yield this.userModel.findOneAndUpdate({ email: decoded.email }, {
                $set: {
                    firstName: updateUserDto['firstName'],
                    lastName: updateUserDto['lastName'],
                    phone: updateUserDto['phone'],
                    username: updateUserDto['username'],
                    email: updateUserDto['email'],
                    address: updateUserDto['address'],
                    habit: updateUserDto['habit'],
                    hobby: updateUserDto['hobby'],
                    profession: updateUserDto['profession'],
                },
            }, { new: true }).exec();
            return yield update;
        });
    }
    toggleUser(updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ _id: updateUserDto['_id'] }).exec();
            if (user) {
                const update = yield this.userModel.findOneAndUpdate({ _id: updateUserDto['_id'] }, {
                    $set: {
                        activate: !user['activate'],
                    },
                }, { new: true }).exec();
                return yield update;
            }
        });
    }
    toggleAdmin(updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ _id: updateUserDto['_id'] }).exec();
            if (user) {
                const update = yield this.userModel.findOneAndUpdate({ _id: updateUserDto['_id'] }, {
                    $set: {
                        admin2: !user['admin2'],
                    },
                }, { new: true }).exec();
                return yield update;
            }
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.ModelName)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" && _a || Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map