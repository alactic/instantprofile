import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from '../services/auth.service';
import {UserModule} from './user.module';
import {JwtStrategy} from '../jwt/jwt.strategy';
import {AuthController} from '../controllers/auth.controller';
import {AuditInterceptor} from "../interceptor/audit.interceptor";

@Module({
    imports: [forwardRef(() => UserModule)],
    exports: [AuthService],
    providers: [
        AuthService,
        JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {
}
