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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cloudinary = require("cloudinary");
let CloudinaryuploadService = class CloudinaryuploadService {
    constructor() {
        cloudinary.config({
            cloud_name: 'softloft',
            api_key: 314466682599661,
            api_secret: 'o_fyN55i7DXY4lSt6a4QN2CpGH8',
        });
    }
    bulkUpload(file, i) {
        return __awaiter(this, void 0, void 0, function* () {
            yield cloudinary.uploader.upload_stream((result) => {
                return result;
            }).end(file);
        });
    }
};
CloudinaryuploadService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], CloudinaryuploadService);
exports.CloudinaryuploadService = CloudinaryuploadService;
//# sourceMappingURL=cloudinaryupload.service.js.map