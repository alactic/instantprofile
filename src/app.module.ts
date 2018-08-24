import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserModule} from './application/modules/user.module';
import {AuthModule} from './application/modules/auth.module';
import {AboutmeModule} from './application/modules/aboutme.module';
import {ServiceModule} from './application/modules/service.module';
import {ClientModule} from './application/modules/client.module';
import {ClientService} from './application/services/client.service';
import {PortifolioModule} from "./application/modules/Portifolio.module";
import {ContactModule} from "./application/modules/contact.module";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {AuditInterceptor} from "./application/interceptor/audit.interceptor";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://softloft:0gbunike@ds113122.mlab.com:13122/myprofile'),
        // MongooseModule.forRoot('mongodb://localhost/instantprofile'),
        UserModule,
        ServiceModule,
        AuthModule,
        ContactModule,
        AboutmeModule,
        PortifolioModule,
        ClientModule],
    exports: [],
    controllers: [AppController],
    providers: [
        AppService],
})
export class AppModule {
}
