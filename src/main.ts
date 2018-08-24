import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as cors from 'cors';
import {join} from "path";
import {AuditInterceptor} from "./application/interceptor/audit.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: console,
    });
    const options = new DocumentBuilder()
        .setTitle('Profile portal')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    app.use(cors());
    // app.useGlobalInterceptors(new AuditInterceptor());
    app.useStaticAssets(join(__dirname, 'public/uploads'));
    await app.listen(process.env.PORT || 5500);
}

bootstrap();
