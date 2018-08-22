import { Module } from '@nestjs/common';
import { AboutmeController } from '../controllers/aboutme.controller';
import {AboutmeService} from '../services/aboutme.service';
import {aboutProviders} from '../providers/aboutme.provider';
import {UserModule} from "./user.module";

@Module({
  controllers: [AboutmeController],
    imports: [UserModule],
    providers: [AboutmeService, ...aboutProviders],
})
export class AboutmeModule {}
