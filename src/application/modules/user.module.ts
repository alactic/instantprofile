import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserController} from '../controllers/user.controller';
import {UserSchema} from '../schemas/user.schema';
import {UserService} from '../services/user.service';
import {userProviders} from '../providers/user.provider';
import {AuthModule} from './auth.module';
import {AdminGuard} from '../guard/admin.guard';

@Module({
    controllers: [UserController],
    imports: [forwardRef(() => AuthModule), AdminGuard],
    exports: [UserService, ...userProviders],
    providers: [UserService, ...userProviders],
})
export class UserModule {
}
