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
const user_service_1 = require("./user.service");
const mongoose_1 = require("mongoose");
const jwt = require("jsonwebtoken");
const constants_1 = require("../utils/constants");
const bcryptjs_1 = require("bcryptjs");
const bcryptjs_2 = require("bcryptjs");
const message_1 = require("../utils/message");
const sendMail_1 = require("../utils/sendMail");
let AuthService = class AuthService {
    constructor(userModel, usersService) {
        this.userModel = userModel;
        this.usersService = usersService;
    }
    createToken(createtokendto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ email: createtokendto.email }).exec();
            const isMatch = yield bcryptjs_1.compare(createtokendto.password, user['password']);
            if (isMatch) {
                if (user['activate']) {
                    return yield this.signJWT(user);
                }
                else {
                    throw new common_1.HttpException('This User was disabled. Please contact the admin', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            else {
                throw new common_1.HttpException('Invalid Credentials', common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    resetPassword(createtokendto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ email: createtokendto.email }).exec();
            if (user) {
                if (user['activate']) {
                    const payload = { email: user['email'], _id: user['_id'] };
                    const token = jwt.sign(payload, constants_1.SecreytKey, { expiresIn: 3600 });
                    const recoveryMessage = createtokendto['path'] + token;
                    sendMail_1.sendmail(message_1.myMail, user['email'], message_1.resetSubject, message_1.password_reset_message(recoveryMessage));
                    return yield this.signJWT(user);
                }
                else {
                    throw new common_1.HttpException('This User was disabled. Please contact the admin', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            else {
                throw new common_1.HttpException('The User does not exist', common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    recoverPassword(createtokendto) {
        return __awaiter(this, void 0, void 0, function* () {
            const decodedToken = jwt.verify(createtokendto['token'], constants_1.SecreytKey);
            const user = yield this.userModel.findOne({ email: decodedToken['email'] }).exec();
            if (user) {
                if (user['activate']) {
                    const salt = yield bcryptjs_2.genSalt(10);
                    const update = yield this.userModel.findOneAndUpdate({ _id: user['_id'] }, {
                        $set: {
                            password: yield bcryptjs_2.hash(createtokendto['password'], salt),
                        },
                    }, { new: true }).exec();
                    return yield update;
                }
                else {
                    throw new common_1.HttpException('This User was disabled. Please contact the admin', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            else {
                throw new common_1.HttpException('The User does not exist', common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    signJWT(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { email: user['email'], _id: user['_id'] };
            const token = jwt.sign(payload, constants_1.SecreytKey, { expiresIn: 3600 });
            const updatedUser = yield this.userModel.findOneAndUpdate({ email: user['email'] }, { $set: { token: token } }, { new: true }).exec();
            return updatedUser;
        });
    }
    validateUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersService.findUserByEmail(payload.email);
        });
    }
    addAudit(record) {
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.ModelName)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" && _a || Object, user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map