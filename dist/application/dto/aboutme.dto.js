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
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
class CreateAboutMeDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateAboutMeDto.prototype, "profile_image", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateAboutMeDto.prototype, "cv", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateAboutMeDto.prototype, "profession", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateAboutMeDto.prototype, "city", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateAboutMeDto.prototype, "state", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateAboutMeDto.prototype, "country", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateAboutMeDto.prototype, "dob", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateAboutMeDto.prototype, "short_description", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateAboutMeDto.prototype, "about_me", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateAboutMeDto.prototype, "image_name", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateAboutMeDto.prototype, "image_id", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String, isArray: true }),
    __metadata("design:type", Object)
], CreateAboutMeDto.prototype, "hobby", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], CreateAboutMeDto.prototype, "education", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], CreateAboutMeDto.prototype, "experience", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], CreateAboutMeDto.prototype, "skill", void 0);
exports.CreateAboutMeDto = CreateAboutMeDto;
class UpdateAboutMeDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateAboutMeDto.prototype, "profession", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateAboutMeDto.prototype, "city", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateAboutMeDto.prototype, "state", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateAboutMeDto.prototype, "country", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateAboutMeDto.prototype, "dob", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateAboutMeDto.prototype, "short_description", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateAboutMeDto.prototype, "about_me", void 0);
__decorate([
    swagger_1.ApiModelProperty({ type: String, isArray: true }),
    __metadata("design:type", Object)
], UpdateAboutMeDto.prototype, "hobby", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], UpdateAboutMeDto.prototype, "education", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], UpdateAboutMeDto.prototype, "experience", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], UpdateAboutMeDto.prototype, "skill", void 0);
exports.UpdateAboutMeDto = UpdateAboutMeDto;
//# sourceMappingURL=aboutme.dto.js.map