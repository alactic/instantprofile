"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let AdminGuard = class AdminGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (request['user']['admin1'] || request['user']['admin2'] || request['body']['admin1'] || request['body']['admin2']) {
            return true;
        }
        else {
            throw new common_1.HttpException('Unauthorize access to this page', common_1.HttpStatus.FORBIDDEN);
            return false;
        }
    }
    validateRequest(request) {
        console.log('validate auth :: ', request);
        return true;
    }
};
AdminGuard = __decorate([
    common_1.Injectable()
], AdminGuard);
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=admin.guard.js.map