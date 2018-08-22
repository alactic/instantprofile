import {forwardRef, Module} from '@nestjs/common';
import {ServiceController} from '../controllers/service.controller';
import {ServiceService} from '../services/service.service';
import {serviceProviders} from '../providers/service.provider';
import {UserModule} from "./user.module";
import {AppModule} from "../../app.module";

@Module({
    controllers: [ServiceController],
    imports: [UserModule],
    providers: [ServiceService, ...serviceProviders],
})
export class ServiceModule {
}
